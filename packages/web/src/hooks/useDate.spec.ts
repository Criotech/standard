import { renderHook } from "@testing-library/react-hooks";
import { useDate } from "./useDate";
import { useText } from "./useText";

jest.mock("./useText", () => ({ useText: jest.fn() }));

describe("useDate", () => {
	describe("getMonthName", () => {
		it("should get month name with languageTag", () => {
			(useText as jest.Mock).mockReturnValue("en-US");

			const { result } = renderHook(() => useDate());

			const date = result.current.getMonthName(0);

			expect(date).toStrictEqual("January");
		});

		it("should get empty string without languageTag", () => {
			(useText as jest.Mock).mockReturnValue("");

			const { result } = renderHook(() => useDate());

			const date = result.current.getMonthName(0);

			expect(date).toStrictEqual("");
		});
	});

	describe("dateSubtractingYears", () => {
		it("should subtract the given number of years", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.dateSubtractingYears(
				new Date("2022/08/31"),
				1
			);

			expect(date.getFullYear()).toStrictEqual(2021);
		});
	});

	describe("dateAddingMonths", () => {
		it("should add the given number of months", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.dateAddingMonths(
				new Date("2022/01/21"),
				1
			);

			expect(date.getDate()).toStrictEqual(21);
			expect(date.getMonth()).toStrictEqual(1);
			expect(date.getFullYear()).toStrictEqual(2022);
		});
	});

	describe("longDateToDisplay", () => {
		it("should return 24 Sep 2022 in text for date 2022/09/24", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.longDateToDisplay(
				new Date("2022/09/24")
			);

			expect(date).toStrictEqual("24 Sept 2022");
		});

		it("should return 31 Aug 2022 in text for date 2022/08/31", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.longDateToDisplay(
				new Date("2022/08/31")
			);

			expect(date).toStrictEqual("31 Aug 2022");
		});
	});

	describe("shortDateToDisplay", () => {
		it("should return Dec 2022 in text for date 2022/12/24", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.shortDateToDisplay(
				new Date("2022/12/24")
			);

			expect(date).toStrictEqual("Dec 2022");
		});
	});

	describe("getDateFromString", () => {
		it("should get date from string", () => {
			const { result } = renderHook(() => useDate());

			const date = result.current.getDateFromString("2022-01-01");

			expect(date).toStrictEqual(new Date(2022, 0, 1));
		});
	});
});
