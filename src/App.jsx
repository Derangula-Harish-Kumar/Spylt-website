import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import TextSection from "./components/TextSection";
import DrinkCollation from "./components/DrinkCollation";

// Register the plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const App = () => {
  const container = useRef();

  useGSAP(
    () => {
      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5, // Seconds it takes to "catch up"
        effects: true, // Allows data-speed and data-lag on elements
        smoothTouch: 0.1, // Adds light smoothing on mobile touch
      });
    },
    { scope: container },
  );

  return (
    <div ref={container}>
      {/* NavBar stays fixed outside the smooth content */}
      <NavBar />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection />
            <TextSection />
            <DrinkCollation />
            <div className="w-screen h-dvh bg-amber-300"></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

// import HeroSection from "./components/HeroSection";
// import NavBar from "./components/NavBar";
// import TextSection from "./components/TextSection";

// const App = () => {
//   return (
//     <main>
//       <NavBar />
//       <HeroSection />
//       <TextSection />
//     </main>
//   );
// };

// export default App;
