import { Link } from "react-router-dom"
import { AddWordButton } from "../../AddWordComponent/addWordButton/addWordButton"
import styles from "./dictionary.module.scss"
import arrow from "../../../assets/images/arrow.svg"
import { DictionaryList } from "../dictionaryList/dictionaryList"

export const Dictionary = () => {
    return(
        <div className={styles.dictionary}>
            <span className={styles.dictionartyTitle}>
                <Link to={'/homePage'}><img src={arrow}/></Link>
                <h1>Словарь</h1>
            </span>
            <AddWordButton/>
            <span className={styles.listTitle}>
                <p>Слово на русском языке</p>
                <p>Слово на английском языке</p>
                <p>Действие</p>
            </span>
            <DictionaryList/>
        </div>
    )
}