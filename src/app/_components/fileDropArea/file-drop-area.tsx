"use client";

import { FileListing } from "../fileList/file-list";
import styles from "./index.module.css";
import { UploadFile } from "../uploadFile/upload-file";
import { useFileStore } from "~/app/_stores/file-store";
import { Sidebar } from "../sidebar/sidebar";
import { DragEvent, MouseEvent, useEffect, useState } from "react";

export function FileDropArea() {
    const [files, push] = useFileStore((state) => [state.files, state.push]);
    const [draggingFile, setDraggingFile] = useState(0);
    const [dragOngoing, setDragOngoing] = useState(false);

    useEffect(() => {
        // everytime new file is updated, update related ui
        setDraggingFile(0);
        setDragOngoing(false);
    }, [files])
    const handleFileDrop = (e: DragEvent) => {
        e.preventDefault();
        let items = e.dataTransfer.items;

        [...items].forEach((item) => {
            if (item.kind === "file") {
                let file = item.getAsFile();
                if (file != null) push(file);
            }
        });
    }

    const handleDragEnter = (e: DragEvent) => {
        e.preventDefault();
        if (dragOngoing) return;

        let items = e.dataTransfer.items;
        let fileCount = [...items].filter((item) => item.kind == "file").length;
        if (fileCount > 0) {
            setDraggingFile(fileCount);
        }
        setDragOngoing(true);
    }

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    }

    return (
        <div 
            id="drop_zone"
            className={styles.fileDropArea}
            onDrop={handleFileDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
        >
            {dragOngoing && 
                <div className={styles.dragOverlay}>
                    <span>Upload {draggingFile} file/s</span>
                </div>
            }
            {files.length > 0 ? 
                <>
                    <FileListing />
                    <Sidebar />
                </>
                :
                <UploadFile />
            }
        </div>
    )
}