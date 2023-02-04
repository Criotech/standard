import { ComponentProps } from "react";
import { useHistory } from "react-router-dom";
import ResetPasswordSuccess from ".";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { render, screen } from "@testing-library/react";

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/Button", () => ({
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
		SMALL: "acuvue-btn-small",
	},
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
		NO_OUTLINE: "acuvue-btn-no-outline",
	},
	__esModule: true,
	default: ({ children, onClick }: ComponentProps<typeof Button>) => (
		<button data-testid="button" onClick={onClick}>
			{children}
		</button>
	),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});
});

describe("ResetPasswordSuccess", () => {
	it("should render without errors", () => {
		render(<ResetPasswordSuccess />);
	});

	it("should render one button component", () => {
		render(<ResetPasswordSuccess />);

		const buttons = screen.getAllByTestId("button");
		expect(buttons).toHaveLength(1);
	});

	it("should call navigate to signin page when ok button is clicked", () => {
		render(<ResetPasswordSuccess />);

		const okButton = screen.getByTestId("button");
		okButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/sign-in");
	});
});
