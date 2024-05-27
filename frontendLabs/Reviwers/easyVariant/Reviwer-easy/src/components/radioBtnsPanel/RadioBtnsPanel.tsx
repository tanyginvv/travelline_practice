import React from 'react';
import { RadioButton } from '../button/radioBtn';
import styles from "./RadioBtnsPanel.module.css";
import AngryFace from "../../assets/images/angry-face.svg";
import GrinningFace from "../../assets/images/grinning-face-with-big-eyes.svg";
import NeutralFace from "../../assets/images/neutral-face.svg";
import FrowningFace from "../../assets/images/slightly-frowning-face.svg";
import SmilingFace from "../../assets/images/slightly-smiling-face.svg";

type Button = {
    id: number;
    src: string;
    alt: string;
    value: number;
}

interface RadioBtnPanelProps {
    reviewValue: number | null;
    setReviewValue: (id: number) => void;
}

const Buttons: Button[] = [
    { id: 1, src: AngryFace, alt: "Очень плохо", value: 1},
    { id: 2, src: FrowningFace, alt: "Плохо", value: 2 },
    { id: 3, src: NeutralFace, alt: "Нейтрально", value: 3 },
    { id: 4, src: SmilingFace, alt: "Хорошо", value: 4 },
    { id: 5, src: GrinningFace, alt: "Очень хорошо", value: 5 },
];

export const RadioBtnsPanel: React.FC<RadioBtnPanelProps> = ({ reviewValue, setReviewValue }) => {
    return (
        <div className={styles.buttonPanel}>
            {Buttons.map((button) => (
                <RadioButton
                    key={button.id}
                    src={button.src}
                    alt={button.alt}
                    isActive={button.value === reviewValue}
                    onClick={() => setReviewValue(button.value)}
                />
            ))}
        </div>
    );
};