"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";

export function UploadFile() {
    const pushToFileStore = useFileStore((state) => state.push);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;

        if (files != null) {
            for (let file of files) {
                pushToFileStore(file);
            }
        }
    }

    return (
        <>
            <label 
                htmlFor="fileupload"
                className={styles.uploadContainer}
            >
                Browse or Upload File
            </label>
            <input 
                onChange={handleUpload}
                id="fileupload" name="fileupload"
                type="file"
                style={{ display: 'none' }}
                multiple
            />
        </>
    )
}