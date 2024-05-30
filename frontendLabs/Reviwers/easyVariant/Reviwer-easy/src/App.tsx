import { useState } from 'react';
import './App.css';
import { Form } from './components/form/form';
import { Reviews } from './components/reviews/reviews';

type Review = {
  reviewValue: number | null;
  userName: string;
  userReview: string;
};

function App() {
  const [submittedData, setSubmittedData] = useState<Review | null>(null);

  return (
    <div className="App">
      <Form setSubmittedData={setSubmittedData} />
      <Reviews submittedData={submittedData} />
    </div>
  );
}

export default App;
