import { useContext } from "react";
import Notification from "./Notification";
import { NotificationContext } from "../context/NotificationContext";
import { getStyles } from "../styles/getStyles";
import { themes } from "../styles/themes";

const NotificationContainer = () => {
  const { notifications, removeNotification, config } = useContext(NotificationContext);
  const { position, theme } = config;

  const themeStyles = themes[theme] || themes.light;
  const styles = getStyles(themeStyles, position);

  return (
    <div 
      className={`notification-container position-${position}`}
      style={styles.container}
    >
      {notifications.slice(0, config.maxCount).reverse().map((notification) => (
        <Notification 
          key={notification.id}
          {...notification}
          theme={theme}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;