"use client";

import { ReactNode } from "react";
import styles from "./index.module.css";

interface RuleOptionProps {
    name: string,
    isDefault?: boolean,
    inputElement: ReactNode,
    subtitle?: ReactNode,
    enabled: boolean,
    setEnabled: (enabled: boolean) => void,
    onEnabledChange?: (enabled: boolean) => void
}

export function RuleOption({
    name, 
    isDefault = false,
    inputElement, 
    subtitle = null, 
    enabled, 
    setEnabled,
    onEnabledChange
}: RuleOptionProps) {

    const handleEnableChanged = (checked: boolean) => {
        if (isDefault && enabled) return;
        setEnabled(checked);
        if (onEnabledChange != undefined) onEnabledChange(checked);
    } 
    
    return (
        <div 
            className={`${styles.ruleOption} ${enabled ? styles.ruleEnabled : ""}`}
            onClick={() => handleEnableChanged(!enabled)}    
        >
            <div className={styles.ruleRow}>
                <div className={styles.ruleTitle}>
                    <input 
                        type="checkbox" 
                        checked={enabled}
                        onChange={(e) => e.target.checked}
                        disabled={isDefault && enabled}

                    />
                    <span>{name}</span>
                </div>
                {enabled && inputElement}
            </div>
            {enabled && subtitle}
        </div>
    )
}