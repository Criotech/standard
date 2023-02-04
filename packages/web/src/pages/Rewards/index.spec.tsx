import Rewards from ".";
import { act, render, screen } from "@testing-library/react";
import { usePoints } from "../../hooks/usePoints";
import { IPoints, ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { AffixProps } from "antd";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import RewardsPoints from "./RewardsPoints";
import Header from "../../components/Layout/Header";
import { mocked } from "ts-jest/utils";

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	Routes: () => <></>,
	Route: () => <></>,
	Navigate: () => <></>,
}));

jest.mock("antd", () => ({
	Divider: jest.requireActual("antd").Divider,
	Affix: ({ children }: AffixProps) => (
		<div data-testid="affix-test-id">{children}</div>
	),
}));

jest.mock("../../hooks/usePoints");

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../components/NavigationTabs", () => ({
	__esModule: true,
	default: () => <div data-testid="navigation-tabs" />,
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/CartButton", () => ({
	__esModule: true,
	default: () => <button data-testid="cart-button" />,
}));

jest.mock("./RewardsPoints", () => ({
	__esModule: true,
	default: ({ points }: ComponentProps<typeof RewardsPoints>) => (
		<div data-testid="rewards-points">{points?.availablePoints}</div>
	),
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ icon }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{icon}</div>
	),
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

const points: IPoints = {
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
		getUserPoints: jest.fn().mockResolvedValue(points),
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

describe("Rewards", () => {
	it("should render without error", async () => {
		await act(async () => {
			render(<Rewards />);
		});
	});

	it("should render RewardsPoints with passing down points when the user profile is complete", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: undefined,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: jest.fn(),
			isLoading: false,
			profileCompleteness: ProfileCompleteness.COMPLETE,
		});

		await act(async () => {
			render(<Rewards />);
		});

		const rewardsPoints = await screen.findByTestId("rewards-points");
		expect(rewardsPoints).toBeInTheDocument();
		expect(rewardsPoints).toHaveTextContent(
			points.availablePoints.toString()
		);
	});

	it("should not render RewardsPoints when the user profile is incomplete", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: undefined,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: jest.fn(),
			isLoading: false,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		await act(async () => {
			render(<Rewards />);
		});

		const rewardsPoints = screen.queryByTestId("rewards-points");
		expect(rewardsPoints).not.toBeInTheDocument();
	});

	it("should render NavigationTabs", async () => {
		await act(async () => {
			render(<Rewards />);
		});

		const navigationTab = await screen.findByTestId("navigation-tabs");
		expect(navigationTab).toBeInTheDocument();
	});

	it("should render GlobalNavigationPanel", async () => {
		await act(async () => {
			render(<Rewards />);
		});

		const navigationPanel = await screen.findByTestId(
			"global-navigation-panel"
		);
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should render header and cart button", async () => {
		await act(async () => {
			render(<Rewards />);
		});

		const header = await screen.findByTestId("header");
		expect(header).toBeInTheDocument();

		const cartButton = await screen.findByTestId("cart-button");
		expect(cartButton).toBeInTheDocument();
	});
});
