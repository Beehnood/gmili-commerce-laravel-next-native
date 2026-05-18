
export function Footer() {
  return (
    <footer className="bg-background px-5 pb-10 pt-8 text-primary sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-16">
        <div className="flex h-20 w-20 items-center justify-center bg-black text-center ring-1 ring-primary/25">
          <span className="font-serif text-4xl leading-none">
            Gm
            <span className="block font-sans text-xs font-bold leading-none">
              Gmili
            </span>
            <span className="mt-1 block font-sans text-[7px] uppercase tracking-wide">
              Online Jewelry
            </span>
          </span>
        </div>

        <p className="text-center text-xs text-white/80">copyright | 2026</p>
      </div>
    </footer>
  );
}
