import { render, screen } from "@testing-library/react";
import CouponPoints from ".";
import { ComponentProps } from "react";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("CouponPoints", () => {
	it("should render without errors", () => {
		render(<CouponPoints value="100" />);
	});

	it("should render Text component", () => {
		render(<CouponPoints value="100" />);
		const text = screen.queryByText("couponDetails.points");
		expect(text).toBeInTheDocument();
	});

	it("should render coupon value", () => {
		render(<CouponPoints value="100" />);
		const couponValue = screen.queryByText("100");
		expect(couponValue).toBeInTheDocument();
	});
});
