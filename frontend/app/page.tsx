import Image from "next/image";
import { Container } from "@/components/layout/Container";

const products = [
  { name: "Créoles éclat", image: "/images/product-earrings.jpg" },
  { name: "Bague fine", image: "/images/product-ring.jpg" },
  { name: "Créoles diamant", image: "/images/product-hoops.jpg" },
  { name: "Bracelet argent", image: "/images/product-bracelet.webp" },
  { name: "Collier Angela", image: "/images/product-necklace.jpg" },
  { name: "Jonc Saturne", image: "/images/product-bangle.jpg" },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[64vh] overflow-hidden sm:min-h-[72vh] lg:min-h-[680px]">
        <Image
          src="/images/hero-jewelry.png"
          alt="Bijoux Gmili en or et argent"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/35" />
      </section>

      <section className="bg-background py-10 sm:py-14 lg:py-16">
        <Container className="space-y-10 lg:space-y-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
            <article className="relative min-h-[220px] overflow-hidden rounded-md sm:min-h-[280px]">
              <Image
                src="/images/story-hands.webp"
                alt="Bracelet doré porté à la main"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute bottom-8 left-7 max-w-sm">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Bien plus qu&apos;un accessoire
                </h1>
                <a
                  href="#nouveautes"
                  className="mt-4 inline-flex rounded-sm bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-primary"
                >
                  Savoir plus
                </a>
              </div>
            </article>

            <h2 className="mx-auto max-w-md text-center font-sans text-2xl font-black leading-tight text-white sm:text-3xl">
              Comment les bijoux transforment notre mentalité et révèlent notre
              style
            </h2>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <h2 className="mx-auto max-w-xs text-center font-sans text-2xl font-black leading-tight text-white">
              Guide pour choisir la couleur de vos accessoires
            </h2>

            <article className="relative min-h-[230px] overflow-hidden rounded-md sm:min-h-[300px]">
              <Image
                src="/images/style-models.jpeg"
                alt="Trois femmes portant des bijoux dorés"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-8 left-7 max-w-md">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Quel bijou pour quelle peau ?
                </h2>
                <a
                  href="#contact"
                  className="mt-4 inline-flex rounded-sm bg-white px-5 py-2 text-xs font-bold text-black transition hover:bg-primary"
                >
                  Savoir plus
                </a>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section id="nouveautes" className="bg-background pb-14">
        <Container>
          <h2 className="mb-8 text-center text-3xl text-primary">
            Les Nouveautés
          </h2>

          <div className="grid grid-cols-2 gap-7 md:grid-cols-3 lg:gap-10">
            {products.map((product) => (
              <article key={product.name} className="group">
                <div className="relative aspect-square overflow-hidden rounded-md bg-black">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 28vw, 45vw"
                  />
                </div>
                <div className="mt-2 text-xs leading-tight text-white">
                  <p>Prix : 00€</p>
                  <p>Nom d&apos;Article</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="contact"
        className="relative bg-cover bg-center px-5 py-16 sm:px-8"
        style={{ backgroundImage: "url('/images/contact-texture.webp')" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <form className="relative mx-auto max-w-4xl rounded-md bg-black px-8 py-8 text-primary shadow-2xl sm:px-16">
          <h2 className="mb-8 text-center text-2xl">Contactez nous</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="text-sm">
              Prénom
              <input className="mt-2 h-10 w-full rounded-md bg-zinc-200 px-3 text-black outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <label className="text-sm">
              Nom
              <input className="mt-2 h-10 w-full rounded-md bg-zinc-200 px-3 text-black outline-none focus:ring-2 focus:ring-primary" />
            </label>
            <label className="text-sm">
              Mail
              <input
                type="email"
                className="mt-2 h-10 w-full rounded-md bg-zinc-200 px-3 text-black outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <label className="text-sm">
              Téléphone ( optionnel )
              <input className="mt-2 h-10 w-full rounded-md bg-zinc-200 px-3 text-black outline-none focus:ring-2 focus:ring-primary" />
            </label>
          </div>

          <label className="mt-6 block text-sm">
            Message
            <textarea className="mt-2 min-h-36 w-full resize-none rounded-md bg-zinc-200 px-3 py-3 text-black outline-none focus:ring-2 focus:ring-primary" />
          </label>
        </form>
      </section>
    </>
  );
}
