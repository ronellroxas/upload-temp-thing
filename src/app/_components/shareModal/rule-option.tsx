"use client";

import { ChangeEvent, ReactNode, useState } from "react";
import styles from "./index.module.css";

interface RuleOptionProps {
    name: string,
    inputElement: ReactNode,
    subtitle?: ReactNode,
    enabled?: boolean
}

export function RuleOption(props: RuleOptionProps) {
    const [enabled, setEnabled] = useState(props.enabled || false);

    const handleEnableChanged = (ev: ChangeEvent) => {
        let checked = (ev.target as HTMLInputElement).checked;
        setEnabled(checked);
    } 

    return (
        <div 
            className={`${styles.ruleOption} ${enabled ? styles.ruleEnabled : ""}`}
            onClick={() => setEnabled(!enabled)}    
        >
            <div className={styles.ruleRow}>
                <div className={styles.ruleTitle}>
                    <input 
                        type="checkbox" 
                        checked={enabled}
                        onChange={handleEnableChanged}
                    />
                    <span>{props.name}</span>
                </div>
                {enabled && props.inputElement}
            </div>
            {enabled && props.subtitle}
        </div>
    )
}