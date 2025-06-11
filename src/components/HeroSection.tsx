// HeroSection.tsx - CORRECTED

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "@/components/ThemeProvider";
import { Particles } from "@/components/magicui/particles";
import { HyperText } from "@/components/magicui/hyper-text";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const colour = resolvedTheme === "dark" ? "#ffffff" : "#000000";

  const logoRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // This will now work because logoRef.current will point to the <span>
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 2 },
      {
        opacity: 0.6,
        scale: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
      },
    );
  });

  return (
    <div>
      <div className="hero-content">
        <div className="hero-container">
          <Particles
            className="absolute inset-0 z-0"
            quantity={200}
            size={0.4}
            staticity={20}
            ease={100}
            color={colour}
            refresh={true}
          />

          <span ref={logoRef}>
            <HyperText
              className="hero-logo"
              duration={1500}
              startOnView={false}
            >
              lv_labs
            </HyperText>
          </span>
        </div>
      </div>

      <div className="noise-overlay"></div>
    </div>

  );
}