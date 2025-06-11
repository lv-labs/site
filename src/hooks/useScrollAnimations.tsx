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
    const software = useRef<HTMLDivElement>(null);
    const services = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let isResizing = false;

        const createAnimations = () => {
            // Store current scroll progress BEFORE killing ScrollTriggers
            const currentScrollY = window.scrollY;
            const oldScrollHeight = document.body.scrollHeight;
            const currentProgress = oldScrollHeight > 0 ? currentScrollY / oldScrollHeight : 0;

            // Kill existing ScrollTriggers
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());

            const heroSectionHeight = window.innerHeight;
            const horizontalMovementDistance = window.innerWidth * (3);
            const totalScrollHeight = heroSectionHeight + horizontalMovementDistance + window.innerHeight;

            const snapPointsInPx = [
                0,
                heroSectionHeight,
                heroSectionHeight + (1 * window.innerWidth),
                heroSectionHeight + (2 * window.innerWidth),
                heroSectionHeight + (3 * window.innerWidth),
                totalScrollHeight,
            ];
            // const normalizedSnapPoints = snapPointsInPx.map(px => px / totalScrollHeight);

            gsap.timeline()
                .set(".scroll-down", { opacity: 0 })
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
            });

            const master_tl = gsap.timeline({
                scrollTrigger: {
                    markers: false,
                    trigger: heroSectionRef.current,
                    start: 'top top',
                    end: () => `+=${totalScrollHeight}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                    // snap: {
                    //     snapTo: normalizedSnapPoints,
                    //     duration: 1,
                    //     ease: 'power4.out',
                    //     directional: true,
                    // },
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
                end: () => `top+=${snapPointsInPx[1] + (window.innerWidth * 0.1)} top`,
                scrub: true,
                animation: gsap.fromTo(aboutContent.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
            });

            // About fade OUT
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[1]} top`,
                end: () => `top+=${snapPointsInPx[1] + (window.innerWidth * 0.3)} top`,
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

            // Hardware fade OUT
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[2]} top`,
                end: () => `top+=${snapPointsInPx[2] + (window.innerWidth * 0.1)} top`,
                scrub: true,
                animation: gsap.fromTo(hardware.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
            });

            // Software fade IN
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[2] + (window.innerWidth * 0.5)} top`,
                end: () => `top+=${snapPointsInPx[3]} top`,
                scrub: true,
                animation: gsap.fromTo(software.current, { opacity: 0 }, { opacity: 1 }),
            });

            // Software fade OUT
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[3]} top`,
                end: () => `top+=${snapPointsInPx[3] + (window.innerWidth * 0.1)} top`,
                scrub: true,
                animation: gsap.fromTo(software.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
            });

            // Services fade IN
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[3] + (window.innerWidth * 0.5)} top`,
                end: () => `top+=${snapPointsInPx[4]} top`,
                scrub: true,
                animation: gsap.fromTo(services.current, { opacity: 0 }, { opacity: 1 }),
            });

            // Services fade OUT
            ScrollTrigger.create({
                trigger: heroSectionRef.current,
                start: () => `top+=${snapPointsInPx[4]} top`,
                end: () => `top+=${snapPointsInPx[4] + (window.innerHeight * 0.1)} top`,
                scrub: true,
                animation: gsap.fromTo(services.current, { opacity: 1 }, { opacity: 0, immediateRender: false }),
            });

            // Handle scroll position adjustment AFTER everything is set up
            if (isResizing && currentProgress > 0) {
                ScrollTrigger.addEventListener("refresh", () => {
                    requestAnimationFrame(() => {
                        const newScrollHeight = document.body.scrollHeight;
                        const newScrollY = Math.min(
                            currentProgress * newScrollHeight,
                            newScrollHeight - window.innerHeight
                        );

                        if (newScrollY > 0) {
                            window.scrollTo(0, newScrollY);
                        }
                    });
                });

                ScrollTrigger.refresh();
            }
        };

        // Initial setup
        createAnimations();

        // Handle window resize
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
            isResizing = true;
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createAnimations();
                setTimeout(() => {
                    isResizing = false;
                }, 200);
            }, 150);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
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
        software,
        services,
    };
};