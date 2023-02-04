import { useService } from "./useService";
import { useString } from "./useString";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

beforeEach(() => {
	(useService as jest.Mock).mockReturnValue({
		StringService: {
			isOnlyDigits: jest.fn(),
			deleteNonDigits: jest.fn(),
		},
	});
});

describe("isOnlyDigits", () => {
	it("should call StringService.isOnlyDigits with correct params", async () => {
		const { result } = renderHook(() => useString());

		await result.current.isOnlyDigits("1234");

		const { StringService } = useService();

		expect(StringService.isOnlyDigits).toHaveBeenCalledWith("1234");
	});
});

describe("deleteNonDigits", () => {
	it("should call StringService.deleteNonDigits with correct params", async () => {
		const { result } = renderHook(() => useString());

		await result.current.deleteNonDigits("1234a");

		const { StringService } = useService();

		expect(StringService.deleteNonDigits).toHaveBeenCalledWith("1234a");
	});
});
