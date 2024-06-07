import { FC } from 'react';
import styles from './formInputs.module.scss';

type FormInputsProps = {
    russianInput: string;
    englishInput: string;
    handleRussianInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEnglishInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInputs: FC<FormInputsProps> = ({
    russianInput,
    englishInput,
    handleRussianInputChange,
    handleEnglishInputChange
}) => {
    return (
        <fieldset className={styles.formInputs}>
            <fieldset className={styles.formInput}>
                <label htmlFor="russian">Слово на русском языке</label>
                <input
                    type="text"
                    id="russian"
                    className={!russianInput ? styles['input--empty'] : styles['input--non-empty']}
                    value={russianInput}
                    onChange={handleRussianInputChange}
                />
            </fieldset>
            <fieldset className={styles.formInput}>
                <label htmlFor="english">Перевод на английском языке</label>
                <input
                    type="text"
                    id="english"
                    className={!englishInput ? styles['input--empty'] : styles['input--non-empty']}
                    value={englishInput}
                    onChange={handleEnglishInputChange}
                />
            </fieldset>
        </fieldset>
    );
};