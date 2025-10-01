import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Seo from "@/components/layout/seo";
import HomeFeatures from "@/features/home/components/HomeFeatures";
import HomeHero from "@/features/home/components/HomeHero";

export default function HomePage() {
  return (
    <>
      <Seo />
      <Header />
      <HomeHero />
      <HomeFeatures />
      <Footer />
    </>
  );
}
