import { waitFor } from "@testing-library/react";
import SavePurchaseFeedbackSuccessDialog from ".";
import { renderWithLanguage, screen } from "../../../../test-utils";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: "yzbn",
		mapDefaultCenter: {
			latitude: 0,
			longitude: 0,
		},
		changeOpticalStoreDialogExtraLines: [],
		opticalStoreAdviceCards: [],
	});
});

describe("FeedbackForm", () => {
	it("should render SavePurchaseFeedbackSuccessDialog body text", async () => {
		renderWithLanguage(
			<SavePurchaseFeedbackSuccessDialog
				isOpen={true}
				onClose={jest.fn()}
			/>
		);

		await waitFor(() => {
			const successModalBody = screen.getByText(
				"Thank you for submitting your feedback"
			);
			expect(successModalBody).toBeVisible();
		});
	});
});
