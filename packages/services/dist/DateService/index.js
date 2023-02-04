function getMonthName(monthIndex, languageTag) {
    const date = new Date("1970-01-01");
    date.setMonth(monthIndex);
    return date.toLocaleString(languageTag, { month: "long" });
}
function dateSubtractingYears(date, years) {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() - years);
    return newDate;
}
function dateAddingMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
}
function dateFromString(stringDate) {
    let [year, month, day] = stringDate.split("-");
    day = day || "1";
    const monthOffset = 1;
    const monthIndex = parseInt(month) - monthOffset;
    return new Date(parseInt(year), monthIndex, parseInt(day));
}
const DateService = {
    getMonthName,
    dateSubtractingYears,
    dateAddingMonths,
    dateFromString,
};
export default DateService;
