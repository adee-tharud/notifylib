import { createContext, useReducer, useCallback, useRef } from "react";
import NotificationContainer from "../components/NotificationContainer";
import {NOTIFICATION_TYPES, POSITIONS } from "../utils/constants"

// Create context
export const NotificationContext = createContext();

// Reducer for managing notifications
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { id: action.payload.id, ...action.payload.notification }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    case 'CLEAR_NOTIFICATIONS':
      return [];
    default:
      return state;
  }
};

// Provider component
export const NotificationProvider = ({ children, config = {} }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);
  const notificationIdCounter = useRef(1);
  
  // Default configuration with sensible defaults
  const defaultConfig = {
    position: 'top-right',
    duration: 5000,
    maxCount: 5,
    theme: 'light',
    ...config
  };
  
  
  // Add a notification
  const addNotification = useCallback((notification) => {
    const id = notificationIdCounter.current++;
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id,
        notification: {
          ...notification,
          createdAt: Date.now(),
        },
      },
    });
    
    // Auto-dismiss after duration (if not set to persist)
    if (!notification.persist && notification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || defaultConfig.duration);
    }
    
    return id;
  }, [defaultConfig.duration]);
  
  // Remove a notification by ID
  const removeNotification = useCallback((id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id,
    });
  }, []);
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  }, []);
  
  // Convenience methods for different types
  const success = useCallback((content, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.SUCCESS,
      content,
      duration: options.duration || defaultConfig.duration,
      persist: options.persist || false,
      ...options,
    });
  }, [addNotification, defaultConfig.duration]);
  
  const error = useCallback((content, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.ERROR,
      content,
      duration: options.duration || defaultConfig.duration,
      persist: options.persist || false,
      ...options,
    });
  }, [addNotification, defaultConfig.duration]);
  
  const warning = useCallback((content, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.WARNING,
      content,
      duration: options.duration || defaultConfig.duration,
      persist: options.persist || false,
      ...options,
    });
  }, [addNotification, defaultConfig.duration]);
  
  const info = useCallback((content, options = {}) => {
    return addNotification({
      type: NOTIFICATION_TYPES.INFO,
      content,
      duration: options.duration || defaultConfig.duration,
      persist: options.persist || false,
      ...options,
    });
  }, [addNotification, defaultConfig.duration]);
  
  // Promise support - Fixed the "this.error" issue
  const promise = useCallback((promiseToTrack, options = {}) => {
    const id = addNotification({
      type: NOTIFICATION_TYPES.INFO,
      content: options.loading || 'Loading...',
      persist: true,
      ...options,
    });
    
    return promiseToTrack
      .then((result) => {
        removeNotification(id);
        success(options.success || 'Success!', { 
          duration: options.successDuration || defaultConfig.duration,
          ...options 
        });
        return result;
      })
      .catch((err) => {
        removeNotification(id);
        error(options.error || 'Error!', { 
          duration: options.errorDuration || defaultConfig.duration,
          ...options 
        });
        return Promise.reject(err);
      });
  }, [addNotification, removeNotification, success, error, defaultConfig.duration]);
  
  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
    promise,
    config: defaultConfig,
  };
  
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};