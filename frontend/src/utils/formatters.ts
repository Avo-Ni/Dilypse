export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'MGA'
    }).format(price);
};

/*export const formatDate = (date):string => {
    if (!date) return '-';
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, 'dd/MM/yyyy');
};*/