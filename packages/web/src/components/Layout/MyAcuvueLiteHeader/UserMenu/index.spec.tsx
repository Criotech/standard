import { render, screen } from "@testing-library/react";
import UserMenu from ".";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { Link } from "react-router-dom";
import { ComponentProps } from "react";
import Text from "../../../Text";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("react-router-dom", () => ({
	Link: ({ to, children, onClick }: ComponentProps<typeof Link>) => (
		<a href={to as string} onClick={onClick}>
			{children}
		</a>
	),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../icons/ChevronRightIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="chevron-right-icon" />,
}));

jest.mock("../../../../icons/ExitIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="exit-icon" />,
	IconSize: {
		SMALL: "16px",
	},
}));

jest.mock("../../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../../routes/history", () => ({
	history: {
		push: jest.fn(),
	},
}));

describe("UserMenu", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: jest.fn(),
		});

		(useConfiguration as jest.Mock).mockReturnValue({
			hasProfileDetailsMenu: true,
		});
	});
	it("should render without errors", () => {
		render(<UserMenu />);
	});

	it("should render three ChevronRight icons", () => {
		render(<UserMenu />);

		const chevronRightIcon = screen.getAllByTestId("chevron-right-icon");
		expect(chevronRightIcon).toHaveLength(3);
	});

	it("should render three anchor tags with appropriate link, member dashboard, profile details and sign out", () => {
		render(<UserMenu />);

		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(3);
		expect(links[0]).toHaveAttribute("href", "/");
		expect(links[1]).toHaveAttribute("href", "/profile");
		expect(links[2]).toHaveAttribute("href", "#");
	});

	it("should render two anchor tags with appropriate link, member dashboard and sign out on hasProfileDetailsMenu false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasProfileDetailsMenu: false,
		});
		render(<UserMenu />);

		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/");
		expect(links[1]).toHaveAttribute("href", "#");
	});

	it("should render exit icon", () => {
		render(<UserMenu />);

		const exitIcon = screen.getByTestId("exit-icon");
		expect(exitIcon).toBeInTheDocument();
	});

	it("should render member dashboard text", () => {
		render(<UserMenu />);

		const memberDashboardText = screen.getByText(
			"myacuvueLiteHeader.memberDashboard"
		);
		expect(memberDashboardText).toBeInTheDocument();
	});

	it("should render profile details text", () => {
		render(<UserMenu />);

		const profileDetailsText = screen.getByText(
			"myacuvueLiteHeader.profileDetails"
		);
		expect(profileDetailsText).toBeInTheDocument();
	});

	it("should render sign out text", () => {
		render(<UserMenu />);

		const signOutText = screen.getByText("myacuvueLiteHeader.signOut");
		expect(signOutText).toBeInTheDocument();
	});

	it("should call resetAuth when clicking signout link", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasProfileDetailsMenu: true,
			signOutRedirectUrl: "https://www.some-dummy-domain.com",
		});

		const mockResetAuth = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: mockResetAuth,
		});

		render(<UserMenu />);
		const signOutLink = screen.getAllByRole("link")[2];
		signOutLink.click();

		expect(mockResetAuth).toHaveBeenCalledWith(
			"https://www.some-dummy-domain.com"
		);
	});
});
