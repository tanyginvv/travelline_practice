import { FC } from 'react';
import styles from './formButtons.module.scss';

type ButtonsProps = {
    disable: boolean;
    submit: () => void;
    reset: () => void;
};

export const FormButtons: FC<ButtonsProps> = ({ disable, submit, reset }) => {
    return (
        <div className={styles.formButtons}>
            <button disabled={disable} onClick={submit} className={`${styles.button} ${styles['button--primary']}`}>Сохранить</button>
            <button onClick={reset} className={`${styles.button} ${styles['button--secondary']}`}>Отменить</button>
        </div>
    );
};