import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const HeroSection = () => {
  const title = useRef(null);
  const content = useRef(null);
  const clipText = useRef(null);
  const heroParent = useRef(null);

  useGSAP(
    () => {
      const splitTitle = new SplitText(title.current, { type: "chars" });
      const tl = gsap.timeline();

      tl.from(content.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl.to(
        clipText.current,
        {
          clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.8",
      );
      tl.from(
        splitTitle.chars,
        {
          y: 100,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.02,
        },
        "-=0.8",
      );

      gsap.to(heroParent.current, {
        scrollTrigger: {
          trigger: heroParent.current,
          start: "2% top",
          end: "bottom top",
          // markers: true,
          scrub: true,
        },
        rotate: 8,
        ease: "power1.out",
        scale: 0.9,
        yPercent: 20,
      });
    },
    {
      scope: heroParent.current,
    },
  );

  return (
    <div className="overflow-hidden bg-black">
      <div
        ref={heroParent}
        className="relative w-full h-dvh border-2 bg-[url('/images/static-img.png')] bg-cover bg-center"
      >
        <div
          ref={content}
          className="relative z-30 text-center mt-30 border w-full h-auto px-5 
          md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 "
        >
          <div className="text-center ">
            <h1
              ref={title}
              className="overflow-hidden text-[8vw] font-sans font-extrabold text-dark-brown tracking-[-1px] scale-y-[2]  uppercase  border w-max  mx-auto  
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
            className="my-5 px-5 text-sm font-light  pb-5 text-center border mt-8
                md:mx-40 lg:text-xl lg:w-[38vw] lg:mx-auto"
          >
            <p>
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
        md:hidden  md:scale-150 md:z-20 md:h-[45vh] border"
        />
      </div>
    </div>
  );
};

export default HeroSection;
