import Points from ".";
import { act, render, screen, waitFor } from "@testing-library/react";
import { usePoints } from "../../hooks/usePoints";
import { IPoints } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import Header from "../../components/Layout/Header";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("antd", () => ({
	Divider: () => <div data-testid="divider" />,
}));

jest.mock("../../hooks/usePoints");

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

jest.mock("../../components/PointsBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="points-block" />,
}));

jest.mock("../../components/TransactionList", () => ({
	__esModule: true,
	default: () => <div data-testid="transaction-list" />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

const fakePoints: IPoints = {
	ladder: "platinum",
	earnedPoints: 5000,
	remainingPointsToPlatinum: 1000,
	dateLimitToPlatinum: "2018-01-01",
	availablePoints: 1220,
	expiringPoints: 100,
	expiringAt: "2018-12-01",
};

beforeEach(() => {
	mocked(usePoints).mockReturnValue({
		getUserPoints: jest.fn().mockResolvedValue(fakePoints),
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("Points", () => {
	it("should render without error", async () => {
		await act(async () => {
			render(<Points />);
		});
	});

	it("should render title header with correct title", async () => {
		render(<Points />);

		await waitFor(async () => {
			const header = await screen.findByTestId("header");
			const headerTitle = await screen.findByText("pointsPage.title");

			expect(header).toBeInTheDocument();
			expect(headerTitle).toBeInTheDocument();
		});
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<Points />);

		await waitFor(() => {
			const navigationPanel = screen.getByTestId(
				"global-navigation-panel"
			);
			expect(navigationPanel).toBeVisible();
		});
	});

	it("should not render TransactionList", async () => {
		render(<Points />);

		await waitFor(() => {
			const transactionList = screen.getByTestId("transaction-list");
			expect(transactionList).toBeVisible();
		});
	});

	it("should call getUserPoints", async () => {
		render(<Points />);

		await waitFor(() =>
			expect(usePoints().getUserPoints).toHaveBeenCalled()
		);
	});

	it("should render noPointExpiring message when expiringPoints and expiringAt are null", async () => {
		const fakePointsWithoutExpiration: IPoints = {
			ladder: "platinum",
			earnedPoints: 5000,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: null,
			expiringAt: null,
		};

		mocked(usePoints().getUserPoints).mockResolvedValue(
			fakePointsWithoutExpiration
		);

		render(<Points />);

		await waitFor(() => {
			const pointExpiringBlock = screen.getByText(
				"pointsBlock.noPointExpiring"
			);
			expect(pointExpiringBlock).toBeInTheDocument();
			expect(pointExpiringBlock).not.toHaveTextContent(
				"pointsBlock.pointsExpiringOn"
			);
		});
	});

	it("should render PointsBlock when the points are available", async () => {
		render(<Points />);

		await waitFor(async () => {
			const pointsBlock = await screen.findByTestId("points-block");
			expect(pointsBlock).toBeInTheDocument();
		});
	});

	it("should render button and browseRewards button text", async () => {
		render(<Points />);

		await waitFor(() => {
			const browseRewardsButton = screen.getByText(
				"pointsBlock.browseRewards"
			);
			expect(browseRewardsButton).toBeVisible();
		});

		act(() => {
			const browseRewardsButton = screen.getByText(
				"pointsBlock.browseRewards"
			);
			browseRewardsButton.click();
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalledWith(
				"/rewards/wallet/active"
			);
		});
	});
});
