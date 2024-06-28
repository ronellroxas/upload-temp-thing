"use client";

import { useToastStore } from "~/app/_stores/toast-store";
import styles from "./index.module.css";
import { ToastItem } from "./toast-item";

export function ToastList() {
    const toastQueue = useToastStore((state) => state.queue);

    return (
        <div className={styles.toastList}>
            {toastQueue.map((item, i) => <ToastItem key={i} item={item} />)}
        </div>
    )
}