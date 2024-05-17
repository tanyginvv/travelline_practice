import React from 'react';
import styles from "./inputPanel.module.css";

type InputType = 'text' | 'textarea';

type InputProp = {
    id: number;
    label?: string;
    placeholder: string;
    type: InputType;
};

interface InputPanelProps {
    inputs: InputProp[];
    handleInputChange: (id: number, value: string) => void;
    inputValues: { id: number; value: string }[];
}

export const InputPanel: React.FC<InputPanelProps> = ({ inputs, handleInputChange, inputValues }) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
        handleInputChange(id, event.target.value);
    };

    return (
        <div className={styles.inputPanel}>
            {inputs.map((input) => (
                <div className={styles.inputItem} key={input.id}>
                    {input.label && <label className={styles.inputLabel}>{input.label}</label>}
                    {input.type === 'text' ? (
                        <input
                            className={styles.inputArea}
                            type="text"
                            placeholder={input.placeholder}
                            value={inputValues.find(i => i.id === input.id)?.value || ""}
                            onChange={(e) => handleInput(e, input.id)}
                        />
                    ) : (
                        <textarea
                            className={styles.textArea}
                            placeholder={input.placeholder}
                            value={inputValues.find(i => i.id === input.id)?.value || ""}
                            onChange={(e) => handleInput(e, input.id)}
                        ></textarea>
                    )}
                </div>
            ))}
        </div>
    );
};