import { render, screen } from "@testing-library/react";
import LifestyleCouponCard from ".";
import { ILifestyleCoupon } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import CouponPoints from "../../../components/CouponPoints";
import VerticalCoupon from "../../../components/VerticalCoupon";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/CouponPoints", () => ({
	__esModule: true,
	default: ({ value }: ComponentProps<typeof CouponPoints>) => (
		<div data-testid="coupon-points">{value}</div>
	),
}));

jest.mock("../../../components/VerticalCoupon", () => ({
	__esModule: true,
	default: ({
		title,
		subTitle,
		image,
		tags,
		value,
	}: ComponentProps<typeof VerticalCoupon>) => (
		<div data-testid="vertical-coupon">
			<div data-testid="coupon-title">{title}</div>
			<div data-testid="coupon-subtitle">{subTitle}</div>
			<div data-testid="coupon-image">{image}</div>
			<div data-testid="coupon-tags">{tags}</div>
			<>{value}</>
		</div>
	),
}));

const coupon: ILifestyleCoupon = {
	id: "some-random-string",
	type: "lifestyle",
	imageUrl: "image-url",
	isPlatinum: true,
	isFeatured: false,
	remainingQuantity: 10,
	title: "some-random-title",
	issuer: "some-issuer",
	tag: "new",
	points: 1200,
	validPeriod: {
		from: "2021-10-10",
		to: "2021-10-10",
	},
	terms: "some terms and condition",
	absoluteCashDiscount: 10,
};

describe("LifestyleCouponCard", () => {
	it("should render without errors", () => {
		render(<LifestyleCouponCard coupon={coupon} />);
	});

	it("should render VerticalCoupon and passing the appropriate props", async () => {
		render(<LifestyleCouponCard coupon={coupon} />);

		const verticalCoupon = screen.getByTestId("vertical-coupon");
		expect(verticalCoupon).toBeInTheDocument();

		const couponTitle = screen.getByTestId("coupon-title");
		expect(couponTitle).toBeInTheDocument();
		expect(couponTitle).toHaveTextContent(coupon.title);

		const couponSubtitle = screen.getByTestId("coupon-subtitle");
		expect(couponSubtitle).toBeInTheDocument();
		expect(couponSubtitle).toHaveTextContent(coupon.issuer);

		const couponImage = screen.getByTestId("coupon-image");
		expect(couponImage).toBeInTheDocument();
		expect(couponImage).toHaveTextContent(coupon.imageUrl);
	});

	it("should render new tag", async () => {
		const coupon: ILifestyleCoupon = {
			id: "some-random-string",
			type: "lifestyle",
			imageUrl: "image-url",
			isPlatinum: false,
			isFeatured: false,
			remainingQuantity: 10,
			title: "some-random-title",
			issuer: "some-issuer",
			tag: "new",
			points: 1200,
			validPeriod: {
				from: "2021-10-10",
				to: "2021-10-10",
			},
			terms: "some terms and condition",
			absoluteCashDiscount: 10,
		};

		render(<LifestyleCouponCard coupon={coupon} />);

		const newTag = screen.queryByText("couponTag.new");
		expect(newTag).toBeInTheDocument();
	});

	it("should render platinum tag", async () => {
		const coupon: ILifestyleCoupon = {
			id: "some-random-string",
			type: "lifestyle",
			imageUrl: "image-url",
			isPlatinum: true,
			isFeatured: false,
			remainingQuantity: 10,
			title: "some-random-title",
			issuer: "some-issuer",
			tag: null,
			points: 1200,
			validPeriod: {
				from: "2021-10-10",
				to: "2021-10-10",
			},
			terms: "some terms and condition",
			absoluteCashDiscount: 10,
		};

		render(<LifestyleCouponCard coupon={coupon} />);

		const platinumTag = screen.queryByText("couponTag.platinum");
		expect(platinumTag).toBeInTheDocument();
	});

	it("should render coupon points", async () => {
		render(<LifestyleCouponCard coupon={coupon} />);

		const couponPoints = screen.getByTestId("coupon-points");
		expect(couponPoints).toBeInTheDocument();
	});
});
