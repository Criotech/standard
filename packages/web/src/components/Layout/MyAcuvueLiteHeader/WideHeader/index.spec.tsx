import { render, screen } from "@testing-library/react";
import WideHeader from "./index";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { AuthStatus } from "../../../../contexts/AuthContext";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { Affix } from "antd";
import { ComponentProps } from "react";
import { useLocation } from "react-router-dom";
import { useUserProfile } from "../../../../contexts/UserProfileContext";
import { mocked } from "ts-jest/utils";

jest.mock("antd", () => ({
	Affix: ({ children, className }: ComponentProps<typeof Affix>) => (
		<div data-testid="header-test-id" className={className}>
			{children}
		</div>
	),
}));

jest.mock("../TopHeader", () => ({
	__esModule: true,
	default: () => <span data-testid="top-header" />,
}));

jest.mock("../AcuvueLogo", () => ({
	__esModule: true,
	default: () => <span data-testid="acuvue-logo" />,
}));

jest.mock("../../../MegaMenu", () => ({
	__esModule: true,
	default: () => <span data-testid="mega-menu" />,
}));

jest.mock("../WideSearchForm", () => ({
	__esModule: true,
	default: () => <span data-testid="wide-search-form" />,
}));

jest.mock("../DesktopMembership", () => ({
	__esModule: true,
	default: () => <span data-testid="desktop-membership" />,
}));

jest.mock("../MemberMenuDropdownTrigger", () => ({
	__esModule: true,
	default: () => <span data-testid="member-menu-dropdown-trigger" />,
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

jest.mock("../../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { value: "fake-session-token" },
		user: {
			id: "1",
			profile: {
				firstName: "fake name",
			},
		},
	});

	(useConfiguration as jest.Mock).mockReturnValue({
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

	mocked(useUserProfile).mockReturnValue({
		userProfile: undefined,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
		profileCompleteness: undefined,
	});
});

describe("WideHeader", () => {
	it("should render without error", () => {
		render(<WideHeader />);
	});

	it("should always render AcuvueLogo component", () => {
		render(<WideHeader />);

		const acuvueLogo = screen.getByTestId("acuvue-logo");
		expect(acuvueLogo).toBeInTheDocument();
	});

	it("should have class desktop-header-wrapper", () => {
		const { container } = render(<WideHeader />);

		expect(
			container.querySelector(".desktop-header-wrapper")
		).toBeInTheDocument();
	});

	it("should render TopHeader", () => {
		render(<WideHeader />);

		const topHeaderSection = screen.getByTestId("top-header");
		expect(topHeaderSection).toBeInTheDocument();
	});

	it("should render MegaMenu", () => {
		render(<WideHeader />);

		const megaMenu = screen.getByTestId("mega-menu");
		expect(megaMenu).toBeInTheDocument();
	});

	it("should render WideSearchForm", () => {
		render(<WideHeader />);

		const searchBar = screen.getByTestId("wide-search-form");
		expect(searchBar).toBeInTheDocument();
	});

	it("should render DesktopMembership", () => {
		render(<WideHeader />);

		const desktopMembership = screen.getByTestId("desktop-membership");
		expect(desktopMembership).toBeInTheDocument();
	});

	it("should render MemberMenuDropdownTrigger when user is authenticated", () => {
		(useAuthentication as jest.Mock).mockReturnValue({
			sessionToken: { value: "fake-session-token" },
			status: AuthStatus.AUTHENTICATED,
		});

		render(<WideHeader />);

		const memberMenuDropdown = screen.getByTestId(
			"member-menu-dropdown-trigger"
		);
		expect(memberMenuDropdown).toBeInTheDocument();
	});
});
