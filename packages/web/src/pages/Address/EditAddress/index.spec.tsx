import EditAddress from "./index";
import { act, render, screen, waitFor } from "@testing-library/react";
import { IUserAddress, Region } from "@myacuvue_thailand_web/services";
import { useAddress } from "../../../hooks/useAddress";
import Text from "../../../components/Text";
import { ComponentProps } from "react";
import AddressForm from "../AddressForm";
import Header from "../../../components/Layout/Header";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../AddressForm", () => ({
	__esModule: true,
	default: ({ defaultAddressValue }: ComponentProps<typeof AddressForm>) => (
		<form data-testid="address-form">
			<div data-testid="line1">{defaultAddressValue?.line1}</div>
			<div data-testid="line2">{defaultAddressValue?.line2}</div>
		</form>
	),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

const fakeAddress: IUserAddress = {
	line1: "line1",
	line2: "line2",
	line3: "line3",
	city: "fake city",
	state: "state",
	postCode: "12345",
	countryCode: Region.THA,
};

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

describe("EditAddress", () => {
	beforeEach(() => {
		(useAddress as jest.Mock).mockReturnValue({
			getShippingAddress: jest.fn().mockResolvedValue(fakeAddress),
		});
	});

	it("should render without errors", async () => {
		await act(async () => {
			render(<EditAddress />);
		});
	});

	it("should render Address form", async () => {
		await act(async () => {
			render(<EditAddress />);
		});

		await waitFor(() => {
			const addressForm = screen.getByTestId("address-form");
			expect(addressForm).toBeInTheDocument();
		});
	});

	it("should pass defaultAddressValue prop to Address form", async () => {
		await act(async () => {
			render(<EditAddress />);
		});

		await waitFor(() => {
			const line1 = screen.getByTestId("line1");
			expect(line1).toBeInTheDocument();
			expect(line1).toHaveTextContent(fakeAddress.line1);

			const line2 = screen.getByTestId("line2");
			expect(line2).toBeInTheDocument();
			expect(line2).toHaveTextContent(fakeAddress.line2);
		});
	});

	it("should render loading block", async () => {
		(useAddress as jest.Mock).mockReturnValue({
			getShippingAddress: jest.fn().mockResolvedValue({}),
			saveShippingAddress: jest.fn().mockResolvedValue(null),
		});

		act(() => {
			render(<EditAddress />);
		});

		await waitFor(() => {
			const loadingBlock = screen.queryByTestId("loading-block");
			expect(loadingBlock).toBeInTheDocument();

			const addressForm = screen.queryByTestId("address-form");
			expect(addressForm).not.toBeInTheDocument();
		});
	});

	it("should render masthead", async () => {
		await act(async () => {
			render(<EditAddress />);
		});

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("addressPage.editAddress");
	});

	it("should render GlobalNavigationPanel", async () => {
		await act(async () => {
			render(<EditAddress />);
		});

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
