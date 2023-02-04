import NewAddress from "./index";
import { render, screen } from "@testing-library/react";
import { useAddress } from "../../../hooks/useAddress";
import Text from "../../../components/Text";
import { ComponentProps } from "react";
import Header from "../../../components/Layout/Header";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../AddressForm", () => ({
	__esModule: true,
	default: () => <div data-testid="address-form" />,
}));

jest.mock("../../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

describe("NewAddress", () => {
	beforeEach(() => {
		(useAddress as jest.Mock).mockReturnValue({
			getShippingAddress: jest.fn(),
			saveShippingAddress: jest.fn(),
		});
	});
	it("should render without errors", () => {
		render(<NewAddress />);
	});

	it("should render Address form", () => {
		render(<NewAddress />);

		const addressForm = screen.getByTestId("address-form");
		expect(addressForm).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		render(<NewAddress />);

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("addressPage.addNewAddress");
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<NewAddress />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
