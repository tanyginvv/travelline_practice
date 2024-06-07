import styles from "./resultButtons.module.scss";
import { useNavigate } from "react-router-dom";

type ResultButtonsProps = {
    onRestart: () => void;
}

export const ResultButtons = ({ onRestart }: ResultButtonsProps) => {
    const navigate = useNavigate();

    return (
        <div className={styles.resultButtons}>
            <button onClick={onRestart} className={`${styles.button} ${styles['button--primary']}`}>Проверить знания еще раз</button>
            <button onClick={() => navigate("/homePage")} className={`${styles.button} ${styles['button--secondary']}`}>Вернуться в начало</button>
        </div>
    );
}