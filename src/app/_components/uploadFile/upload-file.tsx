"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";
import { RefObject } from "react";
import { FileUtils } from "~/app/_utils/file-utils";
import { ToastItem, ToastType, useToastStore } from "~/app/_stores/toast-store";

interface UploadFileProps {
    showLabel?: boolean,
    inputRef?: RefObject<HTMLInputElement> | null
}

export function UploadFile({ showLabel = true, inputRef = null }: UploadFileProps) {
    const [totalSpace, push] = useFileStore((state) => [state.totalSpace, state.push]);
    const pushToast = useToastStore((state) => state.push);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let uploadedFiles = e.target.files;
        
        let invalidFiles: string[] = [];
        let currSize = totalSpace;

        if (uploadedFiles != null) {
            for (let file of uploadedFiles) {
                if (currSize + file.size > FileUtils.getMaxSize()) {
                    invalidFiles.push(file.name);
                } else {
                    currSize += file.size;
                    push(file);
                }
            }
        }

        if (invalidFiles.length > 0) {
            let toast: ToastItem = {
                message: `File/s exceed size limit: ${invalidFiles.join(", ")}`,
                type: ToastType.ERROR,
                showTitle: true
            }
            pushToast(toast);
        }
    }

    return (
        <>
            {showLabel && <label 
                htmlFor="fileupload"
                className={styles.uploadContainer}
            >
                Drop your file/s here or Click to Browse
            </label>
            }
            <input 
                ref={inputRef}
                onChange={handleUpload}
                id="fileupload" name="fileupload"
                type="file"
                style={{ display: 'none' }}
                multiple
            />
        </>
    )
}