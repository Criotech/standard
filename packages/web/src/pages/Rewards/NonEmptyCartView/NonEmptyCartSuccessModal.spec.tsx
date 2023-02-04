import { ConfigService } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import { mocked } from "ts-jest/utils";
import { act, waitFor } from "@testing-library/react";
import NonEmptyCartSuccessModal from "./NonEmptyCartSuccessModal";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

it("should navigate to /rewards/catalog/lifestyle and close modal when OK button is clicked", async () => {
	const mockSetOpen = jest.fn();
	renderWithLanguage(
		<NonEmptyCartSuccessModal isOpen={true} setOpen={mockSetOpen} />
	);

	await waitFor(() => {
		const instructionText = screen.getByText(
			"Check out your E-coupon Rewards sent via LINE@ACUVUE"
		);
		expect(instructionText).toBeVisible();
	});

	act(() => {
		const okButton = screen.getByRole("button", { name: "OK" });
		okButton.click();
	});

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith(
			"/rewards/catalog/lifestyle"
		);

		expect(mockSetOpen).toHaveBeenCalledWith(false);
	});
});
