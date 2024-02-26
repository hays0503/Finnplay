
/**
 * Creates a debounced function that delays invoking the provided function until after `ms` milliseconds have elapsed since the last time it was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      console.log("debounce start");
      func.apply(this, arguments)
    }, ms);
  };
}

export default debounce;