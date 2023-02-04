declare function getMonthName(monthIndex: number, languageTag: string): string;
declare function dateSubtractingYears(date: Date, years: number): Date;
declare function dateAddingMonths(date: Date, months: number): Date;
declare function dateFromString(stringDate: string): Date;
declare const DateService: {
    getMonthName: typeof getMonthName;
    dateSubtractingYears: typeof dateSubtractingYears;
    dateAddingMonths: typeof dateAddingMonths;
    dateFromString: typeof dateFromString;
};
export default DateService;
