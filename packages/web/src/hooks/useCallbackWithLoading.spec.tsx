import { useLoading } from "./useLoading";
import { act, renderHook } from "@testing-library/react-hooks";
import { ComponentProps } from "react";
import { useCallbackWithLoading } from "./useCallbackWithLoading";

jest.mock("../hooks/useLoading", () => ({
	useLoading: jest.fn(),
}));

describe("useCallbackWithLoading", () => {
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
				return useCallbackWithLoading(fakeAsync, []);
			},
			{
				wrapper: ({ children }: ComponentProps<any>) => <>{children}</>,
			}
		);

		const value = await result.current();

		expect(useLoading().showLoading).toHaveBeenCalled();

		await act(async () => {});

		expect(useLoading().hideLoading).toHaveBeenCalled();
		expect(value).toEqual("result");
	});
});
