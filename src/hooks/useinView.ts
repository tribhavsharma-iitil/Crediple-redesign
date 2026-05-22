import { useRef, useState, useEffect } from 'react';

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!options.repeat) observer.disconnect();
        } else if (options.repeat) {
          setInView(false);
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export function useAnimatedCounter(target, duration = 1000, start = null, direction = 'up', inView = false) {
  const [value, setValue] = useState(direction === 'up' ? (start ?? 2000) : (start ?? target + 20));

  useEffect(() => {
    if (!inView) return;
    const from = direction === 'up' ? (start ?? 2000) : (start ?? target + 20);
    const to = target;
    const steps = 30;
    const stepDuration = duration / steps;
    let current = from;
    const increment = (to - from) / steps;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      current += increment;
      if (count >= steps) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(Math.round(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, target]);

  return value;
}