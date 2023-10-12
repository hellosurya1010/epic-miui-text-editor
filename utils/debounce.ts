
export const debounce = (mainFunction, delay: number) => {
    let timer;
    return function (args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            mainFunction(...args);
        }, delay);
    }
}
