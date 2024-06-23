"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";

interface ShareButtonProps {
    onClick: () => void
}

export function ShareButton({ onClick }: ShareButtonProps) {
    const files = useFileStore((state) => state.files);

    return (
        <>
            {files.length > 0 &&
                <button className={styles.shareButton} onClick={onClick}>
                Share File/s
            </button>
            }
        </>
    )
}