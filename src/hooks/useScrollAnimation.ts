import { useEffect } from 'react';
import { useInView, type IntersectionOptions } from 'react-intersection-observer';
import { useAnimation, type AnimationControls } from 'framer-motion';

export interface UseScrollAnimationOptions extends IntersectionOptions {
  /** 0..1, fraction of the element that must be visible before triggering. Default 0.2. */
  threshold?: number;
  /** Trigger only once. Default true. */
  triggerOnce?: boolean;
}

export interface UseScrollAnimationReturn {
  /** Attach to the motion element you want to observe. */
  ref: (node?: Element | null) => void;
  /** Pass to `animate={controls}` on the motion element. */
  controls: AnimationControls;
  /** True once the element has entered view. */
  inView: boolean;
}

/**
 * Trigger a Framer Motion animation when the element enters view.
 * Returns { ref, controls, inView } to plug into a motion component.
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    ...options,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return { ref, controls, inView };
}
