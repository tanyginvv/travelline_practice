import styles from './editWordButtons.module.scss';

type EditFormButtonsProps = {
  handleSave: () => void;
  resetEdit: () => void;
}

export const EditFormButtons = ({ handleSave, resetEdit }: EditFormButtonsProps) => {
  return (
    <div className={styles.editFormButtons}>
      <button type="button" className={`${styles.button} ${styles['button--primary']}`} onClick={handleSave}>Сохранить</button>
      <button type="button" className={`${styles.button} ${styles['button--secondary']}`} onClick={resetEdit}>Отмена</button>
    </div>
  )
}