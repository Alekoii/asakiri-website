import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Download,
  Globe,
  Layers,
  MessageCircle,
  PenSquare,
  PlayCircle,
  Smartphone,
  Table,
  Github,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
};

type HeroCTA = {
  label: string;
  href: string;
  variant: "default" | "secondary" | "link";
  external?: boolean;
};

type FeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type DownloadPlatform = "mac" | "windows";

type DownloadBuild = {
  href: string;
  label?: string;
  fileSize?: string;
  checksumHref?: string;
  external?: boolean;
};

type DownloadCardConfig = {
  platform: DownloadPlatform;
  title: string;
  description: string;
  version?: string;
  releaseNotesHref?: string;
  build: DownloadBuild;
};

type DownloadConfig = {
  hero: {
    title: string;
    description: string;
    subtitle?: string;
  };
  cards: DownloadCardConfig[];
};

type FooterNavLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterNavSection = {
  title: string;
  links: FooterNavLink[];
};

type FooterSocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type FooterConfig = {
  description: string;
  nav: FooterNavSection[];
  social: FooterSocialLink[];
};

type SiteLinks = {
  github: string;
  discord: string;
  download: string;
  roadmap: string;
  demoVideo: string;
  supportEmail: string;
  patreon: string;
  releases: string;
};

type SeoConfig = {
  baseTitle: string;
  titleTemplate?: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle?: string;
};

export interface SiteConfig {
  name: string;
  header: {
    nav: NavItem[];
  };
  links: SiteLinks;
  home: {
    hero: {
      title: string;
      description: string;
      imageAlt: string;
      ctas: HeroCTA[];
    };
    features: {
      title: string;
      description: string;
      items: FeatureItem[];
      cta?: HeroCTA;
    };
  };
  download: DownloadConfig;
  footer: FooterConfig;
  seo: SeoConfig;
}

