import { Language, TranslationType } from "./types";
import {
	render,
	getLanguageNames,
	getDefaultLanguage,
	getTranslation,
} from "./index";
import { mocked } from "ts-jest/utils";
import { getConfig, Instance } from "../ConfigService";
import WindowService from "../WindowService";

jest.mock("../ConfigService", () => ({
	Instance: jest.requireActual("../ConfigService").Instance,
	getConfig: jest.fn(),
}));

jest.mock("../WindowService", () => ({
	getLanguage: jest.fn(),
}));

beforeEach(() => {
	(getConfig as jest.Mock).mockReturnValue({
		forcedDefaultLanguage: Language.EN,
		supportedLanguages: [Language.EN],
	});
	mocked(WindowService.getLanguage).mockReturnValue("en");
});

describe("render", () => {
	it("should render text without errors", () => {
		const result = render("text ${value}", { value: "fakeValue" });

		expect(result).toEqual("text fakeValue");
	});
});

describe("getLanguageNames", () => {
	it("should provide language names", () => {
		let expectedLanguages = {
			en: "English",
			th: "ไทย",
			zh: "华人",
		};

		const languages = getLanguageNames();

		expect(languages).toEqual(expectedLanguages);
	});
});

describe("getDefaultLanguage", () => {
	it("should provide forcedDefaultLanguage", () => {
		(getConfig as jest.Mock).mockReturnValue({
			forcedDefaultLanguage: Language.ZH,
			supportedLanguages: [Language.TH, Language.EN, Language.ZH],
		});
		mocked(WindowService.getLanguage).mockReturnValue("en");

		const language = getDefaultLanguage();

		expect(language).toEqual(Language.ZH);
	});

	it("should provide supportedBrowserLanguage", () => {
		(getConfig as jest.Mock).mockReturnValue({
			supportedLanguages: [Language.TH, Language.EN, Language.ZH],
		});
		mocked(WindowService.getLanguage).mockReturnValue("th");

		const language = getDefaultLanguage();

		expect(language).toEqual(Language.TH);
	});

	it("should provide supportedLanguages", () => {
		(getConfig as jest.Mock).mockReturnValue({
			supportedLanguages: [Language.EN, Language.ZH],
		});
		mocked(WindowService.getLanguage).mockReturnValue("th");

		const language = getDefaultLanguage();

		expect(language).toEqual(Language.EN);
	});

	it("should provide Language.EN if config not provided", () => {
		(getConfig as jest.Mock).mockReturnValue(undefined);
		mocked(WindowService.getLanguage).mockReturnValue("th");

		const language = getDefaultLanguage();

		expect(language).toEqual(Language.EN);
	});
});

describe("getTranslation", () => {
	it("should provide base translation for EN default in MY instance", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.EN,
			Instance.MY
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"joinNowPage.mobileNumberRegistration.countryCode": "+60",
			})
		);
	});

	it("should provide base translation for default: EN", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.EN,
			Instance.AU
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide base translation for EN default in SG instance", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.EN,
			Instance.SG
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide base translation for default: TH", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.TH,
			Instance.TH
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome":
					"ยินดีต้อนรับเข้าสู่ MyACUVUE™",
			})
		);
	});

	it("should provide base translation for liteTheme: SG", async () => {
		const translation = await getTranslation(
			TranslationType.liteTheme,
			Language.EN,
			Instance.SG
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"footer.links.importantSafetyInformation":
					"Product Exchange Policy",
			})
		);
	});

	it("should provide base translation for default: ZH", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.ZH,
			Instance.TW
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide base translation for default: HK", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.ZH,
			Instance.HK
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide base translation for EN default in NZ", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.EN,
			Instance.NZ
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide override translation for default: IN", async () => {
		const translation = await getTranslation(
			TranslationType.default,
			Language.EN,
			Instance.IN
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"phoneRegistrationPage.welcome": "Welcome to MyACUVUE™",
			})
		);
	});

	it("should provide base translation for updatePrompt: EN", async () => {
		const translation = await getTranslation(
			TranslationType.updatePrompt,
			Language.EN,
			Instance.AU
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"updatePrompt.newVersion": "New version Available!",
			})
		);
	});

	it("should provide base translation for updatePrompt: TH", async () => {
		const translation = await getTranslation(
			TranslationType.updatePrompt,
			Language.TH,
			Instance.TH
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"updatePrompt.newVersion": "New version Available!",
			})
		);
	});

	it("should provide base translation for updatePrompt: ZH", async () => {
		const translation = await getTranslation(
			TranslationType.updatePrompt,
			Language.ZH,
			Instance.HK
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"updatePrompt.newVersion": "New version Available!",
			})
		);
	});

	it("should provide base translation for lightTheme: EN", async () => {
		const translation = await getTranslation(
			TranslationType.liteTheme,
			Language.EN,
			Instance.AU
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"footer.links.about": "About",
			})
		);
	});

	it("should provide override translation for lightTheme: IN", async () => {
		const translation = await getTranslation(
			TranslationType.liteTheme,
			Language.EN,
			Instance.IN
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"footer.links.about": "About",
			})
		);
	});

	it("should provide base translation for lightTheme: ZH", async () => {
		const translation = await getTranslation(
			TranslationType.liteTheme,
			Language.ZH,
			Instance.HK
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"footer.links.about": "關於我們",
			})
		);
	});

	it("should provide base translation for lightTheme: TW", async () => {
		const translation = await getTranslation(
			TranslationType.liteTheme,
			Language.ZH,
			Instance.TW
		);
		expect(translation).toEqual(
			expect.objectContaining({
				"footer.links.about": "關於",
			})
		);
	});
});
