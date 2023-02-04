import { render, screen, act, waitFor } from "@testing-library/react";
import Footer from ".";
import { useWideScreen } from "../../hooks/useWideScreen";
import { useConfiguration } from "../../hooks/useConfiguration";
import { ComponentProps } from "react";
import LegalFootnote from "./LegalFootnote";
import LinksAccordion from "./LinksAccordion";
import LinksSection from "./LinksSection";
import SocialMedia from "./SocialMedia";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import DisclaimerSection from "./DisclaimerSection";
import { ConfigService } from "@myacuvue_thailand_web/services";

jest.mock("../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("./LegalFootnote", () => ({
	__esModule: true,
	default: ({ htmlContent }: ComponentProps<typeof LegalFootnote>) => (
		<div data-testid="legal-footnote">{htmlContent}</div>
	),
}));

jest.mock("./DisclaimerSection", () => ({
	__esModule: true,
	default: ({ htmlContent }: ComponentProps<typeof DisclaimerSection>) => (
		<div data-testid="disclaimer-section">{htmlContent}</div>
	),
}));

jest.mock("./LinksAccordion", () => ({
	__esModule: true,
	default: ({ data }: ComponentProps<typeof LinksAccordion>) => (
		<div data-testid="links-accordion">{JSON.stringify(data)}</div>
	),
}));

jest.mock("./LinksSection", () => ({
	__esModule: true,
	default: ({ data }: ComponentProps<typeof LinksSection>) => (
		<div data-testid="links-section">{JSON.stringify(data)}</div>
	),
}));

