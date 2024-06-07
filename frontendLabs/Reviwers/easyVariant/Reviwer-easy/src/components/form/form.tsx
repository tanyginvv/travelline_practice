import React, { useState } from 'react';
import styles from "./form.module.css";
import { RadioEmojiButtonsPanel } from "../radioEmojiButtonsPanel/radioEmojiButtonsPanel";
import { SubmitButton } from '../submitButton/submitButton';

type Review = {
  reviewValue: number | null;
  userName: string;
  userReview: string;
};

type FormProps = {
  setSubmittedData: React.Dispatch<React.SetStateAction<Review | null>>;
};

export const Form: React.FC<FormProps> = ({ setSubmittedData }) => {
  const [reviewValue, setReviewValue] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleUserReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview(event.target.value);
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
            onChange={handleUserNameChange}
          />
          <textarea
            id="userReview"
            className={styles.textArea}
            placeholder='Напишите, что понравилось, что было непонятно'
            value={userReview}
            onChange={handleUserReviewChange}
          ></textarea>
        </fieldset>
        <SubmitButton disabled={!isFormValid()} />
      </form>
    </div>
  );
};