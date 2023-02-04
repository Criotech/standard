import { useStorage } from "./useStorage";
import { useLocalStorage } from "react-use";

jest.mock("react-use");

describe("useStorage", () => {
	it("should append namespace", () => {
		(useLocalStorage as jest.Mock).mockReturnValueOnce([
			undefined,
			jest.fn(),
		]);
		useStorage("default-language", "value");
		expect(useLocalStorage).toHaveBeenCalledWith(
			"myacuvue:default-language",
			"value"
		);
	});

	it("should return default value if not previously stored", () => {
		(useLocalStorage as jest.Mock).mockReturnValueOnce([
			undefined,
			jest.fn(),
		]);
		const [value] = useStorage("default-language", "value");
		expect(value).toEqual("value");
	});

	it("should return previously stored value", () => {
		(useLocalStorage as jest.Mock).mockReturnValueOnce([
			"storedValue",
			jest.fn(),
		]);
		const [value] = useStorage("default-language", "value");
		expect(value).toEqual("storedValue");
	});

	it("should store new value", () => {
		const setFunction = jest.fn();
		(useLocalStorage as jest.Mock).mockReturnValueOnce([
			undefined,
			setFunction,
		]);
		const [, setValue] = useStorage("default-language", "value");
		setValue("newValue");
		expect(setFunction).toHaveBeenCalledWith("newValue");
	});
});
