"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";
import { FileUtils } from "~/app/_utils/file-utils";

export function FileStats() {
    const [files, size] = useFileStore((state) => [state.files, state.totalSpace]);

    return (
        <div className={styles.fileListStats}>
            <div className={styles.statItem}>
                <span className={styles.stat}>{files.length}</span>
                <span className={styles.statLabel}>file/s uploaded</span>
            </div>
            <div className={styles.statItem}>
                <span className={styles.stat}>{FileUtils.formatBytesToDisplay(size)}</span>
                <span className={styles.statLabel}>/{FileUtils.formatBytesToDisplay(5e+6)}mb available</span>
            </div>
        </div>
    )
}