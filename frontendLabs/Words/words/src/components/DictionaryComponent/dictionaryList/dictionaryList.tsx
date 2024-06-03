import { getAllWords, removeWord } from '../../../store/store';
import { useState, useEffect } from 'react';
import LongMenu from '../../longMenu/longMenu';
import styles from "./dictionaryList.module.scss";

type Word = {
    id: string;
    english: string;
    russian: string;
}

export const DictionaryList = () => {
    const [dictionary, setDictionary] = useState<Record<string, Word>>({});

    useEffect(() => {
        setDictionary(getAllWords());
    }, []);

    const removeWordHandler = (id: string) => {
        removeWord(id);
        setDictionary(getAllWords());
    }

    return (
        <div className={styles.dictionaryList}>
            {Object.keys(dictionary).length > 0 ? (
                Object.entries(dictionary).map(([key, { id, english, russian }]) => (
                    <div className={styles.listItem} key={key}>
                        <span>{russian}</span>
                        <span>{english}</span>
                        <LongMenu english={english} id={id} removeWord={() => removeWordHandler(id)} />
                    </div>
                ))
            ) : (
                <p>No words in dictionary.</p>
            )}
        </div>
    );
};