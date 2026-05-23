"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/qui-sommes-nous", label: "Qui sommes nous" },
  { href: "/collection", label: "Collection" },
  { href: "/galerie", label: "Galerie" },
];

export function Navbar() {
  const isAuthenticated = false;
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="flex h-14 w-14 shrink-0 items-center justify-center bg-black/90 text-center shadow-lg ring-1 ring-primary/25"
            aria-label="Gmili accueil"
          >
            <span className="font-serif text-2xl leading-none text-primary">
              Gm
              <span className="block font-sans text-[10px] font-bold leading-none text-primary">
                Gmili
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden h-9 w-9 items-center justify-center transition hover:scale-105 md:flex"
              aria-label="Rechercher"
              type="button"
            >
              <Image src="/icons/search.png" alt="" width={18} height={18} />
            </button>

            {!isAuthenticated ? (
              <div className="hidden items-center gap-4 md:flex">
                <Link
                  href="/login"
                  className="rounded-full bg-white px-4 py-2 text-sm text-black transition duration-300 hover:scale-105 hover:bg-black hover:text-white"
                >
                  Se connecter
                </Link>

                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-black transition duration-300 hover:scale-105 hover:bg-amber-500"
                >
                  S&apos;inscrire
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="hidden h-9 w-9 items-center justify-center transition hover:scale-105 md:flex"
                  aria-label="Profil"
                >
                  <Image
                    src="/icons/profile.png"
                    alt=""
                    width={22}
                    height={22}
                  />
                </Link>

                <Link
                  href="/cart"
                  className="relative h-9 w-9 transition hover:scale-105"
                  aria-label="Panier"
                >
                  <Image
                    src="/icons/shopping-bag.png"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                    0
                  </span>
                </Link>
              </>
            )}

            <button
              className="flex h-9 w-9 items-center justify-center md:hidden"
              aria-label="Menu"
              type="button"
            >
              <Image src="/icons/burger-menu.png" alt="" width={24} height={24} />
            </button>
          </div>
        </nav>
      </header>

      {isRegisterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md rounded-3xl border border-primary/20 bg-[#211F1A] p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsRegisterOpen(false)}
              className="absolute right-5 top-5 text-2xl text-primary transition hover:text-white"
              aria-label="Fermer"
            >
              ×
            </button>

            <div className="mb-8 text-center">
              <h1 className="text-4xl text-primary">Créer un compte</h1>
              <p className="mt-3 text-sm text-foreground/70">
                Inscrivez-vous pour accéder à votre profil, panier et commandes.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-primary">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-primary">Email</label>
                <input
                  type="email"
                  placeholder="exemple@mail.com"
                  className="w-full rounded-full border border-primary/20 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-foreground/40 focus:border-primary"
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
      )}
    </>
  );
}