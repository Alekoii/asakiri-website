import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../../public/landing-hero.png";

export default function HomeHero() {
  const hero = siteConfig.home.hero;

  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-10">
        <h1 className="text-4xl font-bold text-center sm:text-5xl lg:text-6xl">
          {hero.title}
        </h1>
        <p className="mt-4 max-w-2xl text-center text-muted-foreground mx-auto">
          {hero.description}
        </p>
        <div className="mt-6 flex w-full flex-col items-stretch gap-3 sm:mx-auto sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          {hero.ctas.map((cta) => (
            <Button
              key={cta.label}
              variant={cta.variant}
              asChild
              className="w-full sm:w-auto"
            >
              {cta.external ? (
                <a href={cta.href} target="_blank" rel="noreferrer">
                  {cta.label}
                </a>
              ) : (
                <Link href={cta.href}>{cta.label}</Link>
              )}
            </Button>
          ))}
        </div>
        <Image
          src={heroImage}
          alt={hero.imageAlt}
          className="mx-auto mt-16 w-full max-w-5xl rounded-xl"
        />
      </section>
    </>
  );
}
