import { useRef, useCallback, useEffect } from 'react';

/**
 * Writes --mx / --my (px offsets from the element's top-left) as the
 * pointer moves across the target, for CSS pointer-tracking effects.
 *
 * Two guards keep it cheap and mouse-only:
 *  - writes are batched into a single rAF, so a fast mouse can't
 *    outrun the paint loop with per-event style mutations
 *  - touch pointers bail out early, so phones don't pay for a
 *    highlight nobody can see
 *
 * Spread the returned props onto a motion component:
 *   <motion.div {...spotlightProps} />
 */
const useSpotlight = () => {
  const ref = useRef(null);
  const frame = useRef(0);
  const point = useRef({ x: 0, y: 0 });

  const flush = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${point.current.x - rect.left}px`);
    el.style.setProperty('--my', `${point.current.y - rect.top}px`);
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      point.current = { x: e.clientX, y: e.clientY };
      if (!frame.current) frame.current = requestAnimationFrame(flush);
    },
    [flush]
  );

  const onPointerLeave = useCallback(() => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
  }, []);

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    []
  );

  return { ref, spotlightProps: { onPointerMove, onPointerLeave } };
};

export default useSpotlight;
