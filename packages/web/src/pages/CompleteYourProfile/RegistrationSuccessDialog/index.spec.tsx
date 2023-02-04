import { render, screen } from "@testing-library/react";
import RegistrationSuccessDialog from ".";
import { useWideScreen } from "./../../../hooks/useWideScreen";
import Text from "./../../../components/Text";
import { ComponentProps } from "react";
import Button from "../../../components/Button";

jest.mock("./../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../icons/CircleDecorationIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "24px",
		MEDIUM: "48px",
	},
	default: () => <span data-testid="circle-decoration-icon" />,
}));

jest.mock("./../../../components/Button", () => ({
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
		<span data-testid="ok-button" onClick={onClick}>
			{children}
		</span>
	),
}));

describe("RegistrationSuccessDialog", () => {
	beforeEach(() => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});
	});

	it("should have wide class for wider screens", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);
		const docNode = screen.getByRole("document");
		expect(docNode).toHaveClass("wide");
	});

	it("should not have wide class for smaller screens", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);
		const docNode = screen.getByRole("document");
		expect(docNode).not.toHaveClass("wide");
	});

	it("should render without errors", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);
	});

	it("should render with correct title", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const dialogTitle = screen.getByText(
			"profilePage.registrationSuccessDialogHeading"
		);
		expect(dialogTitle).toBeInTheDocument();
	});

	it("should render ok button", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const okButton = screen.getByText("button.okLabel");
		expect(okButton).toBeInTheDocument();
	});

	it("should call onClick when ok button", () => {
		const onClick = jest.fn();
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={onClick}
			/>
		);

		const okButton = screen.getByText("button.okLabel");
		okButton.click();
		expect(onClick).toHaveBeenCalled();
	});

	it("should render with correct first body key", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const body1 = screen.getByText(
			"profilePage.registrationSuccessDialogBody1"
		);
		expect(body1).toBeInTheDocument();
	});

	it("should render with correct second body key", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const body2 = screen.getByText(
			"profilePage.registrationSuccessDialogBody2"
		);
		expect(body2).toBeInTheDocument();
	});

	it("should render with correct third body key", () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const body3 = screen.getByText(
			"profilePage.registrationSuccessDialogBody3"
		);
		expect(body3).toBeInTheDocument();
	});

	it("should render CircleDecorationIcons", async () => {
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={jest.fn()}
			/>
		);

		const circleDecorationIcons = screen.getByTestId(
			"circle-decoration-icon"
		);
		expect(circleDecorationIcons).toBeInTheDocument();
	});

	it("should call onClick function if OK button is clicked", async () => {
		const mockOnClick = jest.fn();
		render(
			<RegistrationSuccessDialog
				isOpen={true}
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				onClick={mockOnClick}
			/>
		);

		const okBtn = screen.getByTestId("ok-button");
		okBtn.click();
		expect(mockOnClick).toHaveBeenCalled();
	});
});
