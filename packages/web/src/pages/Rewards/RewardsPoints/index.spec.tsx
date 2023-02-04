import RewardsPoints from ".";
import { render, screen } from "@testing-library/react";
import { IPoints } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../../components/Text";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/HighlightedValue", () => ({
	__esModule: true,
	default: () => <span data-testid="highlighted-value" />,
}));

describe("RewardsPoints", () => {
	const fakePoints: IPoints = {
		ladder: "platinum",
		earnedPoints: 5000,
		remainingPointsToPlatinum: 1000,
		dateLimitToPlatinum: "2018-01-01",
		availablePoints: 1220,
		expiringPoints: 100,
		expiringAt: "2018-12-01",
	};

	it("should render without error", () => {
		render(<RewardsPoints points={fakePoints} />);
	});

	it("should render higlightedValue component", async () => {
		const fakePoints: IPoints = {
			ladder: "platinum",
			earnedPoints: 5000,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 500,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};
		render(<RewardsPoints points={fakePoints} />);
		const highlightedValue = screen.getByTestId("highlighted-value");
		expect(highlightedValue).toBeInTheDocument();
	});
});
