# React NotifyPro

A flexible, customizable notification system for React applications.

## Features

- 🚀 Multiple notification types: success, error, warning, info
- ⏱️ Auto-dismissing notifications with progress bar
- 🔧 Customizable positions: top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
- 🎨 Theme support for light and dark modes
- ⚙️ Configurable duration, max count, and persistence
- 🔄 Promise support for handling asynchronous operations
- ♿ Accessibility features: keyboard navigation, screen reader support

## Installation

```bash
npm install notifypro
```

or

```bash
yarn add notifypro
```

## Quick Start

Wrap your application with the `NotificationProvider`:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { NotificationProvider } from 'notifypro';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
```

Then use the `useNotification` hook in your components:

```jsx
import React from 'react';
import { useNotification } from 'notifypro';

function MyComponent() {
  const { success, error, warning, info } = useNotification();
  
  const handleClick = () => {
    success('Operation completed successfully!');
  };
  
  return (
    <button onClick={handleClick}>
      Show Notification
    </button>
  );
}
```

### useNotification Hook

```jsx
const {
  // Show notifications by type
  success,
  error,
  warning,
  info,
  
  // Advanced functions
  addNotification,
  removeNotification,
  clearNotifications,
  promise,
  
  // State
  notifications,
  config,
} = useNotification();
```

### Basic Notification Functions

All notification functions accept content and options:

```jsx
// Basic usage
success('Operation completed!');

// With options
error('Something went wrong!', {
  duration: 10000, // Duration in ms
  persist: true, // Prevent auto-dismissal
});

// Using JSX content
warning(() => (
  <div>
    <h4>Warning!</h4>
    <p>This is a complex notification.</p>
  </div>
));
```

### Promise Support

Handle asynchronous operations with notifications:

```jsx
const { promise } = useNotification();

const fetchData = async () => {
  try {
    const result = await promise(
      fetch('/api/data').then(res => res.json()),
      {
        loading: 'Fetching data...',
        success: 'Data loaded successfully!',
        error: 'Failed to load data',
        // Optional durations
        successDuration: 3000,
        errorDuration: 8000,
      }
    );
    
    // Handle the result
    console.log(result);
  } catch (error) {
    // Error is already handled by the notification
    console.error(error);
  }
};
```

### Customize Content
Render Customize react component in notification,

```bash
info(() => (
  <div>
    <h4>Custom Component</h4>
    <p>This is a custom React component in a notification!</p>
    <button onClick={() => console.log('Clicked inside notification')}>
      Click me
    </button>
  </div>
));
```

### useNotificationState Hook

Access notification state without the action functions:

```jsx
import { useNotificationState } from 'notifypro';

function NotificationCounter() {
  const { notifications } = useNotificationState();
  
  return (
    <div>
      Active notifications: {notifications.length}
    </div>
  );
}
```

## Customization

### Positions

Import the `POSITIONS` constant to use predefined positions:

```jsx
import { POSITIONS } from 'notifypro';

<NotificationProvider
  config={{
    position: POSITIONS.TOP_CENTER,
  }}
>
  {children}
</NotificationProvider>
```

Available positions:
- `TOP_LEFT`
- `TOP_RIGHT`
- `TOP_CENTER`
- `BOTTOM_LEFT`
- `BOTTOM_RIGHT`
- `BOTTOM_CENTER`

### Notification Types

Import the `NOTIFICATION_TYPES` constant for type references:

```jsx
import { NOTIFICATION_TYPES } from 'notifypro';

// Using the addNotification function
const { addNotification } = useNotification();

addNotification({
  type: NOTIFICATION_TYPES.SUCCESS,
  content: 'Custom notification',
  duration: 3000,
});
```

Available types:
- `SUCCESS`
- `ERROR`
- `WARNING`
- `INFO`

## License

MIT
