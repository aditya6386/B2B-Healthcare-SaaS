import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ className = '', glass = false, children, ...props }) => {
  return (
    <div className={`${styles.card} ${glass ? 'glass' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};
