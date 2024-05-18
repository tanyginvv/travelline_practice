import React from 'react';
import { RangeInput } from "../rangeInput";
import styles from "./formItem.module.css";

interface FormItemProps {
  id: number;
  label: string;
  onRangeChange: (id: number, value: number) => void;
  reset: boolean;
}

export const FormItem: React.FC<FormItemProps> = ({ id, label, onRangeChange, reset }) => {
  const handleRangeChange = (value: number) => {
    onRangeChange(id, value);
  };

  return (
    <div className={styles.formItem}>
      <label className={styles.itemLabel}>{label}</label>
      <RangeInput onChange={handleRangeChange} reset={reset} />
    </div>
  );
};