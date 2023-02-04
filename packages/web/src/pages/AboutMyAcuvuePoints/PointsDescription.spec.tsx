import PointsDescription from "./PointsDescription";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import { mocked } from "ts-jest/utils";

jest.mock("../../hooks/useTranslation", () => ({ useText: jest.fn() }));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("PointsDescription", () => {
	it("should render without errors", () => {
		render(<PointsDescription />);
	});

	it("should render 2 images", () => {
		render(<PointsDescription />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(2);
	});

	it("should render acuvue logo and payment icon", () => {
		render(<PointsDescription />);

		const acuvueLogo = screen.getAllByRole("img")[0];
		expect(acuvueLogo).toHaveAttribute("src", "acuvue-logo-icon.svg");

		const paymentIcon = screen.getAllByRole("img")[1];
		expect(paymentIcon).toHaveAttribute("src", "payment-icon.svg");
	});

	it("should render a button", () => {
		render(<PointsDescription />);
		expect(screen.getByRole("button")).toBeVisible();
	});

	it("should trigger onclick callback when member-benefits-button is clicked", async () => {
		render(<PointsDescription />);

		const viewMemberBenefitsButton = await screen.findByText(
			"aboutPointsPage.pointsDescription.viewMemberBenefits"
		);
		viewMemberBenefitsButton.click();
		expect(useNavigate()).toHaveBeenCalledWith("/membership");
	});
});
