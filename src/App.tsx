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
    hardwareContent,
    software,
    softwareContent,
    services,
    servicesContent,
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
              <ChevronsDown className="animate-bounce h-12 w-12 text-color-text" />
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
            <div ref={hardwareContent}>
              <div className='panel-text'>
                <p>
                  Morbi quis hendrerit nulla, vitae hendrerit libero. Phasellus vitae accumsan sapien. Sed in lacinia massa, eget convallis metus. Proin a sodales orci, ullamcorper semper est. Morbi viverra quis ligula id mattis. Nam urna mauris, eleifend ut massa eget, iaculis aliquet arcu. Aenean venenatis urna vitae justo molestie venenatis. Sed in tortor ut dui lobortis volutpat. Maecenas eu consectetur libero, sit amet condimentum eros. Nunc at lobortis neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum viverra luctus velit et mollis.
                  <br />
                  <br />
                  In hac habitasse platea dictumst. Morbi tincidunt, leo nec sodales sodales, nulla velit tempor felis, consequat tristique augue nulla tincidunt nulla. Maecenas auctor porta libero, a vestibulum odio consectetur et. Etiam auctor dui vel faucibus laoreet. Ut placerat, sem sed lobortis dictum, mauris massa molestie sem, a porta diam arcu id dolor. Nulla iaculis turpis vel purus ultricies feugiat. Curabitur laoreet vulputate urna, id scelerisque lacus congue sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sem dolor, faucibus et malesuada sit amet, porttitor vitae ex. Curabitur id sem eu tortor condimentum porta a ut orci. Sed tempor justo vitae ex tristique molestie. Suspendisse non bibendum est. Donec nec maximus tortor. Proin augue ligula, bibendum finibus metus a, pulvinar rutrum urna. In tristique ipsum eros, luctus fermentum augue tincidunt ut. Vestibulum vestibulum velit et suscipit vestibulum.
                </p>
              </div>
            </div>
          </div>

          <div ref={panel3Ref} className="panel">
            <div ref={software} className='panel-header'>
              SOFTWARE
            </div>
            <div ref={softwareContent}>
              <div className='panel-text'>
                <p>
                  Nunc convallis risus at nibh mollis posuere. Donec eros sapien, vulputate ac hendrerit vitae, sodales ut lacus. Suspendisse vitae lacus non nisi ultricies varius. Quisque molestie lacus massa. Curabitur hendrerit malesuada velit sit amet ornare. Phasellus laoreet consequat eros a facilisis. Etiam vitae consequat nisi, vel sagittis risus. Sed consectetur finibus vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis fermentum ex et blandit ullamcorper. Mauris sapien augue, iaculis sit amet leo id, molestie faucibus orci. Pellentesque luctus turpis in justo rhoncus, sit amet vestibulum odio mattis. Morbi vitae auctor lorem. Proin nec mauris ut diam porta interdum.
                  <br />
                  <br />
                  Ut ut pharetra nulla. Donec at velit eu nisi sodales dapibus. Nullam pulvinar nisl sit amet lectus viverra aliquam. Donec in sagittis dui. Morbi viverra cursus est, at euismod magna euismod vitae. Nunc non cursus nisi. Donec ullamcorper iaculis tellus, a consequat tortor faucibus id. Fusce sagittis ex quis leo semper, non consequat ex euismod.
                  <br />
                  <br />
                  Aenean in tortor sed mi ornare cursus vel ac sem. Pellentesque eu scelerisque nunc, in hendrerit elit. Praesent accumsan lorem diam. Sed mollis aliquam mi, in euismod dolor faucibus sed. Vestibulum ut mi nec eros pellentesque tempus et eget turpis. Mauris scelerisque mi nunc, eget placerat leo bibendum non. Nulla vel pharetra augue.
                </p>
              </div>
            </div>
          </div>

          <div ref={panel4Ref} className="panel">
            <div ref={services} className='panel-header'>
              SERVICES
            </div>
            <div ref={servicesContent}>
              <div className='panel-text'>
                <p>
                  Aliquam sit amet accumsan lacus, vitae mollis quam. In scelerisque felis id tellus consequat vehicula. Morbi facilisis fringilla risus vel scelerisque. Suspendisse potenti. Donec vitae tincidunt elit. Pellentesque iaculis facilisis vehicula. Ut ornare ipsum nulla, et ornare magna pellentesque bibendum. Phasellus rutrum, justo eget consequat molestie, nisi dolor pretium magna, sed facilisis turpis odio semper nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi euismod sit amet massa eu varius. Aliquam id laoreet metus, a eleifend sapien. Praesent posuere, metus ac viverra convallis, lorem urna vulputate nibh, quis sagittis nisi lacus facilisis tortor. Cras ultrices aliquam semper. Donec venenatis ac mauris eu congue. Phasellus mattis venenatis elit, at laoreet diam laoreet vitae. Vestibulum rutrum mi vitae sagittis posuere.
                  <br />
                  <br />
                  Aenean laoreet odio rhoncus purus malesuada, at placerat nisi luctus. Fusce eros metus, lobortis vel turpis ac, viverra mattis dolor. Nunc vestibulum malesuada tempor. Nunc pretium ante massa, non molestie risus tempor vitae. Sed bibendum sagittis est non pretium. Maecenas tincidunt laoreet aliquam. Nunc vitae quam vitae erat facilisis dignissim vitae in purus. Ut justo nibh, interdum eu sapien quis, lacinia ullamcorper ante. Morbi ullamcorper lorem velit, eu ullamcorper purus sollicitudin vitae. Etiam sed neque ut diam tempus semper. Proin placerat nisl nec mattis finibus. Morbi id lacus ac ex iaculis mattis at ultrices ipsum. Nulla facilisi. In eu diam vitae purus malesuada porta id at ligula. Integer at eros cursus, feugiat nibh vel, rutrum ipsum.                 </p>
              </div>
            </div>
          </div>
        </section>

        <section className='footer-container'>
          <div className='noise-overlay' style={{ ['--noise-img' as any]: `url(${noise})` }} ></div>
          <div ref={footerSectionRef} >
            <Footer />
          </div>
        </section>

        <footer className="fixed bottom-4 right-4">
          <ModeToggle />
        </footer>
      </main>
    </>
  );
}

export default App;