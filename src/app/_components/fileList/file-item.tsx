"use client";

import { FileUtils } from "~/app/_utils/file-utils";
import styles from "./index.module.css";
import { useFileStore } from "~/app/_stores/file-store";
import { useTooltipStore } from "~/app/_stores/tooltip-store";
import { useRef, useState } from "react";

interface FileItemProps {
    file: File,
    files: File[]
}

const REMOVE_ANIMATION_DURATION = 400;

export function FileItem({ file }: FileItemProps) {
    const remove = useFileStore((state) => state.remove);
    const [setTooltip, clearTooltip] = useTooltipStore((state) => [state.setTooltip, state.clearTooltip]);
    const [hovering, setHovering] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const removeFile = (file: File) => {
        const target = ref.current

        if (target != null) {
            const keyframes = {
                width: "0%",
            }

            target.animate(keyframes, {
                duration: REMOVE_ANIMATION_DURATION,
                easing: "ease-out"
            })
        }

        setTimeout(() => remove(file), REMOVE_ANIMATION_DURATION);
    }

    const handleMouseEnter = () => {
        setTooltip("Remove File");
        setHovering(true);
    }

    const handleMouseLeave = () => {
        clearTooltip();
        setHovering(false);
    }

    return (
        <div
            ref={ref}
            className={styles.fileItem} 
            onClick={() => removeFile(file)}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
        >
            <div className={styles.fileItemDetails}>
            <span className={styles.fileName}>{file.name}</span>
            <span className={styles.fileSize}>({FileUtils.formatBytesToDisplay(file.size)}mb)</span>
            </div>
            <span className={`${styles.remove} ${hovering ? styles.hovering : ""}`}>REMOVE</span>
        </div>
    )
}