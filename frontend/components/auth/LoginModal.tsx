"use client";

import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};



export function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
    const {login } = useAuthStore();

    const [form, setForm] = useState({
        email: "",
        password: "",
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
          <h1 className="text-4xl text-primary">
            Se connecter
          </h1>

          <p className="mt-3 text-sm text-foreground/70">
            Connectez-vous à votre compte Gmili.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-5"
            onSubmit={async (e) => {
                e.preventDefault();
                await login(form);
                onClose();
            }}>

          <div>
            <label className="mb-2 block text-sm text-primary">
              Email
            </label>

            <input
              type="email"
              placeholder="exemple@mail.com"
              className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value})}
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
              onChange={(e)=>setForm({ ...form, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 font-bold text-black transition hover:opacity-90"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
