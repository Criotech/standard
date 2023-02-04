import { render } from "@testing-library/react";
import PromotionsAndEvents from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { mocked } from "ts-jest/utils";

jest.mock("../../hooks/useConfiguration");

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <></>,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <></>,
}));

beforeEach(() => {
	mocked(useConfiguration).mockReturnValue({
		promoEventsIFrameUrl: "https://example.com/",
	} as ReturnType<typeof useConfiguration>);
});

describe("PromotionsAndEvents", () => {
	it("should render without errors", () => {
		render(<PromotionsAndEvents />);
	});

	it("should have Iframe visible with URL", () => {
		const { container } = render(<PromotionsAndEvents />);
		const iframe = container.querySelector("iframe");
		const iframeURL = iframe?.src;

		expect(iframe).toBeVisible();
		expect(iframe).toHaveAttribute("src");
		expect(iframeURL).toStrictEqual("https://example.com/");
	});
});
