"use client";

import { ToastType, useToastStore } from "~/app/_stores/toast-store";
import styles from "./index.module.css";

export function Navbar() {
    const pushToast = useToastStore((state) => state.push);

    const handleOnClick = () => {
        pushToast({
            message: "Not yet available.",
            type: ToastType.INFO,
            showTitle: true
        })
    }

    return (
        <ul className={styles.navbar}>
            <li>
                <button onClick={handleOnClick} disabled>Light</button>
            </li>
            <li>
                <button onClick={handleOnClick} disabled>Sign In</button>
            </li>
            <li>
                <button onClick={handleOnClick} disabled>Help</button>
            </li>
        </ul>
    )
}