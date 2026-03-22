import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const TextSection = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText("h1", { type: "words" });
      const ParaText = new SplitText("#ParaText", { type: "lines" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#textParent",
          start: "top 50%",
          // markers: true,
          end: "bottom 70%", // Narrowing the window makes the animation feel tighter
          scrub: 1, // '1' adds a slight smooth delay (1 second) to the scrub
        },
      });

      tl.to(split.words, {
        color: "#ffffff",
        stagger: 2, // Reduced stagger for a faster feel
        duration: 1,
      })
        .to(
          "#flipText",
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 5,
            ease: "power2.Out",
          },
          "-=1",
        ) // Starts the clipPath reveal 0.5 seconds before the text finishes
        .from(ParaText.lines, {
          y: 100,
          duration: 2,
          stagger: 0.1,
          ease: "power2.inOut",
        });
    },
    { scope: container },
  ); // Scoping prevents targeting elements outside this component

  return (
    <div
      ref={container}
      className="flex relative justify-center items-center w-screen h-dvh bg-[#7E3B2D]"
    >
      <div>
        <div
          id="textParent"
          className="text-[#89493A] text-center text-[8vw] scale-y-150 leading-[8vw] font-bold w-screen   font-antonio
          md:text-[5vw] md:leading-[5vw]"
        >
          <h1 id="text">STIR UP YOUR</h1>
          <h1>FEARLESS PAST AND</h1>

          <div
            id="flipText"
            style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }} // Fixed clipPath to show element
            className="m-1 -rotate-4 inline-block"
          >
            <span className="bg-[#E3A458] px-5 py-1 text-[#7F3B2D]   border-[#7F3B2D]">
              FUEL UP
            </span>
          </div>

          <h1>YOUR FUTURE WITH EVERY</h1>
          <h1>GULP OF PERFECT PROTEIN</h1>
        </div>

        <div className="relative top-[10vh] lg:top-[13vh]">
          <p
            id="ParaText"
            className="text-sm font-light text-[#bb7a6b] w-screen text-center px-10 overflow-hidden 
            lg:text-2xl "
          >
            Rev up your rebel spirit and feed the adventure of life with SPYLT,
            where you' re one chug away from epic nostalgia and fearless fun.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
