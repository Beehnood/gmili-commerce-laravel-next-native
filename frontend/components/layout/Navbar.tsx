import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/qui-sommes-nous", label: "Qui sommes nous" },
  { href: "/collection", label: "Collection" },
  { href: "/galerie", label: "Galerie" },
];

export function Navbar() {
  return (
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
          >
            <Image src="/icons/search.png" alt="" width={18} height={18} />
          </button>

          <button
            className="hidden h-9 w-9 items-center justify-center transition hover:scale-105 md:flex"
            aria-label="Profil"
          >
            <Image src="/icons/profile.png" alt="" width={22} height={22} />
          </button>

          <button
            className="relative h-9 w-9 transition hover:scale-105"
            aria-label="Panier"
          >
            <Image src="/icons/shopping-bag.png" alt="" width={24} height={24} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
              0
            </span>
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Menu"
          >
            <Image src="/icons/burger-menu.png" alt="" width={24} height={24} />
          </button>
        </div>
      </nav>
    </header>
  );
}
