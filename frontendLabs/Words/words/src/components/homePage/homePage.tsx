import { Link } from "react-router-dom"
import styles from "./homePage.module.scss"

export const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <h1>Выберите режим</h1>
            <span>
                <Link to="/dictionary" className={`${styles.link} ${styles['link--primary']}`}>
                    Заполнить словарь
                </Link>
                <Link to="/examination" className={`${styles.link} ${styles['link--secondary']}`}>
                    Проверить знания
                </Link>
            </span>
        </div>
    )
}