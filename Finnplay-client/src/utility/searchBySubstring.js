/**
 * Filters a list of items based on a substring match in the item name.
 * @param {Array} list - The list of items to filter.
 * @param {string} substring - The substring to search for in the item names.
 * @returns {Array} - The filtered list of items.
 */
const searchBySubstring = (list, substring) => {
    return list.filter((item) =>
        item.name.toLowerCase().includes(substring.toLowerCase()),
    );
};

export default searchBySubstring;