export const siteConfig = {
  name: "Asakiri",
  header: {
    nav: [
      { label: "Home", href: "/" },
      { label: "Download", href: "/download" },
      { label: "Courses", href: "/courses" },
    ],
  },
  links: {
    github: "https://github.com/Alekoii/asakiri-website",
    discord: "https://discord.gg/6VhDw5RXJ2",
    download: "/download",
    roadmap: "/roadmap",
    demoVideo: "https://youtu.be/LJoEt5Qoz2M",
    supportEmail: "alok@asakiri.com",
    patreon: "https://www.patreon.com/c/asakiri",
    releases: "https://github.com/Alekoii/asakiri-website",
  },
  home: {
    hero: {
      title: "Teach, publish and learn languages",
      description:
        "Asakiri brings writing, publishing and learner delivery together. A focused desktop authoring app, a hosted web platform for sharing your work and a mobile experience that keeps students practising anywhere.",
      imageAlt: "Asakiri Creator Screenshot",
      ctas: [
        {
          label: "Join Discord",
          href: "https://discord.gg/6VhDw5RXJ2",
          variant: "default",
          external: true,
        },
        {
          label: "Download Alpha",
          href: "/download",
          variant: "secondary",
        },
        {
          label: "See Demo",
          href: "https://youtu.be/LJoEt5Qoz2M",
          variant: "link",
          external: true,
        },
      ],
    },
    features: {
      title: "Build once, teach everywhere",
      description:
        "Everything you need to create, publish, and deliver cohesive language learning experiences.",
      items: [
        {
          title: "Author without compromise",
          description:
            "Write long-form lessons, link vocabulary, and stay offline-first in the desktop editor built for language creators.",
          icon: PenSquare,
        },
        {
          title: "Structured courses",
          description:
            "Organize sections, units, and assessments with a manifest that travels cleanly from desktop to every platform.",
          icon: Layers,
        },
        {
          title: "Publish to the web",
          description:
            "Host your courses on Asakiri’s Supabase-backed web app so learners can access polished lessons instantly.",
          icon: Globe,
        },
        {
          title: "Mobile-ready delivery",
          description:
            "Sync content to the Asakiri mobile app and keep learners practising on the go with fresh lesson updates.",
          icon: Smartphone,
        },
        {
          title: "Linked references",
          description:
            "Keep vocab tables and inline examples connected so learners always see the right context.",
          icon: Table,
        },
        {
          title: "Portable data format",
          description:
            "Human-readable JSON keeps your course versionable, futureproof, and ready for new learner touchpoints.",
          icon: Braces,
        },
      ],
      cta: {
        label: "View courses",
        href: "/courses",
        variant: "secondary",
        external: false,
      },
    },
  },
  download: {
    hero: {
      title: "Download Asakiri Course Creator",
      description:
        "Grab the latest alpha builds for desktop and keep your course content in sync across every device.",
      subtitle:
        "Native installers for macOS and Windows, all powered by the same portable project format.",
    },
    cards: [
      {
        platform: "mac",
        title: "macOS (Universal)",
        description:
          "Universal binary optimised for Apple silicon and Intel Macs",
        version: "0.2.2",
        releaseNotesHref: "https://www.patreon.com/c/asakiri",
        build: {
          href: "https://github.com/Alekoii/asakiri-website/releases/download/v0.2.2/Asakiri.app.zip",
          label: "Download for macOS",
          fileSize: "APP • 12.2 MB",
          checksumHref: "",
          external: true,
        },
      },
      {
        platform: "windows",
        title: "Windows (64-bit)",
        description:
          "Built for Windows 11 and 10 with bundled prerequisites. Ships with offline project support.",
        version: "0.2.2",
        releaseNotesHref: "https://www.patreon.com/c/asakiri",
        build: {
          href: "https://github.com/Alekoii/asakiri-website/releases/download/v0.2.2/Asakiri.exe",
          label: "Download for Windows",
          fileSize: "EXE • 19.2 MB",
          checksumHref: "",
          external: true,
        },
      },
    ],
  },
  footer: {
    description:
      "Asakiri unifies authoring, publishing and learner delivery so language teams can ship cohesive courses across every platform.",
    nav: [
      {
        title: "Explore",
        links: [
          { label: "Download Course Creator", href: "/download" },
          { label: "Roadmap", href: "/roadmap" },
          { label: "Courses", href: "/courses" },
          {
            label: "Watch demo",
            href: "https://youtu.be/LJoEt5Qoz2M",
            external: true,
          },
        ],
      },
      {
        title: "Community",
        links: [
          {
            label: "Discord",
            href: "https://discord.gg/6VhDw5RXJ2",
            external: true,
          },
          { label: "GitHub", href: "https://github.com/Alekoii/asakiri-website", external: true },
          {
            label: "Support on Patreon",
            href: "https://www.patreon.com/c/asakiri",
            external: true,
          },
        ],
      },
      {
        title: "Resources",
        links: [
          {
            label: "Release notes",
            href: "https://www.patreon.com/c/asakiri",
            external: true,
          },
          {
            label: "Support",
            href: "mailto:alok@asakiri.com",
            external: true,
          },
        ],
      },
    ],
    social: [
      { label: "GitHub", href: "https://github.com/Alekoii/asakiri-website", icon: Github },
      {
        label: "Discord",
        href: "https://discord.gg/6VhDw5RXJ2",
        icon: MessageCircle,
      },
      {
        label: "Watch demo",
        href: "https://youtu.be/LJoEt5Qoz2M",
        icon: PlayCircle,
      },
      { label: "Download", href: "/download", icon: Download },
    ],
  },
  seo: {
    baseTitle: "Asakiri",
    titleTemplate: "%s · Asakiri",
    description:
      "Asakiri helps language teams author, publish, and deliver cohesive learning experiences across desktop, web, and mobile.",
    siteUrl: "https://asakiri.com",
    ogImage: "https://asakiri.com/og-image.png",
    twitterHandle: "@asakirilang",
  },
} satisfies SiteConfig;

export type {
  NavItem,
  HeroCTA,
  FeatureItem,
  DownloadPlatform,
  DownloadBuild,
  DownloadCardConfig,
  FooterNavLink,
  FooterNavSection,
  FooterSocialLink,
};
