import { render, screen } from "@testing-library/react";
import RegisterStoreSuccessDialog from ".";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";
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

describe("RegisterStoreSuccessDialog", () => {
	beforeEach(() => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});
	});

	it("should render without errors", () => {
		render(
			<RegisterStoreSuccessDialog isOpen={true} onClose={jest.fn()} />
		);
	});

	it("should render with correct title", () => {
		render(
			<RegisterStoreSuccessDialog isOpen={true} onClose={jest.fn()} />
		);

		const dialogTitle = screen.getByText(
			"dashboardPage.opticalStore.successDialogTitle"
		);
		expect(dialogTitle).toBeInTheDocument();
	});

	it("should render ok button", () => {
		render(
			<RegisterStoreSuccessDialog isOpen={true} onClose={jest.fn()} />
		);

		const okButton = screen.getByText("dashboardPage.opticalStore.ok");
		expect(okButton).toBeInTheDocument();
	});

	it("should render with correct body", () => {
		render(
			<RegisterStoreSuccessDialog isOpen={true} onClose={jest.fn()} />
		);

		const body = screen.getByText(
			"dashboardPage.opticalStore.successDialogBody"
		);
		expect(body).toBeInTheDocument();
	});
});
