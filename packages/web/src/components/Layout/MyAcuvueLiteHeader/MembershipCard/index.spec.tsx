import { render, screen } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import MembershipCard from "./index";
import Button from "../../../Button";
import Text from "../../../Text";
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

jest.mock("../../../../hooks/useTranslation", () => ({
	useText: jest.fn(),
}));

jest.mock("../../../Button", () => ({
	__esModule: true,
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
	},
	default: ({ onClick }: ComponentProps<typeof Button>) => (
		<button data-testid="join-now-button" onClick={onClick} />
	),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		hasSignIn: true,
	});
});

describe("Membership Card", () => {
	it("should render without errors", () => {
		render(<MembershipCard />);
	});

	it("should render SignInButton if hasSignIn is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
		render(<MembershipCard />);

		const signInButton = screen.queryByTestId("sign-in-button");
		expect(signInButton).toBeInTheDocument();
	});

	it("should not render SignInButton if hasSignIn is false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: false,
		});
		render(<MembershipCard />);

		const signInButton = screen.queryByTestId("sign-in-button");
		expect(signInButton).not.toBeInTheDocument();
	});

	it("should push the history with phone-registration if join-now-button is clicked", () => {
		render(<MembershipCard />);
		const link = screen.getByTestId("join-now-button");
		link.click();
		expect(useHistory().push).toHaveBeenCalledWith("/phone-registration");
	});
});
