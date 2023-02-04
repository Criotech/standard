import EmptyView from "./index";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) => (
		<span data-testid="text">{textKey + JSON.stringify(data)}</span>
	),
}));

describe("EmptyView", () => {
	it("should render without errors", () => {
		render(
			<EmptyView
				emptyMessageKey="dashboardPage.greeting"
				emptyMessageData={{ points: 0 }}
			/>
		);
	});

	it("should render discount-coupon icon", () => {
		render(
			<EmptyView
				emptyMessageKey="dashboardPage.greeting"
				emptyMessageData={{ points: 100 }}
			/>
		);

		const discountCouponIcon = screen.getByRole("img");
		expect(discountCouponIcon).toBeInTheDocument();
		expect(discountCouponIcon).toHaveAttribute(
			"src",
			"discount-coupon-icon.svg"
		);
	});

	it("should render empty message and required points", () => {
		render(
			<EmptyView
				emptyMessageKey="dashboardPage.greeting"
				emptyMessageData={{ points: 100 }}
			/>
		);

		const discountCouponIcon = screen.getByTestId("text");
		expect(discountCouponIcon).toBeInTheDocument();
		expect(discountCouponIcon).toHaveTextContent(
			"dashboardPage.greeting" + JSON.stringify({ points: 100 })
		);
	});
});
