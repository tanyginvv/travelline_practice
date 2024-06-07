import styles from './editFormInputs.module.scss';

type FormInputsProps = {
    russian: string;
    english: string;
    setRussian: (value: string) => void;
    setEnglish: (value: string) => void;
}

export const EditFormInputs = ({ russian, english, setRussian, setEnglish }: FormInputsProps) => {
    return (
        <fieldset className={styles.formInputs}>
            <span>Словарное слово</span>
            <fieldset className={styles.formInput}>
                <label htmlFor="russian">Слово на русском языке</label>
                <input
                    type="text"
                    id="russian"
                    value={russian}
                    onChange={(e) => setRussian(e.target.value)}
                />
            </fieldset>
            <fieldset className={styles.formInput}>
                <label htmlFor="english">Слово на английском языке</label>
                <input
                    type="text"
                    id="english"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                />
            </fieldset>
        </fieldset>
    );
}