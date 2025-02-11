import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ArticleList } from '@/components/articles/ArticleList';
import { ArticleForm } from '@/components/articles/ArticleForm';
import { useArticleStore } from '@/stores/articleStore';

export const ArticlesPage = () => {
    const { openForm } = useArticleStore();

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}
            >
                <Typography variant="h4">Articles</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={openForm}
                >
                    Add Article
                </Button>
            </Box>

            <ArticleList />
            <ArticleForm />
        </Box>
    );
};