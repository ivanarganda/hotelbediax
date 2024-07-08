import React, { useRef } from 'react';
import { useInView } from "framer-motion";
export default function useFadeIn(threshold = 0.5) {
    function Section({ children }) {
        const ref = useRef(null);
        const isInView = useInView(ref, { threshold });
        return (
            <section ref={ref}>
                <span
                    style={{
                        transform: isInView ? "none" : "translateX(-200px)",
                        opacity: isInView ? 1 : 0,
                        transition: "transform 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s, opacity 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
                    }}
                >
                    {children}
                </span>
            </section>
        );
    }
    return [ Section ];
}