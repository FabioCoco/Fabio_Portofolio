import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Portrait } from "@/components/sections/Portrait";
import { About } from "@/components/sections/About";
import { skills } from "@/content/skills";
import { Focus } from "@/components/sections/Focus";
import { Skills } from "@/components/sections/Skills";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollEffects />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Work />
        <Portrait />
        <About />
        <Focus />
        {skills.length > 0 ? <Skills /> : null}
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
