import PlatinumView from "./index";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../components/Text";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("PlatinumView", () => {
	it("should render without errors", () => {
		render(<PlatinumView />);
	});

	it("should have the platinum gift,birthday,purchase,redeem title & description and platinum point text", async () => {
		render(<PlatinumView />);

		const giftTitle = screen.queryByText(
			"membershipPage.platinumView.gift"
		);
		expect(giftTitle).toBeInTheDocument();

		const giftDescription = screen.queryByText(
			"membershipPage.platinumView.giftDescription"
		);
		expect(giftDescription).toBeInTheDocument();

		const birthdayTitle = screen.queryByText(
			"membershipPage.platinumView.platinumBirthdayMonth"
		);
		expect(birthdayTitle).toBeInTheDocument();

		const birthdayDescription = screen.queryByText(
			"membershipPage.platinumView.platinumBirthdayDescription"
		);
		expect(birthdayDescription).toBeInTheDocument();

		const purchaseTitle = screen.queryByText(
			"membershipPage.platinumView.platinumPurchase"
		);
		expect(purchaseTitle).toBeInTheDocument();

		const purchaseDescription = screen.queryByText(
			"membershipPage.platinumView.platinumPurchaseDescription"
		);
		expect(purchaseDescription).toBeInTheDocument();

		const redeemTitle = screen.queryByText(
			"membershipPage.platinumView.platinumRedeem"
		);
		expect(redeemTitle).toBeInTheDocument();

		const redeemDescription = screen.queryByText(
			"membershipPage.platinumView.platinumRedeemDescription"
		);
		expect(redeemDescription).toBeInTheDocument();

		const platinumPointsText = screen.queryByText(
			"membershipPage.platinumView.points"
		);
		expect(platinumPointsText).toBeInTheDocument();
	});

	it("should render 8 platinum's screen images", () => {
		render(<PlatinumView />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(8);
	});
});
