import { FC } from "react"
import styles from "./examinationInputs.module.scss"
import { SelectInput } from "../selectInput/selectInput";

type FormInputsProps = {
    russianInput: string;
    englishInput: string;
    handleSelectChange: (selectedValue: string) => void;
};

export const ExaminationInputs: FC<FormInputsProps> = ({
    russianInput,
    englishInput,
    handleSelectChange
}) => {
    return(
        <div className={styles.formInputs}>
            <div className={styles.formInput}>
                <label htmlFor="russian">Слово на русском языке</label>
                <input
                    type="text"
                    id="russian"
                    className={!russianInput ? styles['input--empty'] : styles['input--non-empty']}
                    value={russianInput}
                    readOnly
                />
            </div>
            <div className={styles.formInput}>
                <label htmlFor="english">Перевод на английском языке</label>
                <SelectInput englishInput={englishInput} onSelectChange={handleSelectChange} />
            </div>
        </div>
    )
}