import { render, screen } from "@testing-library/react";
import { IAcuvueCoupon } from "@myacuvue_thailand_web/services";
import AcuvueCouponCard from ".";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import HorizontalCoupon from "../../../components/HorizontalCoupon";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/HorizontalCoupon", () => ({
	__esModule: true,
	default: ({ title }: ComponentProps<typeof HorizontalCoupon>) => (
		<div data-testid="horizontal-coupon">{title}</div>
	),
}));

const coupon: IAcuvueCoupon = {
	id: "some-random-string",
	type: "acuvue",
	subType: "other",
	isEligibleForHomeDelivery: true,
	isEligibleForInStore: true,
	bonusMultiplier: 2,
	imageUrl: "image-url",
	title: "some-random-title",
	points: 1200,
	validPeriod: {
		from: "2021-10-10",
		to: "2021-10-10",
	},
	terms: "some terms and condition",
	absoluteCashDiscount: 10,
};

describe("AcuvueCouponCard", () => {
	it("should render without errors", () => {
		render(<AcuvueCouponCard coupon={coupon} />);
	});

	it("should render horizontal coupon with title", () => {
		render(<AcuvueCouponCard coupon={coupon} />);

		const horizontalCoupon = screen.getByTestId("horizontal-coupon");
		expect(horizontalCoupon).toBeInTheDocument();

		const couponTitle = screen.getByText(coupon.title);
		expect(couponTitle).toBeInTheDocument();
	});
});
