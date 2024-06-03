import { Link } from "react-router-dom"
import styles from "./addWord.module.scss"
import arrow from "../../../assets/images/arrow.svg"
import { AddWordForm } from "../addWordForm/addWordForm"

export const AddWord = () => {
    return(
        <div className={styles.addWord}>
            <span className={styles.addWordTitle}>
                <Link to={'/dictionary'}><img src={arrow}/></Link>
                <h1>Добавление слова</h1>
            </span>
            <AddWordForm/>
        </div>
    )
}