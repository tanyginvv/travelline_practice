import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllWords, updateWord } from '../../../store/store';
import styles from './editWord.module.scss';
import arrow from '../../../assets/images/arrow.svg';
import { EditWordForm } from '../editWordForm/editWordForm';

export const EditWord = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');

  useEffect(() => {
    const words = getAllWords();
    const wordToEdit = words[id as string];
    if (wordToEdit) {
      setEnglish(wordToEdit.english);
      setRussian(wordToEdit.russian);
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      updateWord(id, english, russian);
    }
    navigate("/dictionary");
  };

  const resetEdit = () => {
    navigate("/dictionary");
  };

  return (
    <div className={styles.editWord}>
      <span className={styles.editTitle}>
        <Link to={'/dictionary'}><img src={arrow} alt="Back"/></Link>
        <h1>Редактирование слова</h1>
      </span>
      <EditWordForm
        russian={russian}
        english={english}
        setRussian={setRussian}
        setEnglish={setEnglish}
        handleSave={handleSave}
        resetEdit={resetEdit}
      />
    </div>
  );
}