import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box
} from '@mui/material';
import { useAuthStore } from '@/stores/authStore';

interface Props {
    children: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
    const { logout } = useAuthStore();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Article Management
                    </Typography>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box py={4}>{children}</Box>
            </Container>
        </>
    );
};