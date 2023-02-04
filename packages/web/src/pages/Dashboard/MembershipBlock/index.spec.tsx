import { render, screen } from "@testing-library/react";
import MembershipBlock from ".";
import { useWideScreen } from "../../../hooks/useWideScreen";
import { useDate } from "../../../hooks/useDate";
import { useConfiguration } from "../../../hooks/useConfiguration";
import SmallView from "./SmallView";
import { ComponentProps } from "react";
import WideView from "./WideView";

jest.mock("../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useDate", () => ({
	useDate: jest.fn(),
}));

jest.mock("./SmallView", () => ({
	__esModule: true,
	default: ({
		isStatusVisible,
		availablePoints,
		statusKey,
		pointsExpiringKey,
	}: ComponentProps<typeof SmallView>) => (
		<div data-testid="small-view">
			<span data-testid="is-status-visible">
				{isStatusVisible ? "Status visible" : "Status invisible"}
			</span>
			<span data-testid="available-points">{availablePoints}</span>
			<span data-testid="status-key">{statusKey}</span>
			<span data-testid="points-expiring-key">{pointsExpiringKey}</span>
		</div>
	),
}));

jest.mock("./WideView", () => ({
	__esModule: true,
	default: ({
		isStatusVisible,
		availablePoints,
		statusKey,
		pointsExpiringKey,
	}: ComponentProps<typeof WideView>) => (
		<div data-testid="wide-view">
			<span data-testid="wide-is-status-visible">
				{isStatusVisible ? "Status visible" : "Status invisible"}
			</span>
			<span data-testid="wide-available-points">{availablePoints}</span>
			<span data-testid="wide-status-key">{statusKey}</span>
			<span data-testid="wide-points-expiring-key">
				{pointsExpiringKey}
			</span>
		</div>
	),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [],
			platinum: [],
		},
	});

	(useDate as jest.Mock).mockReturnValue({
		longDateToDisplay: jest.fn().mockImplementation((date) => date),
	});
});

describe("MembershipBlock", () => {
	it("should render without errors", () => {
		render(
			<MembershipBlock
				availablePoints={0}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);
	});

	it("should render SmallView when screen is not wide", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(
			<MembershipBlock
				availablePoints={0}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const smallView = screen.getByTestId("small-view");
		expect(smallView).toBeInTheDocument();

		const wideView = screen.queryByTestId("wide-view");
		expect(wideView).not.toBeInTheDocument();
	});

	it("should render SmallView props when screen is not wide", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const availablePoints = screen.getByTestId("available-points");
		expect(availablePoints).toBeInTheDocument();
		expect(availablePoints).toHaveTextContent("10");

		const statusKey = screen.getByTestId("status-key");
		expect(statusKey).toBeInTheDocument();
		expect(statusKey).toHaveTextContent("dashboardPage.membership.member");
	});

	it("should render WideView when screen is wide", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(
			<MembershipBlock
				availablePoints={0}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const wideView = screen.getByTestId("wide-view");
		expect(wideView).toBeInTheDocument();

		const smallView = screen.queryByTestId("small-view");
		expect(smallView).not.toBeInTheDocument();
	});

	it("should render WideView props", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const availablePoints = screen.getByTestId("wide-available-points");
		expect(availablePoints).toBeInTheDocument();
		expect(availablePoints).toHaveTextContent("10");

		const statusKey = screen.getByTestId("wide-status-key");
		expect(statusKey).toBeInTheDocument();
		expect(statusKey).toHaveTextContent("dashboardPage.membership.member");
	});

	it("should render no points expiring when expiringPoints prop is 0", () => {
		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={0}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const expiringPoings = screen.getByTestId("points-expiring-key");
		expect(expiringPoings).toBeInTheDocument();
		expect(expiringPoings).toHaveTextContent(
			"dashboardPage.membership.noPointsExpiring"
		);
	});

	it("should render expiring points when expiringPoints passed is more than 0", () => {
		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={100}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const expiringPoings = screen.getByTestId("points-expiring-key");
		expect(expiringPoings).toBeInTheDocument();
		expect(expiringPoings).toHaveTextContent(
			"dashboardPage.membership.pointsExpiring"
		);
	});

	it("should render Member when ladderKey is normal", () => {
		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={100}
				expiringAt="2022-07-25"
				ladderKey="normal"
				isLoading={false}
			/>
		);

		const statusKey = screen.getByTestId("status-key");
		expect(statusKey).toBeInTheDocument();
		expect(statusKey).toHaveTextContent("dashboardPage.membership.member");
	});

	it("should render VIP Member when ladderKey is platinum", () => {
		render(
			<MembershipBlock
				availablePoints={10}
				expiringPoints={100}
				expiringAt="2022-07-25"
				ladderKey="platinum"
				isLoading={false}
			/>
		);

		const statusKey = screen.getByTestId("status-key");
		expect(statusKey).toBeInTheDocument();
		expect(statusKey).toHaveTextContent("dashboardPage.membership.vip");
	});
});
