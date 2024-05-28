import React, { useState } from 'react';
import styles from "./form.module.css";
import { RadioEmojiButtonsPanel } from "../radioEmojiButtonsPanel/radioEmojiButtonsPanel";
import { Review } from '../review/review';
import { SubmitButton } from '../submitButton/submitButton';


type Review = {
    reviewValue: number | null;
    userName: string;
    userReview: string;
};

export const Form: React.FC = () => {
    const [reviewValue, setReviewValue] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [userReview, setUserReview] = useState<string>("");
    const [submittedData, setSubmittedData] = useState<Review | null>(null);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        handleInputChange(id, value);
    };
    
    const handleInputChange = (id: string, value: string) => {
        if (id === "userName") {
            setUserName(value);
        } else if (id === "userReview") {
            setUserReview(value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const review: Review = {
            reviewValue,
            userName,
            userReview
        };
        setSubmittedData(review);
        resetForm();
    };

    const isFormValid = (): boolean => {
        return !!userName && !!userReview && reviewValue !== null;
    };

    const resetForm = () => {
        setReviewValue(null);
        setUserName("");
        setUserReview("");
    };

    return (
        <div>
            <form className={styles.formBody} onSubmit={handleSubmit}>
                <legend className={styles.formTitle}>Помогите нам сделать процесс бронирования лучше</legend>
                <RadioEmojiButtonsPanel reviewValue={reviewValue} setReviewValue={setReviewValue} />
                <fieldset className={styles.inputItem}>
                    <label className={styles.inputLabel}>*Имя</label>
                    <input
                        id="userName"
                        className={styles.inputArea}
                        type="text"
                        placeholder='Как вас зовут?'
                        value={userName}
                        onChange={handleInput}
                    />
                    <textarea
                        id="userReview"
                        className={styles.textArea}
                        placeholder='Напишите, что понравилось, что было непонятно'
                        value={userReview}
                        onChange={handleInput}
                    ></textarea>
                </fieldset>
                <SubmitButton disabled={!isFormValid()}/>
            </form>
            <article className={styles.data}> 
                {submittedData && (
                    <Review userName={submittedData.userName} reviewValue={submittedData.reviewValue}
                    userReview={submittedData.userReview}/>
                )}
            </article>
        </div>
    );
};