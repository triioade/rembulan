import styles from "./ClassSelector.module.css";

const ClassSelector = ({
  onSelectRole,
}: {
  onSelectRole: (role: "admin" | "mahasiswa") => void;
}) => {
  return (
    <div className={styles.bg}>
      <div className={styles.centerCard}>
        <img src="/images/rembulan.png" alt="Icon" className={styles.icon} />
        <h2 className={styles.title}>Rembulan Login</h2>
        <p className={styles.subtitle}>Pilih tipe login untuk masuk ke dashboard.</p>
        <button
          className={styles.button}
          style={{ marginBottom: 16, width: "100%" }}
          onClick={() => onSelectRole("mahasiswa")}
        >
          Login sebagai Mahasiswa
        </button>
        <button
          className={styles.button}
          style={{ width: "100%" }}
          onClick={() => onSelectRole("admin")}
        >
          Login sebagai Admin
        </button>
      </div>
    </div>
  );
};

export default ClassSelector;