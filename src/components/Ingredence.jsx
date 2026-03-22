import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { nutrientLists } from "../constants";

// Register outside the component
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Ingredence = () => {
  const title = useRef(null);
  const paraRef = useRef(null); // Renamed to avoid collision
  const clipText = useRef(null);
  const heroParent = useRef(null);

  useGSAP(
    () => {
      // 1. Initialize Splits
      const splitTitle = new SplitText(title.current, { type: "chars" });
      const splitPara = new SplitText(paraRef.current, { type: "words,chars" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroParent.current,
          start: "top top", // Changed from top top so you can see it trigger
          // markers: true,
        },
      });

      // 2. Animate Title Chars
      tl.from(splitTitle.chars, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
      });

      // 3. Animate ClipPath
      tl.to(
        clipText.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // 4. Animate Paragraph Chars
      tl.from(
        splitPara.chars,
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.01,
        },
        "-=0.8",
      );

      // 5. CLEANUP (Crucial for SplitText)
      return () => {
        splitTitle.revert();
        splitPara.revert();
      };
    },
    { scope: heroParent }, // Pass the Ref object, not .current
  );

  return (
    <div
      ref={heroParent}
      className="relative w-screen h-dvh bg-[#E8DDCA] overflow-hidden lg:h-[112vh]"
    >
      {/* Top Image Section */}
      <div className="w-full lg:h-[23vw] overflow-hidden">
        <img
          src="/images/slider-dip.png"
          alt="Slider"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Big Image */}
      <div className="absolute bottom-0 w-full h-[50vh] lg:h-auto overflow-hidden">
        <img
          src="/images/big-img.png"
          alt="background"
          className=" lg:scale-x-100 w-full h-full object-cover"
        />
      </div>

      {/* Sliding Text Section */}
      <div
        className="absolute left-5 top-[30vw] text-4xl font-bold uppercase leading-[3vw]
          md:text-6xl
          lg:top-[40vh] lg:text-[6vw]"
      >
        <h1 ref={title}>it still does</h1>
        <div
          ref={clipText}
          style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
          className="bg-[#A26833] border-[#FDEBD2] border-[3px] p-3 pt-5 w-max -rotate-2 md:pt-8 lg:pt-12"
        >
          <h1 className="text-[#FAEADE]">body good</h1>
        </div>
      </div>

      {/* Paragraph Section */}
      <div
        ref={paraRef}
        className="absolute top-[55vw] lg:right-10 ml-5 text-[3.5vw] w-60 font-light leading-6 font-serif md:w-[50%] md:leading-10 lg:leading-8  lg:w-75 lg:text-xl lg:top-[25vw]"
      >
        <p>
          Milk contains a wide array of nutrients, including vitamins, minerals,
          and protein, and this is lactose free
        </p>
      </div>

      {/* ingredience list div */}
      <div
        className="w-[90vw] h-20  absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#FDEBD2] border-[#E8DDCA] border-4 rounded-4xl
            flex  justify-between items-center px-5 py-4 text-center
            lg:px-10 lg:w-[60vw] lg:py-15"
      >
        {nutrientLists.map((list, index) => (
          <div key={index} className="flex text-center">
            <div key={index} className="font-light ">
              <p className="text-[0.8rem] text-[#593f3a] lg:text-[1rem]">
                {list.label}
              </p>
              <p className="font-normal text-[0.7rem] lg:text-[1rem]">up to</p>
              <p className="font-bold font-antonio text-[1rem] lg:text-3xl">
                {list.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredence;
