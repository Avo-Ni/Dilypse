import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { useAuthStore } from '@/stores/authStore';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const RegisterForm = () => {
    const { register, error, loading, clearError } = useAuthStore();
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await register(formData);  
            setFormData({ username: '', password: '' });
        } catch (error) {
        }
    };

    return (
        <Box
            component={Paper}
            sx={{
                p: 4,
                maxWidth: 400,
                mx: 'auto',
                mt: 8
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Register
            </Typography>

            {error && <ErrorAlert error={error} onClose={clearError} />}

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <LoadingSpinner /> : 'Register'}
                </Button>
            </Box>
        </Box>
    );
};
