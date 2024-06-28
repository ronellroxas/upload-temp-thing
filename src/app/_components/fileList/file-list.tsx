"use client";

import { FileStats } from "./file-stats";
import { FileItem } from "./file-item";
import styles from "./index.module.css";
import { useFileStore } from "~/app/_stores/file-store";
import { UploadFile } from "../uploadFile/upload-file";
import { useRef } from "react";

export function FileListing() {
    const files = useFileStore((state) => state.files);
    const uploadRef = useRef<HTMLInputElement>(null);

    return (
        <div className={styles.fileListing}>
            <div className={styles.fileList}>
                {files.map((file, i) => 
                    <FileItem key={i} file={file} files={files} />
                )}
            </div>
            <div className={styles.listingFooter}>
                <span 
                    className={styles.listingUploadLabel}
                    onClick={() => uploadRef.current?.click()}
                >
                    Drop your file/s here or click here to Browse
                </span>
                <UploadFile 
                    showLabel={false}
                    inputRef={uploadRef}
                />
                <FileStats />
            </div>
        </div>
    )
}