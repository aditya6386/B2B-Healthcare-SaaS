import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  ...props
}) => {
  const baseClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  
  return (
    <button className={baseClass} style={{ width: fullWidth ? '100%' : undefined }} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
