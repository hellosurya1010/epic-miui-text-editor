export const getCurrentTimestampLikeWord = () => {
    const currentDate = new Date();
    return currentDate.toISOString();
}