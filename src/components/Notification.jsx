import { useState, useCallback, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { themes } from "../styles/themes";
import { getStyles } from "../styles/getStyles";


const Notification = ({ 
  id, 
  type, 
  content, 
  onClose, 
  duration, 
  createdAt, 
  persist = false,
  theme = 'light',
  ...props 
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const themeStyles = themes[theme] || themes.light;
  const styles = getStyles(themeStyles, '');
  
  const handleClose = useCallback(() => {
    setIsExiting(true);
    
    // Give time for exit animation
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);
  
  useEffect(() => {
    // Announce to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'assertive');
    announcer.setAttribute('role', 'alert');
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0, 0, 0, 0)';
    
    if (typeof content === 'string') {
      announcer.textContent = `${type}: ${content}`;
    } else {
      announcer.textContent = `New ${type} notification`;
    }
    
    document.body.appendChild(announcer);
    
    return () => {
      document.body.removeChild(announcer);
    };
  }, [content, type]);
  
  const notificationStyle = {
    ...styles.notification(type),
    ...(isExiting ? styles.exit : {})
  };
  
  return (
    <div 
      className={`notification notification-${type} ${isExiting ? 'notification-exit' : ''}`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={notificationStyle}
      {...props}
    >
      <div className="notification-content" style={styles.content}>
        {typeof content === 'function' ? content() : content}
      </div>
      <button 
        className="notification-close" 
        onClick={handleClose}
        aria-label="Close notification"
        style={styles.closeButton}
      >
        ×
      </button>
      
      {!persist && duration > 0 && (
        <ProgressBar 
          duration={duration} 
          createdAt={createdAt}
          onComplete={handleClose}
          theme={theme}
          type={type} // Pass the notification type to the ProgressBar
        />
      )}
    </div>
  );
};

export default Notification;