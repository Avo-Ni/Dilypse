import { Alert, AlertTitle } from '@mui/material';

interface Props {
    error: string;
    onClose?: () => void;
}

export const ErrorAlert: React.FC<Props> = ({ error, onClose }) => (
    <Alert severity="error" onClose={onClose} sx={{ mb: 2 }}>
        <AlertTitle>Error</AlertTitle>
        {error}
    </Alert>
);