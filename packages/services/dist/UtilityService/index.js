function numbersFromRange(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
        array.push(i);
    }
    return array;
}
function sleep(waitTimeInMilliseconds) {
    return new Promise((resolve) => setTimeout(() => {
        resolve();
    }, waitTimeInMilliseconds));
}
const UtilityService = {
    numbersFromRange,
    sleep,
};
export default UtilityService;
