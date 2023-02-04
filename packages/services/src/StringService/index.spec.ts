import StringService from "./index";

describe("isOnlyDigits", () => {
	const { isOnlyDigits } = StringService;

	it("should return true for 123", () => {
		expect(isOnlyDigits("123")).toEqual(true);
	});

	it("should return false for empty string", () => {
		expect(isOnlyDigits("")).toEqual(false);
	});

	it("should return false for abc", () => {
		expect(isOnlyDigits("abc")).toEqual(false);
	});

	it("should return false for 12a", () => {
		expect(isOnlyDigits("12a")).toEqual(false);
	});
});

describe("deleteNonDigits", () => {
	const { deleteNonDigits } = StringService;

	it("should return same number for a number string", () => {
		expect(deleteNonDigits("123")).toEqual("123");
	});

	it("should return empty string for empty string", () => {
		expect(deleteNonDigits("")).toEqual("");
	});

	it("should return empty string for abc", () => {
		expect(deleteNonDigits("abc")).toEqual("");
	});

	it("should return 12 for b12a", () => {
		expect(deleteNonDigits("b12a")).toEqual("12");
	});
});
