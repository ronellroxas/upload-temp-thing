"use client";

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import styles from "./index.module.css";
import { RuleOption } from "./rule-option";
import { useFileStore } from "~/app/_stores/file-store";

interface ShareModalProps {
    close?: () => void
}

const MAX_NUM_INPUT = 99
const MIN_NUM_INPUT = 1

export function ShareModal({ close = () => { } }: ShareModalProps) {
    const files = useFileStore((state) => state.files);

    const [accessCount, setAccessCount] = useState<number>(1);
    const [dateRule, setDateRule] = useState<Date>(new Date());

    const containerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

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

    /**
     * Close the modal by sliding animation first, then actually close
     * by calling close() method.
     */
    const handleClose = () => {
        const ANIMATION_DURATION = 400;
        if (containerRef != null && containerRef.current != null) {
            // animate exit first
            let keyframes = {
                transform: "translate(-50%, 200%)",
                opacity: 0
            }

            containerRef.current!!.animate(keyframes, {
                duration: ANIMATION_DURATION
            });
        }

        // close even if containerRef is null
        // close only after animation
        setTimeout(() => {
            close()
        }, ANIMATION_DURATION)
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

    return (
        <div className={styles.rulesModal}>
            <div
                ref={backdropRef}
                className={styles.modalBackdrop}
                onClick={() => handleClose()}
            ></div>
            <div className={styles.modalContainer} ref={containerRef}>
                <div className={styles.modalTitle}>
                    <h2>Share Files</h2>
                    <button type="button" className={styles.submitButton}>Share {files.length} file/s</button>
                </div>
                <div className={styles.linkBox}>Share file/s to generate link</div>
                <div className={styles.expiryTitle}>
                    <h3>Expiry Options</h3>
                    <span className={styles.expirySubtitle}>Link will expire in 24 hours if no expiry options are selected</span>
                </div>
                <div className={styles.ruleList}>
                    <RuleOption
                        name="Access"
                        enabled={true}
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
                                The link can only be opened <span className={styles.primarySpan}>{accessCount} times</span>
                            </span>
                        }
                    />
                    <RuleOption
                        name="Date"
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
                                The files and share link will only be available until <span className={styles.primarySpan}>{dateRule.toISOString().substring(0, 10)}</span>
                            </span>
                        }
                    />
                </div>
                <button
                    className={styles.closeButton}
                    onClick={() => handleClose()}
                >CLICK HERE TO CLOSE</button>
            </div>
        </div>
    )
}