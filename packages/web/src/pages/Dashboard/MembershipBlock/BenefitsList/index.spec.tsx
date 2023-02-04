import { TranslationKey } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import BenefitsList from ".";
import Text from "../../../../components/Text";
import { ComponentProps } from "react";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("BenefitsList", () => {
	it("should render without errors", () => {
		render(
			<BenefitsList
				benefitsKeys={[]}
				benefitsHeadingKey="membershipPage.platinumBenefits"
			/>
		);
	});

	it("should render benefits heading key", () => {
		render(
			<BenefitsList
				benefitsKeys={[]}
				benefitsHeadingKey="membershipPage.platinumBenefits"
			/>
		);

		const benefitsHeadingKey = screen.getByText(
			"membershipPage.platinumBenefits"
		);
		expect(benefitsHeadingKey).toBeInTheDocument();
	});

	it("should render benefits list", () => {
		render(
			<BenefitsList
				benefitsKeys={["membershipPage.platinumView.platinumPurchase"]}
				benefitsHeadingKey="membershipPage.platinumBenefits"
			/>
		);

		const benefitsKeys = screen.getByRole("list");
		expect(benefitsKeys).toBeInTheDocument();
		expect(benefitsKeys).toHaveClass("benefits-list");
	});

	it("should render benefits list items", () => {
		const fakeBenefitsKeys: TranslationKey[] = [
			"membershipPage.platinumView.platinumPurchase",
			"membershipPage.platinumView.platinumBirthdayMonth",
		];

		render(
			<BenefitsList
				benefitsKeys={fakeBenefitsKeys}
				benefitsHeadingKey="membershipPage.platinumBenefits"
			/>
		);

		const benefitsListItems = screen.getAllByRole("listitem");
		expect(benefitsListItems).toHaveLength(2);
		expect(benefitsListItems[0]).toHaveTextContent(fakeBenefitsKeys[0]);
		expect(benefitsListItems[1]).toHaveTextContent(fakeBenefitsKeys[1]);
	});
});
