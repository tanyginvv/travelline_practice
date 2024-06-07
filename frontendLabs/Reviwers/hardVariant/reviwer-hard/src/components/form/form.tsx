import React, { useState } from 'react';
import { RangePanelItem } from "../rangePanelItem/rangePanelItem";
import { SubmitButton } from '../submitButton/submitButton';
import styles from "./form.module.css";

type Review = {
  ratings: number[];
  userName: string;
  userReview: string;
  reviewValue: number;
};

const rangePanelItems = [
  { id: 0, label: "Чистенько" },
  { id: 1, label: "Сервис" },
  { id: 2, label: "Скорость" },
  { id: 3, label: "Место" },
  { id: 4, label: "Культура речи" }
];

type FormProps = {
  addReview: (review: Review) => void;
};

export const Form: React.FC<FormProps> = ({ addReview }) => {
  const [ratings, setRatings] = useState<number[]>(Array(rangePanelItems.length).fill(-1));
  const [userName, setUserName] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);

  const handleRangeChange = (id: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[id] = value;
    setRatings(newRatings);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleUserReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validRatings = ratings.filter(rating => rating >= 0);
    const reviewValue = validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length;
    const review: Review = {
      ratings,
      userName,
      userReview,
      reviewValue
    };
    addReview(review);
    resetForm();
  };

  const isFormValid = (): boolean => {
    return ratings.every(rating => rating >= 0) && !!userName && !!userReview;
  };

  const resetForm = () => {
    setRatings(Array(rangePanelItems.length).fill(-1));
    setUserName("");
    setUserReview("");
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  return (
    <div>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        <legend className={styles.formTitle}>Помогите нам сделать процесс бронирования лучше</legend>
        <fieldset className={styles.rangePanelItems}>
          {rangePanelItems.map((item) => (
            <RangePanelItem
              key={item.id}
              id={item.id}
              label={item.label}
              onRangeChange={handleRangeChange}
              reset={reset}
            />
          ))}
        </fieldset>
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