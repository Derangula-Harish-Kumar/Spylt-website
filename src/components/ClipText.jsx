import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Correct import

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const ClipText = () => {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // The animation code MUST be inside the matchMedia add function
    mm.add(
      {
        isMobile: "(max-width: 799px)",
        isDesktop: "(min-width: 800px)",
      },
      (context) => {
        let { isMobile } = context.conditions;

        // Target the CLASS ".clip-text" instead of an ID
        gsap.to(".clip-text", {
          clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 1.5,
          stagger: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".middle-container", // Trigger based on the wrapper
            start: isMobile ? "top 80%" : "top 50%",
            end: isMobile ? "bottom 50%" : "center 50%",
            // markers: true,
            scrub: true,
          },
        });
      },
    );

    // Cleanup is handled automatically by useGSAP + matchMedia!
  });

  return (
    <div className="relative flex items-center justify-center bg-black text-white h-dvh w-screen overflow-hidden">
      {/* upper text div */}
      <div className="w-screen text-center font-light text-[#FAEADE] text-[1rem] absolute top-30 left-1/2 -translate-x-1/2 ">
        <p>Unlock the Advantages:</p>
        <p>Explore the Key Benefits of Choosing SPYLT</p>
      </div>

      {/* middle container - added a class for the trigger */}
      <div className="middle-container">
        {/* Changed IDs to className="clip-text" */}

        {/* first clipText div */}
        <div
          className="clip-text text-[#FAEADE] bg-[#C88E64] border-[#000000] border-8 w-max h-max mx-auto px-2 pt-[.5em] rotate-4  lg:px-10 relative z-40"
          style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        >
          <h1
            className="text-[5vw] scale-y-[2] uppercase font-bold font-sans w-max mx-auto py-[.4em] px-16
              lg:text-[3.5vw] lg:py-[.4em] lg:px-16"
          >
            Shelf stable
          </h1>
        </div>

        {/* second clipText div */}
        <div
          className="clip-text text-black bg-[#FAEADE] border-[#000000] border-8 w-max h-max mx-auto px-2 pt-[.5em] -rotate-4 lg:-rotate-2 lg:px-10 relative z-30"
          style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        >
          <h1
            className="text-[5vw] scale-y-[2] uppercase font-bold font-sans w-max mx-auto py-[.4em] px-16 
            lg:text-[3.5vw] lg:py-[.4em] lg:px-16 "
          >
            Protein + Caffeine
          </h1>
        </div>

        {/* third clipText div */}
        <div
          className="clip-text text-[#FAEADE] bg-[#7F3B2D] border-[#000000] border-8 w-max h-max mx-auto px-2 pt-[.5em] rotate-2  lg:px-10 relative z-20"
          style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        >
          <h1
            className="text-[5vw] scale-y-[2] uppercase font-bold font-sans w-max mx-auto py-[.4em] px-16 
            lg:text-[3.5vw] lg:py-[.4em] lg:px-16"
          >
            Infinitely recyclable
          </h1>
        </div>

        {/* forth clipText div */}
        <div
          className="clip-text text-[#000000] bg-[#FED775] border-[#000000] border-8 w-max h-max mx-auto px-2 pt-[.5em] -rotate-4  lg:px-10 relative z-10"
          style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        >
          <h1
            className="text-[5vw] scale-y-[2] uppercase font-bold font-sans w-max mx-auto py-[.4em] px-16 
            lg:text-[3.5vw] lg:py-[.4em] lg:px-16"
          >
            Lactose free
          </h1>
        </div>
      </div>

      {/* bottom text div */}
      <div className="w-screen text-center font-light text-[#FAEADE] text-[1rem] absolute bottom-30 left-1/2 -translate-x-1/2 ">
        <p>And much more..</p>
      </div>
    </div>
  );
};

export default ClipText;
