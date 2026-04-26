<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User_addresses;

class UserAddressController extends Controller
{
    // Ajouter une adresse
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone' => 'nullable|string',
            'country' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'nullable|string',
            'address_line_1' => 'required|string',
            'address_line_2' => 'nullable|string',
            'is_default' => 'boolean',
        ]);

        $address = User_addresses::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($address, 201);
    }

    // Lister les adresses
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->addresses
        );
    }

    public function update(Request $request, User_addresses $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $validated = $request->validate([
            'type' => 'sometimes|string',
            'first_name' => 'sometimes|string',
            'last_name' => 'sometimes|string',
            'phone' => 'nullable|string',
            'country' => 'sometimes|string',
            'city' => 'sometimes|string',
            'postal_code' => 'nullable|string',
            'address_line_1' => 'sometimes|string',
            'address_line_2' => 'nullable|string',
            'is_default' => 'sometimes|boolean',
        ]);

        $address->update($validated);

        return response()->json([
            'message' => 'Adresse modifiée avec succès',
            'address' => $address,
        ]);
    }

    public function destroy(Request $request, User_addresses $address)
    {
        if ($address->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Accès interdit'
            ], 403);
        }

        $address->delete();

        return response()->json([
            'message' => 'Adresse supprimée avec succès',
        ]);
    }
}