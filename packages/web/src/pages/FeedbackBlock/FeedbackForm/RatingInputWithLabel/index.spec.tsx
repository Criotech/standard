import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RatingInputWithLabel from ".";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../../test-utils";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("RatingInputWithLabel", () => {
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

	it("should render without errors", () => {
		renderWithLanguage(
			<RatingInputWithLabel
				value={0}
				label={"notProvided"}
				description={"notProvided"}
			/>
		);
	});

	it("should render rating input component", async () => {
		const { container } = renderWithLanguage(
			<RatingInputWithLabel
				value={0}
				label={"notProvided"}
				description={"notProvided"}
			/>
		);

		await waitFor(() => {
			const ratingInput = container.querySelector(".acuvue-rating-input");
			expect(ratingInput).toBeVisible();
		});
	});

	it("should render label and description", async () => {
		act(() => {
			renderWithLanguage(
				<RatingInputWithLabel
					value={0}
					label={"phoneRegistrationPage.welcome"}
					description={"phoneRegistrationPage.phoneForm.phoneNumber"}
				/>
			);
		});

		await waitFor(() => {
			const labelText = screen.getByText("Welcome to MyACUVUE™");
			expect(labelText).toBeVisible();
		});

		await waitFor(() => {
			const descriptionText = screen.getByText("Mobile Number");
			expect(descriptionText).toBeVisible();
		});
	});

	it("should pass correct rating input value to RatingInput component", async () => {
		const { container } = renderWithLanguage(
			<RatingInputWithLabel
				value={1}
				label={"phoneRegistrationPage.welcome"}
				description={"phoneRegistrationPage.phoneForm.phoneNumber"}
			/>
		);

		await waitFor(() => {
			const highlightedStars = container.querySelectorAll(
				".acuvue-rating-input-star.highlighted"
			);
			expect(highlightedStars.length).toBe(1);
		});
	});
});
