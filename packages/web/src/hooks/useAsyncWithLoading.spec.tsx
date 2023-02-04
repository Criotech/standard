import { renderHook, act } from "@testing-library/react-hooks";
import { useAsyncWithLoading } from "./useAsyncWithLoading";
import { ComponentProps } from "react";
import { useLoading } from "./useLoading";

jest.mock("../hooks/useLoading", () => ({
	useLoading: jest.fn(),
}));

describe("useAsyncWithLoading", () => {
	beforeEach(() => {
		(useLoading as jest.Mock).mockReturnValue({
			showLoading: jest.fn(),
			hideLoading: jest.fn(),
			isLoading: jest.fn(),
		});
	});

	it("should show and hide loading when using async", async () => {
		const fakeAsync = jest.fn().mockResolvedValue("result");

		const { result } = renderHook(
			() => {
				return useAsyncWithLoading(fakeAsync);
			},
			{
				wrapper: ({ children }: ComponentProps<any>) => <>{children}</>,
			}
		);

		expect(result.current.loading).toBe(true);
		expect(useLoading().showLoading).toHaveBeenCalled();

		await act(async () => {});

		expect(useLoading().hideLoading).toHaveBeenCalled();
		expect(result.current.loading).toBe(false);
		expect(result.current.value).toEqual("result");
	});
});
