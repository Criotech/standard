import PointsExpiring from ".";
import { render, screen } from "@testing-library/react";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) => (
		<>
			<span data-testid="translation-text">{textKey}</span>
			<span data-testid="points-expiring">{data?.points}</span>
			<span data-testid="expiry-date">{data?.date}</span>
		</>
	),
}));

describe("PointsExpiring", () => {
	it("should render without errors", () => {
		render(
			<PointsExpiring pointsExpiringKey="dashboardPage.membershipDetails.pointsAvailable" />
		);
	});

	it("should receive correct pointsExpiringData prop with points and date", () => {
		render(
			<PointsExpiring
				pointsExpiringKey="dashboardPage.membershipDetails.pointsAvailable"
				pointsExpiringData={{ points: 100, date: "10 Jan 2022" }}
			/>
		);

		const points = screen.getByTestId("points-expiring");
		const expringOn = screen.getByTestId("expiry-date");

		expect(points).toHaveTextContent("100");
		expect(expringOn).toHaveTextContent("10 Jan 2022");
	});

	it("should receive correct pointsExpiringKey prop", () => {
		render(
			<PointsExpiring pointsExpiringKey="dashboardPage.membershipDetails.pointsAvailable" />
		);

		const pointsExpiringKey = screen.getByTestId("translation-text");

		expect(pointsExpiringKey).toHaveTextContent(
			"dashboardPage.membershipDetails.pointsAvailable"
		);
	});

	it("should receive correct className prop", () => {
		const { container } = render(
			<PointsExpiring
				pointsExpiringKey="dashboardPage.membershipDetails.pointsAvailable"
				className="points-expiring-class"
			/>
		);

		expect(container.querySelector("div")).toHaveClass(
			"points-expiring-class"
		);
	});
});
