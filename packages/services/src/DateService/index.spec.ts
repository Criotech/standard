import DateService from "./index";

const { getMonthName, dateSubtractingYears, dateAddingMonths, dateFromString } =
	DateService;

describe("getMonthName", () => {
	it("should return expected month name in english based on month index", () => {
		const expectedMonthName = "March";
		const monthName = getMonthName(2, "en-US");
		expect(monthName).toEqual(expectedMonthName);
	});

	it("should return expected month name in thai based on month index", () => {
		const expectedMonthName = "มีนาคม";
		const monthName = getMonthName(2, "th-TH");
		expect(monthName).toEqual(expectedMonthName);
	});
});

describe("dateSubtractingYears", () => {
	it("should return 2021-06-20 when passed 2022-06-20 and 1 year to subtract", () => {
		const originalDate = new Date("2022-06-20");
		const dateMinus1Year = dateSubtractingYears(originalDate, 1);
		expect(dateMinus1Year.toDateString()).toStrictEqual(
			expect.stringContaining("Jun 20 2021")
		);
	});
});

describe("dateAddingMonths", () => {
	it("should return 2021-06-20 when passed 2022-06-20 and 1 year to subtract", () => {
		const originalDate = new Date("2022-06-20");
		const datePlus1Month = dateAddingMonths(originalDate, 1);
		expect(datePlus1Month.toDateString()).toStrictEqual(
			expect.stringContaining("Jul 20 2022")
		);
	});
});

describe("dateFromString", () => {
	it("should return expected date from string", () => {
		const date = dateFromString("2021-07-05");
		expect(date.toDateString()).toStrictEqual(
			expect.stringContaining("Jul 05 2021")
		);
	});

	it("should return valid date appending first day when only year and month string is sent", () => {
		const date = dateFromString("2021-07");
		expect(date.toDateString()).toStrictEqual(
			expect.stringContaining("Jul 01 2021")
		);
	});
});
