import { render, screen } from "@testing-library/react";
import AddressSection from ".";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("AddressSection", () => {
	it("should render without errors", () => {
		render(<AddressSection address="fake address" />);
	});

	it("should render address title", () => {
		render(<AddressSection address="fake address" />);

		const addressTitle = screen.getByText(
			"dashboardPage.opticalStore.address"
		);
		expect(addressTitle).toBeInTheDocument();
	});

	it("should render passed address prop text", () => {
		const fakeAddress = "fake address";
		render(<AddressSection address={fakeAddress} />);

		const fakeAddressText = screen.getByText(fakeAddress);
		expect(fakeAddressText).toBeInTheDocument();
	});
});
