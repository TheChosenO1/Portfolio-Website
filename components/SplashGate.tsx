// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Transition, Variants } from "framer-motion";
import AnimatedWaves from "@/components/AnimatedWaves";
import DynamicWaves from "@/components/DynamicWaves";
import WarpWordTailwind from "@/components/WarpedWord";
import Image from "next/image";


export default function SplashGate() {
  const [showIntro, setShowIntro] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const EASE = [0.22, 0.1, 0.25, 1] as const;
  const makeHeroVariants = (reduced: boolean): Variants => ({
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    visible: reduced
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: { type: "tween", duration: 0.8, ease: EASE, delay: 0.2 },
        },
    });

  const heroVariants =  makeHeroVariants(!!prefersReducedMotion);

  const nameTransition: Transition = {
        type: "tween",
        duration: 0.75,
        ease: EASE,
        };

  return (
    <>
      {/* Morphing background */}
      <DynamicWaves />

      {/* Intro overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AnimatedWaves />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="relative z-10 p-6 md:p-20 text-white">
        <div className="max-w-6xl">
          {/*
            ------------------------------------------
            SHARED NAME HEADING (LIVES OUTSIDE AnimatePresence)
            ------------------------------------------
          */}
          <motion.div
            layout // Enable layout animation for the div that holds the name and 'Hi! I am'
            transition={nameTransition}
            className={showAbout ? "pt-0" : "pt-4 space-y-3"}
          >
            {/* "Hi! I am" only shows in HERO mode */}
            {!showAbout && (
              <motion.h2
                key="hero-greeting"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-5xl font-extralight leading-[1.05] text-white/90"
              >
                Hi! I am
              </motion.h2>
            )}

            {/* Clickable NAME - Renders differently based on mode */}
            <button
              onClick={() => setShowAbout(!showAbout)} // Toggle functionality
              aria-label={showAbout ? "Close About" : "Open About"}
              className="text-left"
            >
              <motion.h1
                layoutId="name-heading"
                className={`mt-1 font-bold ${
                  showAbout
                    ? "text-7xl md:text-8xl tracking-tight"
                    : "text-6xl"
                } text-[#c9df71]`}
                transition={nameTransition}
              >
                <span
                  className={`inline-block w-fit rounded animate-pulse scale-105 px-2 will-change-transform highlight-slide duration-200 ease-out cursor-pointer ${
                    !showAbout ? "transition-transform hover:scale-105" : ""
                  }`}
                >
                  Aarav Agrawal
                </span>
              </motion.h1>
            </button>
          </motion.div>
        </div>

        {/*
          ------------------------------------------
          REST OF CONTENT (LIVES INSIDE AnimatePresence)
          ------------------------------------------
        */}
        <AnimatePresence mode="wait">
          {!showAbout ? (
            // ---------- HERO CONTENT (Everything BUT the name/greeting) ----------
            <motion.section
              key="hero-content"
              variants={heroVariants}
              initial="hidden"
              animate={showIntro ? "hidden" : "visible"}
              exit={{ opacity: 0 }}
              className="grid max-w-6xl gap-10 "
            >
              {/* Photo fades out */}
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="justify-self-start"
              >
                <div className="mt-5 w-[600px] max-w-full">
                  <div
                    className="
                      rounded-xl
                      
                      overflow-hidden
                      "
                  >
                    <Image
                      src="/profile.jpg"
                      alt="Aarav Agrawal"
                      width={594} // a bit smaller to account for frame padding
                      height={594}
                      className="rounded-xl object-cover"
                      priority
                    />
                  </div>
                  <p className=" font-extralight text-white/90"><br /> Click on my name to know more about me and my experience!</p>
                </div>
              </motion.div>
            </motion.section>
          ) : (
            // ---------- ABOUT CONTENT (Everything BUT the name) ----------
            <motion.section
              key="about-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: "tween", duration: 0.35, ease: EASE }}
              className="max-w-5xl"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.10, duration: 0.3 }}
                className="mt-6 max-w-3xl text-lg md:text-xl text-white/80"
              >
                I build things that make systems a little more reliable and a   {" "} <WarpWordTailwind className="" text="looooot" amp={5} /> {" "} more human.<br /><br />
                I like giving machines a bit of independence. AI agents that take initiative. Tools that remove the “Are you sure?” friction. Systems that learn how people think and then handle the boring parts on their own. The same boring problems that become very exciting the second they break.<br/><br/>
                I'm interested in the space where autonomy meets accountability. If software feels tedious or unpredictable, I want to turn it into something that feels effortless and trustworthy at the same time - because technology should feel like a teammate not a time bomb.<br/><br/>
                Here's my 📄<a href="https://drive.google.com/file/d/1kbbniScdzB87P4xAhfA5ALF9cNEEJyel/view?usp=sharing" className="text-[#c9df71] hover:text-[#a9c43cff] underline" target="_blank" rel="noopener noreferrer">resume</a>!<br />

              </motion.p>

              <motion.button
                onClick={() => setShowAbout(false)}
                className="mt-8 underline text-white/80 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Back
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}