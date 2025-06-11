// App.tsx
import './App.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import deskImage from './assets/desk.jpg';
import performImage from './assets/perform.jpg';

import { ChevronsDown } from "lucide-react";

import Cursor from "@/components/Cursor";




gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  // Refs for the main sections
  const mainRef = useRef<HTMLElement>(null); // For useGSAP scope
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const footerSectionRef = useRef<HTMLDivElement>(null);

  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const panel4Ref = useRef<HTMLDivElement>(null);

  const about = useRef<HTMLDivElement>(null);
  const aboutContent = useRef<HTMLDivElement>(null);
  const hardware = useRef<HTMLDivElement>(null);
  const software = useRef<HTMLDivElement>(null);
  const services = useRef<HTMLDivElement>(null);

  // Define panels to calculate `numPanels` dynamically
  const panels = [
    { label: 'ABOUT' },
    { label: 'HARDWARE' },
    { label: 'SOFTWARE' },
    { label: 'SERVICES' },
  ];
  const numPanels = panels.length;


  useGSAP(() => {

    const heroSectionHeight = window.innerHeight;
    const horizontalMovementDistance = window.innerWidth * (numPanels - 1);
    const totalScrollHeight = heroSectionHeight + horizontalMovementDistance + window.innerHeight;

    const snapPointsInPx = [
      0, // Start of Hero Section
      heroSectionHeight, // Start of Horizontal Section (Panel 1 - ABOUT)
      heroSectionHeight + (1 * window.innerWidth), // Panel 2 - HARDWARE
      heroSectionHeight + (2 * window.innerWidth), // Panel 3 - SOFTWARE  
      heroSectionHeight + (3 * window.innerWidth), // Panel 4 - SERVICES / End of Horizontal
      totalScrollHeight, // Start of Footer Section
    ];
    const normalizedSnapPoints = snapPointsInPx.map(px => px / totalScrollHeight);

    gsap.timeline()
      .set(".scroll-down", { opacity: 0 }) // Ensure starting state
      .to(".scroll-down", {
        opacity: 0.7,
        duration: 1,
        delay: 2
      })
      .to(".scroll-down", {
        opacity: 0.3,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });

    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[0]} top`,
      end: () => `top+=${snapPointsInPx[1] - (window.innerHeight * 0.5)} top`,
      scrub: true,
      animation: gsap.to(".scroll-container", { opacity: 0 }),
    });

    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      markers: false,
      start: () => `top+=${snapPointsInPx[0]} top`,
      end: () => `top+=${snapPointsInPx[0] + (window.innerHeight * 0.5)} top`,
      scrub: true,
      animation: gsap.to(".hero-content", { opacity: 0 }),
    })

    const master_tl = gsap.timeline({
      scrollTrigger: {
        markers: false,
        trigger: heroSectionRef.current,
        start: 'top top',
        end: () => `+=${totalScrollHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: normalizedSnapPoints,
          duration: 1,
          ease: 'power4.out',
          directional: true,
        },
        // onUpdate: (self) => {
        //   console.log(`Master: ${(self.progress)}`);
        // }
      }
    });

    const horizontal_tl = gsap.timeline({
      scrollTrigger: {
        trigger: panelsContainerRef.current,
        start: 'top top',
        end: () => `+=${horizontalMovementDistance}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // console.log(`Horizontal: ${(self.progress * 100).toFixed(2)}%`);
        }
      }
    });

    master_tl.addLabel('start');
    master_tl.to({}, { duration: heroSectionHeight / totalScrollHeight });
    master_tl.addLabel('heroSectionEnd');
    master_tl.to({}, { duration: horizontalMovementDistance / totalScrollHeight }, 'heroSectionEnd');
    master_tl.addLabel('horizontalSectionEnd');
    master_tl.to({}, { duration: window.innerHeight / totalScrollHeight }, 'horizontalSectionEnd');
    master_tl.addLabel('footerSectionEnd');


    horizontal_tl.addLabel('about panel');
    horizontal_tl.to(panelsContainerRef.current, { x: -(1 * window.innerWidth), ease: "power1.inOut" });
    horizontal_tl.addLabel('hardware panel');
    horizontal_tl.to(panelsContainerRef.current, { x: -(2 * window.innerWidth), ease: "power1.inOut" });
    horizontal_tl.addLabel('software panel');
    horizontal_tl.to(panelsContainerRef.current, { x: -(3 * window.innerWidth), ease: "power1.inOut" });
    horizontal_tl.addLabel('services panel');



    // About fade IN
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[0] + (window.innerHeight * 0.5)} top`,
      end: () => `top+=${snapPointsInPx[1]} top`,
      scrub: true,
      animation: gsap.fromTo(about.current, { opacity: 0 }, { opacity: 1 }),
    });

    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[0] + (window.innerHeight * 0.7)} top`,
      end: () => `top+=${snapPointsInPx[1]} top`,
      scrub: true,
      animation: gsap.fromTo(aboutContent.current, { opacity: 0 }, { opacity: 1 }),
    });

    // About text fade OUT
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[1]} top`,
      end: () => `top+=${snapPointsInPx[1] + (window.innerWidth * 0.1)} top`, // Fixed calculation
      scrub: true,
      animation: gsap.fromTo(aboutContent.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
    });

    // About fade OUT
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[1]} top`,
      end: () => `top+=${snapPointsInPx[1] + (window.innerWidth * 0.3)} top`, // Fixed calculation
      scrub: true,
      animation: gsap.fromTo(about.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
    });

    // Hardware fade IN
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[1] + (window.innerWidth * 0.5)} top`,
      end: () => `top+=${snapPointsInPx[2]} top`,
      scrub: true,
      animation: gsap.fromTo(hardware.current, { opacity: 0 }, { opacity: 1 }),
    });

    // Hardware fade OUT - FIXED
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[2]} top`,
      end: () => `top+=${snapPointsInPx[2] + (window.innerWidth * 0.1)} top`, // Fixed calculation
      scrub: true,
      animation: gsap.fromTo(hardware.current, { opacity: 1 }, { opacity: 0, immediateRender: false }), // FIXED: was 0 to 1
    });

    // Software fade IN
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[2] + (window.innerWidth * 0.5)} top`,
      end: () => `top+=${snapPointsInPx[3]} top`,
      scrub: true,
      animation: gsap.fromTo(software.current, { opacity: 0 }, { opacity: 1 }),
    });

    // Software fade OUT - FIXED
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[3]} top`,
      end: () => `top+=${snapPointsInPx[3] + (window.innerWidth * 0.1)} top`, // Fixed calculation
      scrub: true,
      animation: gsap.fromTo(software.current, { opacity: 1 }, { opacity: 0, immediateRender: false }), // FIXED: was 0 to 1
    });

    // Services fade IN
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[3] + (window.innerWidth * 0.5)} top`,
      end: () => `top+=${snapPointsInPx[4]} top`,
      scrub: true,
      animation: gsap.fromTo(services.current, { opacity: 0 }, { opacity: 1 }),
    });

    // Services fade OUT - FIXED
    ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: () => `top+=${snapPointsInPx[4]} top`,
      end: () => `top+=${snapPointsInPx[4] + (window.innerHeight * 0.1)} top`, // Fixed calculation
      scrub: true,
      animation: gsap.fromTo(services.current, { opacity: 1 }, { opacity: 0, immediateRender: false }), // FIXED: was 0 to 1
    });


  }, { scope: mainRef }); // Scope useGSAP to the main container for automatic cleanup

  return (
    <>
      <Cursor />
      <main ref={mainRef}> {/* Attach the mainRef here */}
        <div ref={heroSectionRef}>
          <HeroSection />
          <div className='scroll-container'>
            <div className='scroll-down'>
              {/* <div className="">SCROLL DOWN</div> */}
              <ChevronsDown className="animate-bounce h-6 w-6 text-color-text" />
            </div>
          </div>
        </div>

        <section ref={panelsContainerRef} className='panel-container'>


          <div ref={panel1Ref} className="panel">
            <div ref={about} className='panel-header'>
              ABOUT
            </div>
            <div ref={aboutContent}>
              <div className='about-text'>
                <p>
                  hello, i'm luke. welcome to my lab.
                </p>
                <p className='mt-2'>
                  i am a technologist and engineer based in brighton, exploring the intersection of hardware and software for making art.
                </p>
                <p className='mt-2'>
                  during the day, i work as a product designer at <a href="https://www.thonk.co.uk" className="text-color-link underline underline-offset-4">thonk</a>, creating eurorack modules rooted in DIY culture that make modular synthesis approachable for everyone.
                </p>
                <p className='mt-2'>
                  at home in my lab, i design and build both hardware and software, exploring new ways to connect technology with creative practice.
                </p>
                <p className='mt-2'>
                  i'm driven by creating things that work well and learning how to do them better.
                </p>

              </div>
              <div className='desk-image'>
                <img src={deskImage} alt="me at desk" />
              </div>
              <div className='perform-image'>
                <img src={performImage} alt="me performing" />
              </div>
            </div>

            <div className='noise-overlay'></div>
          </div>

          <div ref={panel2Ref} className="panel">
            <div ref={hardware} className='panel-header'>
              HARDWARE
            </div>
            <div className='noise-overlay'></div>
          </div>

          <div ref={panel3Ref} className="panel">
            <div ref={software} className='panel-header'>
              SOFTWARE
            </div>
            <div className='noise-overlay'></div>
          </div>

          <div ref={panel4Ref} className="panel">
            <div ref={services} className='panel-header'>
              SERVICES
            </div>
            <div className='noise-overlay'></div>
          </div>

        </section>

        <section ref={footerSectionRef} className='footer-container'>
          <Footer />
        </section>

        <footer className="fixed bottom-4 right-4">
          <ModeToggle />
        </footer>
      </main>
    </>
  );
}

export default App;