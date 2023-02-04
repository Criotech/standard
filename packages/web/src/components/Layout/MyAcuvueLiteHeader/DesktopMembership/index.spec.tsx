import { render, screen } from "@testing-library/react";
import DesktopMembership from "./index";
import Text from "../../../Text";
import { Link } from "react-router-dom";
import { ComponentProps } from "react";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../SignInButton", () => ({
	__esModule: true,
	default: () => <div data-testid="sign-in-button" />,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: ComponentProps<typeof Link>) => (
		<a href={to as string} data-testid="join-now-link">
			{children}
		</a>
	),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("Membership Card", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
	});

	it("should render without errors", () => {
		render(<DesktopMembership />);
	});

	it("should render join now link", () => {
		render(<DesktopMembership />);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(1);

		expect(links[0]).toHaveAttribute("href", "/phone-registration");
	});

	it("should render join now correct translation keys", () => {
		render(<DesktopMembership />);
		const links = screen.getAllByRole("link");

		expect(links[0]).toHaveTextContent("headerPage.membershipCard.joinNow");
	});

	it("should render signin button", () => {
		render(<DesktopMembership />);

		const signInButton = screen.getByTestId("sign-in-button");
		expect(signInButton).toBeInTheDocument();
	});

	it("should render membership title", () => {
		render(<DesktopMembership />);
		const membershipTitle = screen.queryByText(
			"headerPage.membershipCard.myacuvueRewards"
		);
		expect(membershipTitle).toBeInTheDocument();
	});

	it("should render myacuvue icon", () => {
		render(<DesktopMembership />);
		const myAcuvueIcon = screen.getByRole("img");
		expect(myAcuvueIcon).toBeInTheDocument();
		expect(myAcuvueIcon).toHaveAttribute("alt", "MyAcuvue logo");
		expect(myAcuvueIcon).toHaveAttribute("src", "myacuvue-icon.png");
	});
});
