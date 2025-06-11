import './App.css';

import { ThemeProvider } from '@/components/ThemeProvider';
import { ModeToggle } from '@/components/ModeToggle';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

import deskImage from './assets/desk.jpg';
import performImage from './assets/perform.jpg';
import noise from '@/assets/noise.webp';

import { ChevronsDown } from "lucide-react";
import Cursor from "@/components/Cursor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {

  const {
    mainRef,
    heroSectionRef,
    panelsContainerRef,
    footerSectionRef,
    panel1Ref,
    panel2Ref,
    panel3Ref,
    panel4Ref,
    about,
    aboutContent,
    hardware,
    software,
    services,
  } = useScrollAnimations();

  return (
    <>
      <Cursor />
      <main ref={mainRef}>
        <div className='noise-overlay' style={{ ['--noise-img' as any]: `url(${noise})` }} ></div>
        <div ref={heroSectionRef}>
          <HeroSection />
          <div className='scroll-container'>
            <div className='scroll-down'>
              <ChevronsDown className="animate-bounce h-6 w-6 text-color-text" />
            </div>
          </div>
        </div>

        <section ref={panelsContainerRef} className='panel-container'>
          <div className='noise-overlay' style={{ ['--noise-img' as any]: `url(${noise})` }} ></div>

          <div ref={panel1Ref} className="panel">
            <div ref={about} className='panel-header'>
              ABOUT
            </div>
            <div ref={aboutContent}>
              <div className='about-text'>
                <p>hello, i'm luke. welcome to my lab.</p>
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
          </div>

          <div ref={panel2Ref} className="panel">
            <div ref={hardware} className='panel-header'>
              HARDWARE
            </div>
          </div>

          <div ref={panel3Ref} className="panel">
            <div ref={software} className='panel-header'>
              SOFTWARE
            </div>
          </div>

          <div ref={panel4Ref} className="panel">
            <div ref={services} className='panel-header'>
              SERVICES
            </div>
          </div>
        </section>

        <section ref={footerSectionRef} className='footer-container'>
          <div className='noise-overlay' style={{ ['--noise-img' as any]: `url(${noise})` }} ></div>

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