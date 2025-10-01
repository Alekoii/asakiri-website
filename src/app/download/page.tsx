import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import DownloadCard from "@/features/download/components/DownloadCard";
import { siteConfig } from "@/config/site";

export default function DownloadPage() {
  const { hero, cards } = siteConfig.download;

  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16">
        <section className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Download
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {hero.title}
          </h1>
          <p className="text-base text-muted-foreground">{hero.description}</p>
          {hero.subtitle ? (
            <p className="text-sm text-muted-foreground/90">{hero.subtitle}</p>
          ) : null}
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          {cards.map((card) => (
            <DownloadCard
              key={card.platform}
              platform={card.platform}
              title={card.title}
              description={card.description}
              version={card.version}
              releaseNotesHref={card.releaseNotesHref}
              build={card.build}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
