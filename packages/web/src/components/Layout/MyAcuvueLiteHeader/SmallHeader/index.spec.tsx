import { render, screen } from "@testing-library/react";
import SmallHeader from "./index";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { Affix } from "antd";
import { ComponentProps } from "react";
import { useLocation } from "react-router-dom";

jest.mock("antd", () => ({
	Affix: ({ children, className }: ComponentProps<typeof Affix>) => (
		<div data-testid="header-test-id" className={className}>
			{children}
		</div>
	),
}));

jest.mock("../AcuvueLogo", () => ({
	__esModule: true,
	default: () => <span data-testid="acuvue-logo" />,
}));

jest.mock("@ant-design/icons", () => ({
	CloseOutlined: () => <span data-testid="close-outlined" />,
}));

jest.mock("../../../../icons/MagnifyingGlassIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="magnifying-glass-icon" />,
}));

jest.mock("../../../../icons/MemberIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="member-icon" />,
}));

jest.mock("../MembershipCard", () => ({
	__esModule: true,
	default: () => <span data-testid="membership-card" />,
}));

jest.mock("../MembershipSection", () => ({
	__esModule: true,
	default: () => <span data-testid="membership-section" />,
}));

jest.mock("../../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useLocation: jest.fn(),
}));

describe("SmallHeader", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			sessionToken: { value: "fake-session-token" },
		});
		(useConfiguration as jest.Mock).mockReturnValue({
			topHeaderLinks: [
				{
					label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
					url: "https://www.acuvue.com.au/questions",
				},
				{
					label: "myacuvueLiteHeader.topHeaderSection.myAcuvueMemberProgram",
					url: "https://www.acuvue.com.au/myacuvue",
				},
			],
			headerMenu: [
				{
					title: "header.menuTitle.thinkAboutContacts",
					linkGroups: [
						{
							header: "header.menuHeader.whyContacts",
							items: [
								{
									name: "header.menuItem.lifeWithContacts",
									url: "https://www.acuvue.com.au/why-contact-lenses/new-contact-lenses",
								},
								{
									name: "header.menuItem.visionSimulator",
									url: "https://www.acuvue.com.au/why-contact-lenses/vision-simulator",
								},
								{
									name: "header.menuItem.whyAcuvue",
									url: "https://www.acuvue.com.au/why-contact-lenses/why-acuvue",
								},
							],
						},
					],
				},
			],
		});
		(useLocation as jest.Mock).mockReturnValue({
			pathname: "",
		});
	});

	it("should render without errors", () => {
		render(<SmallHeader />);
	});

	it("should always render AcuvueLogo component", () => {
		render(<SmallHeader />);

		const acuvueLogo = screen.getByTestId("acuvue-logo");
		expect(acuvueLogo).toBeInTheDocument();
	});

	it("should have class mobile-header-wrapper", () => {
		const { container } = render(<SmallHeader />);

		expect(
			container.querySelector(".mobile-header-wrapper")
		).toBeInTheDocument();
	});

	it("should render mobile search button", () => {
		render(<SmallHeader />);

		const searchButton = screen.getAllByRole("button")[0];
		expect(searchButton).toHaveClass("mobile-search-button");
	});
});
