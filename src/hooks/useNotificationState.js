// src/hooks/useNotificationState.js
import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const useNotificationState = () => {
  const { notifications, config } = useContext(NotificationContext);
  
  if (!notifications) {
    throw new Error('useNotificationState must be used within a NotificationProvider');
  }
  
  return { notifications, config };
};