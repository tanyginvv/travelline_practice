import React, { useState } from 'react';
import { FormItem } from "../formItem/formItem";
import { InputPanel } from "../inputPanel/inputPanel";
import styles from "./form.module.css";
import User from "../../assets/user.jpg";

type FormData = {
  ratings: number[];
  userName: string;
  userReview: string;
  averageRating: number;
};

const formItems = [
  { id: 0, label: "Чистенько" },
  { id: 1, label: "Сервис" },
  { id: 2, label: "Скорость" },
  { id: 3, label: "Место" },
  { id: 4, label: "Культура речи" }
];

export const Form: React.FC = () => {
  const [ratings, setRatings] = useState<number[]>(Array(formItems.length).fill(-1));
  const [userName, setUserName] = useState<string>("");
  const [userReview, setUserReview] = useState<string>("");
  const [reviews, setReviews] = useState<FormData[]>([]);
  const [reset, setReset] = useState<boolean>(false);

  const handleRangeChange = (id: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[id] = value;
    setRatings(newRatings);
  };

  const handleInputChange = (id: number, value: string) => {
    switch (id) {
      case 1:
        setUserName(value);
        break;
      case 2:
        setUserReview(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validRatings = ratings.filter(rating => rating >= 0);
    const averageRating = validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length;
    const formData: FormData = {
      ratings,
      userName,
      userReview,
      averageRating
    };
    setReviews((prevReviews) => [...prevReviews, formData]);
    resetForm();
  };

  const isFormValid = (): boolean => {
    return ratings.every(rating => rating >= 0) && !!userName && !!userReview;
  };

  const resetForm = () => {
    setRatings(Array(formItems.length).fill(-1));
    setUserName("");
    setUserReview("");
    setReset(true);
    setTimeout(() => setReset(false), 0);  // Reset the form
  };

  return (
    <div>
      <form className={styles.formBody} onSubmit={handleSubmit}>
        <h1 className={styles.formHeader}>Помогите нам сделать процесс бронирования лучше</h1>
        <div className={styles.formItems}>
          {formItems.map((item) => (
            <FormItem
              key={item.id}
              id={item.id}
              label={item.label}
              onRangeChange={handleRangeChange}
              reset={reset}
            />
          ))}
        </div>
        <InputPanel
          inputs={[
            { id: 1, label: "*Имя", placeholder: "Как вас зовут?", type: 'text' },
            { id: 2, placeholder: "Напишите, что понравилось, что было непонятно", type: 'textarea' }
          ]}
          handleInputChange={handleInputChange}
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
        {reviews.map((data, index) => (
          <div className={styles.submittedData} key={index}>
            <div className={styles.dataInfo}>
              <img className={styles.dataImg} src={User} alt="User" />
              <p className={styles.infoName}>{data.userName}</p>
              <p className={styles.infoStar}>{data.averageRating.toFixed(2)}/5</p>
            </div>
            <p className={styles.infoReview}>{data.userReview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};