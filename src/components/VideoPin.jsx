import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Better import practice

gsap.registerPlugin(ScrollTrigger);

const VideoPin = () => {
  useGSAP(() => {
    // We animate the clipPath, but we PIN the parent container
    gsap.to("#pin-clip", {
      clipPath: "circle(70.7% at 50% 50%)",
      ease: "none", // Use "none" with scrub for the smoothest feeling
      scrollTrigger: {
        trigger: ".pin-wrapper", // Use the outer wrapper as the trigger
        start: "top top", // Start when wrapper hits top
        end: "+=1000", // Stay pinned for 1000px of scrolling
        pin: true, // Pin the whole section
        scrub: 1, // Smoothly follows scroll
        // markers: true,
      },
    });
  });

  return (
    // 1. Created a wrapper with height so there is room to scroll
    <div className="pin-wrapper w-screen h-[200vh] bg-black">
      {/* 2. This container will be pinned at the top */}
      <div className="relative w-screen h-dvh flex justify-center items-center overflow-hidden">
        <div
          id="pin-clip"
          style={{
            clipPath: "circle(10% at 50% 50%)",
          }}
          className="relative w-full h-full"
        >
          <video
            src="/videos/pin-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          ></video>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default VideoPin;
