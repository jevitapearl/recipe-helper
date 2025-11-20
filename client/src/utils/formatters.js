/**
 * Formats a number as a currency string (e.g., $1,200.00)
 * @param {number} amount
 * @param {string} locale
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

/**
 * Formats a date object or string into a readable date string
 * @param {Date | string} dateInput
 * @param {string} locale
 * @returns {string}
 */
export const formatDate = (dateInput, locale = 'en-US') => {
    const date = new Date(dateInput);
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    }).format(date);
};