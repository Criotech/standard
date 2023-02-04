import { waitFor } from "@testing-library/react";
import FeedbackBlock from ".";
import { renderWithLanguage, screen } from "../../test-utils";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useFeedback } from "../../hooks/useFeedback";
import { mocked } from "ts-jest/utils";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useFeedback", () => ({
	useFeedback: jest.fn(),
}));

const fakeLatestPurchase = {
	id: "fake-id",
	storeName: "fake-store-name",
	dateOfPurchase: "fake-date-of-purchase",
	feedback: {
		contactLensesScore: 0,
		storeScore: 0,
		hasGivenFeedback: false,
	},
};

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

	mocked(useFeedback).mockReturnValue({
		getLatestPurchase: jest.fn().mockResolvedValue(fakeLatestPurchase),
		savePurchaseFeedback: jest.fn(),
	});
});

describe("FeedbackForm", () => {
	it("should render FeedbackBlock with title text and subtitle text", async () => {
		renderWithLanguage(<FeedbackBlock />);

		await waitFor(() => {
			const title = screen.getByText(
				"We hope you had a great experience with our ACUVUE® contact lenses"
			);
			expect(title).toBeVisible();

			const subtitle = screen.getByText(
				"Please select a rating based on your experience"
			);
			expect(subtitle).toBeVisible();
		});
	});
});
