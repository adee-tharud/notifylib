export const getStyles = (theme, position) => {
    return {
      container: {
        position: 'fixed',
        zIndex: 9999,
        ...(position.includes('top') ? { top: '12px' } : { bottom: '12px' }),
        ...(position.includes('right') ? { right: '12px' } : {}),
        ...(position.includes('left') ? { left: '12px' } : {}),
        ...(position.includes('center') ? { left: '50%', transform: 'translateX(-50%)' } : {}),
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '100%',
        width: '320px',
      },
      notification: (type) => ({
        backgroundColor: theme[type].background,
        color: theme[type].color,
        borderLeft: `4px solid ${theme[type].borderColor}`,
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '12px 12px 15px 12px', // Added extra padding at the bottom for progress bar
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        opacity: 1,
        transform: 'translateY(0)',
      }),
      content: {
        flex: 1,
        marginRight: '24px',
      },
      closeButton: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        color: 'inherit',
        opacity: 0.7,
        transition: 'opacity 0.2s',
        '&:hover': {
          opacity: 1,
        },
      },
      exit: {
        opacity: 0,
        transform: 'translateY(-20px)',
      },
      enter: {
        opacity: 0,
        transform: 'translateY(-20px)',
      },
    };
  };