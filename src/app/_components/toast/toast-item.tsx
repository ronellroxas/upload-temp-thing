"use client";

import { ToastItem as ToastItemBo, ToastType } from "~/app/_stores/toast-store";
import styles from "./index.module.css";
import { useEffect, useRef } from "react";

interface ToastItemProps {
    item: ToastItemBo
}

const ANIM_DURATION = 300;

export function ToastItem({ item }: ToastItemProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (item.type == ToastType.ERROR) return;

        setTimeout(() => {
            removeSelf(ref.current);
        }, 5*1000);
    }, []);

    const onClickHandler = () => {
        removeSelf(ref.current);
    }

    /**
     * Removes self. Animates the removal.
     */
    const removeSelf = (el: HTMLDivElement | null) => {
        if (el == null) return;

        let keyframes = {
            transform: "translate(100%, 0)", 
            opacity: 0
        };
        
        el.animate(keyframes, {
            duration: ANIM_DURATION,
            easing: "ease-in-out",
            fill: "forwards"
        });
        
        setTimeout(() => {
            el.remove();
        }, ANIM_DURATION)
    }

    const getTitle = () : string => {
        if (!item.showTitle) return "";

        switch (item.type) {
            case ToastType.ERROR:
                return "Error";
            case ToastType.INFO:
                return "Info";
            case ToastType.SUCCESS:
                return "Success";
        }
    }
    return (
        <div 
            ref={ref} 
            className={styles.toastItem} 
            data-type={item.type}
            onClick={() => onClickHandler()}
        >
            <span className={styles.toastTitle}>{getTitle()}</span>
            <span className={styles.toastMessage}>{item.message}</span>
        </div>
    )
}