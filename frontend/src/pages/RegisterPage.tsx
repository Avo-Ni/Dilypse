import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const RegisterPage = ({ onSwitch }) => {
    return (
        <>
            <RegisterForm />
            <Box mt={2} textAlign="center">
                <Typography variant="body2">Already have an account?</Typography>
                <Button onClick={onSwitch} variant="text">
                    Login
                </Button>
            </Box>
        </>
    );
};