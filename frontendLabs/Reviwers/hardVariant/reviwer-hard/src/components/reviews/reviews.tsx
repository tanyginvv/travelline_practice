import React from 'react';
import { Review } from '../review/review';
import styles from './reviews.module.css';

type Review = {
  ratings: number[];
  userName: string;
  userReview: string;
  reviewValue: number;
};

type ReviewsProps = {
  reviews: Review[];
};

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className={styles.data}>
      {reviews.map((data, index) => (
        <Review
          key={index}
          userName={data.userName}
          reviewValue={data.reviewValue}
          userReview={data.userReview}
        />
      ))}
    </section>
  );
};