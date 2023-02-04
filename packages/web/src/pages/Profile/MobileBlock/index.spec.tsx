import { render, screen } from "@testing-library/react";
import MobileBlock from ".";
import { useHistory } from "react-router-dom";
import { ComponentProps } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import Text from "../../../components/Text";
import { usePhone } from "../../../hooks/usePhone";

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../hooks/useTranslation", () => ({ useText: jest.fn() }));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ type, textKey, data }: ComponentProps<typeof Text>) => (
		<>
			{textKey} {type} {JSON.stringify(data)}
		</>
	),
}));

jest.mock("../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(usePhone as jest.Mock).mockReturnValue({
		formatPhoneNumber: jest.fn().mockReturnValue("+61 484949482"),
	});
});

describe("MobileBlock", () => {
	it("should render without errors", () => {
		render(<MobileBlock phone="" />);
	});

	it("should render correct title", () => {
		render(<MobileBlock phone="" />);

		const title = screen.getByTestId("block-title");
		expect(title).toHaveTextContent("profilePage.mobileBlock.title");
	});

	it("should render update button", () => {
		render(<MobileBlock phone="" />);

		const updateButton = screen.getByRole("button");
		expect(updateButton).toBeInTheDocument();
		expect(updateButton).toHaveTextContent(
			"profilePage.mobileBlock.button.label"
		);
	});

	it("should render correct phone value", () => {
		render(<MobileBlock phone={"61484949482"} />);

		const phoneValue = screen.getByText("+61 484949482");
		expect(phoneValue).toBeInTheDocument();
	});

	it("should call history.push when update button is click", () => {
		render(<MobileBlock />);

		const updateButton = screen.getByRole("button");
		updateButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/profile/phone");
	});
});
