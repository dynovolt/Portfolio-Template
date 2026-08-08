import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky glassmorphic navbar */}
      <Navbar />

      <main className="flex flex-col w-full relative">
        {/* Landing Hero Screen */}
        <Hero />

        {/* Biography Profile Grid */}
        <About />

        {/* Skills & Progress Bar grid */}
        <Skills />

        {/* Selected Creations Showcase */}
        <Projects />

        {/* Experience & Edu timeline */}
        <Timeline />

        {/* Loop horizontal Client reviews */}
        <Testimonials />

        {/* Grid of articles */}
        <Blog />

        {/* Glowing Contact Form input fields */}
        <Contact />
      </main>

      {/* TYPOGRAPHY-HEAVY massive footer branding */}
      <Footer />
    </>
  );
}
