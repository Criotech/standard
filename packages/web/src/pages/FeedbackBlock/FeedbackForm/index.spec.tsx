import { waitFor, fireEvent } from "@testing-library/react";
import FeedbackForm from ".";
import { renderWithLanguage, screen } from "../../../test-utils";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useFeedback } from "../../../hooks/useFeedback";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useFeedback", () => ({
	useFeedback: jest.fn(),
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

	(useFeedback as jest.Mock).mockReturnValue({
		savePurchaseFeedback: jest.fn(),
	});
});

describe("FeedbackForm", () => {
	it("should render store name and date of purchase text", async () => {
		renderWithLanguage(
			<FeedbackForm
				contactLensesScore={0}
				storeScore={0}
				isFeedbackFormDisabled={false}
				storeName="India demo store"
				dateOfPurchase={"10 Aug 2022"}
				purchaseId="abc123"
			/>
		);

		await waitFor(() => {
			const storeName = screen.getByText("Store Name: India demo store");
			expect(storeName).toBeVisible();

			const dateOfPurchase = screen.getByText(
				"Date of purchase: 10 Aug 2022"
			);
			expect(dateOfPurchase).toBeVisible();
		});
	});

	it("should disable submit feedback button when isSubmitDisabled is true", async () => {
		renderWithLanguage(
			<FeedbackForm
				contactLensesScore={0}
				storeScore={0}
				isFeedbackFormDisabled={false}
				storeName=""
				dateOfPurchase={""}
				purchaseId="abc123"
			/>
		);

		await waitFor(() => {
			const submitFeedbackButton = screen.getByRole("button", {
				name: "SUBMIT FEEDBACK",
			});
			expect(submitFeedbackButton).toBeDisabled();
		});
	});

	it("should call savePurchaseFeedback once after submitFeedbackButton is clicked", async () => {
		const mockSavePurchaseFeedback = jest.fn();
		(useFeedback as jest.Mock).mockReturnValue({
			savePurchaseFeedback: mockSavePurchaseFeedback,
		});

		renderWithLanguage(
			<FeedbackForm
				contactLensesScore={2}
				storeScore={2}
				isFeedbackFormDisabled={false}
				storeName=""
				dateOfPurchase={""}
				purchaseId="abc123"
			/>
		);

		await waitFor(() => {
			fireEvent.click(
				screen.getByRole("button", {
					name: "SUBMIT FEEDBACK",
				})
			);
			expect(mockSavePurchaseFeedback).toHaveBeenCalledTimes(1);
		});
	});
});
