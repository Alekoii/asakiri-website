import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Seo from "@/components/layout/seo";
import { roadmapConfig } from "@/config/roadmap";
import { siteConfig } from "@/config/site";
import RoadmapCard from "@/features/roadmap/components/RoadmapCard";

export default function RoadmapPage() {
  const { hero, columns } = roadmapConfig;
  const canonical = `${siteConfig.seo.siteUrl}/roadmap`;

  return (
    <>
      <Seo
        title="Roadmap"
        description="Track the features the Asakiri team is building across creator tools, learner apps, and platform infrastructure."
        canonical={canonical}
      />
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        <section className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {hero.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {hero.title}
          </h1>
          <p className="text-base text-muted-foreground">{hero.description}</p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.status} className="flex flex-col gap-5">
              <header className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  {column.title}
                </h2>
                {column.description ? (
                  <p className="text-sm text-muted-foreground">
                    {column.description}
                  </p>
                ) : null}
              </header>

              <div className="space-y-4">
                {column.items.map((item) => (
                  <RoadmapCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    status={column.status}
                    className="h-full"
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
