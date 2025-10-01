"use client";

import Head from "next/head";
import { siteConfig } from "@/config/site";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noIndex?: boolean;
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  noIndex = false,
}: SeoProps) {
  const { seo } = siteConfig;

  const baseTitle = seo.baseTitle;
  const computedTitle = title
    ? seo.titleTemplate
      ? seo.titleTemplate.replace("%s", title)
      : `${title} · ${baseTitle}`
    : baseTitle;
  const metaDescription = description ?? seo.description;
  const metaImage = image ?? seo.ogImage;
  const canonicalUrl = canonical ?? seo.siteUrl;
  const twitterHandle = seo.twitterHandle ?? baseTitle;

  return (
    <Head>
      <title>{computedTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
    </Head>
  );
}
