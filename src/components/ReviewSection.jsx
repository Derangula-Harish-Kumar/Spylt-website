import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ReviewSection = () => {
  const container = useRef(null);

  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) video.play();
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  useGSAP(
    () => {
      const cardsArray = gsap.utils.toArray(".review-card");
      const textArray = gsap.utils.toArray(".bg-text");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        textArray,
        {
          x: (i) => (i % 2 === 0 ? -150 : 150),
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
      ).fromTo(
        cardsArray,
        {
          y: 400,
          opacity: 0,
          rotate: (i) => (i % 2 === 0 ? 5 : -5),
        },
        {
          y: 0,
          opacity: 1,
          rotate: (i) => (i % 2 === 0 ? 5 : -5),
          duration: 1.5,
          stagger: 0.5,
          ease: "power3.out",
        },
        "<0.3",
      );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      // FIXED: Changed w-screen to w-full
      className="relative w-full h-screen bg-[#FAEADE] overflow-hidden"
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-10 pointer-events-none select-none">
        <h1 className="bg-text text-[20vw] font-black text-[#1D1D1D] leading-[0.8] uppercase">
          What's
        </h1>
        <h1 className="bg-text text-[17vw] font-black text-[#C88E64] leading-[0.8] uppercase self-end">
          Everyone
        </h1>
        <h1 className="bg-text text-[20vw] font-black text-[#1D1D1D] leading-[0.8] uppercase">
          Talking
        </h1>
      </div>

      {/* Cards Section */}
      <div className="absolute inset-0 flex items-center justify-center pt-20">
        <div className="relative flex items-center justify-center w-full h-full max-w-6xl">
          {cards.map((card, index) => (
            <div
              key={index}
              // FIXED: Added md:!ml-0 and md:!mt-0 to override the inline styles safely on desktop, plus md:!mx-[-1%] to restore the desktop overlap
              className="review-card absolute md:relative w-[65vw] md:w-[18%] md:left-auto md:translate-x-0 md:!mt-0 md:!ml-0 md:!mx-[-1%] z-10 hover:z-50"
              style={{
                // Now perfectly safe for React/Next.js! No window.innerWidth needed.
                marginLeft: `${index * 5}vw`,
                marginTop: `${index * 2}vh`,
              }}
            >
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-full transition-transform duration-500 ease-out hover:scale-[1.15] md:hover:scale-150 cursor-pointer origin-center"
              >
                <video
                  src={card.src}
                  loop
                  muted
                  playsInline
                  className="w-full rounded-3xl border-[3px] border-black shadow-2xl bg-black pointer-events-none"
                />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
                  <div
                    className="w-6 h-6 rounded-full backdrop-blur-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.img})` }}
                  />
                  <span className="text-white text-[0.6rem] font-bold uppercase tracking-widest drop-shadow-md">
                    {card.name || "User"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave shape */}
      <div className="absolute bottom-0 w-full h-[15vh] bg-black rounded-t-[50%]" />
    </div>
  );
};

export default ReviewSection;
