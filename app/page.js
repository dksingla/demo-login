import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Demo Login System</h1>
        <p className={styles.description}>
          Welcome to the demo login system. Test the authentication flow with your backend API.
        </p>

        <div className={styles.ctas}>
          <Link href="/login" className={styles.primary}>
            Go to Login Page
          </Link>
          <Link href="/welcome" className={styles.secondary}>
            Go to Welcome Page
          </Link>
        </div>
      </main>
    </div>
  );
}
