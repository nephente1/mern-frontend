import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export enum ResultType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface NotificationsProps {
  isOpen: boolean;
  message: string;
  result?: ResultType;
  onClose: () => void;
}
export const Notifications = ({isOpen, message, result, onClose}: NotificationsProps) => {

  const severityStyles = {
    success: { backgroundColor: 'var(--success)' },
    error: { backgroundColor: 'var(--error)' },
    warning: { backgroundColor: 'var(--orange)' },
    info: { backgroundColor: 'var(--info)' },
  };

  return (
    <div>
      <Snackbar 
        open={isOpen} 
        autoHideDuration={2000} 
        onClose={onClose} 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={onClose}
          severity={result}
          variant="filled"
          sx={{ width: '100%', backgroundColor: severityStyles[result] }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}