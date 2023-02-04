import FeatureSwitchService, { flushFeatureSwitchPromise } from "./index";
import { getConfig } from "../ConfigService";

import axios from "axios";
import { HttpStatus } from "../HTTPService/HttpStatus";
jest.mock("axios", () => ({
	get: jest.fn(),
}));

jest.mock("../WindowService", () => ({
	addItemToLocalStorage: jest.fn(),
	getItemFromLocalStorage: jest.fn(),
}));

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn(),
}));

beforeEach(() => {
	flushFeatureSwitchPromise();
	(getConfig as jest.Mock).mockReturnValue({
		featureSwitchUrl: "https://fake-url/feature-switch",
		instance: "scdf",
		APIEnvironment: "development",
	});
});

describe("Feature Switch Service", () => {
	it("should return feature value", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			featureSwitchUrl: "https://fake-url/feature-switch",
			instance: "fakeInstance",
			APIEnvironment: "fakeEnv",
		});

		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				addressFormType: {
					default: "default-value",
					variations: [],
				},
			},
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"addressFormType"
		);

		expect(result).toBe("default-value");
	});

	it("should return feature value", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			featureSwitchUrl: "https://fake-url/feature-switch",
			instance: "fakeInstance",
			APIEnvironment: "fakeEnv",
		});

		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				addressFormType: {
					default: "default-value",
					variations: [
						{
							demographics: [
								{
									environment: "fakeEnv",
									instance: "fakeInstance",
								},
							],
							configuration: "variation1-value",
						},
					],
				},
			},
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"addressFormType"
		);

		expect(result).toBe("variation1-value");
	});

	it("should return GreetingsBlock featuredConfig as undefined when it errors", async () => {
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		(axios.get as jest.Mock).mockRejectedValue(anyOtherError);

		const result = await FeatureSwitchService.getFeatureSwitch(
			"greetingsBlock"
		);

		expect(result).toBe(undefined);
	});

	it("should return GreetingsBlock featuredConfig", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			featureSwitchUrl: "https://fake-url/feature-switch",
			instance: "scdf",
			APIEnvironment: "development",
		});

		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				greetingsBlock: {
					default: "DISABLED",
					variations: [
						{
							demographics: [
								{
									environment: "development",
									instance: "scdf",
								},
							],
							configuration: "ENABLED",
						},
					],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"greetingsBlock"
		);

		expect(result).toBe("ENABLED");
	});

	it("should return NavigateToCanvasOnSingOut featuredConfig DISABLED", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				navigateToCanvasOnSignOut: {
					default: "DISABLED",
					variations: [],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"navigateToCanvasOnSignOut"
		);

		expect(result).toBe("DISABLED");
	});

	it("should return TermsAndConditionsFooterAU featuredConfig DISABLED", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				displayTermsAndConditionsFooterAU: {
					default: "DISABLED",
					variations: [],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"displayTermsAndConditionsFooterAU"
		);

		expect(result).toBe("DISABLED");
	});

	it("should return AboutSustainabilityFooterAU featuredConfig DISABLED", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				displayAboutSustainabilityFooterAU: {
					default: "DISABLED",
					variations: [],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"displayAboutSustainabilityFooterAU"
		);

		expect(result).toBe("DISABLED");
	});

	it("should return MedicalPatientInstructionGuideFooterAU featuredConfig DISABLED", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				displayMedicalPatientInstructionGuideFooterAU: {
					default: "DISABLED",
					variations: [],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"displayMedicalPatientInstructionGuideFooterAU"
		);

		expect(result).toBe("DISABLED");
	});

	it("should return NavigateToSignInOnResetPassword featuredConfig DISABLED", async () => {
		(axios.get as jest.Mock).mockResolvedValue({
			data: {
				navigateToSignInOnResetPassword: {
					default: "DISABLED",
					variations: [],
				},
			},
			status: HttpStatus.OK,
			headers: undefined,
		});

		const result = await FeatureSwitchService.getFeatureSwitch(
			"navigateToSignInOnResetPassword"
		);

		expect(result).toBe("DISABLED");
	});

	it("should return DisplayAllMapPinsInSameColor featuredConfig as undefined when it errors", async () => {
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		(axios.get as jest.Mock).mockRejectedValue(anyOtherError);

		const result = await FeatureSwitchService.getFeatureSwitch(
			"displayAllMapPinsInSameColor"
		);

		expect(result).toBe(undefined);
	});

	it("should return SortAlphabeticallyStoresZones featuredConfig as undefined when it errors", async () => {
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		(axios.get as jest.Mock).mockRejectedValue(anyOtherError);

		const result = await FeatureSwitchService.getFeatureSwitch(
			"sortAlphabeticallyStoresZones"
		);

		expect(result).toBe(undefined);
	});
});
