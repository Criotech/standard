import { render, screen } from "@testing-library/react";
import MembershipSection from ".";
import Text from "../../../Text";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { useConfiguration } from "../../../../hooks/useConfiguration";

jest.mock("../../../../icons/ChevronRightIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="chevron-right-icon" />,
}));

jest.mock("../../../SignInButton", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="sign-in-button">
			<span data-testid="chevron-right-icon" />
		</div>
	),
}));

jest.mock("../../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to, children, onClick }: ComponentProps<typeof Link>) => (
		<a href={to as string} data-testid="join-now-link" onClick={onClick}>
			{children}{" "}
		</a>
	),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("MembershipSection", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
	});

	it("should render without errors", () => {
		render(<MembershipSection />);
	});

	it("should render SignInButton if hasSignIn is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
		render(<MembershipSection />);

		const signIn = screen.queryByTestId("sign-in-button");
		expect(signIn).toBeInTheDocument();
	});

	it("should not render SignInButton if hasSignIn is false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: false,
		});
		render(<MembershipSection />);

		const signIn = screen.queryByTestId("sign-in-button");
		expect(signIn).not.toBeInTheDocument();
	});

	it("should render one ChevronRight icon if hasSignIn is false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: false,
		});
		render(<MembershipSection />);

		const chevronRightIcon = screen.queryAllByTestId("chevron-right-icon");
		expect(chevronRightIcon).toHaveLength(1);
	});

	it("should render two ChevronRight icons if hasSignIn is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
		render(<MembershipSection />);

		const chevronRightIcon = screen.queryAllByTestId("chevron-right-icon");
		expect(chevronRightIcon).toHaveLength(2);
	});

	it("should render one anchor tag with appropriate # link", () => {
		render(<MembershipSection />);

		const link = screen.getByTestId("join-now-link");
		expect(link).toHaveAttribute("href", "/phone-registration");
	});
});
