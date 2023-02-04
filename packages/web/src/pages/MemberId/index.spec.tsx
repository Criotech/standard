import { AffixProps } from "antd";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import MemberId from ".";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { LinkProps } from "react-router-dom";

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("antd", () => ({
	Affix: ({ children, className }: AffixProps) => (
		<div data-testid="header-test-id" className={className}>
			{children}
		</div>
	),
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: LinkProps) => (
		<>
			<div>{to}</div>
			<div>{children}</div>
		</>
	),
	useHistory: jest.fn(),
}));

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

jest.mock("./MemberView", () => ({
	__esModule: true,
	default: () => <span data-testid="member-view" />,
}));

jest.mock("./GuestView", () => ({
	__esModule: true,
	default: () => <span data-testid="guest-view" />,
}));

jest.mock("../../components/Layout/Drawer", () => ({
	__esModule: true,
	default: () => <></>,
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: () => <></>,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

beforeEach(() => {
	(useUserProfile as jest.Mock).mockReturnValue({
		profileCompleteness: ProfileCompleteness.COMPLETE,
	});
});

describe("MemberId", () => {
	it("should render without errors", () => {
		render(<MemberId />);
	});

	it("should render member view if user is present", async () => {
		render(<MemberId />);
		const memberView = screen.getByTestId("member-view");
		expect(memberView).toBeInTheDocument();
	});

	it("should render guest view if user is not present", async () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
		});
		render(<MemberId />);
		const guestView = screen.getByTestId("guest-view");
		expect(guestView).toBeInTheDocument();
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<MemberId />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
