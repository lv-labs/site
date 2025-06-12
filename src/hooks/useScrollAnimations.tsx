import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
    // Refs for the main sections
    const mainRef = useRef<HTMLElement>(null);
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
    const hardwareContent = useRef<HTMLDivElement>(null);
    const software = useRef<HTMLDivElement>(null);
    const softwareContent = useRef<HTMLDivElement>(null);
    const services = useRef<HTMLDivElement>(null);
    const servicesContent = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        const heroSectionHeight = window.innerHeight;
        const horizontalMovementDistance = window.innerWidth * (3);
        const totalScrollHeight = heroSectionHeight + horizontalMovementDistance + window.innerHeight;

        const master_tl = gsap.timeline({
            scrollTrigger: {
                markers: true,
                trigger: heroSectionRef.current,
                start: 'top top',
                end: () => `+=${totalScrollHeight}`,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        const horizontal_tl = gsap.timeline({
            scrollTrigger: {
                markers: false,
                trigger: panelsContainerRef.current,
                start: 'top top',
                end: () => `+=${horizontalMovementDistance}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        gsap.set([panel1Ref.current, panel2Ref.current, panel3Ref.current, panel4Ref.current, footerSectionRef.current], { opacity: 0 });

        master_tl.addLabel('start');
        master_tl.to(heroSectionRef.current, { opacity: 0, duration: 0.1 });
        master_tl.addLabel('heroSectionEnd');
        master_tl.to(panel1Ref.current, { opacity: 1, duration: 0.1 });
        master_tl.to({}, { duration: horizontalMovementDistance / totalScrollHeight }, 'heroSectionEnd');

        master_tl.addLabel('horizontalSectionEnd');
        master_tl.to({}, { duration: window.innerHeight / totalScrollHeight }, 'horizontalSectionEnd');
        master_tl.to(footerSectionRef.current, { opacity: 1, duration: 0.1 }, 'horizontalSectionEnd+=1');
        master_tl.addLabel('footerSectionEnd');

        // horizontal_tl
        //     .to(panel1Ref.current, { opacity: 0, duration: 0.3 })
        //     .to(panelsContainerRef.current, { x: -(1 * window.innerWidth), duration: 0.1 })
        //     .to(panel2Ref.current, { opacity: 1, duration: 0.3 })

        //     .to(panel2Ref.current, { opacity: 0, duration: 0.3 })
        //     .to(panelsContainerRef.current, { x: -(2 * window.innerWidth), duration: 0.1 })
        //     .to(panel3Ref.current, { opacity: 1, duration: 0.3 })

        //     .to(panel3Ref.current, { opacity: 0, duration: 0.3 })
        //     .to(panelsContainerRef.current, { x: -(3 * window.innerWidth), duration: 0.1 })
        //     .to(panel4Ref.current, { opacity: 1, duration: 0.3 });

        horizontal_tl.addLabel('start');

        // Each transition takes 1 second total
        horizontal_tl.to(panel1Ref.current, { duration: 0.25 }, '>');
        horizontal_tl.to(panel1Ref.current, { opacity: 0, duration: 0.1 }, '>');
        horizontal_tl.to(panelsContainerRef.current, { x: -(1 * window.innerWidth), duration: 0.5 }, '<');
        horizontal_tl.to(panel2Ref.current, { opacity: 1, duration: 0.1 }, '<+=0.4');

        horizontal_tl.to(panel2Ref.current, { duration: 0.25 }, '>');
        horizontal_tl.to(panel2Ref.current, { opacity: 0, duration: 0.1 }, '>');
        horizontal_tl.to(panelsContainerRef.current, { x: -(2 * window.innerWidth), duration: 0.5 }, '<');
        horizontal_tl.to(panel3Ref.current, { opacity: 1, duration: 0.1 }, '<+=0.4');

        horizontal_tl.to(panel3Ref.current, { duration: 0.25 }, '>');
        horizontal_tl.to(panel3Ref.current, { opacity: 0, duration: 0.1 }, '>');
        horizontal_tl.to(panelsContainerRef.current, { x: -(3 * window.innerWidth), duration: 0.5 }, '<');
        horizontal_tl.to(panel4Ref.current, { opacity: 1, duration: 0.1 }, '<+=0.4');

        horizontal_tl.to(panel1Ref.current, { duration: 0.25 }, '>');

    }, { scope: mainRef });

    return {
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
    };
};