'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './welcome.module.css';

export default function Welcome() {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [loginTime, setLoginTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError('');


        // Fetch user data from API
        const response = await fetch(`${backendUrl}/users/me`, {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {

          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();
        
        // Update state with fetched data
        setUserEmail(userData.email || '');
        setUserName(userData.name || userData.firstName || '');
        setUserId(userData.id || userData._id || '');
        setLoginTime(new Date().toLocaleString());
        

      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
        
        
          // No fallback data available, redirect to login
          router.push('/login');
          return;
        } finally {
          setIsLoading(false);
        }
      }

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    try {
      // Call logout API if available
      await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {
        // Ignore errors - logout locally anyway
      });
    } finally {
      // Redirect to login page
      router.push('/login');
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  const handleRetry = () => {
    window.location.reload(); // Simple retry by reloading the page
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading user data...</div>
      </div>
    );
  }

  if (error && !userName && !userEmail) {
    return (
      <div className={styles.container}>
        <div className={styles.welcomeCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Error Loading Data</h1>
            <p className={styles.subtitle}>{error}</p>
          </div>
          <div className={styles.actions}>
            <button onClick={handleRetry} className={styles.loginButton}>
              Retry
            </button>
            <button onClick={goToLogin} className={styles.logoutButton}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeCard}>
        {error && (
          <div className={styles.errorBanner}>
            <p>⚠️ {error} (Showing cached data)</p>
          </div>
        )}
        
        <div className={styles.header}>
          <div className={styles.avatar}>
            {(userName || userEmail).charAt(0).toUpperCase()}
          </div>
          <h1 className={styles.title}>Welcome{userName ? `, ${userName}` : ''}!</h1>
          <p className={styles.subtitle}>You have successfully logged in</p>
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.sectionTitle}>User Information</h2>
          {userName && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Name:</span>
              <span className={styles.value}>{userName}</span>
            </div>
          )}
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{userEmail}</span>
          </div>
          {userId && (
            <div className={styles.infoItem}>
              <span className={styles.label}>User ID:</span>
              <span className={styles.value}>{userId}</span>
            </div>
          )}
          <div className={styles.infoItem}>
            <span className={styles.label}>Login Time:</span>
            <span className={styles.value}>{loginTime}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.value} ${styles.active}`}>Active</span>
          </div>
        </div>

        <div className={styles.features}>
          <h2 className={styles.sectionTitle}>Demo Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Dashboard</h3>
              <p>View your analytics and reports</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚙️</div>
              <h3>Settings</h3>
              <p>Manage your account preferences</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👥</div>
              <h3>Team</h3>
              <p>Collaborate with your team members</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Security</h3>
              <p>Manage your security settings</p>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
          <button onClick={goToLogin} className={styles.loginButton}>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
} 