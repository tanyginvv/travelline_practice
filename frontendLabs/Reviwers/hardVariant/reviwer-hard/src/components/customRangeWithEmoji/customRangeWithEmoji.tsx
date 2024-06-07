import React from 'react';
import { useEmojiSelection } from '../../hooks/useEmojiSelection';
import styles from './customRangeWithEmojirangeInput.module.css';
import AngrySmile from '../../assets/images/angry-face.svg';
import FrowningSmile from '../../assets/images/slightly-frowning-face.svg';
import NeutralSmile from '../../assets/images/neutral-face.svg';
import SlightlySmile from '../../assets/images/slightly-smiling-face.svg';
import GrinningSmile from '../../assets/images/grinning-face-with-big-eyes.svg';

interface RangeInputProps {
  onChange: (value: number) => void;
  reset: boolean;
}

const emojis = [AngrySmile, FrowningSmile, NeutralSmile, SlightlySmile, GrinningSmile];
const colors = ['red', '#FF5733', '#FF5733', '#FFC700', '#FFC700'];
const ranges = [0, 25, 50, 75, 100];

export const CustomRangeWithEmoji: React.FC<RangeInputProps> = ({ onChange, reset }) => {
  const { circles, selectedEmoji, rangeValue, handleEmojiClick, handleEmojiEnter, handleEmojiLeave } = useEmojiSelection(reset, emojis, colors, ranges);

  return (
    <div className={styles.container}>
      <div className={styles.emojis}>
        {circles.map((circle, index) => (
          <span
            key={index}
            className={styles.emojiContainer}
            onClick={() => handleEmojiClick(index, onChange)}
            onMouseEnter={() => handleEmojiEnter(index)}
            onMouseLeave={() => handleEmojiLeave(index)}
          >
            <div
              className={styles.emojiCircle}
              style={{
                backgroundColor: circle.color
              }}
            >
              {(circle.selected || circle.hovered) && (
                <img src={emojis[index]} alt={`emoji-${index}`} className={styles.emoji} />
              )}
            </div>
          </span>
        ))}
      </div>
      <div
        className={styles.range}
        style={{
          background: `linear-gradient(to right, ${colors[selectedEmoji !== null ? selectedEmoji : 0]} ${rangeValue}%, white ${rangeValue}%)`
        }}
      />
    </div>
  );
};