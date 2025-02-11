import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from '@mui/material';
import { useArticleStore } from '@/stores/articleStore';
import { ErrorAlert } from '@/components/common/ErrorAlert';

const initialState = {
    name: '',
    description: '',
    price: '',
    quantity: ''
};

export const ArticleForm = () => {
    const {
        selectedArticle,
        isFormOpen,
        createArticle,
        updateArticle,
        closeForm,
        error,
        clearError,
        loading
    } = useArticleStore();

    const [formData, setFormData] = React.useState(initialState);

    React.useEffect(() => {
        if (selectedArticle) {
            setFormData({
                name: selectedArticle.name,
                description: selectedArticle.description,
                price: selectedArticle.price.toString(),
                quantity: selectedArticle.quantity.toString()
            });
        } else {
            setFormData(initialState);
        }
    }, [selectedArticle]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const articleData = {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            quantity: Number(formData.quantity)
        };

        if (selectedArticle) {
            await updateArticle(selectedArticle.id, articleData);
        } else {
            await createArticle(articleData);
        }
    };

    return (
        <Dialog open={isFormOpen} onClose={closeForm} maxWidth="sm" fullWidth>
            <DialogTitle>
                {selectedArticle ? 'Edit Article' : 'Create Article'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    {error && <ErrorAlert error={error} onClose={clearError} />}

                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        margin="normal"
                        multiline
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        margin="normal"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        margin="normal"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeForm}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};