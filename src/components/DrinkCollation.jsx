import { flavorlists } from "../constants";
import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

const DrinkCollation = () => {
  // const title = useRef(null);
  const container = useRef(null);
  const clipText = useRef(null);
  const scrollingSection = useRef(null);

  // const heroParent = useRef(null);

  useGSAP(
    () => {
      {
        /* flaver title section */
      }
      const splitTitle = new SplitText("#title", { type: "chars" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 50%",
          markers: true,
          end: "bottom 70%", // Narrowing the window makes the animation feel tighter
          // '1' adds a slight smooth delay (1 second) to the scrub
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

      // gsap.to(heroParent.current, {
      //   scrollTrigger: {
      //     trigger: heroParent.current,
      //     start: "2% top",
      //     end: "bottom top",
      //     // markers: true,
      //     scrub: true,
      //   },
      //   rotate: 8,
      //   ease: "power1.out",
      //   scale: 0.9,
      //   yPercent: 20,
      // });
    },
    {
      // scope: heroParent.current,
    },
  );

  useGSAP(
    () => {
      // Calculate how far the section needs to move
      // Total width of content - width of the visible screen
      const getScrollAmount = () => {
        let sectionWidth = scrollingSection.current.scrollWidth;
        let viewportWidth = window.innerWidth;
        return -(sectionWidth - viewportWidth);
      };

      // responsive design properties
      let mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        gsap.to(scrollingSection.current, {
          x: getScrollAmount, // GSAP calls this function to get the exact value
          ease: "none",
          scrollTrigger: {
            trigger: container.current, // The section that stays pinned
            start: "top top",
            end: () => `+=${scrollingSection.current.scrollWidth}`,
            pin: true, // Pins the container so it doesn't move up
            scrub: 1, // Smoothly ties the movement to the scrollbar
            invalidateOnRefresh: true, // Re-calculates if the window is resized
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="w-screen h-auto bg-[#FAEADE] ">
      <div
        ref={scrollingSection}
        className="flex flex-col w-[90vw] py-[10vh] mx-auto border 
        lg:flex-row lg:w-auto "
      >
        {/* flaver title section */}
        <div
          className="border w-full 
            md:w-full
            lg:w-[60vw] lg:flex lg:justify-center lg:items-center lg:h-dvh"
        >
          <div
            className="uppercase text-center text-[8vw] scale-y-150 leading-[6vw] font-bold overflow-hidden border
              lg:text-[5vw] lg:leading-[4vw] lg:w-[60vw]"
          >
            <h1 id="title">We have 6</h1>
            <div
              ref={clipText}
              style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)" }}
              className="text-[#FAEADE] bg-[#A26833] w-max mx-auto border-[#FAEADE]  pt-3 p-1 -rotate-5 overflow-hidden"
            >
              <h1>FREaking</h1>
            </div>
            <h1 id="title" className="overflow-hidden">
              delicious flavors
            </h1>
          </div>
        </div>

        {/* scroling section */}
        <div
          className="border w-full flex flex-col gap-20 pt-[10vh]
            md:w-full 
            lg:flex-row lg:w-max  lg:h-screen lg:items-center lg:pt-0"
        >
          {flavorlists.map((flavor) => (
            <div
              style={{
                backgroundImage: `url('/images/${flavor.color}-bg.svg')`,
              }}
              key={flavor.color}
              className="relative w-full h-[60vw] rounded-2xl border bg-center bg-no-repeat bg-cover mt-[10vw]
                  lg:w-[50vw] lg:h-[35vw] lg:shrink-0 lg:mt-0" //bg-[url('/images/${flavor.color}-bg.svg')]
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

              {/* 
              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt=""
                className="absolute h-[70vw] bottom-0 left-1/2 -translate-x-1/2 "
              />
              <img
                src={`/images/${flavor.color}-drink.webp`}
                alt=""
                className="absolute h-[70vw] bottom-0 left-1/2 -translate-x-1/2 "
              />
              <img
                src={`/images/${flavor.color}-elements.webp`}
                alt=""
                className="absolute bottom-15 left-0 "
              /> */}
            </div>
          ))}
          {/* <div className="relative w-full h-[60vw] rounded-2xl bg-[url('/images/black-bg.svg')] bg-cover bg-center bg-amber-200">
            <img
              src="/images/black-drink.webp"
              alt=""
              className="absolute h-[70vw] bottom-0 left-1/2 -translate-x-1/2 "
            />
            <img
              src="/images/black-elements.webp"
              alt=""
              className="absolute bottom-15 left-0 "
            />
          </div> */}
          {/* <div className="w-full h-[10vw] bg-amber-300">box1</div>
          <div className="w-full h-[10vw] bg-amber-400">box1</div> */}
        </div>
      </div>
    </div>
  );
};

export default DrinkCollation;
