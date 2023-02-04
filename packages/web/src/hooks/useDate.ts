import { useCallback } from "react";
import { useService } from "./useService";
import { useText } from "./useText";

interface IUseDate {
	getMonthName: (monthIndex: number) => string;
	dateSubtractingYears: (date: Date, years: number) => Date;
	dateAddingMonths: (date: Date, months: number) => Date;
	longDateToDisplay: (date: Date) => string;
	shortDateToDisplay: (date: Date) => string;
	getDateFromString: (dateString: string) => Date;
}

export const useDate = (): IUseDate => {
	const languageTag = useText("languageTag");
	const { DateService } = useService();

	const getMonthName = useCallback(
		(monthIndex: number) =>
			languageTag
				? DateService.getMonthName(monthIndex, languageTag)
				: "",
		[DateService, languageTag]
	);

	const dateSubtractingYears = useCallback(
		(date: Date, years: number) =>
			DateService.dateSubtractingYears(date, years),
		[DateService]
	);

	const dateAddingMonths = useCallback(
		(date: Date, months: number) =>
			DateService.dateAddingMonths(date, months),
		[DateService]
	);

	const longDateToDisplay = useCallback((date: Date) => {
		return date.toLocaleString("en-AU", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	}, []);

	const shortDateToDisplay = useCallback((date: Date) => {
		return date.toLocaleString("en-AU", {
			month: "short",
			year: "numeric",
		});
	}, []);

	const getDateFromString = useCallback(
		(dateString: string) => DateService.dateFromString(dateString),
		[DateService]
	);

	return {
		getMonthName,
		dateSubtractingYears,
		dateAddingMonths,
		longDateToDisplay,
		shortDateToDisplay,
		getDateFromString,
	};
};
