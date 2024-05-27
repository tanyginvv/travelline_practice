import React from 'react';
import styles from "./inputPanel.module.css";

interface InputPanelProps {
    handleInputChange: (id: string, value: string) => void;
    userName: string;
    userReview: string;
}

export const InputPanel: React.FC<InputPanelProps> = ({ handleInputChange, userName, userReview }) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        handleInputChange(id, value);
    };

    return (
        <div className={styles.inputPanel}>
            <div className={styles.inputItem}>
                <label className={styles.inputLabel}>*Имя</label>
                <input
                    id="userName"
                    className={styles.inputArea}
                    type="text"
                    placeholder='Как вас зовут?'
                    value={userName}
                    onChange={handleInput}
                />
                <textarea
                    id="userReview"
                    className={styles.textArea}
                    placeholder='Напишите, что понравилось, что было непонятно'
                    value={userReview}
                    onChange={handleInput}
                ></textarea>
            </div>
        </div>
    );
};