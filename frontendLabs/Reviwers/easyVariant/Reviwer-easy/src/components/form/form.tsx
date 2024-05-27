import React, { useState } from 'react';
import styles from "./form.module.css";
import { RadioBtnsPanel } from "../radioBtnsPanel/RadioBtnsPanel";
import { InputPanel } from "../inputPanel/inputPanel";
import { SubmittedData } from '../submittedData/submittedData';


type FormData = {
    reviewValue: number | null;
    userName: string;
    userReview: string;
};

export const Form: React.FC = () => {
    const [reviewValue, setReviewValue] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [userReview, setUserReview] = useState<string>("");
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleInputChange = (id: string, value: string) => {
        if (id === "userName") {
            setUserName(value);
        } else if (id === "userReview") {
            setUserReview(value);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData: FormData = {
            reviewValue,
            userName,
            userReview
        };
        setSubmittedData(formData);
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
                <h1 className={styles.formHeader}>Помогите нам сделать процесс бронирования лучше</h1>
                <RadioBtnsPanel reviewValue={reviewValue} setReviewValue={setReviewValue} />
                <InputPanel
                    handleInputChange={handleInputChange}
                    userName={userName}
                    userReview={userReview}
                />
                <div className={styles.buttonPanel}>
                    <button className={styles.submitButton} type="submit" disabled={!isFormValid()}>Отправить</button>
                </div>
            </form>
            <div className={styles.data}> 
                {submittedData && (
                    <SubmittedData userName={submittedData.userName} reviewValue={submittedData.reviewValue}
                    userReview={submittedData.userReview}/>
                )}
            </div>
        </div>
    );
};