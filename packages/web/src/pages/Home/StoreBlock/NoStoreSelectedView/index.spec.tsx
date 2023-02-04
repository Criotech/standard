import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";
import NoStoreSelectedView from "../NoStoreSelectedView";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import opticalStoreIcon from "../../../../images/optical-store-icon.svg";
import { mocked } from "ts-jest/utils";

jest.mock("../../../../hooks/useTranslation", () => ({ useText: jest.fn() }));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("NoStoreSelectedView", () => {
	it("should render without errors", () => {
		render(<NoStoreSelectedView />);
	});

	it("should render store image", () => {
		render(<NoStoreSelectedView />);
		const storeImage = screen.getByRole("img");
		expect(storeImage).toHaveAttribute("src", opticalStoreIcon);
	});

	it("should trigger onClick callback when select store button is clicked", async () => {
		render(<NoStoreSelectedView />);
		const selectStoreButton = await screen.findByText(
			"homePage.opticalStore.selectStore"
		);
		expect(selectStoreButton).toBeInTheDocument();
		selectStoreButton.click();
		expect(useNavigate()).toHaveBeenCalledWith("/store/your-optical-store");
	});
});
