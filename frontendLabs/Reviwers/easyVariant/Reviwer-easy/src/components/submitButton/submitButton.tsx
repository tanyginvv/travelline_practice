import React from 'react';
import styles from "./submitButton.module.css";

interface SubmitButtonProps {
    disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ disabled }) => {
    return (
        <div className={styles.buttonPanel}>
            <button className={styles.submitButton} type="submit" disabled={disabled}>
                Отправить
            </button>
        </div>
    );
};