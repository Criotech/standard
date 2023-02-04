import { render, screen } from "@testing-library/react";
import PointsAvailable from ".";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("PointsAvailable", () => {
	it("should render without errors", () => {
		render(<PointsAvailable points={10} />);
	});

	it("should render correct points", () => {
		render(<PointsAvailable points={10} />);

		const points = screen.queryByText("10");
		expect(points).toBeInTheDocument();
	});

	it("should render correct points label", () => {
		render(<PointsAvailable points={10} />);
		const pointsLabel = screen.queryByText(
			"dashboardPage.membershipDetails.pointsAvailable"
		);
		expect(pointsLabel).toBeInTheDocument();
	});
});
