import ContactUs from "./index";
import { render, screen } from "@testing-library/react";
import Text from "../../components/Text";
import { ComponentProps } from "react";
import Header from "../../components/Layout/Header";

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

describe("ContactUs", () => {
	it("should render without errors", () => {
		render(<ContactUs />);
	});

	it("should render customer support number", () => {
		render(<ContactUs />);
		const supportNumber = screen.getAllByText(/02-328-8585/i);
		expect(supportNumber).toHaveLength(2);
	});

	it("should content customer support email", () => {
		render(<ContactUs />);
		const supportEmail = screen.getAllByText(/supportTH@its.jnj.com/i);
		expect(supportEmail).toHaveLength(2);
	});

	it("should have the 'myAcuvueTitle' text in the screen", () => {
		render(<ContactUs />);
		const myAcuvueTitle = screen.getByText("contactUsPage.myAcuvueTitle");
		expect(myAcuvueTitle).toBeInTheDocument();
	});

	it("should have the 'email' text in the screen", () => {
		render(<ContactUs />);
		const email = screen.getAllByText("contactUsPage.email");
		expect(email).toHaveLength(2);
	});

	it("should have the 'Hotline' text in the screen", () => {
		render(<ContactUs />);
		const hotLine = screen.getAllByText("contactUsPage.hotLine");
		expect(hotLine).toHaveLength(2);
	});

	it("should render masthead", async () => {
		render(<ContactUs />);

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("contactUsPage.title");
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<ContactUs />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
