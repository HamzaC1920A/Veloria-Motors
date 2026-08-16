import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Services } from "@/components/Services";
import { Highlights } from "@/components/Highlights";
import { Projects } from "@/components/Projects";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Gallery } from "@/components/Gallery";
import { Appointment } from "@/components/Appointment";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Highlights />
        <Projects />
        <BeforeAfter />
        <Gallery />
        <Appointment />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
