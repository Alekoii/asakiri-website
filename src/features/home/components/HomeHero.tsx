import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "../../../../public/landing-hero.png";

export default function HomeHero() {
  return (
    <>
      <section className="flex max-w-6xl flex-col justify-center p-16 mx-auto">
        <h1 className="text-6xl font-bold text-center">
          Teach, publish and learn languages
        </h1>
        <p className="mt-4 max-w-2xl text-center mx-auto">
          Asakiri brings writing, publishing and learner delivery together. A
          focused desktop authoring app, a hosted web platform for sharing your
          work and a mobile experience that keeps students practising anywhere.
        </p>
        <div className="flex justify-center mx-auto items-center gap-4 mt-4">
          <Button>
            <a href="https://discord.gg/6VhDw5RXJ2" target="_blank">
              Join Discord
            </a>
          </Button>
          <Button variant="secondary">
            <a href="/download">Download Alpha</a>
          </Button>
          <Button variant="link">
            <a href="https://youtu.be/LJoEt5Qoz2M" target="_blank">
              See Demo
            </a>
          </Button>
        </div>
        <Image
          src={heroImage}
          alt="Asakiri Creator Screenshot"
          className="w-6xl rounded-md mt-16 mx-auto"
        />
      </section>
    </>
  );
}
