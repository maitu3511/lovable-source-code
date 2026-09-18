import React from "react";
import { motion } from "motion/react";

/**
 * Lightweight animated hero background (no video file).
 * Live-looking marketing dashboard: rising line graph, pulsing bar chart,
 * drifting data dots and scanning grid lines — all pure SVG/CSS animation.
 */

const GOLD = "#D4AF37";
const DEEP_GOLD = "#9A7B16";

const LINE_A = "M0,150 L70,132 L140,140 L210,104 L280,116 L350,74 L420,86 L490,44 L560,58 L620,22";
const LINE_B = "M0,168 L70,160 L140,166 L210,142 L280,150 L350,126 L420,134 L490,108 L560,116 L620,88";

const BARS = [34, 58, 44, 76, 62, 96, 80, 118, 104, 140];

export const HeroAnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rising line graph */}
      <svg
        viewBox="0 0 620 180"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 top-[12%] w-full h-[46%] opacity-[0.55]"
      >
        <defs>
          <linearGradient id="heroLineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={GOLD} stopOpacity="0.28" />
            <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={`${LINE_A} L620,180 L0,180 Z`}
          fill="url(#heroLineFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d={LINE_A}
          fill="none"
          stroke={GOLD}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.8, 1] }}
        />
        <motion.path
          d={LINE_B}
          fill="none"
          stroke={DEEP_GOLD}
          strokeWidth="1.5"
          strokeDasharray="6 7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
            times: [0, 0.45, 0.8, 1],
          }}
        />
      </svg>

      {/* Pulsing bar chart */}
      <svg
        viewBox="0 0 320 150"
        preserveAspectRatio="none"
        className="absolute bottom-[6%] left-[3%] w-[38%] h-[34%] opacity-[0.4]"
      >
        {BARS.map((h, i) => (
          <motion.rect
            key={i}
            x={i * 32 + 6}
            width="18"
            rx="4"
            fill={i % 3 === 0 ? DEEP_GOLD : GOLD}
            initial={{ height: h * 0.4, y: 150 - h * 0.4 }}
            animate={{
              height: [h * 0.45, h, h * 0.65, h * 0.95, h * 0.45],
              y: [150 - h * 0.45, 150 - h, 150 - h * 0.65, 150 - h * 0.95, 150 - h * 0.45],
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
        ))}
      </svg>

      {/* Circular progress ring */}
      <svg
        viewBox="0 0 120 120"
        className="absolute top-[18%] right-[6%] w-28 h-28 sm:w-40 sm:h-40 opacity-[0.45]"
      >
        <circle cx="60" cy="60" r="48" fill="none" stroke={GOLD} strokeOpacity="0.2" strokeWidth="6" />
        <motion.circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke={GOLD}
          strokeWidth="6"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          initial={{ pathLength: 0.1 }}
          animate={{ pathLength: [0.15, 0.85, 0.5, 0.95, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Drifting data dots */}
      {[
        { left: "12%", top: "22%", d: 6 },
        { left: "34%", top: "14%", d: 8 },
        { left: "58%", top: "30%", d: 7 },
        { left: "76%", top: "62%", d: 9 },
        { left: "22%", top: "70%", d: 6.5 },
        { left: "88%", top: "38%", d: 7.5 },
      ].map((dot, i) => (
        <motion.span
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            background: GOLD,
            boxShadow: `0 0 14px ${GOLD}`,
          }}
          animate={{ y: [0, -26, 0], opacity: [0.25, 0.8, 0.25], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: dot.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        />
      ))}

      {/* Scanning highlight sweep */}
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}1F, transparent)`,
        }}
        animate={{ x: ["-40%", "180%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
