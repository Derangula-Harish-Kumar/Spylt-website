import { flavorlists } from "../constants";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

// Register plugins outside the component to prevent re-registration
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const DrinkCollation = () => {
  const container = useRef(null);
  const clipText = useRef(null);
  const scrollingSection = useRef(null);

  // 1. Title Animations
  useGSAP(
    () => {
      const splitTitle = new SplitText("#title", { type: "chars" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 50%",
          end: "bottom 70%",
        },
      });

      tl.from(container.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      tl.from(
        splitTitle.chars,
        {
          y: 100,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.02,
        },
        "-=0.8",
      );

      tl.from(clipText.current, {
        clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
        duration: 1.5,
        ease: "power2.out",
      });
    },
    { scope: container },
  );

  // 2. Horizontal Scroll Logic with GPU Acceleration
  useGSAP(
    () => {
      // Calculate exact distance to sync sideways movement with scroll wheel
      const getScrollDistance = () => {
        return scrollingSection.current.scrollWidth - window.innerWidth;
      };

      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.to(scrollingSection.current, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    // FIXED 1: Changed w-screen to w-full to prevent scrollbar layout shift bugs
    // FIXED 2: Changed h-auto to lg:h-screen so the pin knows exactly how tall to be
    <div
      ref={container}
      className="w-full h-auto lg:h-screen bg-[#FAEADE] overflow-hidden"
    >
      <div
        ref={scrollingSection}
        // FIXED 3: Added lg:w-max and lg:flex-nowrap to stop cards from squishing
        // and throwing off the scrollWidth math
        className="will-change-transform flex flex-col w-[90vw] py-[10vh] mx-auto     
        lg:flex-row lg:flex-nowrap lg:w-max lg:py-0"
      >
        {/* flaver title section */}
        <div
          // FIXED 4: Standardized to lg:h-screen to match the parent
          className="w-full md:w-full lg:w-[60vw] lg:flex lg:justify-center lg:items-center lg:h-screen lg:shrink-0"
        >
          <div
            className="uppercase text-center text-[8vw] scale-y-150 leading-[6vw] font-bold overflow-hidden 
              lg:text-[5vw] lg:leading-[4vw] lg:w-[60vw]"
          >
            <h1 id="title">We have 6</h1>
            <div
              ref={clipText}
              style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)" }}
              className="text-[#FAEADE] bg-[#A26833] w-max mx-auto border-[#FAEADE] border-8  pt-3 p-1 -rotate-5 overflow-hidden"
            >
              <h1>FREaking</h1>
            </div>
            <h1 id="title" className="overflow-hidden relative -z-10">
              delicious flavors
            </h1>
          </div>
        </div>

        {/* scroling section */}
        <div
          // FIXED 5: Standardized to lg:h-screen to match the parent
          className="w-full flex flex-col gap-[10vw] pt-[10vh] px-10 md:w-full 
            lg:flex-row lg:w-max lg:h-screen lg:items-center lg:pt-0"
        >
          {flavorlists.map((flavor) => (
            <div
              style={{
                backgroundImage: `url('/images/${flavor.color}-bg.svg')`,
              }}
              key={flavor.color}
              className={`relative w-full h-[60vw] rounded-2xl bg-center bg-no-repeat bg-cover mt-[10vw]
                  lg:w-[50vw] lg:h-[35vw] lg:shrink-0 lg:mt-0 rotation ${flavor.rotation} rotate-0`}
            >
              <img
                src={`/images/${flavor.color}-elements.webp`}
                alt=""
                className="absolute bottom-15 left-0 lg:h-[38vw]"
              />
              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt=""
                className="absolute h-[70vw] bottom-0 left-1/2 -translate-x-1/2 lg:h-[40vw]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinkCollation;
