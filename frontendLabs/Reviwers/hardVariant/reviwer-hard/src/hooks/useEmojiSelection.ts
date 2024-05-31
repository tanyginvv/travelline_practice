import { useState, useEffect } from 'react';

interface Circle {
  color: string;
  selected: boolean;
  hovered: boolean;
}

export const useEmojiSelection = (reset: boolean, emojis: string[], colors: string[], ranges: number[]) => {
  const [circles, setCircles] = useState<Circle[]>(emojis.map((_, index) => ({
    color: colors[index],
    selected: false,
    hovered: false
  })));
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(0);

  useEffect(() => {
    if (reset) {
      setCircles(emojis.map((_, index) => ({
        color: colors[index],
        selected: false,
        hovered: false
      })));
      setSelectedEmoji(null);
      setRangeValue(0);
    }
  }, [reset]);

  const handleEmojiClick = (index: number, onChange: (value: number) => void) => {
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
    if (!circles[index].selected) {
      const newCircles = [...circles];
      newCircles[index].hovered = true;
      setCircles(newCircles);
      const fillPercentage = ranges[index];
      setRangeValue(fillPercentage);
    }
  };

  const handleEmojiLeave = (index: number) => {
    if (!circles[index].selected) {
      const newCircles = [...circles];
      newCircles[index].hovered = false;
      setCircles(newCircles);
      const fillPercentage = selectedEmoji !== null ? ranges[selectedEmoji] : 0;
      setRangeValue(fillPercentage);
    }
  };

  return {
    circles,
    selectedEmoji,
    rangeValue,
    handleEmojiClick,
    handleEmojiEnter,
    handleEmojiLeave
  };
};