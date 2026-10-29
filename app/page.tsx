import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { ScrollEffects } from "@/components/ui/ScrollEffects";
import { SlashTransition } from "@/components/transitions/SlashTransition";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
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
        <SlashTransition />
        <Work />
        <SlashTransition flip />
        <About />
        <SlashTransition />
        <Skills />
        <SlashTransition flip />
        <Certificates />
        <SlashTransition />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