jest.mock("./SocialMedia", () => ({
	__esModule: true,
	default: ({ socialNetworks }: ComponentProps<typeof SocialMedia>) => (
		<div data-testid="social-media">{JSON.stringify(socialNetworks)}</div>
	),
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useText", () => ({ useText: jest.fn() }));

const fakeFooterMenu = [
	{
		title: "footer.links.about",
		items: [
			{
				name: "footer.links.aboutAcuvue",
				url: "https://www.acuvue.com.au/about",
			},
			{
				name: "footer.links.careers",
				url: "https://www.careers.jnj.com/",
			},
		],
	},
	{ items: [] },
	{ items: [] },
	{ items: [] },
	{ items: [] },
];

jest.mock("../../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

describe("Footer", () => {
	beforeEach(() => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		(useConfiguration as jest.Mock).mockReturnValue({
			footerMenu: fakeFooterMenu,
			socialNetworks: [],
		});

		(useFeatureSwitch as jest.Mock).mockReturnValue(["ENABLED", true]);
	});

	it("should render without errors", async () => {
		await act(async () => {
			render(<Footer />);
		});
	});

	it("should render SocialMedia when social networks are not empty", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [
				{
					icon: <div>icon-1</div>,
					link: "https://jnj.com/1",
				},
				{
					icon: <div>icon-2</div>,
					link: "https://jnj.com/2",
				},
			],
			footerMenu: fakeFooterMenu,
		});

		await act(async () => {
			render(<Footer />);
		});

		const socialMedia = screen.getByTestId("social-media");
		expect(socialMedia).toBeInTheDocument();
		expect(socialMedia).toHaveTextContent("icon-1");
		expect(socialMedia).toHaveTextContent("https://jnj.com/1");
		expect(socialMedia).toHaveTextContent("icon-2");
		expect(socialMedia).toHaveTextContent("https://jnj.com/2");
	});

	it("should not render SocialMedia when social networks are empty", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
		});

		await act(async () => {
			render(<Footer />);
		});

		const socialMedia = screen.queryByTestId("social-media");
		expect(socialMedia).not.toBeInTheDocument();
	});

	it("should render LinksAccordion with correct data in mobile screen", async () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		await act(async () => {
			render(<Footer />);
		});

		const linksAccordion = screen.queryByTestId("links-accordion");
		expect(linksAccordion).toBeInTheDocument();
		expect(linksAccordion).toHaveTextContent("footer.links.about");
		expect(linksAccordion).toHaveTextContent("footer.links.aboutAcuvue");
		expect(linksAccordion).toHaveTextContent("footer.links.careers");
	});

	it("should render LinksSection with correct data in wide screen", async () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const linksSection = screen.queryByTestId("links-section");
		expect(linksSection).toBeInTheDocument();
		expect(linksSection).toHaveTextContent("footer.links.about");
		expect(linksSection).toHaveTextContent("footer.links.aboutAcuvue");
		expect(linksSection).toHaveTextContent("footer.links.careers");
	});

	it("should render LegalFootnote component with correct data", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
		});

		await act(async () => {
			render(<Footer />);
		});

		const legalFootnote = screen.getByTestId("legal-footnote");
		expect(legalFootnote).toBeInTheDocument();
	});

	it("should render Disclaimer text when hasDisclaimerText is true", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const disclaimerSection = screen.getByTestId("disclaimer-section");
		expect(disclaimerSection).toBeInTheDocument();
	});

	it("should render additionalInfo for MY instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.MY,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeInTheDocument();
		expect(codeOfEthicsLogoLink).toHaveAttribute(
			"href",
			"https://www.advamed.org"
		);
	});

	it("should not render additionalInfo for TH instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.TH,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for AU instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.AU,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for TW instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.TW,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for HK instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.HK,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for SG instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.SG,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for NZ instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.NZ,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should not render additionalInfo for IN instance", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: fakeFooterMenu,
			hasDisclaimerText: true,
			instance: ConfigService.Instance.IN,
			hasAdditionalInformationInSocialMedia: true,
		});

		await act(async () => {
			render(<Footer />);
		});

		const codeOfEthicsLogoLink = screen.queryAllByRole("link")[0];
		expect(codeOfEthicsLogoLink).toBeUndefined();
	});

	it("should remove sustainability(in index 2) from about in footer when feature is enabled for AU", async () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			socialNetworks: [],
			footerMenu: [
				{
					title: "footer.links.about",
					items: [
						{
							name: "footer.links.aboutAcuvue",
							url: "https://www.acuvue.com.au/about",
						},
						{
							name: "footer.links.careers",
							url: "https://www.careers.jnj.com/",
						},
						{
							name: "footer.links.sustainability",
							url: "https://www.acuvue.com.au/sustainability",
						},
					],
				},
				{ items: [] },
				{ items: [] },
				{ items: [] },
				{ items: [] },
			],
			hasDisclaimerText: true,
			instance: "scdf",
		});

		(useFeatureSwitch as jest.Mock).mockImplementation(
			(featureName: string) => {
				return {
					addressFormType: "ENABLED",
					greetingsBlock: "ENABLED",
					navigateToCanvasOnSignOut: "ENABLED",
					navigateToSignInOnResetPassword: "ENABLED",
					sortAlphabeticallyStoresZones: "ENABLED",
					displayMedicalPatientInstructionGuideFooterAU: "DISABLED",
					displayTermsAndConditionsFooterAU: "ENABLED",
					displayAboutSustainabilityFooterAU: "DISABLED",
					displayAllMapPinsInSameColor: "ENABLED",
				}[featureName];
			}
		);

		await act(async () => {
			render(<Footer />);
		});

		const disclaimerSection = screen.getByTestId("links-accordion");
		await waitFor(() =>
			expect(disclaimerSection).toHaveTextContent(
				JSON.stringify([
					{
						title: "footer.links.about",
						items: [
							{
								name: "footer.links.aboutAcuvue",
								url: "https://www.acuvue.com.au/about",
							},
							{
								name: "footer.links.careers",
								url: "https://www.careers.jnj.com/",
							},
							{
								name: "footer.links.sustainability",
								url: "https://www.acuvue.com.au/sustainability",
							},
						],
					},
					{ items: [] },
					{ items: [] },
					{ items: [] },
					{ items: [] },
				])
			)
		);
	});
});
