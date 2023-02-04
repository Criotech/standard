import GuestView from ".";
import { render, screen } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { ComponentProps } from "react";
import Text from "../../../components/Text";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});
});

describe("GuestView", () => {
	it("should render without issues", () => {
		render(<GuestView />);
	});

	it("should render guestView Description and button text", () => {
		render(<GuestView />);
		const guestViewDescription = screen.queryByText(
			"memberIdPage.guestViewDescription"
		);
		expect(guestViewDescription).toBeInTheDocument();

		const registerNowButtonText = screen.queryByText(
			"memberIdPage.registerBlock.registerNowButton"
		);
		expect(registerNowButtonText).toBeInTheDocument();
	});

	it("should render magnifying glass image", () => {
		render(<GuestView />);
		const magnifyingGlass = screen.getByRole("img");
		expect(magnifyingGlass).toHaveAttribute(
			"src",
			"magnifying-glass-on-sheet.svg"
		);
	});

	it("should render a button", () => {
		render(<GuestView />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should trigger register now button and navigate to registration page", async () => {
		render(<GuestView />);

		const registerNowButton = await screen.findByText(
			"memberIdPage.registerBlock.registerNowButton"
		);
		registerNowButton.click();
		expect(useHistory().push).toHaveBeenCalledWith("/registration");
	});
});
