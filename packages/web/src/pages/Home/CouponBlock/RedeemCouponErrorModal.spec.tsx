import { ErrorTranslations } from "@myacuvue_thailand_web/services";
import { screen, act, waitFor, fireEvent } from "@testing-library/react";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage } from "../../../test-utils";
import RedeemCouponErrorModal from "./RedeemCouponErrorModal";

const error: ErrorTranslations = {
	translationKey: "validation.member.couponCode.expired",
	translationData: {},
};

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("RedeemCouponErrorModal", () => {
	it("should call setOpen when close button is clicked", async () => {
		const mockSetOpen = jest.fn();
		act(() => {
			renderWithLanguage(
				<RedeemCouponErrorModal
					error={error}
					isOpen
					setOpen={mockSetOpen}
				/>
			);
		});

		await waitFor(() => {
			const closeButton = screen.getByText("OK");
			fireEvent.click(closeButton);
			expect(mockSetOpen).toHaveBeenCalled();
		});
	});
});
