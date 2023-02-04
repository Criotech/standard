import LegalPoliciesService from "./index";
import { HTTPService, Language } from "../index";

const {
	getTermsAndConditions,
	getPrivacyPolicy,
	acceptLegalTerms,
	getPointsTermsAndConditions,
} = LegalPoliciesService;

jest.mock("./points-terms-condition-en.json", () => ({
	html: "terms in English",
}));

jest.mock("./points-terms-condition-th.json", () => ({
	html: "terms in Thai",
}));

jest.mock("../index", () => ({
	HTTPService: {
		get: jest.fn(),
		post: jest.fn(),
	},
	Language: {
		EN: "en",
		TH: "th",
		ZH: "zh",
	},
}));

const fakeRegion = "THA";
const fakeSessionToken = "session-token";

describe("getTermsAndConditions", () => {
	it("should call get with correct url and return", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { html: "terms and conditions html" },
		});

		const response = await getTermsAndConditions("lang-code");

		expect(response).toStrictEqual("terms and conditions html");
		expect(HTTPService.get).toHaveBeenCalledWith(
			"terms-and-conditions?language=lang-code"
		);
	});
});

describe("getPrivacyPolicy", () => {
	it("should call get with correct url and return", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { html: "privacy policy html" },
		});

		const response = await getPrivacyPolicy("lang-code");

		expect(response).toStrictEqual("privacy policy html");
		expect(HTTPService.get).toHaveBeenCalledWith(
			"terms-and-conditions?language=lang-code"
		);
	});
});

describe("acceptLegalTerms", () => {
	it("should call get with correct url and return", async () => {
		await acceptLegalTerms("device token");

		expect(HTTPService.post).toHaveBeenCalledWith(
			"accept-legal-terms",
			{ deviceId: "LINE:{{lineid}}" },
			"device token"
		);
	});
});

describe("getPointsTermsAndConditions", () => {
	it("should return English text if language is English", async () => {
		const fakeLanguage = Language.EN;

		const response = await getPointsTermsAndConditions(
			fakeLanguage,
			fakeRegion,
			fakeSessionToken
		);
		expect(response).toEqual("terms in English");
	});

	it("should return Thai text if language is Thai", async () => {
		const fakeLanguage = Language.TH;

		const response = await getPointsTermsAndConditions(
			fakeLanguage,
			fakeRegion,
			fakeSessionToken
		);
		expect(response).toEqual("terms in Thai");
	});
});
