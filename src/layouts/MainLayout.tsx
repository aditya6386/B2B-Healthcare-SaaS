import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { BarChart3, LogOut, Bell, Activity, LayoutDashboard, Menu, X } from 'lucide-react';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, logout } = useAuthStore();
  // track if mobile sidebar is open
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`app-container ${styles.layout}`}>

      {/* dark overlay behind sidebar on mobile */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.open : ''}`}
        onClick={closeSidebar}
      />

      {/* sidebar menu */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <Activity className={styles.logoIcon} />
          <h2>HealthSaaS</h2>
        </div>
        
        <nav className={styles.nav}>
          <NavLink 
            to="/dashboard" 
            className={({isActive}: {isActive: boolean}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            onClick={closeSidebar}
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink 
            to="/analytics" 
            className={({isActive}: {isActive: boolean}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            onClick={closeSidebar}
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
          {/* hamburger only shows on mobile */}
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div style={{ flex: 1 }} />

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
