import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Footer() {
  const { footer, links, name } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,_2fr)_repeat(3,_minmax(0,_1fr))]">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-semibold text-foreground">
              {name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {footer.description}
            </p>
            <Button asChild size="sm">
              <Link href={links.download}>Download Creator</Link>
            </Button>
          </div>

          {footer.nav.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {section.links.map((link) => {
                  const linkClass = "transition hover:text-foreground";

                  if (link.external) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className={linkClass}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-border/60 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {year} {name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {footer.social.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <social.icon className="size-4" aria-hidden="true" />
                <span>{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
