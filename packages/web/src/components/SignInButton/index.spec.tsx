import { render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import SignInButton from ".";
import Button from "../Button";
import Text from "../Text";
import { useXiam } from "../../contexts/XiamContext";
import { useDeviceToken } from "../../contexts/DeviceTokenContext";
import { useSessionToken } from "../../contexts/SessionTokenContext";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";

jest.mock("../Button", () => ({
	__esModule: true,
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
	},
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
	},
	default: ({ onClick }: ComponentProps<typeof Button>) => (
		<button data-testid="button" onClick={onClick} />
	),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../../contexts/SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("../../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

beforeEach(() => {
	(useXiam as jest.Mock).mockReturnValue({
		loginPopup: jest.fn(),
		getXiamToken: jest.fn(),
	});

	(useDeviceToken as jest.Mock).mockReturnValue({
		deleteDeviceToken: jest.fn(),
	});

	(useSessionToken as jest.Mock).mockReturnValue({
		setSessionToken: jest.fn(),
	});

	(useCallbackWithLoading as jest.Mock).mockImplementation(
		(callback) => callback
	);
});

describe("SignInButton", () => {
	it("should render without errors", () => {
		render(<SignInButton buttonLabel="myacuvueLiteHeader.signIn" />);
	});

	it("should call loginPopup when clicked on signIn button", async () => {
		const fakeLoginPopup = jest.fn();
		(useXiam as jest.Mock).mockReturnValue({
			loginPopup: fakeLoginPopup,
			getXiamToken: jest.fn().mockResolvedValue(undefined),
		});

		render(<SignInButton buttonLabel="myacuvueLiteHeader.signIn" />);

		const signInButton = screen.getByTestId("button");
		signInButton.click();

		await waitFor(() => {
			expect(fakeLoginPopup).toHaveBeenCalled();
		});
	});

	it("should call deleteDeviceToken and setSesstionToken when clicked on signIn", async () => {
		const fakeDeleteDevice = jest.fn();
		const setSessionToken = jest.fn();
		(useDeviceToken as jest.Mock).mockReturnValue({
			deleteDeviceToken: fakeDeleteDevice,
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			setSessionToken: setSessionToken,
		});

		(useXiam as jest.Mock).mockReturnValue({
			loginPopup: jest.fn(),
			getXiamToken: jest.fn().mockResolvedValue(undefined),
		});

		render(<SignInButton buttonLabel="myacuvueLiteHeader.signIn" />);

		const signInButton = screen.getByTestId("button");
		signInButton.click();

		await waitFor(() => {
			expect(fakeDeleteDevice).toHaveBeenCalled();
		});
		await waitFor(() => {
			expect(setSessionToken).toHaveBeenCalled();
		});
	});
});
