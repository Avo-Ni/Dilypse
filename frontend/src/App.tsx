import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppLayout } from '@/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { useAuthStore } from '@/stores/authStore';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const App = () => {
    const { isAuthenticated } = useAuthStore();
    const [showRegister, setShowRegister] = useState(false); // État pour basculer entre login et register

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {isAuthenticated ? (
                <AppLayout>
                    <ArticlesPage />
                </AppLayout>
            ) : (
                <>
                    {showRegister ? (
                        <RegisterPage onSwitch={() => setShowRegister(false)} />
                    ) : (
                        <LoginPage onSwitch={() => setShowRegister(true)} />
                    )}
                </>
            )}
        </ThemeProvider>
    );
};
