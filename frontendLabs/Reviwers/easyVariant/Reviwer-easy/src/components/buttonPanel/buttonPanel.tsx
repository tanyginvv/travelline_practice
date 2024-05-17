import React from 'react';
import { Button } from "../button/button";
import styles from "./buttonPanel.module.css";
import AngryFace from "../../assets/angry-face.svg";
import GrinningFace from "../../assets/grinning-face-with-big-eyes.svg";
import NeutralFace from "../../assets/neutral-face.svg";
import FrowningFace from "../../assets/slightly-frowning-face.svg";
import SmilingFace from "../../assets/slightly-smiling-face.svg";

type ButtonPhoto = {
    id: number;
    src: string;
}

interface ButtonPanelProps {
    activeButtonId: number | null;
    setActiveButtonId: (id: number) => void;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({ activeButtonId, setActiveButtonId }) => {
    const ButtonPhotos: ButtonPhoto[] = [
        { id: 1, src: AngryFace },
        { id: 2, src: FrowningFace },
        { id: 3, src: NeutralFace },
        { id: 4, src: SmilingFace },
        { id: 5, src: GrinningFace },
    ];

    return (
        <div className={styles.buttonPanel}>
            {ButtonPhotos.map((photo) => (
                <Button
                    key={photo.id}
                    src={photo.src}
                    isActive={photo.id === activeButtonId}
                    onClick={() => setActiveButtonId(photo.id)}
                />
            ))}
        </div>
    );
}