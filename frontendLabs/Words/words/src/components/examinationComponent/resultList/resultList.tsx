import styles from "./resultList.module.scss";

type ResultItem = {
    imgSrc: string;
    label: string;
    value: number;
}

type ResultListProps = {
    items: ResultItem[];
}

export const ResultList = ({ items }: ResultListProps) => {
    return (
        <div className={styles.resultList}>
            <p>Ответы</p>
            {items.map((item, index) => (
                <div className={styles.result} key={index}>
                    <span>
                        <img src={item.imgSrc} alt={item.label} />
                        <p>{item.label}</p>
                    </span>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    );
}