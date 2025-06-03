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

        <div className={styles.ctas}>
          <Link href="/test-api" className={styles.tertiary}>
            Test API Connection
          </Link>
        </div>

        <div className={styles.credentials}>
          <h2>API Configuration</h2>
          <p><strong>Backend URL:</strong> http://localhost:3001/v1/auth/login</p>
          <p><strong>Method:</strong> POST</p>
          <p><strong>Expected Body:</strong> {`{ "email": "string", "password": "string" }`}</p>
        </div>
      </main>
    </div>
  );
}
