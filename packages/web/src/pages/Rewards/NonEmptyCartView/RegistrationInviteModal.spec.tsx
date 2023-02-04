import { ConfigService } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import RegistrationInviteModal from "./RegistrationInviteModal";
import { mocked } from "ts-jest/utils";
import { act, waitFor } from "@testing-library/react";

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

it("should navigate to /registration when REGISTER button is clicked", async () => {
	renderWithLanguage(
		<RegistrationInviteModal isOpen={true} setOpen={jest.fn()} />
	);

	await waitFor(() => {
		const instructionText = screen.getByText(
			"To enjoy coupon code offers, kindly register as a MyACUVUE™ Member. You’ll receive a Welcome coupon upon registration."
		);
		expect(instructionText).toBeVisible();
	});

	act(() => {
		const registerButton = screen.getByRole("button", { name: "REGISTER" });
		registerButton.click();
	});

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith("/registration");
	});
});

it("should close dialog when CANCEL button is clicked", async () => {
	const mockSetOpen = jest.fn();
	renderWithLanguage(
		<RegistrationInviteModal isOpen={true} setOpen={mockSetOpen} />
	);

	await waitFor(() => {
		const instructionText = screen.getByText(
			"To enjoy coupon code offers, kindly register as a MyACUVUE™ Member. You’ll receive a Welcome coupon upon registration."
		);
		expect(instructionText).toBeVisible();
	});

	act(() => {
		const cancelButton = screen.getByRole("button", { name: "CANCEL" });
		cancelButton.click();
	});

	await waitFor(() => {
		expect(mockSetOpen).toHaveBeenCalledWith(false);
	});
});
