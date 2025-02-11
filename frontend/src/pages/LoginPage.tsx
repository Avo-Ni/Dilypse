import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = ({ onSwitch }) => {
    return (
        <>
            <LoginForm />
            <Box mt={2} textAlign="center">
                <Typography variant="body2">No account Yet?</Typography>
                <Button onClick={onSwitch} variant="text">
                    Register
                </Button>
            </Box>
        </>
    );
};