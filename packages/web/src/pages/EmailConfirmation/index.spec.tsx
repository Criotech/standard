import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import EmailConfirmation from ".";
import Text from "../../components/Text";
import { useEmail } from "../../hooks/useEmail";
import { useQuery } from "../../hooks/useQuery";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";
import { useAuthentication } from "../../hooks/useAuthentication";

jest.mock("../../hooks/useEmail", () => ({
	useEmail: jest.fn(),
}));

jest.mock("../../hooks/useQuery", () => ({
	useQuery: jest.fn(),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

describe("EmailConfirmation", () => {
	beforeEach(() => {
		(useQuery as jest.Mock).mockReturnValue({
			get: jest.fn().mockReturnValue(undefined),
		});

		(useEmail as jest.Mock).mockReturnValue({
			verify: jest.fn(),
		});

		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: jest.fn(),
		});

		(useCallbackWithLoading as jest.Mock).mockImplementation(
			(callback) => callback
		);
	});

	it("should render without errors", () => {
		render(<EmailConfirmation />);
	});

	it("should call verify if data is available in the query param", async () => {
		(useQuery as jest.Mock).mockReturnValue({
			get: jest.fn().mockReturnValue("some-fake-random-id"),
		});

		const mockVerify = jest.fn();

		(useEmail as jest.Mock).mockReturnValue({
			verify: mockVerify,
		});

		render(<EmailConfirmation />);

		await waitFor(() => {
			expect(mockVerify).toHaveBeenCalledWith({
				data: "some-fake-random-id",
			});

			const successMessage = screen.getByText(
				"emailConfirmationPage.success"
			);
			expect(successMessage).toBeInTheDocument();
		});
	});

	it("should call show failure message if verify returns error", async () => {
		(useQuery as jest.Mock).mockReturnValue({
			get: jest.fn().mockReturnValue("some-fake-random-id"),
		});

		const payloadErrors = {
			email: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(useEmail().verify as jest.Mock).mockImplementation(() => {
			throw error;
		});

		render(<EmailConfirmation />);

		await waitFor(() => {
			const failureMessage = screen.getByText(
				"emailConfirmationPage.failure2"
			);

			expect(failureMessage).toBeInTheDocument();
		});
	});

	it("should call resetAuth when link is clicked", async () => {
		const mockResetAuth = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: mockResetAuth,
		});

		render(<EmailConfirmation />);

		const signUpLink = screen.getByText("emailConfirmationPage.failure2");
		signUpLink.click();

		expect(mockResetAuth).toHaveBeenCalled();
	});
});
