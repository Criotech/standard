import { render, screen } from "@testing-library/react";
import SmallView from ".";
import BlockTitle from "../../BlockTitle";
import { ComponentProps } from "react";
import PointsAvailable from "../PointsAvailable";
import PointsExpiring from "../PointsExpiring";
import StatusName from "../StatusName";

jest.mock("../../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../PointsAvailable", () => ({
	__esModule: true,
	default: ({ points }: ComponentProps<typeof PointsAvailable>) => (
		<div data-testid="points-available">{points}</div>
	),
}));

jest.mock("../PointsExpiring", () => ({
	__esModule: true,
	default: ({
		pointsExpiringKey,
		pointsExpiringData,
	}: ComponentProps<typeof PointsExpiring>) => (
		<>
			<span data-testid="points-expiring">
				<span>{pointsExpiringKey}</span>
				<span>{JSON.stringify(pointsExpiringData)}</span>
			</span>
		</>
	),
}));

jest.mock("../StatusHeading", () => ({
	__esModule: true,
	default: () => <div data-testid="status-heading" />,
}));

jest.mock("../StatusName", () => ({
	__esModule: true,
	default: ({ statusKey }: ComponentProps<typeof StatusName>) => (
		<div data-testid="status-name">{statusKey}</div>
	),
}));

describe("SmallView", () => {
	it("should render without errors", () => {
		render(
			<SmallView
				isStatusVisible={false}
				availablePoints={0}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.noPointsExpiring"
				pointsExpiringData={{}}
				statusKey="membershipPage.member"
			/>
		);
	});

	it("should render loading block when isLoading is true", () => {
		render(
			<SmallView
				isStatusVisible={false}
				availablePoints={0}
				isLoading={true}
				pointsExpiringKey="dashboardPage.membership.noPointsExpiring"
				pointsExpiringData={{}}
				statusKey="membershipPage.member"
			/>
		);

		const loadingBlock = screen.getByTestId("loading-block");

		expect(loadingBlock).toBeInTheDocument();
	});

	it("should render PointsAvailable correctly", () => {
		render(
			<SmallView
				isStatusVisible={false}
				availablePoints={100}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.noPointsExpiring"
				pointsExpiringData={{}}
				statusKey="membershipPage.member"
			/>
		);

		const pointsAvailable = screen.getByTestId("points-available");
		expect(pointsAvailable).toBeInTheDocument();
		expect(pointsAvailable).toHaveTextContent("100");
	});

	it("should render Points Expiring correctly", () => {
		render(
			<SmallView
				isStatusVisible={false}
				availablePoints={100}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.pointsExpiring"
				pointsExpiringData={{
					expiringPoints: "fakePoints",
					expiringAt: "fakeDate",
				}}
				statusKey="membershipPage.member"
			/>
		);

		const pointsExpiring = screen.getByTestId("points-expiring");
		expect(pointsExpiring).toBeInTheDocument();
		expect(pointsExpiring).toHaveTextContent(
			"dashboardPage.membership.pointsExpiring" +
				JSON.stringify({
					expiringPoints: "fakePoints",
					expiringAt: "fakeDate",
				})
		);
	});

	it("should render StatusHeading", () => {
		render(
			<SmallView
				isStatusVisible={true}
				availablePoints={0}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.pointsExpiring"
				pointsExpiringData={{
					expiringPoints: "fakePoints",
					expiringAt: "fakeDate",
				}}
				statusKey="membershipPage.member"
			/>
		);

		const statusHeading = screen.getByTestId("status-heading");
		expect(statusHeading).toBeInTheDocument();
	});

	it("should render StatusName correctly", () => {
		render(
			<SmallView
				isStatusVisible={true}
				availablePoints={0}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.pointsExpiring"
				pointsExpiringData={{
					expiringPoints: "fakePoints",
					expiringAt: "fakeDate",
				}}
				statusKey="membershipPage.member"
			/>
		);

		const statusName = screen.getByTestId("status-name");
		expect(statusName).toBeInTheDocument();
		expect(statusName).toHaveTextContent("membershipPage.member");
	});
});
