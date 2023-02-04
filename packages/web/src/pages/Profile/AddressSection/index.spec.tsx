import { act, render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import AddressSection from ".";
import Text from "../../../components/Text";
import { useAddress } from "../../../hooks/useAddress";
import { useHistory } from "react-router-dom";
import BlockTitle from "../../Dashboard/BlockTitle";

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

const fakeAddress = {
	line1: "fakeLine1",
	line2: "fakeLine2",
	line3: "fakeLine3",
	city: "fakeCity",
	state: "fakeState",
	postCode: "12345",
	countryCode: "fakeCountrycode",
};

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useAddress as jest.Mock).mockReturnValue({
		getMailingAddress: jest.fn().mockResolvedValue(fakeAddress),
	});
});

describe("AddressSection", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<AddressSection />);
		});
	});

	it("should render correct title", async () => {
		await act(async () => {
			render(<AddressSection />);
		});

		const title = screen.getByTestId("block-title");
		expect(title).toHaveTextContent("profilePage.addressSection.title");
	});

	it("should render update address button", async () => {
		await act(async () => {
			render(<AddressSection />);
		});

		const button = screen.getByRole("button");
		expect(button).toHaveTextContent(
			"profilePage.addressSection.updateButton"
		);
	});

	it("should redirect to profile edit on click of the update address button", async () => {
		await act(async () => {
			render(<AddressSection />);
		});

		const button = screen.getByRole("button");

		act(() => {
			button.click();
		});

		await waitFor(() =>
			expect(useHistory().push).toHaveBeenCalledWith("/profile/address")
		);
	});
});
