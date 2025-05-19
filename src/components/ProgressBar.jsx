import React, { useState, useEffect, useRef } from 'react';
import { themes } from '../styles/themes';

const ProgressBar = ({ duration, createdAt, onComplete, theme = 'light', type = 'success' }) => {
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  
  const themeStyles = themes[theme] || themes.light;
  // Use the correct borderColor based on the notification type
  const progressBarColor = themeStyles[type]?.borderColor || '#f7fcf9';
  
  useEffect(() => {
    const startTime = createdAt;
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const percentage = (remaining / duration) * 100;
      setProgress(percentage);
      
      if (percentage <= 0) {
        clearInterval(intervalRef.current);
        if (onComplete) onComplete();
      }
    };
    
    intervalRef.current = setInterval(updateProgress, 16); // ~60fps
    
    return () => clearInterval(intervalRef.current);
  }, [createdAt, duration, onComplete]);
  
  return (
    <div 
      className="notification-progress" 
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '3px',
        backgroundColor: progressBarColor,
        width: `${progress}%`,
        transition: 'width 16ms linear',
      }} 
    />
  );
};

export default ProgressBar;