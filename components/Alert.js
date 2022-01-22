import styles from "../styles/Alert.module.css";

export default function Alert({ active, message }) {
  return (
    <div className={styles.alertContainer} id={active}>
      <h2 className={styles.alertMessage}>{message}</h2>
    </div>
  );
}
