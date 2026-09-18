import React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import careerGrowthJourney from "../assets/heroes/careers-growth-journey.jpg";

const pathParticles = [
  { left: "25%", top: "72%", delay: 0 },
  { left: "35%", top: "62%", delay: 1.7 },
  { left: "46%", top: "53%", delay: 3.4 },
  { left: "57%", top: "42%", delay: 5.1 },
];

export const CareerGrowthHeroVisual: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 35, damping: 24, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 35, damping: 24, mass: 0.8 });
  const imageX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const imageY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const rotateX = useTransform(smoothY, [-1, 1], [0.7, -0.7]);
  const rotateY = useTransform(smoothX, [-1, 1], [-0.9, 0.9]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <motion.div
        className="absolute -inset-3 origin-center"
        style={reduceMotion ? undefined : { x: imageX, y: imageY, rotateX, rotateY }}
        animate={reduceMotion ? undefined : { scale: [1.015, 1.03, 1.015], y: [0, -3, 0] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      >
        <img
          src={careerGrowthJourney}
          alt=""
          className="h-full w-full object-cover object-center"
          decoding="async"
        />
      </motion.div>

      <div className="absolute inset-0 bg-white/48" />
      <div className="absolute inset-y-0 left-[12%] right-[12%] bg-white/52 blur-3xl" />

      {!reduceMotion &&
        pathParticles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)]"
            style={{ left: particle.left, top: particle.top }}
            animate={{ x: [0, 22, 44], y: [0, -18, -38], opacity: [0, 0.75, 0] }}
            transition={{
              duration: 7,
              delay: particle.delay,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
    </div>
  );
};