import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState({
    isOpen: false,
    result: null,
    message: '',
  });

  const showNotification = useCallback((result, message) => {
    setNotification({ isOpen: true, result, message });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return { notification, showNotification, hideNotification };
};
