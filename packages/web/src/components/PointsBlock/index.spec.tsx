import PointsBlock from ".";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { IPoints } from "@myacuvue_thailand_web/services";
import { Link } from "react-router-dom-v5-compat";
import Progress from "../Progress";
import Text from "../Text";

jest.mock("react-router-dom-v5-compat", () => ({
	Link: ({ to }: ComponentProps<typeof Link>) => (
		<a href={to as string} data-testid="link">
			{to}
		</a>
	),
}));

jest.mock("../Progress", () => ({
	__esModule: true,
	default: ({ badge, percent }: ComponentProps<typeof Progress>) => (
		<>
			<div data-testid="progress">
				<div data-testid="percent">{percent}</div>
				<div data-testid="badge">{badge}</div>
			</div>
		</>
	),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("PointsBlock", () => {
	const points: IPoints = {
		ladder: "platinum",
		earnedPoints: 5000,
		remainingPointsToPlatinum: 1000,
		dateLimitToPlatinum: "2018-01-01",
		availablePoints: 1220,
		expiringPoints: 100,
		expiringAt: "2018-12-01",
	};

	it("should render a platinum progress", () => {
		render(<PointsBlock points={points} />);
		const progress = screen.getByTestId("progress");

		expect(progress).toBeInTheDocument();

		const percent = screen.getByTestId("percent");
		expect(percent).toBeInTheDocument();

		const badge = screen.getByTestId("badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveTextContent("platinumBadge");
	});

	it("should render a non platinum progress", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 5000,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const progress = screen.getByTestId("progress");
		expect(progress).toBeInTheDocument();

		const percent = screen.getByTestId("percent");
		expect(percent).toBeInTheDocument();

		const badge = screen.getByTestId("badge");
		expect(badge).toBeInTheDocument();
		expect(badge).toHaveTextContent("normalBadge");
	});

	it("should render points to Platinum by date", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 500,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const remainingPointsToPlatinum = screen.queryByText(
			"pointsBlock.pointsToPlatinumByDate"
		);
		expect(remainingPointsToPlatinum).toBeInTheDocument();
	});

	it("should render points remaining to Platinum", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 0,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const pointsToPlatinum = screen.queryByText(
			"pointsBlock.pointsToPlatinum"
		);
		expect(pointsToPlatinum).toBeInTheDocument();
	});

	it("should render vip message", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 700,
			remainingPointsToPlatinum: 0,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const vipMessage = screen.queryByText("pointsBlock.vipMessage");
		expect(vipMessage).toBeInTheDocument();
	});

	it("should render route to /membership/platinum", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 700,
			remainingPointsToPlatinum: 0,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const membershipRoute = screen.queryByText("/membership/platinum");
		expect(membershipRoute).toBeInTheDocument();
	});

	it("should render route to /points/about", () => {
		const points: IPoints = {
			ladder: "normal",
			earnedPoints: 0,
			remainingPointsToPlatinum: 70,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		render(<PointsBlock points={points} />);

		const pointsAboutRoute = screen.queryByText("/points/about");
		expect(pointsAboutRoute).toBeInTheDocument();
	});
});
