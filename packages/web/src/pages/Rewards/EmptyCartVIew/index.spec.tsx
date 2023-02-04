import EmptyCartView from ".";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import { mocked } from "ts-jest/utils";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("EmptyCartView", () => {
	it("should render without issues", () => {
		render(<EmptyCartView />);
	});

	it("should render the browse lifestyle rewards text and empty cart description texts", () => {
		render(<EmptyCartView />);
		const browseLifestyleRewards = screen.queryByText(
			"rewardsPage.emptyCartView.browseLifestyleRewards"
		);
		expect(browseLifestyleRewards).toBeInTheDocument();
		const emptyCartDescription = screen.queryByText(
			"rewardsPage.emptyCartView.emptyCartDescription"
		);
		expect(emptyCartDescription).toBeInTheDocument();
	});

	it("should render magnifying glass image", () => {
		render(<EmptyCartView />);
		const acuvueLogo = screen.getByRole("img");
		expect(acuvueLogo).toHaveAttribute(
			"src",
			"magnifying-glass-on-sheet.svg"
		);
	});

	it("should trigger onclick and navigate to lifestyle rewards page", async () => {
		render(<EmptyCartView />);

		const browseLifestyleRewards = await screen.findByText(
			"rewardsPage.emptyCartView.browseLifestyleRewards"
		);
		browseLifestyleRewards.click();
		expect(useNavigate()).toHaveBeenCalledWith(
			"/rewards/catalog/lifestyle"
		);
	});
});
