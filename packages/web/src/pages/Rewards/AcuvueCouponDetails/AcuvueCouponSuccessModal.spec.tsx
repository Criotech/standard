import { ConfigService } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import AcuvueCouponSuccessModal from "./AcuvueCouponSuccessModal";
import { waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";

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

	(useNavigate as jest.Mock).mockReturnValue(jest.fn());
});

it("should display the correct text", async () => {
	renderWithLanguage(
		<AcuvueCouponSuccessModal isOpen={true} setOpen={jest.fn()} />
	);

	await waitFor(() => {
		const heading = screen.getByRole("heading", { name: "Reward Added!" });
		expect(heading).toBeVisible();

		const explanationText = screen.getByText(
			"You may view and redeem your reward from your rewards wallet"
		);
		expect(explanationText).toBeVisible();
	});
});

it("should navigate to /rewards/wallet when OK button is clicked", async () => {
	renderWithLanguage(
		<AcuvueCouponSuccessModal isOpen={true} setOpen={jest.fn()} />
	);

	await waitFor(() => {
		const okButton = screen.getByRole("button", { name: "OK" });
		expect(okButton).toBeVisible();
	});

	act(() => {
		const okButton = screen.getByRole("button", { name: "OK" });
		okButton.click();
	});

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith("/rewards/wallet");
	});
});
