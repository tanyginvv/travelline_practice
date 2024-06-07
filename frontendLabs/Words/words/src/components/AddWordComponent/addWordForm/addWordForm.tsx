import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import styles from './addWordForm.module.scss';
import { FormInputs } from '../formInputs/formInputs';
import { FormButtons } from '../formButtons/formButtons';
import { addWord } from '../../../store/store';

export const AddWordForm = () => {
    const navigate = useNavigate();
    const [russianInput, setRussianInput] = useState('');
    const [englishInput, setEnglishInput] = useState('');

    const handleRussianInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRussianInput(event.target.value);
    };

    const handleEnglishInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnglishInput(event.target.value);
    };

    const formSubmit = () => {
        addWord(englishInput, russianInput);
        navigate("/dictionary");
    };

    const formReset = () => {
        setRussianInput('');
        setEnglishInput('');
    };

    return (
        <>
            <form className={styles.addWordForm}>
                <legend>Словарное слово</legend>
                <FormInputs
                    russianInput={russianInput}
                    englishInput={englishInput}
                    handleRussianInputChange={handleRussianInputChange}
                    handleEnglishInputChange={handleEnglishInputChange}
                />
            </form>
            <FormButtons disable={!russianInput || !englishInput} submit={formSubmit} reset={formReset} />
        </>
    );
};