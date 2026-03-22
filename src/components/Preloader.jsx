import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

// Register the plugin
gsap.registerPlugin(useGSAP, SplitText);

const Preloader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const percentRef = useRef(null);
  const [isReadyToExit, setIsReadyToExit] = useState(false);

  useEffect(() => {
    // 1. Lock the scrollbar
    document.body.style.overflow = "hidden";

    // 2. We create two promises:
    // - One that waits for the actual window to load all assets
    // - One that forces a minimum 2-second wait so the animation finishes nicely
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));

    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", resolve);
      }
    });

    // 3. When BOTH promises are done, we trigger the exit animation
    Promise.all([minTimePromise, windowLoadPromise]).then(() => {
      setIsReadyToExit(true);
    });

    return () => window.removeEventListener("load", () => {});
  }, []);

  useGSAP(
    () => {
      // Split the text into individual characters
      const split = new SplitText(textRef.current, { type: "chars" });
      const tl = gsap.timeline();

      // --- PHASE 1: THE ENTRANCE & LOADING ---

      // Animate the letters up one by one
      tl.from(split.chars, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Run the percentage counter from 0 to 100
      gsap.to(
        { val: 0 },
        {
          val: 100,
          duration: 1.5,
          roundProps: "val", // Keeps it as whole numbers
          ease: "power1.inOut",
          onUpdate: function () {
            if (percentRef.current) {
              percentRef.current.innerText = this.targets()[0].val + "%";
            }
          },
        },
      );

      // --- PHASE 2: THE EXIT ---

      // When the state flips to true, animate everything away
      if (isReadyToExit) {
        const exitTl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = "auto";
            if (onComplete) onComplete();
          },
        });

        exitTl
          // Fade out the percentage counter
          .to(percentRef.current, {
            opacity: 0,
            duration: 0.3,
          })
          // Make the letters float up and fade out one by one
          .to(
            split.chars,
            {
              y: -50,
              opacity: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.in",
            },
            "<",
          ) // "<" means start at the exact same time as the previous animation
          // Slide the massive black background up smoothly
          .to(
            loaderRef.current,
            {
              yPercent: -100,
              duration: 1.2,
              ease: "expo.inOut", // Expo is the smoothest, most premium ease for large movements
            },
            "-=0.2",
          );
      }
    },
    { dependencies: [isReadyToExit] },
  );

  return (
    <div
      ref={loaderRef}
      // Fixed the z-index syntax to Tailwind's arbitrary value bracket [9999]
      className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Brand Text Wrapper - overflow-hidden keeps the letters invisible before they slide up */}
      <div className="overflow-hidden pb-4">
        <h1
          ref={textRef}
          className="text-[#FAEADE] text-6xl md:text-[10vw] font-antonio font-bold tracking-[0.2em] uppercase"
        >
          Spylt
        </h1>
      </div>

      {/* Percentage Counter */}
      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
        <span
          ref={percentRef}
          className="text-[#FAEADE] font-sans text-xl md:text-2xl font-light tracking-widest"
        >
          0%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
