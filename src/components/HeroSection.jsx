import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

// Register plugins outside the component to prevent re-registration
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const HeroSection = () => {
  const title = useRef(null);
  const content = useRef(null);
  const clipText = useRef(null);
  const heroParent = useRef(null);

  // 1. State to track if the intro video has finished playing
  const [isVideoDone, setIsVideoDone] = useState(false);
  const introTimeline = useRef(null);

  // 2. Setup GSAP animations ONCE on mount
  useGSAP(
    () => {
      // Set up the ScrollTrigger (this can be active immediately)
      gsap.to(heroParent.current, {
        scrollTrigger: {
          trigger: heroParent.current,
          start: "2% top",
          end: "bottom top",
          scrub: true,
        },
        rotate: 8,
        ease: "power1.out",
        scale: 0.9,
        yPercent: 20,
      });

      // Set up the intro text animations, but keep them PAUSED initially
      const splitTitle = new SplitText(title.current, { type: "chars" });
      introTimeline.current = gsap.timeline({ paused: true });

      introTimeline.current
        .from(content.current, {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          clipText.current,
          {
            clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .from(
          splitTitle.chars,
          {
            y: 100,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.02,
          },
          "-=0.8",
        );
    },

    {
      scope: heroParent.current,
    },
  );

  // 3. Play the intro timeline only when the video finishes
  useGSAP(
    () => {
      if (isVideoDone && introTimeline.current) {
        introTimeline.current.play();
      }
    },
    { dependencies: [isVideoDone] },
  );

  return (
    // Added 'relative' and defined full width/height for the parent container
    <div className="relative overflow-hidden bg-black w-full h-dvh">
      {/* SPLASH VIDEO 
        Using absolute positioning to overlay it. 
        When isVideoDone becomes true, Tailwind smoothly fades it out to opacity-0.
      */}
      <video
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        playsInline
        onEnded={() => setIsVideoDone(true)} // Triggers when the video ends naturally
        className={`absolute inset-0 w-full h-full object-cover z-50 transition-opacity duration-1000 ease-in-out ${
          isVideoDone ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* HERO CONTENT */}
      <div
        ref={heroParent}
        className="relative w-full h-dvh border-2 bg-[url('/images/static-img.png')] bg-cover bg-center"
      >
        <div
          ref={content}
          className="relative z-30 text-center mt-30  w-full h-auto px-5 
          md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 "
        >
          <div className="text-center ">
            <h1
              ref={title}
              className="overflow-hidden text-[8vw] font-sans font-extrabold text-dark-brown tracking-[-1px] scale-y-[2]  uppercase   w-max  mx-auto  
            md:text-[5vw]"
            >
              FREAKING DELICIOUS
            </h1>
            <div
              ref={clipText}
              className=" text-[#FAEADE] bg-[#A26833] border-[#FAEADE] border-4 w-max h-max mx-auto px-2 py-[.5em] -rotate-4 lg:-rotate-2 lg:px-10 "
              style={{
                clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              }}
            >
              <h1
                className="text-[8vw]  scale-y-[2] uppercase font-bold font-sans w-max mx-auto py-[.4em]
                  md:text-[5vw]"
              >
                Protein + Caffine
              </h1>
            </div>
          </div>
          <div
            className="my-5 px-5 pb-5 text-center  mt-8
                md:mx-40 lg:text-xl lg:w-[38vw] lg:mx-auto"
          >
            <p className="text-[1rem]">
              Live life to the fullest with SPYLT: Shatter boredom and embrace
              your inner kid with every deliciously smooth chug.
            </p>
          </div>
          <div>
            <button className="bg-[#E3A458]  relative z-40 px-8 py-1 rounded-4xl uppercase font-sans font-bold scale-y-150 lg:text-2xl">
              Chug a SPYLT
            </button>
          </div>
        </div>

        {/* image section */}
        <img
          src="/images/hero-img.png"
          alt="hero-image"
          className=" absolute bottom-0 z-20 left-1/2 -translate-x-1/2 object-contain origin-bottom h-[80vw] 
           md:z-20 md:h-[35vh] lg:hidden "
        />
      </div>
    </div>
  );
};

export default HeroSection;
