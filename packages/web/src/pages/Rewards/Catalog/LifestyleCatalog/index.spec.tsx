import LifestyleCatalog from "./index";
import { act, render, waitFor } from "@testing-library/react";
import { useCoupon } from "../../../../hooks/useCoupon";
import { ILifestyleCoupon } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import Carousel from "../../../../components/Carousel";
import { Link } from "react-router-dom";

jest.mock("../../../../hooks/useCoupon");

jest.mock("../../LifestyleCouponCard", () => ({
	__esModule: true,
	default: () => <div data-testid="lifestyle-coupon-card" />,
}));

jest.mock("../../../../components/Carousel", () => ({
	__esModule: true,
	default: ({ children }: ComponentProps<typeof Carousel>) => (
		<div data-testid="carousel-test-id">{children}</div>
	),
}));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ children, to }: ComponentProps<typeof Link>) => (
		<>
			<div data-testid="link">{children}</div>
			<div data-testid="link-to-pathname">{(to as any).pathname}</div>
		</>
	),
}));

jest.mock("../../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

const fakeLifestyleCoupons: ILifestyleCoupon[] = [
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "hot",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "7v894576e4n0bn7",
		imageUrl:
			"https://jnj-global-test.apigee.net/v2/global/myacuvue/attachment/00PN000000DbVLCMA3?apikey=np0GnCG4BnuqQA0H73WtEscUbFOayUHI",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "2021-02-01",
			to: "2021-03-01",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "new",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "7v894576e4n0bn7",
		imageUrl:
			"https://jnj-global-test.apigee.net/v2/global/myacuvue/attachment/00PN000000DbVLCMA3?apikey=np0GnCG4BnuqQA0H73WtEscUbFOayUHI",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "2021-02-01",
			to: "2021-03-01",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
];

describe("LifestyleCatalog", () => {
	beforeEach(() => {
		(useCoupon as jest.Mock).mockReturnValue({
			getLifestyleCoupons: jest
				.fn()
				.mockResolvedValue(fakeLifestyleCoupons),
		});
	});

	it("should render without errors", async () => {
		await act(async () => {
			render(<LifestyleCatalog />);
		});
	});

	it("should call getLifestyleCoupons", async () => {
		await act(async () => {
			render(<LifestyleCatalog />);
		});

		const { getLifestyleCoupons } = useCoupon();
		await waitFor(() => expect(getLifestyleCoupons).toHaveBeenCalled());
	});
});
