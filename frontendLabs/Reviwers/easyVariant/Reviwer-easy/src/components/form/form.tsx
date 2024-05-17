import React, { useState } from 'react';
import styles from "./form.module.css";
import { ButtonPanel } from "../buttonPanel/buttonPanel";
import { InputPanel } from "../inputPanel/inputPanel";
import User from "../../assets/user.jpg";

type FormData = {
    activeButtonId: number | null;
    userName: string;
    userReview: string;
};

export const Form: React.FC = () => {
    const [activeButtonId, setActiveButtonId] = useState<number | null>(null);
    const [userName, setUserName] = useState<string>("");
    const [userReview, setUserReview] = useState<string>("");
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData: FormData = {
            activeButtonId,
            userName,
            userReview
        };
        setSubmittedData(formData);
        resetForm();
    };

    const isFormValid = (): boolean => {
        return !!userName && !!userReview && activeButtonId !== null;
    };

    const resetForm = () => {
        setActiveButtonId(null);
        setUserName("");
        setUserReview("");
    };

    return (
        <div>
            <form className={styles.formBody} onSubmit={handleSubmit}>
                <h1 className={styles.formHeader}>Помогите нам сделать процесс бронирования лучше</h1>
                <ButtonPanel activeButtonId={activeButtonId} setActiveButtonId={setActiveButtonId} />
                <InputPanel
                    inputs={[
                        { id: 1, label: "*Имя", placeholder: "Как вас зовут?", type: 'text' },
                        { id: 2, placeholder: "Напишите, что понравилось, что было непонятно", type: 'textarea' }
                    ]}
                    handleInputChange={(id, value) => {
                        if (id === 1) {
                            setUserName(value);
                        } else if (id === 2) {
                            setUserReview(value);
                        }
                    }}
                    inputValues={[
                        { id: 1, value: userName },
                        { id: 2, value: userReview }
                    ]}
                />
                <div className={styles.buttonPanel}>
                    <button className={styles.submitButton} type="submit" disabled={!isFormValid()}>Отправить</button>
                </div>
            </form>
            <div className={styles.data}> 
                {submittedData && (
                    <div className={styles.submittedData}>
                        <div className={styles.dataInfo}>
                            <img className={styles.dataImg} src={User} alt="User"></img>
                            <p className={styles.infoName}>{submittedData.userName}</p>
                            <p className={styles.infoStar}>{submittedData.activeButtonId}/5</p>
                        </div>
                        <p className={styles.infoReview}>{submittedData.userReview}</p>
                    </div>
                )}
            </div>
        </div>
    );
};