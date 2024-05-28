import React, { useState, useEffect } from 'react';
import styles from './customRangeWithEmojirangeInput.module.css';
import AngrySmile from '../../assets/images/angry-face.svg';
import FrowningSmile from '../../assets/images/slightly-frowning-face.svg';
import NeutralSmile from '../../assets/images/neutral-face.svg';
import SlightlySmile from '../../assets/images/slightly-smiling-face.svg';
import GrinningSmile from '../../assets/images/grinning-face-with-big-eyes.svg';

const emojis = [AngrySmile, FrowningSmile, NeutralSmile, SlightlySmile, GrinningSmile];
const colors = ['red', '#FF5733', '#FF5733', '#FFC700', '#FFC700'];
const ranges = [0, 25, 50, 75, 100];

interface Circle {
  color: string;
  selected: boolean;
}

interface RangeInputProps {
  onChange: (value: number) => void;
  reset: boolean;
}

export const CustomRangeWithEmoji: React.FC<RangeInputProps> = ({ onChange, reset }) => {
  const [circles, setCircles] = useState<Circle[]>(emojis.map((_, index) => ({
    color: colors[index],
    selected: false
  })));
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [hoveredEmoji, setHoveredEmoji] = useState<number | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(0);

  useEffect(() => {
    if (reset) {
      setCircles(emojis.map((_, index) => ({
        color: colors[index],
        selected: false
      })));
      setSelectedEmoji(null);
      setHoveredEmoji(null);
      setRangeValue(0);
    }
  }, [reset]);

  const handleEmojiClick = (index: number) => {
    const newCircles = circles.map((circle, i) => ({
      ...circle,
      selected: i === index,
      color: i <= index ? colors[index] : 'white'
    }));
    setCircles(newCircles);
    setSelectedEmoji(index);
    const fillPercentage = ranges[index];
    setRangeValue(fillPercentage);
    onChange(index + 1);
  };

  const handleEmojiEnter = (index: number) => {
    setHoveredEmoji(index);
    const fillPercentage = ranges[index];
    const newCircles = circles.map((circle) => ({
      ...circle
    }));
    setCircles(newCircles);
    setRangeValue(fillPercentage);
  };

  const handleEmojiLeave = () => {
    setHoveredEmoji(null);
    if (selectedEmoji === null) {
      const newCircles = circles.map((circle, i) => ({
        ...circle,
        color: colors[i]
      }));
      setCircles(newCircles);
      setRangeValue(0);
    } else {
      const fillPercentage = ranges[selectedEmoji];
      setRangeValue(fillPercentage);
    }
  };

  const handleRangeEnter = () => {
    if (hoveredEmoji !== null) {
      const fillPercentage = ranges[hoveredEmoji];
      setRangeValue(fillPercentage);
    }
  };

  const handleRangeLeave = () => {
    if (selectedEmoji !== null) {
      const fillPercentage = ranges[selectedEmoji];
      setRangeValue(fillPercentage);
    } else {
      setRangeValue(0);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.emojis}>
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className={styles.emojiContainer}
            onClick={() => handleEmojiClick(index)}
            onMouseEnter={() => handleEmojiEnter(index)}
            onMouseLeave={handleEmojiLeave}
          >
            <div
              className={styles.emojiCircle}
              style={{
                backgroundColor: circles[index].color
              }}
            >
              {circles[index].selected || hoveredEmoji === index ? (
                <img src={emoji} alt={`emoji-${index}`} className={styles.emoji} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div
        className={styles.range}
        style={{
          background: `linear-gradient(to right, ${colors[selectedEmoji !== null ? selectedEmoji : 0]} ${rangeValue}%, white ${rangeValue}%)`
        }}
        onMouseEnter={handleRangeEnter}
        onMouseLeave={handleRangeLeave}
      />
    </div>
  );
};