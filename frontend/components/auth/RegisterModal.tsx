"use client";

import { useAuthStore } from "../../store/auth.store";
import { AxiosError } from "axios";
import { useState } from "react";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { register } = useAuthStore();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-primary/20 bg-[#211F1A] p-8 shadow-2xl">
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-primary transition hover:text-white"
          aria-label="Fermer"
        >
          ×
        </button>

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl text-primary">Créer un compte</h1>

          <p className="mt-3 text-sm text-foreground/70">
            Inscrivez-vous pour accéder à votre profil, panier et commandes.
          </p>
        </div>

        {/* FORM */}
        <form
          className="space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await register(form);
              onClose();
            } catch (error) {
              const axiosError = error as AxiosError<{
                message?: string;
                errors?: Record<string, string[]>;
              }>;
              const errors = axiosError.response?.data?.errors;
              const firstError = errors ? Object.values(errors)[0]?.[0] : null;

              console.log("REGISTER ERROR:", axiosError.response?.data);
              alert(
                firstError ||
                  axiosError.response?.data?.message ||
                  "Erreur inscription"
              );
            }
          }}
        >
          <div>
            <label className="mb-2 block text-sm text-primary">Nom</label>

            <input
              type="text"
              placeholder="Votre prénom"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-primary">Nom</label>

            <input
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>


          <div>
            <label className="mb-2 block text-sm text-primary">Email</label>

            <input
              type="email"
              placeholder="exemple@mail.com"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-primary">
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-primary">
              Confirmer le mot de passe
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.password_confirmation}
              onChange={(e) =>
                setForm({ ...form, password_confirmation: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            S&apos;inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
