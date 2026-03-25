import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { BarChart3, LogOut, Bell, Activity, LayoutDashboard } from 'lucide-react';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, logout } = useAuthStore();

  const requestNotificationPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("HealthSaaS Notifications Enabled!", {
            body: "You'll receive critical patient alerts here via the Service Worker.",
            icon: '/vite.svg'
          });
        });
      }
    }
  };

  return (
    <div className={`app-container ${styles.layout}`}>
      {/* sidebar menu */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Activity className={styles.logoIcon} />
          <h2>HealthSaaS</h2>
        </div>
        
        <nav className={styles.nav}>
          <NavLink 
            to="/dashboard" 
            className={({isActive}: {isActive: boolean}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({isActive}: {isActive: boolean}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
          >
            <BarChart3 size={20} /> Analytics
          </NavLink>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* right side content */}
      <div className="main-content">
        {/* top navbar */}
        <header className={styles.header}>
          <div className={styles.searchBar}>
            {/* search bar later */}
          </div>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} onClick={requestNotificationPermission} title="Enable Notifications">
              <Bell size={20} />
            </button>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                {user?.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user?.displayName || 'User'}</span>
                <span className={styles.userRole}>Physician</span>
              </div>
            </div>
          </div>
        </header>

        {/* render pages here */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
