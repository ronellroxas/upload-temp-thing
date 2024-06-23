"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useTooltipStore } from "~/app/_stores/tooltip-store";

export function AppToolTip() {
    const tooltipState = useTooltipStore((state) => state.tooltip);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tooltip = ref.current
        const main = document.querySelector("main");

        if (main == null) return;

        main.onmousemove = (ev: MouseEvent) => {
            if (tooltip != null) {
                let x = ev.clientX - tooltip.clientWidth/2;
                let y = ev.clientY - tooltip.clientHeight;
                
                let opacity = tooltipState == null ? 0 : 1;
                
                let keyframes = {
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: opacity
                }

                tooltip.animate(keyframes, {
                    duration: 1200,
                    fill: "forwards"
                })
            }
        }

        return () => {
            main.onmousemove = null
        }
    }, [tooltipState])

    return (
        <>
            <div 
                ref={ref}
                className={styles.tooltip}
            >
                Remove File
            </div>
        </>
    )
}