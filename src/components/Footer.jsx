import React, { useEffect, useRef, useState } from "react";
// 1. Import the icons from react-icons
import { FaInstagram, FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const videoRef = useRef(null);
  const [email, setEmail] = useState("");

  const handleWhatsAppRedirect = () => {
    if (!email.trim()) {
      alert("Please enter your email first!");
      return;
    }

    const phoneNumber = "917569946069";
    const defaultMessage = `Hello Harish Kumar! I like your Split website. My email is: ${email}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      defaultMessage,
    )}`;
    window.open(whatsappUrl, "_blank");
    setEmail("");
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoRef.current
            ?.play()
            .catch((e) => console.log("Autoplay prevented:", e));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <footer className="relative w-full min-h-dvh overflow-hidden bg-black flex flex-col justify-between">
      {/* BACKGROUND VIDEO LAYER */}
      <video
        ref={videoRef}
        src="/videos/splash.mp4"
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
      />

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative flex flex-col w-full h-full min-h-dvh">
        <div className="h-[20vh] w-full relative z-20">
          <img
            src="/images/footer-dip.png"
            alt="footer dip"
            className="object-contain h-full w-full scale-x-150 "
          />
        </div>

        <div className="relative z-10 flex flex-col justify-end flex-1 w-full px-5 pb-10 -mt-[10vh]">
          {/* Title & Social Icons Wrapper */}
          <div className="mx-auto text-center text-[#FAEADE] mb-[10vh]">
            <h1 className="text-4xl md:text-[7vw] font-antonio font-bold mb-6">
              #CHUGRESPONSIBLY
            </h1>

            {/* NEW SOCIAL ICONS SECTION */}
            <div className="flex justify-center items-center gap-6 md:gap-8 text-3xl">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/mr.wilder_47?igsh=MTJkZmtkdmZ6NzBseg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] hover:scale-125 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              {/* WhatsApp (Direct Link) */}
              <a
                href="https://wa.me/917569946069"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#25D366] hover:scale-125 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>

              {/* Email (Mailto Link) */}
              <a
                href="mailto:dharishk8@gmail.com"
                className="hover:text-[#EA4335] hover:scale-125 transition-all duration-300"
                aria-label="Email"
              >
                <MdEmail />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=d-harish-kumar-2bb79a304"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A66C2] hover:scale-125 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Derangula-Harish-Kumar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 hover:scale-125 transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[#FAEADE] mb-10 gap-10">
            <section className="flex gap-10">
              <ul className="space-y-2 cursor-pointer">
                <li className="font-bold">SPYLT Flavors</li>
              </ul>
              <ul className="space-y-2 cursor-pointer">
                <li>Chug Club</li>
                <li>Student Marketing</li>
                <li>Dairy Dealers</li>
              </ul>
              <ul className="space-y-2 cursor-pointer">
                <li>Company</li>
                <li>Contacts</li>
                <li>Tasty Talk</li>
              </ul>
            </section>

            <section className="max-w-md">
              <p className="mb-4 text-sm md:text-base">
                Get Exclusive Early Access and Stay Informed About Product
                Updates, Events, and More!
              </p>

              <div className="flex items-center border-b border-[#FAEADE] pb-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-[#999999]/70 placeholder:text-sm text-2xl pl-5 tracking-[0.2rem] md:placeholder:text-2xl flex-1"
                />

                <button
                  onClick={handleWhatsAppRedirect}
                  title="Send via WhatsApp"
                  className="ml-3 hover:opacity-80 transition-opacity shrink-0"
                >
                  <img src="/images/arrow.svg" alt="arrow svg" />
                </button>
              </div>
            </section>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[#FAEADE] text-sm pt-4 border-t border-[#FAEADE]/20">
            <section className="flex gap-5 mb-4 md:mb-0">
              <span className="cursor-pointer hover:underline">
                Privacy Policy
              </span>
              <span className="cursor-pointer hover:underline">
                Terms of Service
              </span>
            </section>
            <section>Copyright © 2026 Spylt - All Rights Reserved</section>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
