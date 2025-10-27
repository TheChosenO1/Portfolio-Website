// components/MorphingWaves.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function MorphingWaves() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0b0b0c]">
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Base background on the left */}
        <rect width="1440" height="900" fill="#524c31" />

        {/* LIME (front wave) */}
        <motion.path
          fill="#c9df71"
          d={LIME_FRAMES[0]}
          initial={false}
          animate={{
            d: prefersReducedMotion ? LIME_FRAMES[0] : LIME_FRAMES,
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror", // yoyo
          }}
        />

        {/* ORANGE (back wave) */}
        <motion.path
          fill="#e17323"
          d={ORANGE_FRAMES[0]} 
          style={{ opacity: 0.95 }}
          initial={false}
          animate={{
            d: prefersReducedMotion ? ORANGE_FRAMES.slice(0, 1) : ORANGE_FRAMES,
          }}
          transition={{
            duration: 7, // slightly different to avoid perfect sync
            ease: "easeInOut",
            repeat: prefersReducedMotion ? 0 : Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Soft vignette for depth */}
        <defs>
          <radialGradient id="vignette" cx="25%" cy="55%" r="75%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#vignette)" />
      </svg>
    </div>
  );
}

/**
 * IMPORTANT: Each array contains paths with the SAME command structure
 * (same number/order of M/L/C/Z). Replace these with your Figma exports,
 * keeping point counts identical for butter-smooth morphing.
 */
const LIME_FRAMES = [
  // A — baseline, ~50% screen, no bottom peak
  `M1440,0 L960,0
   C900,150 950,250 880,360
   C830,480 970,560 860,700
   C830,810 960,875 1015,900
   L1440,900 Z`,

  // B — slight inward pull mid, still smooth at bottom
  `M1440,0 L940,0
   C880,175 995,265 860,375
   C815,495 1000,575 845,710
   C820,820 975,885 1035,900
   L1440,900 Z`,

  // C — slight outward push high, gentle lower curve
  `M1440,0 L990,0
   C930,135 930,235 905,345
   C860,465 945,555 900,690
   C870,805 960,870 1010,900
   L1440,900 Z`,
];
const ORANGE_FRAMES = [
  // A — pushed left to wrap lime
  `M1440,0 L1110,0
   C1075,160 1195,255 1115,375
   C1060,495 1200,585 1120,720
   C1080,835 1160,890 1200,900
   L1440,900 Z`,

  // B — a touch deeper + lower stretch
  `M1440,0 L1135,0
   C1100,175 1225,265 1135,385
   C1075,505 1225,600 1140,735
   C1100,850 1185,900 1220,900
   L1440,900 Z`,

  // C — slightly outward high, still covering most lime
  `M1440,0 L1095,0
   C1060,145 1180,240 1095,360
   C1035,480 1180,575 1100,710
   C1060,830 1145,890 1190,900
   L1440,900 Z`,
];