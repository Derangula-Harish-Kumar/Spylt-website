import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { useState } from "react";

import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import TextSection from "./components/TextSection";
import DrinkCollation from "./components/DrinkCollation";
import Ingredence from "./components/Ingredence";
import ClipText from "./components/ClipText";
import VideoPin from "./components/VideoPin";
import ReviewSection from "./components/ReviewSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  const container = useRef();

  useGSAP(
    () => {
      // 1. Initialize Lenis
      const lenis = new Lenis({
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // 2. Sync ScrollTrigger with Lenis
      lenis.on("scroll", ScrollTrigger.update);

      // 3. Add Lenis to the GSAP Ticker
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // 4. Disable lag smoothing for better sync
      gsap.ticker.lagSmoothing(0);

      return () => {
        // Clean up on unmount
        lenis.destroy();
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
      };
    },
    { scope: container },
  );

  // 1. Create a state to track the preloader's status
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <div ref={container}>
      <NavBar />
      <main>
        {!isPreloaderDone && (
          <Preloader onComplete={() => setIsPreloaderDone(true)} />
        )}
        <HeroSection isPreloaderDone={isPreloaderDone} />
        <TextSection />
        <DrinkCollation />
        <Ingredence />
        <ClipText />
        <VideoPin />
        <ReviewSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;
