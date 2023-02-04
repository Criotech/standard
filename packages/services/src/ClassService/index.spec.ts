import ClassService from "./index";

const { createClassName } = ClassService;

describe("createClassNames", () => {
	it("should return empty string when empty string is passed", () => {
		const result = createClassName("");
		expect(result).toEqual("");
	});

	it("should return empty string when no argument is passed", () => {
		const result = createClassName();
		expect(result).toEqual("");
	});

	it("should return class-1 when class-1 is passed", () => {
		const result = createClassName("class-1");
		expect(result).toEqual("class-1");
	});

	it("should return the respective class names followed by space", () => {
		const result = createClassName("class-1", "class-2");
		expect(result).toEqual("class-1 class-2");
	});

	it("should not append spaces if passed class name is empty string", () => {
		const fakeIsWide = false;
		const fakeWideClass = fakeIsWide ? "wide" : "";

		const result = createClassName("class-1", fakeWideClass);
		expect(result).toEqual("class-1");
	});

	it("should not append spaces if passed class name is undefined", () => {
		const fakeClassNameProp = undefined;

		const result = createClassName("class-1", fakeClassNameProp);
		expect(result).toEqual("class-1");
	});
});
