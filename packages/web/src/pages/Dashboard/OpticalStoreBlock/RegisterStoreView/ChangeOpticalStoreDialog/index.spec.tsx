import { render, screen } from "@testing-library/react";
import ChangeOpticalStoreDialog from ".";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import Text from "../../../../../components/Text";
import { ComponentProps } from "react";
import Button from "../../../../../components/Button";

jest.mock("../../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
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
	default: ({ children }: ComponentProps<typeof Button>) => (
		<span data-testid={"button"}>{children}</span>
	),
}));

jest.mock("../../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});
	(useConfiguration as jest.Mock).mockReturnValue({
		changeOpticalStoreDialogExtraLines: [
			"dashboardPage.opticalStore.changeOpticalStoreDialogPhone",
			"dashboardPage.opticalStore.changeOpticalStoreDialogEmail",
		],
	});
});

describe("ChangeOpticalStoreDialog", () => {
	it("should render without errors", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);
	});

	it("should render with correct title", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);

		const dialogTitle = screen.getByText(
			"dashboardPage.opticalStore.changeOpticalStoreDialogTitle"
		);
		expect(dialogTitle).toBeInTheDocument();
	});

	it("should render ok button", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);

		const okButton = screen.getByText("dashboardPage.opticalStore.ok");
		expect(okButton).toBeInTheDocument();
	});

	it("should render with correct body key", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);

		const body = screen.getByText(
			"dashboardPage.opticalStore.changeOpticalStoreDialogBody"
		);
		expect(body).toBeInTheDocument();
	});

	it("should have correct Store dialog line one", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);

		const dialogLineKey = screen.getByText(
			"dashboardPage.opticalStore.changeOpticalStoreDialogPhone"
		);
		expect(dialogLineKey).toBeInTheDocument();
	});

	it("should have correct Store dialog line two", () => {
		render(<ChangeOpticalStoreDialog isOpen={true} onClose={jest.fn()} />);

		const dialogLineKey = screen.getByText(
			"dashboardPage.opticalStore.changeOpticalStoreDialogEmail"
		);
		expect(dialogLineKey).toBeInTheDocument();
	});
});
