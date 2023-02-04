import { ComponentProps } from "react";
import WideView from ".";
import { render, screen } from "@testing-library/react";
import Text from "../../../../components/Text";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import { mocked } from "ts-jest/utils";

jest.mock("../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../BlockTitle", () => ({
	__esModule: true,
	default: () => <div data-testid="block-title" />,
}));

jest.mock("../PointsAvailable", () => ({
	__esModule: true,
	default: () => <div data-testid="points-available" />,
}));

jest.mock("../PointsExpiring", () => ({
	__esModule: true,
	default: () => <div data-testid="points-expiring" />,
}));

jest.mock("../StatusHeading", () => ({
	__esModule: true,
	default: () => <div data-testid="status-heading" />,
}));

jest.mock("../StatusName", () => ({
	__esModule: true,
	default: () => <div data-testid="status-name" />,
}));

jest.mock("../BenefitsList", () => ({
	__esModule: true,
	default: () => <div data-testid="benefits-list" />,
}));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

beforeEach(() => {
	mocked(useWideScreen).mockReturnValue({
		isWideScreen: true,
	});
});

describe("WideView", () => {
	it("should render without errors", () => {
		render(
			<WideView
				isStatusVisible
				benefitKeys={["dashboardPage.blockTitle.myAcuvueMembership"]}
				availablePoints={100}
				isLoading={false}
				pointsExpiringKey="dashboardPage.membership.noPointsExpiring"
				pointsExpiringData={{ points: "100" }}
				statusKey="membershipPage.member"
			/>
		);
	});

	it("should render LoadingBlock when it is loading", () => {
		render(
			<WideView
				isStatusVisible
				benefitKeys={["dashboardPage.blockTitle.myAcuvueMembership"]}
				availablePoints={100}
				isLoading={true}
				pointsExpiringKey="dashboardPage.membership.noPointsExpiring"
				pointsExpiringData={{ points: "100" }}
				statusKey="membershipPage.member"
			/>
		);

		const loadingBlock = screen.getByTestId("loading-block");
		expect(loadingBlock).toBeInTheDocument();
	});
});
