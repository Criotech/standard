import { renderHook } from "@testing-library/react-hooks";
import { useToggleAll } from "./useToggleAll";

describe("useToggleAll", () => {
	it("should return all=false when controlees are: false", () => {
		const { result } = renderHook(() =>
			useToggleAll([{ checked: false, toggle: jest.fn() }])
		);
		const [all] = result.current;
		expect(all).toStrictEqual(false);
	});

	it("should return all=true when controlees are: true", () => {
		const { result } = renderHook(() =>
			useToggleAll([{ checked: true, toggle: jest.fn() }])
		);
		const [all] = result.current;
		expect(all).toStrictEqual(true);
	});

	it("should return all=false when controlees are: false, true", () => {
		const { result } = renderHook(() =>
			useToggleAll([
				{ checked: false, toggle: jest.fn() },
				{ checked: true, toggle: jest.fn() },
			])
		);
		const [all] = result.current;
		expect(all).toStrictEqual(false);
	});

	it("should return all=false when controlees are: true, false", () => {
		const { result } = renderHook(() =>
			useToggleAll([
				{ checked: true, toggle: jest.fn() },
				{ checked: false, toggle: jest.fn() },
			])
		);
		const [all] = result.current;
		expect(all).toStrictEqual(false);
	});

	it("should return all=true when controlees are: true, true", () => {
		const { result } = renderHook(() =>
			useToggleAll([
				{ checked: true, toggle: jest.fn() },
				{ checked: true, toggle: jest.fn() },
			])
		);
		const [all] = result.current;
		expect(all).toStrictEqual(true);
	});

	it("should call all controlees toggle with false when toggleAll is called with false", async () => {
		const mockToggle1 = jest.fn();
		const mockToggle2 = jest.fn();
		const { result } = renderHook(() =>
			useToggleAll([
				{ checked: true, toggle: mockToggle1 },
				{ checked: true, toggle: mockToggle2 },
			])
		);
		const [, toggleAll] = result.current;

		toggleAll(false);

		expect(mockToggle1).toHaveBeenCalledWith(false);
		expect(mockToggle2).toHaveBeenCalledWith(false);
	});

	it("should call all controlees toggle with true when toggleAll is called with true", async () => {
		const mockToggle1 = jest.fn();
		const mockToggle2 = jest.fn();
		const { result } = renderHook(() =>
			useToggleAll([
				{ checked: true, toggle: mockToggle1 },
				{ checked: true, toggle: mockToggle2 },
			])
		);
		const [, toggleAll] = result.current;

		toggleAll(true);

		expect(mockToggle1).toHaveBeenCalledWith(true);
		expect(mockToggle2).toHaveBeenCalledWith(true);
	});
});
