import AcuvueCatalog from "./index";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useCoupon } from "../../../../hooks/useCoupon";
import { IAcuvueCoupon } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { Link } from "react-router-dom";

jest.mock("../../../../hooks/useCoupon");

jest.mock("../../AcuvueCouponCard", () => ({
	__esModule: true,
	default: () => <div data-testid="acuvue-coupon-card" />,
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

const fakeAcuvueCoupons: IAcuvueCoupon[] = [
	{
		id: "some-random-id-1",
		imageUrl: "fakeImage",
		title: "$fakeTitle",
		points: 50,
		validPeriod: {
			from: "fakeDate",
			to: "fakeDate",
		},
		terms: "fakeTerms",
		type: "acuvue",
		subType: "other",
		isEligibleForHomeDelivery: true,
		isEligibleForInStore: true,
		bonusMultiplier: null,
		absoluteCashDiscount: 0,
	},
	{
		id: "some-random-id-2",
		imageUrl: "fakeImage",
		title: "$fakeTitle",
		points: 50,
		validPeriod: {
			from: "fakeDate",
			to: "fakeDate",
		},
		terms: "fakeTerms",
		type: "acuvue",
		subType: "other",
		isEligibleForHomeDelivery: true,
		isEligibleForInStore: true,
		bonusMultiplier: null,
		absoluteCashDiscount: 0,
	},
];

describe("AcuvueCatalog", () => {
	beforeEach(() => {
		(useCoupon as jest.Mock).mockReturnValue({
			getAcuvueCoupons: jest.fn().mockResolvedValue(fakeAcuvueCoupons),
		});
	});
	it("should render without errors", async () => {
		await act(async () => {
			render(<AcuvueCatalog />);
		});
	});

	it("should call getAcuvueCoupons", async () => {
		await act(async () => {
			render(<AcuvueCatalog />);
		});

		const { getAcuvueCoupons } = useCoupon();
		await waitFor(() => expect(getAcuvueCoupons).toHaveBeenCalled());
	});

	it("should render Link with props", async () => {
		await act(async () => {
			render(<AcuvueCatalog />);
		});

		const { getAcuvueCoupons } = useCoupon();
		await waitFor(() => expect(getAcuvueCoupons).toHaveBeenCalled());

		const link = screen.getAllByTestId("link");
		expect(link).toHaveLength(2);
		expect(link[0]).toBeInTheDocument();
		expect(link[1]).toBeInTheDocument();

		const linkToPathname = screen.getAllByTestId("link-to-pathname");
		expect(linkToPathname[0]).toBeInTheDocument();
		expect(linkToPathname[0]).toHaveTextContent(
			"/catalog/some-random-id-1"
		);
		expect(linkToPathname[1]).toBeInTheDocument();
		expect(linkToPathname[1]).toHaveTextContent(
			"/catalog/some-random-id-2"
		);
	});
});
