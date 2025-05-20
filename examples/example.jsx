import React from 'react'
import { useNotification } from "../src/hooks/useNotification"

const example = () => {
    const { success, error, warning, info, promise } = useNotification();
  
    const showSuccessNotification = () => {
      success('Operation completed successfully!');
    };
    
    const showErrorNotification = () => {
      error('Something went wrong!');
    };
    
    const showWarningNotification = () => {
      warning('Be careful!', { persist: true });
    };
    
    const showInfoNotification = () => {
      info('Did you know? This is a custom notification system!');
    };
    
    const handlePromise = () => {
      // Example of handling a promise
      promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            // 50% chance of success
            if (Math.random() > 0.5) {
              resolve('Data loaded successfully');
            } else {
              reject(new Error('Failed to load data'));
            }
          }, 2000);
        }),
        {
          loading: 'Loading data...',
          success: 'Data loaded successfully!',
          error: 'Failed to load data',
        }
      );
    };
    
    return (
      <div style={{ padding: '20px' }}>
        <h2>Notification Examples</h2>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={showSuccessNotification}>Show Success</button>
          <button onClick={showErrorNotification}>Show Error</button>
          <button onClick={showWarningNotification}>Show Warning</button>
          <button onClick={showInfoNotification}>Show Info</button>
          <button onClick={handlePromise}>Test Promise</button>
        </div>
      </div>
    );
  };

export default example