import { useState } from 'react';
import './App.css';
import { Form } from './components/form/form';
import { Reviews } from './components/reviews/reviews';

type Review = {
  ratings: number[];
  userName: string;
  userReview: string;
  reviewValue: number;
};

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (review: Review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  return (
    <div className="App">
      <Form addReview={addReview} />
      <Reviews reviews={reviews} />
    </div>
  );
}

export default App;