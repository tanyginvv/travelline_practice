import React from 'react';
import styles from "./radioButtonWithEmoji.module.css";

interface RadioButtonProps {
    src: string;
    alt: string;
    isActive: boolean;
    onClick: () => void;
}

export const RadioButtonWithEmoji: React.FC<RadioButtonProps> = ({ src, alt, isActive, onClick}) => {
    return (
        <label className={`${styles.buttonLabel} ${isActive ? styles.activeBtn : ''}`} onClick={onClick}>
            <input type="radio" readOnly className={styles.radioBtn} />
            <img src={src} alt={alt} className={styles.radioImg} />
        </label>
    );
};