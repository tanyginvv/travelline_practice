import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import styles from "./examination.module.scss";
import arrow from "../../../assets/images/arrow.svg";
import { EnglishRussianPair, getEnglishRussianPairs } from "../../../store/store";
import { ExaminationPanel } from "../examinationPanel/examinationPanel";
import { ResultPanel } from "../resultPanel/resultPanel";

const shufflePairs = (array: EnglishRussianPair[]) => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    return shuffledArray;
};

export const Examination = () => {
    const words = getEnglishRussianPairs();
    const [examRating, setExamRating] = useState(0);
    const [questionCounter, setQuestionCounter] = useState(0);
    const [shuffledPairs, setShuffledPairs] = useState<EnglishRussianPair[]>([]);
    const [loading, setLoading] = useState(true); 

    const handleCounterIncrement = () => {
        setQuestionCounter(prevCounter => prevCounter + 1);
    };

    const resetStates = useCallback(() => {
        setExamRating(0);
        setQuestionCounter(0);
        const newShuffledPairs = shufflePairs(words);
        setShuffledPairs(newShuffledPairs);
        setLoading(false);
    }, [words]);

    useEffect(() => {
        if (shuffledPairs.length === 0) {
            setLoading(true); 
            resetStates(); 
        }
    }, [resetStates, shuffledPairs]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.examination}>
            {questionCounter < shuffledPairs.length ? (
                <>
                    <span className={styles.examinationTitle}>
                        <Link to={'/homePage'}><img src={arrow} alt="arrow"/></Link>
                        <h1>Проверка знаний</h1>
                    </span>              
                    <p className={styles.examinationCounter}>Слово: {questionCounter + 1} из {shuffledPairs.length}</p>
                    <ExaminationPanel russian={shuffledPairs[questionCounter]?.[1]} 
                        setExamRating={setExamRating} counter={handleCounterIncrement} />
                </>
            ) : (
                <ResultPanel result={examRating} max={shuffledPairs.length} onRestart={resetStates}/>
            )}
        </div>
    );
};