import { render, screen } from "@testing-library/react";
import PasswordBlock from ".";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useXiam } from "../../../contexts/XiamContext";

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../../../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

beforeEach(() => {
	(useXiam as jest.Mock).mockReturnValue({
		updatePassword: jest.fn(),
	});
});

describe("PasswordBlock", () => {
	it("should render without errors", () => {
		render(<PasswordBlock />);
	});

	it("should render correct title", () => {
		render(<PasswordBlock />);

		const title = screen.getByTestId("block-title");
		expect(title).toHaveTextContent("profilePage.password.title");
	});

	it("should render update button", () => {
		render(<PasswordBlock />);

		const updateButton = screen.getByRole("button");
		expect(updateButton).toBeInTheDocument();
		expect(updateButton).toHaveTextContent(
			"profilePage.password.updatePassword"
		);
	});

	it("should call updatePassword from useXiam when update button is clicked", () => {
		const mockUpdatePassword = jest.fn();
		(useXiam as jest.Mock).mockReturnValue({
			updatePassword: mockUpdatePassword,
		});

		render(<PasswordBlock />);

		const updateButton = screen.getByRole("button");
		updateButton.click();

		expect(mockUpdatePassword).toHaveBeenCalled();
	});
});
