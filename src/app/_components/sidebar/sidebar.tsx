"use client";

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { RuleOption } from "../ruleOption/rule-option";
import styles from "./index.module.css";
import { ShareButton } from "../shareButton/share-button";

const MAX_NUM_INPUT = 99;
const MIN_NUM_INPUT = 1;

export function Sidebar() {
    const [accessCount, setAccessCount] = useState<number>(1);
    const [dateRule, setDateRule] = useState<Date>(new Date());
    const [defaultSelected, setDefaultSelected] = useState(true);
    const [accessEnabled, setAccessEnabled] = useState(false);
    const [dateEnabled, setDateEnabled] = useState(false);

    const handleAccessCountChange = (ev: ChangeEvent) => {
        const value = (ev.target as HTMLInputElement).value;

        if (!isNaN(Number.parseInt(value))) {
            let num = Number.parseInt(value);
            if (num > MAX_NUM_INPUT) {
                setAccessCount(MAX_NUM_INPUT);
            } else if (num < MIN_NUM_INPUT) {
                setAccessCount(MIN_NUM_INPUT);
            } else {
                setAccessCount(Number.parseInt(value))
            }
        }
    }

    const handleDateChange = (ev: ChangeEvent) => {
        const value = (ev.target as HTMLInputElement).value;

        setDateRule(new Date(value));
    }

    const disablePropagate = (ev: MouseEvent) => {
        ev.stopPropagation();
    }

    const performStep = (ev: MouseEvent, step: number) => {
        ev.stopPropagation();
        if (step > 0 && accessCount == MAX_NUM_INPUT) {
            setAccessCount(MIN_NUM_INPUT);
        } else if (step < 0 && accessCount == MIN_NUM_INPUT) {
            setAccessCount(MAX_NUM_INPUT);
        } else {
            setAccessCount(accessCount + step);
        }
    }

    const handleDefaultState = (enabled: boolean) => {
        if (enabled) setDefaultSelected(false);
    }

    const handleDefaultSelected = (enabled: boolean) => {
        if (enabled) {
            setAccessEnabled(false);
            setDateEnabled(false);
        }
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.ruleList}>
                <h2>Expiry Options</h2>
                <RuleOption
                    name="Default"
                    isDefault={true}
                    enabled={defaultSelected}
                    setEnabled={setDefaultSelected}
                    onEnabledChange={handleDefaultSelected}
                    inputElement={
                        <></>
                    }
                    subtitle={
                        <span className={styles.ruleLabel}>
                            Files will be available for <span className={styles.primarySpan}>24 hours</span>
                        </span>
                    }
                />
                <RuleOption
                    name="Download"
                    enabled={accessEnabled}
                    setEnabled={setAccessEnabled}
                    onEnabledChange={handleDefaultState}
                    inputElement={
                        <div className={styles.numInput}>
                            <button
                                onClick={(ev) => performStep(ev, -1)}
                                className={styles.numButton}>-</button>
                            <input
                                className={styles.input}
                                onClick={disablePropagate}
                                type="number"
                                min={MIN_NUM_INPUT}
                                max={MAX_NUM_INPUT}
                                step={1}
                                value={accessCount}
                                onChange={handleAccessCountChange}
                            />
                            <button
                                onClick={(ev) => performStep(ev, 1)}
                                className={styles.numButton}>+</button>
                        </div>
                    }
                    subtitle={
                        <span className={styles.ruleLabel}>
                            Files can only be downloaded <span className={styles.primarySpan}>{accessCount} time/s</span>
                        </span>
                    }
                />
                <RuleOption
                    name="Date"
                    enabled={dateEnabled}
                    setEnabled={setDateEnabled}
                    onEnabledChange={handleDefaultState}
                    inputElement={
                        <input
                            onClick={disablePropagate}
                            type="date"
                            value={dateRule.toISOString().substring(0, 10)}
                            onChange={handleDateChange}
                        />
                    }
                    subtitle={
                        <span className={styles.ruleLabel}>
                            Files will be available until <span className={styles.primarySpan}>{dateRule.toISOString().substring(0, 10)}</span>
                        </span>
                    }
                />
            </div>
            <ShareButton />
        </div>
    )
}