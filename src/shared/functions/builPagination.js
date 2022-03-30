/**
 * Function to calcule the quantity iof data to print
 * 
 * @param {*} limit 
 * @param {*} page 
 * @returns 
 */
export const buildPagination = async (limit, page) => {
    const offset = page !== 0 ? (page - 1) * limit : 0;
    return { 
        limit,
        offset
    }
};