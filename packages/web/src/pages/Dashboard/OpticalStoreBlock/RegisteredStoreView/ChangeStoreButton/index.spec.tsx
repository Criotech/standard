import { render, screen } from "@testing-library/react";
import ChangeStoreButton from "./index";
import Text from "../../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../../icons/RefreshIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="refresh-icon" />,
	IconSize: {
		SMALL: "16px",
	},
}));

describe("ChangeStoreButton", () => {
	it("should render without errors", () => {
		render(<ChangeStoreButton onClick={jest.fn()} />);
	});

	it("should have change-store-button as class name", () => {
		const { container } = render(<ChangeStoreButton onClick={jest.fn()} />);

		expect(container.firstChild).toHaveClass("change-store-button");
	});

	it("should render button Text", () => {
		render(<ChangeStoreButton onClick={jest.fn()} />);

		const buttonText = screen.getByText(
			"dashboardPage.opticalStore.changeStoreButton"
		);
		expect(buttonText).toBeInTheDocument();
	});

	it("should render button icon", () => {
		render(<ChangeStoreButton onClick={jest.fn()} />);

		const buttonIcon = screen.getByTestId("refresh-icon");
		expect(buttonIcon).toBeInTheDocument();
	});
});
