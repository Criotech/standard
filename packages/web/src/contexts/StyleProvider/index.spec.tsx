import { render, screen } from "@testing-library/react";
import StyleProvider from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useWideScreen } from "../../hooks/useWideScreen";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("./EnglishFontFamilies", () => ({
	__esModule: true,
	default: () => <>english-font-families</>,
}));

jest.mock("./ChineseFontFamilies", () => ({
	__esModule: true,
	default: () => <>chinese-font-families</>,
}));

jest.mock("../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		fontFamilySet: ConfigService.FontFamilySet.English,
	});

	(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: false });
});

describe("StyleProvider", () => {
	it("should render EnglishFontFamilies when fontFamilySet is English", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			fontFamilySet: ConfigService.FontFamilySet.English,
		});

		render(<StyleProvider />);

		const englishFontFamilies = await screen.findByText(
			"english-font-families"
		);
		expect(englishFontFamilies).toBeInTheDocument();
	});

	it("should render ChineseFontFamilies when fontFamilySet is Chinese", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			fontFamilySet: ConfigService.FontFamilySet.Chinese,
		});

		render(<StyleProvider />);

		const chineseFontFamilies = await screen.findByText(
			"chinese-font-families"
		);
		expect(chineseFontFamilies).toBeInTheDocument();
	});

	it("should have class wide-screen when it is wide screen", async () => {
		(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: true });

		const { container } = render(<StyleProvider />);

		expect(container.firstChild).toHaveClass("wide-screen");
	});

	it("should NOT have class wide-screen when it is NOT wide screen", async () => {
		(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: false });

		const { container } = render(<StyleProvider />);

		expect(container.firstChild).not.toHaveClass("wide-screen");
	});
});
