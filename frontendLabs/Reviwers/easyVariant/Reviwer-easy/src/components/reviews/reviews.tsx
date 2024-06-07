import React from 'react';
import { Review } from '../review/review';
import styles from './reviews.module.css';

type ReviewProps = {
    submittedData: {
        reviewValue: number | null;
        userName: string;
        userReview: string;
    } | null;
};

export const Reviews: React.FC<ReviewProps> = ({ submittedData }) => {
    return (
        <section className={styles.data}> 
            {submittedData && (
                <Review 
                    userName={submittedData.userName} 
                    reviewValue={submittedData.reviewValue}
                    userReview={submittedData.userReview} 
                />
            )}
        </section>
    );
};
