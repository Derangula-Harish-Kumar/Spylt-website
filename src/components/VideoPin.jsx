import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPin = () => {
  // 1. Create refs for targeting elements safely
  const containerRef = useRef(null);
  const clipRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(clipRef.current, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",

          pin: true, // GSAP will automatically add the scrolling space for you
          scrub: 1,
          anticipatePin: 1, // Prevents a micro-stutter exactly when the element hits the top
        },
      });
    },
    { scope: containerRef }, // 2. Scoping ensures GSAP only looks inside this specific component
  );

  return (
    // 3. Removed the double wrapper and h-[200vh]. We just pin the 100vh container directly.
    <div
      ref={containerRef}
      className="relative w-screen h-dvh flex justify-center items-center overflow-hidden bg-black"
    >
      {/* The clipped video container */}
      <div
        ref={clipRef}
        style={{
          clipPath: "circle(10% at 50% 50%)",
        }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          src="/videos/pin-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Overlay Text */}
      {/* NOTE: I moved this OUTSIDE the clipRef. 
        If it stays inside the clipped div, the edges of your text/icons 
        might get cut off by the 10% circle on smaller screens. 
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <img
            src="/images/circle-text.svg"
            alt="Rotating Text"
            className="animate-spin [animation-duration:20s] w-full h-full"
          />
          <img
            src="/images/play.svg"
            alt="play icon"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPin;
