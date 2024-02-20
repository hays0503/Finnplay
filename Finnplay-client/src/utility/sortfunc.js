/**
 * Sorts two values in ascending order.
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @returns {number} - Returns -1 if a is less than b, 1 if a is greater than b, and 0 if a is equal to b.
 */
const sortfunc = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    // a должно быть равным b
    return 0;
};

export default sortfunc;