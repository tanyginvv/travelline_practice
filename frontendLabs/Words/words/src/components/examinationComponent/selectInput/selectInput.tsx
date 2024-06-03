import { useState, useEffect } from "react";
import { getEnglishRussianPairs } from "../../../store/store";
import styles from "./selectInput.module.scss";

type SelectProps = {
  onSelectChange: (selectedValue: string) => void;
  englishInput: string;
}

export const SelectInput = (props: SelectProps) => {
  const words = getEnglishRussianPairs().map(pair => pair[0]);
  const [selectedWord, setSelectedWord] = useState<string>('');

  useEffect(() => {
    if (props.englishInput === '') {
      setSelectedWord('');
    }
  }, [props.englishInput]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedWord(selectedValue);
    props.onSelectChange(selectedValue); 
  };

  return (
    <div className={styles.inputSelect}>
      <select
        value={selectedWord}
        style={selectedWord === "" ? {color: "#B9B9B9"} : {color: "black"}}
        onChange={handleChange}
        className={styles.select}
      >
        <option style={{color: "#B9B9B9"}} value="">Выберите слово</option> 
        {words.map((word) => (
          <option style={{color: "black"}} key={word} value={word}>{word}</option>
        ))}
      </select>
    </div>
  );
}