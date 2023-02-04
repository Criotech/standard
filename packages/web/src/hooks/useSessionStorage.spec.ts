import { useSessionStorage } from "./useSessionStorage";
import { useSessionStorage as nativeUseSessionStorage } from "react-use";

jest.mock("react-use");

describe("useSessionStorage", () => {
	it("should append namespace", () => {
		(nativeUseSessionStorage as jest.Mock).mockReturnValueOnce([
			undefined,
			jest.fn(),
		]);
		useSessionStorage("key", "value");
		expect(nativeUseSessionStorage).toHaveBeenCalledWith(
			"myacuvue:key",
			"value"
		);
	});

	it("should return previously stored value", () => {
		(nativeUseSessionStorage as jest.Mock).mockReturnValueOnce([
			"storedValue",
			jest.fn(),
		]);
		const [value] = useSessionStorage("key", "value");
		expect(value).toEqual("storedValue");
	});

	it("should store new value", () => {
		const setFunction = jest.fn();
		(nativeUseSessionStorage as jest.Mock).mockReturnValueOnce([
			undefined,
			setFunction,
		]);
		const [, setValue] = useSessionStorage("key", "value");
		setValue("newValue");
		expect(setFunction).toHaveBeenCalledWith("newValue");
	});
});
