import { render, screen } from "@testing-library/react";
import HorizontalCoupon from ".";

const coupon = {
	imageUrl: "https://www.example.com/1.jpg",
	title: "Fake coupon name",
	description: "Fake description",
	bonus: <span>100 POINTS</span>,
	icons: [<div data-testid="icon-1" />, <div data-testid="icon-2" />],
	faded: false,
};

describe("HorizontalCoupon", () => {
	it("should render without errors", () => {
		render(
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={coupon.description}
				bonus={coupon.bonus}
				icons={coupon.icons}
				faded={coupon.faded}
			/>
		);
	});

	it("should render coupon image, title, description and bonus details", () => {
		render(
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={coupon.description}
				bonus={coupon.bonus}
				icons={coupon.icons}
				faded={coupon.faded}
			/>
		);

		const couponImage = screen.getByRole("img");
		expect(couponImage).toHaveAttribute(
			"src",
			"https://www.example.com/1.jpg"
		);

		const couponTitle = screen.getByText(coupon.title);
		expect(couponTitle).toBeInTheDocument();

		const couponDescription = screen.getByText(coupon.description);
		expect(couponDescription).toBeInTheDocument();

		const couponBonus = screen.getByText("100 POINTS");
		expect(couponBonus).toBeInTheDocument();
	});

	it("should render icons", () => {
		render(
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={coupon.description}
				bonus={coupon.bonus}
				icons={coupon.icons}
				faded={coupon.faded}
			/>
		);

		const icon1 = screen.getByTestId("icon-1");
		expect(icon1).toBeInTheDocument();

		const icon2 = screen.getByTestId("icon-2");
		expect(icon2).toBeInTheDocument();
	});

	it("should render faded class if faded is true", () => {
		const coupon = {
			imageUrl: "https://www.example.com/1.jpg",
			title: "Fake coupon name",
			description: "Fake description",
			bonus: <span>100 POINTS</span>,
			icons: [<div data-testid="icon-1" />, <div data-testid="icon-2" />],
			faded: true,
		};
		const { container } = render(
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={coupon.description}
				bonus={coupon.bonus}
				icons={coupon.icons}
				faded={coupon.faded}
			/>
		);

		expect(container.firstChild).toHaveClass("faded");
	});

	it("should not render faded class if faded is false", () => {
		const { container } = render(
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={coupon.description}
				bonus={coupon.bonus}
				icons={coupon.icons}
				faded={coupon.faded}
			/>
		);

		expect(container.firstChild).not.toHaveClass("faded");
	});
});
