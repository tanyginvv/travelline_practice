import React from 'react';
import styles from "./button.module.css";

interface ButtonProps {
    src: string;
    isActive: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ src, isActive, onClick }) => {
    return (
        <button 
            className={`${styles.button} ${isActive ? styles.active : ''}`}
            onClick={(event) => {
                event.preventDefault();
                onClick(event);
            }}
        >
            <img className={styles.buttonImg} src={src} />
        </button>
    );
}
