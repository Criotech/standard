import { TranslationKey } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import VerticalCoupon, { IProps } from ".";
import Text from "../Text";
import { ComponentProps } from "react";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

const coupon: IProps = {
	image: "https://cdn.britannica.com/22/206222-050-3F741817/Domestic-feline-tabby-cat.jpg",
	title: "฿100 E-Coupon",
	subTitle: "MK Restaurant",
	button: <button>REDEEM COUPON</button>,
	validity: "2021-09-20",
	value: "100",
	tags: ["couponTag.platinum"],
};

describe("VerticalCoupon", () => {
	it("should render without errors", () => {
		render(
			<VerticalCoupon
				image={coupon.image}
				value={coupon.value}
				title={coupon.title}
				subTitle={coupon.subTitle}
				button={coupon.button}
				validity={coupon.validity}
			/>
		);
	});

	it("should render redeem button", () => {
		render(
			<VerticalCoupon
				image={coupon.image}
				value={coupon.value}
				title={coupon.title}
				subTitle={coupon.subTitle}
				button={coupon.button}
				validity={coupon.validity}
			/>
		);

		const redeemButton = screen.getByRole("button");
		expect(redeemButton).toBeInTheDocument();
	});

	it("should render coupon image, title, subTitle", () => {
		render(
			<VerticalCoupon
				image={coupon.image}
				value={coupon.value}
				title={coupon.title}
				subTitle={coupon.subTitle}
				button={coupon.button}
				validity={coupon.validity}
				tags={coupon.tags as TranslationKey[]}
			/>
		);

		const couponImage = screen.getByRole("img");
		expect(couponImage).toHaveAttribute("src", coupon.image);

		const couponTitle = screen.getByText(coupon.title);
		expect(couponTitle).toBeInTheDocument();

		const couponSubTtile = screen.getByText(coupon.subTitle);
		expect(couponSubTtile).toBeInTheDocument();

		const couponBonus = screen.getByText("100");
		expect(couponBonus).toBeInTheDocument();
	});

	it("should render coupon tags", () => {
		render(
			<VerticalCoupon
				image={coupon.image}
				value={coupon.value}
				title={coupon.title}
				subTitle={coupon.subTitle}
				button={coupon.button}
				validity={coupon.validity}
				tags={coupon.tags}
			/>
		);

		const firstTag = screen.getByText(coupon.tags![0]);
		expect(firstTag).toBeInTheDocument();
	});
});
