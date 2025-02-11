import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useArticleStore } from '@/stores/articleStore';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { formatPrice } from '@/utils/formatters';

export const ArticleList = () => {
    const {
        articles,
        loading,
        error,
        fetchArticles,
        deleteArticle,
        setSelectedArticle,
        clearError
    } = useArticleStore();

    React.useEffect(() => {
        fetchArticles();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorAlert error={error} onClose={clearError} />;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Creation Date</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articles.map((article) => (
                        <TableRow key={article.id}>
                            <TableCell>{article.name}</TableCell>
                            <TableCell>{article.description}</TableCell>
                            <TableCell align="right">{formatPrice(article.price)}</TableCell>
                            <TableCell align="right">{article.quantity}</TableCell>
                            <TableCell align="right">{article.createdAt}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => setSelectedArticle(article)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => deleteArticle(article.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
