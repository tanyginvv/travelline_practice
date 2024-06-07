import { useState } from "react";
import styles from "./examinationPanel.module.scss";
import { ExaminationInputs } from "../examinationInputs/examinationInputs";
import { getRussianWordByEnglish } from "../../../store/store";

type examProps = {
    russian: string;
    counter: (isAnswerCorrect: boolean) => void;
    setExamRating: React.Dispatch<React.SetStateAction<number>>; 
}

export const ExaminationPanel = (props: examProps) => {
    const [disabled, setDisabled] = useState(true);
    const [englishInput, setEnglishInput] = useState('');
    const [, setIsAnswerCorrect] = useState(false); 

    const handleEnglishSelectChange = (selectedValue: string) => {
        setEnglishInput(selectedValue); 
        setDisabled(false);
    };

    const handleCheckAnswer = () => {
        const isCorrect = getRussianWordByEnglish(englishInput) === props.russian;
        setIsAnswerCorrect(isCorrect);
        props.counter(isCorrect); 
        if (isCorrect) {
            props.setExamRating(prevRating => prevRating + 1);
        }
        setEnglishInput('');
        setDisabled(true);
    };

    return (
        <>
            <div className={styles.formInputs}>
            <ExaminationInputs 
                russianInput={props.russian} 
                englishInput={englishInput} 
                handleSelectChange={(value:string) => handleEnglishSelectChange(value)}
            /> 
            </div>
            <button className={styles.formButton} disabled={disabled} onClick={handleCheckAnswer}>Проверить</button>
        </>
    )
}
