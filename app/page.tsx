import Hero from "./components/landing/Hero";
import Logos from "./components/landing/Logos";
import Features from "./components/landing/Features";
import BigImage from "./components/landing/BigImage";
import SplitSection from "./components/landing/SplitSection";
import Comparison from "./components/landing/Comparison";
import Testimonial from "./components/landing/Testimonial";
import Steps from "./components/landing/Steps";
import Footer from "./components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <Hero />
      <Logos />
      <Features />
      <BigImage />
      <SplitSection
        imageSrc="/images/abstract.png"
        imageAlt="Abstract Shapes"
        title="See the Big Picture"
        subtitle="Vision"
        description="Our platform provides a comprehensive view of your entire operation. By unifying data streams, we create a crystal-clear picture of where you stand and where you're headed."
        imageFirst={false}
      />
      <Comparison />
      <Testimonial />
      <Steps />
      <BigImage src="/images/map.png" alt="Map Texture" />
      <Footer />
    </main>
  );
}
