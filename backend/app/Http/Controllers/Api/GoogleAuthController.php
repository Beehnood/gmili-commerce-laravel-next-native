<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GoogleAuthController extends Controller
{
    /**
     * Rediriger l'utilisateur vers Google.
     */
    public function redirect(): RedirectResponse
    {
        return $this->googleProvider()
            ->stateless()
            ->redirect();
    }

    /**
     * Callback envoyé par Google après authentification.
     */
    public function callback(): JsonResponse|RedirectResponse
    {
        try {
            $googleUser = $this->googleProvider()
                ->stateless()
                ->user();

            $email = $googleUser->getEmail();

            if (!$email) {
                return response()->json([
                    'message' => 'Google n’a pas fourni d’adresse email.',
                ], 422);
            }

            $email = strtolower($email);

            // Vérifier que Google considère l'adresse comme vérifiée.
            $emailVerified = $googleUser->user['email_verified'] ?? false;

            if (!$emailVerified) {
                return response()->json([
                    'message' => 'L’adresse email Google n’est pas vérifiée.',
                ], 403);
            }

            /*
             * 1. Chercher l'utilisateur avec son google_id.
             */
            $user = User::where(
                'google_id',
                $googleUser->getId()
            )->first();

            /*
             * 2. Sinon chercher un compte Gmili existant
             * ayant la même adresse email.
             */
            if (!$user) {
                $user = User::where('email', $email)->first();
            }

            if ($user) {

                /*
                 * Empêcher qu'un compte existant soit lié
                 * à un autre compte Google.
                 */
                if (
                    $user->google_id &&
                    $user->google_id !== $googleUser->getId()
                ) {
                    return response()->json([
                        'message' => 'Cette adresse email est déjà associée à un autre compte Google.',
                    ], 409);
                }

                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar_url' => $googleUser->getAvatar(),
                    'email_verified_at' => $user->email_verified_at ?? now(),
                ]);

            } else {

                /*
                 * Création d'un nouvel utilisateur provenant de Google.
                 */
                $firstName =
                    $googleUser->user['given_name']
                    ?? $googleUser->getName()
                    ?? 'Google';

                $lastName =
                    $googleUser->user['family_name']
                    ?? '';

                $user = User::create([
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $email,
                    'email_verified_at' => now(),
                    'password' => null,
                    'google_id' => $googleUser->getId(),
                    'avatar_url' => $googleUser->getAvatar(),
                    'role' => 'client',
                    'status' => 'active',
                ]);
            }

            /*
             * Création d'un code temporaire.
             *
             * On ne transmet PAS le token Sanctum dans l'URL.
             */
            $code = Str::random(64);

            Cache::put(
                'google_auth_code:' . $code,
                $user->id,
                now()->addMinutes(2)
            );

            $frontendUrl = rtrim(
                config('app.frontend_url', 'http://localhost:3000'),
                '/'
            );

            return redirect(
                $frontendUrl
                . '/auth/google/callback?code='
                . urlencode($code)
            );

        } catch (\Throwable $e) {

            report($e);

            return response()->json([
                'message' => 'Impossible de se connecter avec Google.',
            ], 500);
        }
    }

    /**
     * Échanger le code temporaire contre un token Sanctum.
     */
    public function exchange(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'string'],
        ]);

        /*
         * Cache::pull() récupère ET supprime le code.
         * Il ne peut donc être utilisé qu'une seule fois.
         */
        $userId = Cache::pull(
            'google_auth_code:' . $validated['code']
        );

        if (!$userId) {
            return response()->json([
                'message' => 'Code Google invalide ou expiré.',
            ], 401);
        }

        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur introuvable.',
            ], 404);
        }

        if ($user->status !== 'active') {
            return response()->json([
                'message' => 'Ce compte est désactivé.',
            ], 403);
        }

        /*
         * Le token Sanctum est créé seulement maintenant,
         * après l'échange du code temporaire.
         */
        $token = $user
            ->createToken('google-auth')
            ->plainTextToken;

        return response()->json([
            'message' => 'Connexion Google réussie.',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Retourner le provider OAuth2 Google avec son type concret.
     */
    private function googleProvider(): GoogleProvider
    {
        /** @var GoogleProvider $provider */
        $provider = Socialite::driver('google');

        return $provider;
    }
}
