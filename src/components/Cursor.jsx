import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springConfig = { stiffness: 300, damping: 25 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const onMouseMove = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [cursorX, cursorY, dotX, dotY]);

  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          border: '1.5px solid var(--p)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      <motion.div
        className="cursor-dot"
        style={{
          translateX: dotX,
          translateY: dotY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: 'var(--p)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default Cursor;
