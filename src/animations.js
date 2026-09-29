import { motion } from 'framer-motion';
import './animations.css';

/* ─── EASING ────────────────────────────────────────────── */
const easeOut = [0.23, 1, 0.32, 1];
const easeSmooth = [0.4, 0, 0.2, 1];
const dNorm = 0.6;

/* ─── ENTRANCE VARIANTS ────────────────────────────────── */
const mkVariant = (from, dur = dNorm, ease = easeOut) => ({
  initial: { opacity: 0, ...from },
  whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: dur, ease },
});

export const fadeIn = mkVariant({ y: 30 }, dNorm, easeSmooth);
export const fadeInUp = mkVariant({ y: 50 });
export const fadeInLeft = mkVariant({ x: -40 });
export const fadeInRight = mkVariant({ x: 40 });
export const fadeInScale = mkVariant({ scale: 0.92 }, dNorm, easeSmooth);
export const fadeInDown = mkVariant({ y: -30 });

/* ─── STAGGER ──────────────────────────────────────────── */
export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, amount: 0.15 },
};

export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export const staggerItemLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

export const staggerItemRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } },
};

export const staggerItemScale = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

/* ─── NEW: Reveal for text lines ───────────────────────── */
export const revealVariant = {
  initial: { y: '100%' },
  whileInView: { y: '0%' },
  viewport: { once: true },
  transition: { duration: 0.6, ease: easeOut },
};

/* ─── SPRING HOVER ─────────────────────────────────────── */
export const springHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 17 },
};

export const springLift = {
  whileHover: { y: -6, transition: { duration: 0.2 } },
};

export const springIcon = {
  whileHover: { scale: 1.15, rotate: 8 },
  transition: { type: 'spring', stiffness: 300, damping: 12 },
};

export const springRotate = {
  whileHover: { rotate: 360, scale: 1.1 },
  transition: { duration: 0.5, ease: easeOut },
};

/* ─── RE-EXPORTS ───────────────────────────────────────── */
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionH4 = motion.h4;
export const MotionP = motion.p;
export const MotionA = motion.a;
export const MotionSection = motion.section;
export const MotionImg = motion.img;
export const MotionButton = motion.button;
