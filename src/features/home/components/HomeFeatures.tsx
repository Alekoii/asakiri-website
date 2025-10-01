import { Button } from "@/components/ui/button";
import FeatureCard from "@/features/home/components/FeatureCard";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function HomeFeatures() {
  const { title, description, items, cta } = siteConfig.home.features;

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-muted/40 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
        {cta ? (
          <div className="flex justify-center">
            <Button variant={cta.variant} asChild>
              {cta.external ? (
                <a href={cta.href} target="_blank" rel="noreferrer">
                  {cta.label}
                </a>
              ) : (
                <Link href={cta.href}>{cta.label}</Link>
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
