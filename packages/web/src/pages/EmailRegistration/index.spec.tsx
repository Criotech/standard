import { act, render, screen } from "@testing-library/react";
import { useXiam } from "../../contexts/XiamContext";
import EmailRegistration from ".";
import { useIsAuthenticated } from "@azure/msal-react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { BrowserAuthError } from "@azure/msal-browser";

jest.mock("../../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../../routes/history", () => ({
	history: {
		push: jest.fn(),
	},
}));

jest.mock("@azure/msal-react", () => ({
	useIsAuthenticated: jest.fn(),
}));

jest.mock("../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

beforeEach(() => {
	(useXiam as jest.Mock).mockReturnValue({
		registrationPopup: jest.fn(),
		getXiamToken: jest.fn(),
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		processSessionToken: jest.fn(),
	});
});

describe("EmailRegistration", () => {
	it("should call registrationPopup and processSessionToken on rendering, when it is NOT authenticated", async () => {
		(useIsAuthenticated as jest.Mock).mockReturnValue(false);

		const mockRegistrationPopup = jest.fn().mockResolvedValue(undefined);
		(useXiam as jest.Mock).mockReturnValue({
			registrationPopup: mockRegistrationPopup,
			getXiamToken: jest.fn(),
		});

		const mockProcessSessionToken = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValue({
			processSessionToken: mockProcessSessionToken,
		});

		await act(async () => {
			await render(<EmailRegistration />);
		});

		expect(mockRegistrationPopup).toHaveBeenCalled();
		expect(mockProcessSessionToken).toHaveBeenCalled();
	});

	it("should render try again button when registrationPopup fails", async () => {
		const error = new BrowserAuthError("fakeCode", "fakeMessage");

		(useXiam as jest.Mock).mockReturnValue({
			registrationPopup: jest.fn().mockRejectedValue(error),
			getXiamToken: jest.fn(),
		});

		await act(async () => {
			render(<EmailRegistration />);
		});

		const button = screen.getByRole("button");

		expect(button).toBeInTheDocument();
	});
});
