import { render, screen } from "@testing-library/react";
import GreetingsBlock from "./index";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import { Link } from "react-router-dom";
import MembershipBlock from "../Dashboard/MembershipBlock";
import { useConfiguration } from "../../hooks/useConfiguration";
import FeedbackBlock from "../FeedbackBlock";

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) =>
		textKey + JSON.stringify(data),
}));

jest.mock("../../icons/MemberIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="member-icon" />,
}));

jest.mock("../../icons/ChevronRightIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "16px",
	},
	default: () => <span data-testid="chevron-right-icon" />,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: ComponentProps<typeof Link>) => (
		<a href={to as string}>{children}</a>
	),
}));

jest.mock("../Dashboard/MembershipBlock", () => ({
	__esModule: true,
	default: ({
		availablePoints,
		expiringPoints,
		expiringAt,
		ladderKey,
	}: ComponentProps<typeof MembershipBlock>) => (
		<div data-testid="membership-block">
			<span data-testid="membership-available-points">
				{availablePoints}
			</span>
			<span data-testid="membership-expiring-points">
				{expiringPoints}
			</span>
			<span data-testid="membership-expiring-at">{expiringAt}</span>
			<span data-testid="membership-ladder-key">{ladderKey}</span>
		</div>
	),
}));

jest.mock("../Dashboard/WalletBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="wallet" />,
}));

jest.mock("../FeedbackBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="feedback" />,
}));

jest.mock("../Dashboard/PromocodeBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="promocode-block" />,
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

describe("GreetingsBlock", () => {
	beforeEach(() => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasMembershipAndWalletBlock: true,
			hasPromocodeAndFeedbackBlock: true,
			hasProfileDetailsMenu: true,
		});
	});

	it("should render without errors", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
	});

	it("should render member icon when hasProfileDetailsMenu is true", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const memberIcon = screen.getByTestId("member-icon");
		expect(memberIcon).toBeInTheDocument();
	});

	it("should render chevron-right icon", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const chevronRightIcon = screen.getByTestId("chevron-right-icon");
		expect(chevronRightIcon).toBeInTheDocument();
	});

	it("should render MembershipBlock when point is not loading", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={false}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);

		const membershipBlock = screen.getByTestId("membership-block");
		expect(membershipBlock).toBeInTheDocument();
	});

	it("should pass down availablePoints prop", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={false}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const availablePoints = screen.queryByTestId(
			"membership-available-points"
		);
		expect(availablePoints).toBeInTheDocument();
		expect(availablePoints).toHaveTextContent("560");
	});

	it("should pass down expiringPoints prop", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 100,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={false}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const expiringPoints = screen.queryByTestId(
			"membership-expiring-points"
		);
		expect(expiringPoints).toBeInTheDocument();
		expect(expiringPoints).toHaveTextContent("100");
	});

	it("should pass down expiringAt prop", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 100,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={false}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const expiringAt = screen.queryByTestId("membership-expiring-at");
		expect(expiringAt).toBeInTheDocument();
		expect(expiringAt).toHaveTextContent("2022-03-05");
	});

	it("should pass down ladderKey prop", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 100,
					ladder: "platinum",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={false}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const ladderKey = screen.queryByTestId("membership-ladder-key");
		expect(ladderKey).toBeInTheDocument();
		expect(ladderKey).toHaveTextContent("platinum");
	});

	it("should render WalletBlock", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const walletBlock = screen.getByTestId("wallet");
		expect(walletBlock).toBeInTheDocument();
	});

	it("should render profile anchor tags with appropriate link", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/profile");
	});

	it("should render correct first name", () => {
		const { container } = render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={"fakeFirstName"}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);

		expect(container.querySelector(".greetings-text")).toHaveTextContent(
			"fakeFirstName"
		);
	});

	it("should render membership and wallet section when hasMembershipAndWalletBlock is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasMembershipAndWalletBlock: true,
			hasPromocodeAndFeedbackBlock: false,
			hasProfileDetailsMenu: true,
		});

		const { container } = render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={"fakeFirstName"}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);

		expect(
			container.querySelector(".membership-and-wallet-section")
		).toBeInTheDocument();
	});

	it("should render promocode and feedback section when hasPromocodeAndFeedbackBlock is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasMembershipAndWalletBlock: false,
			hasPromocodeAndFeedbackBlock: true,
			hasProfileDetailsMenu: true,
		});

		const { container } = render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={"fakeFirstName"}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);

		expect(
			container.querySelector(".promocode-and-feedback-section")
		).toBeInTheDocument();
	});

	it("should render Feedback Block", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const feedbackBlock = screen.getByTestId("feedback");
		expect(feedbackBlock).toBeInTheDocument();
	});

	it("should render Promocode Block", () => {
		render(
			<GreetingsBlock
				userPoints={{
					availablePoints: 560,
					dateLimitToPlatinum: null,
					earnedPoints: 0,
					expiringAt: "2022-03-05",
					expiringPoints: 60,
					ladder: "normal",
					remainingPointsToPlatinum: 0,
				}}
				isPointsLoading={true}
				firstName={""}
				walletProps={{
					isWalletLoading: true,
					cards: [],
					minimumPointsToRedeem: 0,
					hasReceivedWelcomeWallet: true,
					isCatalogsEmpty: true,
					isUserRegistedToStore: true,
				}}
			/>
		);
		const promocodeBlock = screen.getByTestId("promocode-block");
		expect(promocodeBlock).toBeInTheDocument();
	});
});
