import MemberView from "./index";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../../components/Text";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("MemberView", () => {
	it("should render without errors", () => {
		render(<MemberView />);
	});

	it("should have the member gift,birthday,purchase,redeem title & description text", async () => {
		render(<MemberView />);

		const giftTitle = screen.queryByText(
			"membershipPage.memberView.memberGift"
		);
		expect(giftTitle).toBeInTheDocument();

		const giftDescription = screen.queryByText(
			"membershipPage.memberView.memberGiftDescription"
		);
		expect(giftDescription).toBeInTheDocument();

		const birthdayTitle = screen.queryByText(
			"membershipPage.memberView.memberBirthdayMonth"
		);
		expect(birthdayTitle).toBeInTheDocument();

		const birthdayDescription = screen.queryByText(
			"membershipPage.memberView.memberBirthdayDescription"
		);
		expect(birthdayDescription).toBeInTheDocument();

		const purchaseTitle = screen.queryByText(
			"membershipPage.memberView.memberPurchase"
		);
		expect(purchaseTitle).toBeInTheDocument();

		const purchaseDescription = screen.queryByText(
			"membershipPage.memberView.memberPurchaseDescription"
		);
		expect(purchaseDescription).toBeInTheDocument();

		const redeemTitle = screen.queryByText(
			"membershipPage.memberView.memberRedeem"
		);
		expect(redeemTitle).toBeInTheDocument();

		const redeemDescription = screen.queryByText(
			"membershipPage.memberView.memberRedeemDescription"
		);
		expect(redeemDescription).toBeInTheDocument();
	});

	it("should render 7 member's screen images", () => {
		render(<MemberView />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(7);
	});
});
