import { useRef, useEffect, useState } from "react";

/**
 * AnimatedCard - Animates card into view on scroll (fade + slide up), with hover scale/shadow
 * @param {children} ReactNode
 * @param {delay} number (optional, ms)
 * @param {className} string (optional)
 */
export default function AnimatedCard({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`animated-card ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
