import React, { useEffect, useRef } from "react";

const Cursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        document.addEventListener("mousemove", moveCursor);
        document.body.style.cursor = "none";

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            document.body.style.cursor = "auto";
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            style={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                pointerEvents: "none",
                background: "white", // White fill, no border
                zIndex: 9999,
                transform: "translate(-50%, -50%)",
                mixBlendMode: "difference", // This is the key!
            }}
        />
    );
};

export default Cursor;