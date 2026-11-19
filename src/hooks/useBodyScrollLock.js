import { useEffect } from 'react';

let lockCount = 0;
let previousOverflow = '';

const lock = () => {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;
};

const unlock = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    previousOverflow = '';
  }
};

/**
 * Locks body scroll while `active` is true. Multiple consumers (mobile
 * menu, project modals) can be active at once without fighting over the
 * original overflow value.
 */
const useBodyScrollLock = (active = true) => {
  useEffect(() => {
    if (!active) return undefined;
    lock();
    return unlock;
  }, [active]);
};

export default useBodyScrollLock;
