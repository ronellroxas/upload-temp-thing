"use client";

import { useFileStore } from "~/app/_stores/file-store";
import styles from "./index.module.css";


async function doUpload(files: File[]) : Promise<boolean> {
    console.log("starting file uploads");

    const res = await fetch("/api/file", {
        method: "POST"
    });
    return res.ok
}

export function ShareButton() {
    const files = useFileStore((state) => state.files);

    const uploadFiles = async () => {
        let success = await doUpload(files)

        console.log(`Upload result: ${success}`);
    }

    return (
        <>
            {files.length > 0 ? 
                <button className={styles.shareButton} onClick={uploadFiles}>
                    Share File/s
                </button>
                :
                <p></p>
            }
        </>
    )
}