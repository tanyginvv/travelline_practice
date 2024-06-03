import { Link } from "react-router-dom"
import styles from "./addWordButton.module.scss"
export const AddWordButton = () => {
    return (
        <span className={styles.addWordButton}>
            <Link to={"/addWord"} className={styles.link}>+ Добавить слово</Link>
        </span>
    )
}