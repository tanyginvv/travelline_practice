import styles from "./resultPanel.module.scss";
import good from "../../../assets/images/good.svg";
import noGood from "../../../assets/images/no-good.svg";
import book from "../../../assets/images/book.svg";
import { ResultList } from "../resultList/resultList";
import { ResultButtons } from "../resultButtons/resultButtons";

type ResultItem = {
    imgSrc: string;
    label: string;
    value: number;
}

type ResultProps = {
    result: number;
    max: number;
    onRestart: () => void;
}

export const ResultPanel = (props: ResultProps) => {
    const resultItems: ResultItem[] = [
        { imgSrc: good, label: "Правильные", value: props.result },
        { imgSrc: noGood, label: "Ошибочные", value: props.max - props.result },
        { imgSrc: book, label: "Всего слов", value: props.max }
    ];

    return (
        <div className={styles.resultPanel}>
            <span className={styles.examinationTitle}>
                <h1>Результат проверки знаний</h1>
            </span>
            <ResultList items={resultItems} />
            <ResultButtons onRestart={props.onRestart} />
        </div>
    );
}