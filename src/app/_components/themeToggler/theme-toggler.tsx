"use client";

import styles from "./index.module.css";

export function ThemeToggler() {
    return (
        <div className={styles.themeToggler}>
            <button>
                Light
            </button>
            <button>
                Sign In
            </button>
            <button>
                Help
            </button>
        </div>
    )
}