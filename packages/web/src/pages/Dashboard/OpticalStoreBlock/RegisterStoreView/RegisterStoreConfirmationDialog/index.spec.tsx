import { render, screen } from "@testing-library/react";
import RegisterStoreConfirmationDialog from ".";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";
import StoreName from "../../StoreName";
import AddressSection from "../../AddressSection";
import Button from "../../../../../components/Button";
import CustomModal from "../../../../../components/CustomModal";
import React from "react";

jest.mock("../../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../StoreName", () => ({
	__esModule: true,
	default: ({ name }: ComponentProps<typeof StoreName>) => (
		<span data-testid="store-name">{name}</span>
	),
}));

jest.mock("../../AddressSection", () => ({
	__esModule: true,
	default: ({ address }: ComponentProps<typeof AddressSection>) => (
		<span data-testid="address-section">{address}</span>
	),
}));

jest.mock("../../../../../components/Button", () => ({
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
	default: ({
		children,
		onClick,
		className,
	}: ComponentProps<typeof Button>) => (
		<span data-testid={"button"} onClick={onClick} className={className}>
			{children}
		</span>
	),
}));

jest.mock("../../../../../components/ThinDivider", () => ({
	__esModule: true,
	default: () => <span data-testid="thin-divider" />,
}));

jest.mock("../../../../../components/CustomModal", () => ({
	__esModule: true,
	default: ({
		buttons,
		titleKey,
		close,
		children,
	}: ComponentProps<typeof CustomModal>) => (
		<>
			{titleKey}
			{buttons?.[0]}
			{buttons?.[1]}
			<button data-testid="close-button" onClick={() => close?.()}>
				Close
			</button>
			{children}
		</>
	),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});
});

describe("RegisterStoreConfirmationDialog", () => {
	it("should render without errors", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);
	});

	it("should render with correct title", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const dialogTitle = screen.getByText(
			"dashboardPage.opticalStore.confirmationDialogTitle"
		);
		expect(dialogTitle).toBeInTheDocument();
	});

	it("should render cancel button", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const cancelButton = screen.getByText(
			"dashboardPage.opticalStore.cancel"
		);
		expect(cancelButton).toBeInTheDocument();
	});

	it("should call onConfirm when confirm button is clicked", () => {
		const mockOnConfirm = jest.fn();
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={mockOnConfirm}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const confirmButton = screen.getByText(
			"dashboardPage.opticalStore.confirm"
		);
		confirmButton.click();
		expect(mockOnConfirm).toHaveBeenCalled();
	});

	it("should call onCancel when cancel button is clicked", () => {
		const mockOnCancel = jest.fn();
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={mockOnCancel}
				onClose={jest.fn}
			/>
		);

		const cancelButton = screen.getByText(
			"dashboardPage.opticalStore.cancel"
		);
		cancelButton.click();
		expect(mockOnCancel).toHaveBeenCalled();
	});

	it("should call onClose when close is clicked", () => {
		const mockOnClose = jest.fn();
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={mockOnClose}
			/>
		);

		const closeButton = screen.getByTestId("close-button");
		closeButton.click();
		expect(mockOnClose).toHaveBeenCalled();
	});

	it("should render with correct explanation", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const explanation = screen.getByText(
			"dashboardPage.opticalStore.confirmationDialogExplanation"
		);
		expect(explanation).toBeInTheDocument();
	});

	it("should render with correct store name prop", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={"fakeStoreName"}
				address={""}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const storeName = screen.getByTestId("store-name");
		expect(storeName).toHaveTextContent("fakeStoreName");
	});

	it("should render with correct store address", () => {
		render(
			<RegisterStoreConfirmationDialog
				isOpen={true}
				storeName={""}
				address={"fakeAddress"}
				onConfirm={jest.fn}
				onCancel={jest.fn}
				onClose={jest.fn}
			/>
		);

		const storeAddress = screen.getByTestId("address-section");
		expect(storeAddress).toHaveTextContent("fakeAddress");
	});
});
