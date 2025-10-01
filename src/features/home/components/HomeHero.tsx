import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../../../public/landing-hero.png";

export default function HomeHero() {
  const hero = siteConfig.home.hero;

  return (
    <>
      <section className="flex max-w-6xl flex-col justify-center p-16 mx-auto">
        <h1 className="text-6xl font-bold text-center">{hero.title}</h1>
        <p className="mt-4 max-w-2xl text-center mx-auto">{hero.description}</p>
        <div className="flex justify-center mx-auto items-center gap-4 mt-4">
          {hero.ctas.map((cta) => (
            <Button key={cta.label} variant={cta.variant} asChild>
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
          className="w-6xl rounded-md mt-16 mx-auto"
        />
      </section>
    </>
  );
}
