import React from 'react';
import { CustomRangeWithEmoji } from "../customRangeWithEmoji/customRangeWithEmoji";
import styles from "./rangePanelItem.module.css";

interface RangePanelItemProps {
  id: number;
  label: string;
  onRangeChange: (id: number, value: number) => void;
  reset: boolean;
}

export const RangePanelItem: React.FC<RangePanelItemProps> = ({ id, label, onRangeChange, reset }) => {
  const handleRangeChange = (value: number) => {
    onRangeChange(id, value);
  };

  return (
    <div className={styles.rangePanelItem}>
      <label className={styles.rangePanelItemLabel}>{label}</label>
      <CustomRangeWithEmoji onChange={handleRangeChange} reset={reset} />
    </div>
  );
};