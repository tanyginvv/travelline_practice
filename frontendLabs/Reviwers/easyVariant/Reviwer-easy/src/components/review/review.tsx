import styles from "./review.module.css"
import User from "../../assets/images/user.jpg";

interface dataProps {
    userName : string;
    reviewValue: number  | null;
    userReview: string;
}

export const Review = ( data: dataProps) => {
    return (
        <article className={styles.submittedData}>
            <div className={styles.dataInfo}>
                <img className={styles.dataImg} src={User} alt="User"></img>
                <p className={styles.infoName}>{data.userName}</p>
                <p className={styles.infoStar}>{data.reviewValue && data.reviewValue.toFixed(2).toString()+"/5"}</p>
            </div>
            <p className={styles.infoReview}>{data.userReview}</p>
        </article>
    )
}