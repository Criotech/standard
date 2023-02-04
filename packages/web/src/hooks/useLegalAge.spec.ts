import { renderHook } from "@testing-library/react-hooks";
import { useService } from "./useService";
import { useLegalAge } from "./useLegalAge";
import { LegalAgeRange } from "@myacuvue_thailand_web/services";

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

describe("getLegalAgeRange", () => {
	it("should call LegalAgeService.getLegalAgeRange with correct arguments", async () => {
		(useService as jest.Mock).mockReturnValue({
			LegalAgeService: {
				getLegalAgeRange: jest
					.fn()
					.mockReturnValue(
						LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
					),
			},
		});

		const birthMonth = 1;
		const birthYear = 2000;

		const { result } = renderHook(() => useLegalAge());

		const response = await result.current.getLegalAgeRange(
			birthMonth,
			birthYear
		);

		const { LegalAgeService } = useService();

		expect(LegalAgeService.getLegalAgeRange).toHaveBeenCalledWith(
			birthMonth,
			birthYear
		);
		expect(response).toEqual(LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT);
	});
});
