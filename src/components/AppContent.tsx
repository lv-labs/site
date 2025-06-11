import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
    const animationContainerRef = useRef<HTMLDivElement>(null); // Ref for the container we'll pin
    const box1Ref = useRef<HTMLDivElement>(null);
    const box2Ref = useRef<HTMLDivElement>(null);
    const box3Ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (
            !animationContainerRef.current ||
            !box1Ref.current ||
            !box2Ref.current ||
            !box3Ref.current
        ) {
            console.warn("Some refs are null. Scroll animation might not initialize.");
            return;
        }

        // 1. Create a new GSAP Timeline
        const masterTimeline = gsap.timeline({
            // 2. Attach ScrollTrigger directly to the timeline
            scrollTrigger: {
                trigger: animationContainerRef.current, // Element that triggers the scroll
                start: 'top top', // When the top of the trigger hits the top of the viewport
                end: '+=2000', // Scroll for 2000 pixels to complete the animation
                scrub: true, // Link scroll position to timeline progress (0 to 1)
                pin: true, // Pin the animationContainerRef during the scroll
                anticipatePin: 1, // Helps with smoother pinning start
                markers: true, // Shows start/end/pin-spacer markers - GREAT for debugging!
                onUpdate: (self) => {
                    // You can still get progress and other info here
                    // console.log("ScrollTrigger progress:", self.progress);
                },
            },
            defaults: { duration: 1, ease: 'power1.out' }, // Default duration and ease for tweens in this timeline
            onComplete: () => console.log('Timeline completed via scroll!'),
            onReverseComplete: () => console.log('Timeline reversed via scroll to start!'),
        });

        // 3. Add tweens to the timeline (these will now be scrubbed by scroll)

        // Animation 1: Box 1 moves right
        masterTimeline.to(box1Ref.current, {
            x: 200,
            rotation: 360,
            opacity: 0.5,
        });

        // Animation 2: Box 2 moves right (after Box 1, due to defaults)
        masterTimeline.to(box2Ref.current, {
            x: 200,
            backgroundColor: '#f0e68c', // Khaki color
            scale: 1.2,
        });

        // Animation 3: Box 3 moves right (after Box 2)
        masterTimeline.to(box3Ref.current, {
            x: 200,
            borderRadius: '50%', // Make it circular
        });

        // Animation 4: All boxes change color (simultaneously)
        masterTimeline.to(
            [box1Ref.current, box2Ref.current, box3Ref.current],
            {
                backgroundColor: '#8a2be2', // BlueViolet
                duration: 1.5, // This tween has a different duration
                ease: 'power2.inOut',
            },
            '-=0.5', // Start this animation 0.5 seconds before the current end of the timeline
        );

        // Clean up on component unmount
        return () => {
            masterTimeline.kill(); // Kills the timeline and its associated ScrollTrigger
        };
    }, []); // Empty dependency array to run once on mount

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Spacer to allow initial scroll */}
            <div className="spacer">
                <h1>Scroll Down!</h1>
            </div>

            {/* This is the container that will be pinned and where animations occur */}
            <div ref={animationContainerRef} className="animation-container">
                <h1>GSAP ScrollTrigger Timeline</h1>
                <div ref={box1Ref} className="box box-1">Box 1</div>
                <div ref={box2Ref} className="box box-2">Box 2</div>
                <div ref={box3Ref} className="box box-3">Box 3</div>
            </div>

            {/* Spacer to allow final scroll after pinning */}
            <div className="spacer">
                <h1>End of Animations!</h1>
            </div>

            {/*
        Removed buttons and slider as they are not needed for scroll control
        You can uncomment them if you want to keep them for manual testing,
        but remember they won't control the `masterTimeline` anymore if it's
        attached to ScrollTrigger with `scrub: true`.
      */}
            {/*
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button id="playButton">Play</button>
        <button id="reverseButton">Reverse</button>
        <button id="pauseButton">Pause</button>
        <button id="resumeButton">Resume</button>
        <button id="resetButton">Reset</button>
      </div>
      <label htmlFor="progressSlider" style={{ marginTop: '20px' }}>Timeline Progress:</label>
      <input type="range" id="progressSlider" min="0" max="1" step="0.001" value="0" />
      */}
        </div>
    );
}

export default AppContent;