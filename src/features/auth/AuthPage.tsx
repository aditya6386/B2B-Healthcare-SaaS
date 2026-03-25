import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Activity } from 'lucide-react';
import styles from './AuthPage.module.css';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      // ask for notification permission right after login
      if ('Notification' in window && 'serviceWorker' in navigator) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // send welcome notification via service worker
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Welcome to HealthSaaS! 👋', {
              body: 'You are now logged in. Patient alerts will appear here.',
              icon: '/vite.svg',
            });
          });
        }
      }

      navigate('/dashboard');
    } catch (err) {
      if (err instanceof FirebaseError) {
        // handle firebase errors so it shows nice messages
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('Invalid email or password.');
            break;
          case 'auth/email-already-in-use':
            setError('An account with this email already exists.');
            break;
          case 'auth/weak-password':
            setError('Password should be at least 6 characters.');
            break;
          default:
            setError(err.message || 'An error occurred during authentication.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.authCard}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <Activity className={styles.logoIcon} />
          </div>
          <h1>HealthSaaS</h1>
          <p>B2B Portal for Care Providers</p>
        </div>

        <form onSubmit={handleAuth} className={styles.form}>
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="doctor@clinic.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={error}
            fullWidth
            required 
          />
          
          <Button type="submit" fullWidth isLoading={isLoading} className={styles.submitBtn}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className={styles.footer}>
          <button type="button" className={styles.toggleBtn} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
      
      {/* bg blobs just for looks */}
      <div className={`${styles.blob} ${styles.blob1}`}></div>
      <div className={`${styles.blob} ${styles.blob2}`}></div>
    </div>
  );
}
