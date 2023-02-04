import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WalletBlock from ".";
import { useService } from "../../../hooks/useService";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import BlockTitle from "../BlockTitle";
import EmptyView from "./EmptyView";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../icons/QuestionMarkIcon", () => ({
	__esModule: true,
	IconSize: {
		SMALL: "16px",
		MEDIUM: "24px",
	},
	default: () => <span data-testid="question-mark-icon" />,
}));

jest.mock("./NonEmptyView", () => ({
	__esModule: true,
	default: () => <span data-testid="non-empty-view" />,
}));

jest.mock("./EmptyView", () => ({
	__esModule: true,
	default: ({ emptyMessageKey }: ComponentProps<typeof EmptyView>) => (
		<span data-testid="empty-view">{emptyMessageKey}</span>
	),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="loading-block" />,
}));

jest.mock("../BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title"> {textKey}</span>
	),
}));

jest.mock("../../../hooks/useService", () => ({
	useService: jest.fn(),
}));

beforeEach(() => {
	(useService as jest.Mock).mockReturnValue({
		WindowService: {
			scrollTo: jest.fn(),
		},
	});
});

describe("WalletBlock", () => {
	it("should render without errors", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);
	});

	it("should render block title with yourRewardWallet text key", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const blockTitle = screen.getByTestId("block-title");

		expect(blockTitle).toBeInTheDocument();
		expect(blockTitle).toHaveTextContent(
			"dashboardPage.rewardWallet.yourRewardWallet"
		);
	});

	it("should render NonEmptyView when some active coupons available", () => {
		render(
			<WalletBlock
				cards={[{ imageUrl: "fakeUrl", title: "fake Title" }]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const nonEmptyView = screen.getByTestId("non-empty-view");

		expect(nonEmptyView).toBeInTheDocument();
	});

	it("should render EmptyView when no active coupons available", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const nonEmptyView = screen.getByTestId("empty-view");

		expect(nonEmptyView).toBeInTheDocument();
	});

	it("should call scrollToView", () => {
		const fakeScroll = jest.fn();

		(useService as jest.Mock).mockReturnValue({
			WindowService: {
				scrollTo: fakeScroll,
				getElementById: jest.fn().mockReturnValue({
					offsetTop: 500,
				}),
			},
			ClassService: {
				createClassName: (...args: any) => args.join(" "),
			},
		});

		const { container } = render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const questionMarkIcon = container.querySelector(".question-mark-icon");

		questionMarkIcon && userEvent.click(questionMarkIcon);

		expect(fakeScroll).toHaveBeenCalled();
	});

	it("should not call scrollTo when clicked scrollToView", () => {
		const fakeScroll = jest.fn();

		(useService as jest.Mock).mockReturnValue({
			WindowService: {
				scrollTo: fakeScroll,
				getElementById: jest.fn().mockReturnValue(undefined),
			},
			ClassService: {
				createClassName: (...args: any) => args.join(" "),
			},
		});

		const { container } = render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const questionMarkIcon = container.querySelector(".question-mark-icon");

		questionMarkIcon && userEvent.click(questionMarkIcon);

		expect(fakeScroll).not.toHaveBeenCalled();
	});

	it("should render loading block when isLoading is true", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const loadingBlock = screen.getByTestId("loading-block");

		expect(loadingBlock).toBeInTheDocument();
	});

	it("should render emptyMessageOne when catalogs are empty", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet
				isCatalogsEmpty
			/>
		);

		const emptyView = screen.getByTestId("empty-view");

		expect(emptyView).toBeInTheDocument();
		expect(emptyView).toHaveTextContent(
			"dashboardPage.rewardWallet.empty.earnPoints"
		);
	});

	it("should render emptyMessageTwo when catalogs are not empty and user not tagged to store", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore={false}
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet={false}
				isCatalogsEmpty={false}
			/>
		);

		const emptyView = screen.getByTestId("empty-view");

		expect(emptyView).toBeInTheDocument();
		expect(emptyView).toHaveTextContent(
			"dashboardPage.rewardWallet.empty.selectStore"
		);
	});

	it("should render specialMessageKey when catalogs are not empty and user tagged to store", () => {
		render(
			<WalletBlock
				cards={[]}
				isLoading={false}
				isUserRegistedToStore
				minimumPointsToRedeem={100}
				hasReceivedWelcomeWallet={false}
				isCatalogsEmpty={false}
			/>
		);

		const emptyView = screen.getByTestId("empty-view");

		expect(emptyView).toBeInTheDocument();
		expect(emptyView).toHaveTextContent(
			"dashboardPage.rewardWallet.empty.redeemRewardsCollectPoints"
		);
	});
});
