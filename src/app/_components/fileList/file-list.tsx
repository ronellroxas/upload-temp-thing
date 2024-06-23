"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";
import { FileUtils } from "~/app/_utils/file-utils";
import { useTooltipStore } from "~/app/_stores/tooltip-store";

export function FileListing() {
    const [files, remove] = useFileStore((state) => [state.files, state.remove]);
    const [setTooltip, clearTooltip] = useTooltipStore((state) => [state.setTooltip, state.clearTooltip]);

    return (
        <>
            {files.length > 0 &&
                <div className={styles.fileList}>
                    {files.map((file, i) => (
                        <div 
                            key={i} 
                            className={styles.fileRow}
                            onMouseEnter={() => setTooltip("Remove File")}
                            onMouseLeave={() => clearTooltip()}
                            onClick={() => remove(file)}                            
                        >
                            <div className={styles.fileRowOverlay}></div>
                            <span className={styles.fileName}>{file.name}</span>
                            <div className={styles.fileSize}>
                                {FileUtils.formatBytesToDisplay(file.size)}MB
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>

    )
}