import { render, screen } from "@testing-library/react";
import MarketingPreferenceBlock from ".";
import { useHistory } from "react-router-dom";
import { ComponentProps } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import Text from "../../../components/Text";

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ type, textKey, data }: ComponentProps<typeof Text>) => (
		<>
			{textKey} {type} {JSON.stringify(data)}
		</>
	),
}));

jest.mock("../../../hooks/useTranslation", () => ({ useText: jest.fn() }));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});
});

describe("MarketingPreferenceBlock", () => {
	it("should render without errors", () => {
		render(<MarketingPreferenceBlock />);
	});

	it("should render correct title", () => {
		render(<MarketingPreferenceBlock />);

		const title = screen.getByTestId("block-title");
		expect(title).toHaveTextContent(
			"profilePage.marketingPreference.title"
		);
	});

	it("should render update button", () => {
		render(<MarketingPreferenceBlock />);

		const updateButton = screen.getByRole("button");
		expect(updateButton).toBeInTheDocument();
		expect(updateButton).toHaveTextContent(
			"profilePage.marketingPreference.updateMarketingPreference"
		);
	});

	it("should call history.push when update button is click", () => {
		render(<MarketingPreferenceBlock />);

		const updateButton = screen.getByRole("button");
		updateButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/profile/marketing");
	});
});
