import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import TextSection from "./components/TextSection";
import DrinkCollation from "./components/DrinkCollation";
import Infredence from "./components/Infredence";

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

  return (
    <div ref={container}>
      <NavBar />
      <main>
        <HeroSection />
        <TextSection />
        <DrinkCollation />
        <Infredence />
        {/* Spacer for scroll room */}
        <div className="w-screen h-dvh"></div>
      </main>
    </div>
  );
};

export default App;
