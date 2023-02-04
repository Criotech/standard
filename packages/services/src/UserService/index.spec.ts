import UserService from ".";
import { Gender, ProfileCompleteness } from "../index";
import {
	HTTPService,
	InvalidFormSubmissionError,
	ConfigService,
} from "../index";
import { UpdateProfilePayload, IGetProfileResponse, IPromocode } from "./types";
import { GlobalError } from "../errors/GlobalError";

const {
	saveProfile,
	getProfile,
	getProfileCompleteness,
	updateAuthenticationDone,
	getPromocode,
	generatePromocode,
} = UserService;

const { getConfig } = ConfigService;

jest.mock("../index");

beforeEach(() => {
	jest.resetAllMocks();
});

describe("saveProfile", () => {
	const fakeSessionToken = "fake-session-token";
	const fakePayload: UpdateProfilePayload = {
		firstName: "fakeFirstName",
		lastName: "fakeLastName",
		hasParentalConsent: true,
	};

	it("should call HTTPService.patch with correct parameters", async () => {
		(HTTPService.patch as jest.Mock).mockReturnValue(Promise.resolve());
		await saveProfile(fakeSessionToken, fakePayload);
		expect(HTTPService.patch).toHaveBeenCalledWith(
			"user/profile",
			fakePayload,
			fakeSessionToken
		);
	});

	it("should throw InvalidFormSubmissionError", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.patch as jest.Mock).mockRejectedValue(mockedPostError);
		await expect(async () =>
			saveProfile(fakeSessionToken, fakePayload)
		).rejects.toEqual(new InvalidFormSubmissionError({}));
	});
});

describe("getProfile", () => {
	const fakeSessionToken = "fake-session-token";
	it("should call HTTPService.get with correct parameters", async () => {
		(HTTPService.get as jest.Mock).mockReturnValue(
			Promise.resolve({ data: undefined })
		);

		await getProfile(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/profile",
			"fake-session-token"
		);
	});

	it("should return getProfileResponse from HTTPService.get response", async () => {
		const fakeProfile: IGetProfileResponse = {
			myAcuvueId: "",
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			birthMonth: "",
			birthYear: "",
			gender: Gender.MALE,
			isSpectaclesWearer: true,
			lensesUsage: "ACUVUE_USER",
			hasParentalConsent: false,
		};

		(HTTPService.get as jest.Mock).mockReturnValue(
			Promise.resolve({ data: fakeProfile })
		);

		const userProfile = await getProfile(fakeSessionToken);

		expect(userProfile).toEqual(fakeProfile);
	});
});

describe("getProfileCompleteness", () => {
	it("should return COMPLETE if no mandatory value is empty", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			profileMandatoryFields: [
				"firstName",
				"lastName",
				"birthMonth",
				"birthYear",
				"gender",
				"isSpectaclesWearer",
				"lensesUsage",
			],
		});

		const fakeProfile: IGetProfileResponse = {
			myAcuvueId: "792547493",
			phone: "1234567890",
			hasParentalConsent: false,
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			email: "fakeEMail",
			birthMonth: "10",
			birthYear: "2020",
			gender: Gender.MALE,
			isSpectaclesWearer: true,
			lensesUsage: "ACUVUE_USER",
		};

		const profileCompleteness = getProfileCompleteness(fakeProfile);

		expect(profileCompleteness).toEqual(ProfileCompleteness.COMPLETE);
	});

	it("should return COMPLETE if no mandatory value is empty, even if some non-mandatory ones are empty", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			profileMandatoryFields: [
				"firstName",
				"lastName",
				"birthMonth",
				"birthYear",
				"gender",
				"isSpectaclesWearer",
				"lensesUsage",
			],
		});

		const fakeProfile: IGetProfileResponse = {
			myAcuvueId: null,
			phone: null,
			hasParentalConsent: null,
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			email: "fakeEMail",
			birthMonth: "10",
			birthYear: "2020",
			gender: Gender.MALE,
			isSpectaclesWearer: true,
			lensesUsage: "ACUVUE_USER",
		};

		const profileCompleteness = getProfileCompleteness(fakeProfile);

		expect(profileCompleteness).toEqual(ProfileCompleteness.COMPLETE);
	});

	it("should return INCOMPLETE if any mandatory value is null", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			profileMandatoryFields: [
				"firstName",
				"lastName",
				"birthMonth",
				"birthYear",
				"gender",
				"isSpectaclesWearer",
				"lensesUsage",
			],
		});

		const fakeProfile: IGetProfileResponse = {
			myAcuvueId: null,
			phone: null,
			hasParentalConsent: null,
			firstName: null,
			lastName: "fakeLastName",
			email: "fakeEMail",
			birthMonth: "10",
			birthYear: "2020",
			gender: Gender.MALE,
			isSpectaclesWearer: true,
			lensesUsage: "ACUVUE_USER",
		};

		const profileCompleteness = getProfileCompleteness(fakeProfile);

		expect(profileCompleteness).toEqual(ProfileCompleteness.INCOMPLETE);
	});

	it("should return INCOMPLETE if any mandatory value is empty", async () => {
		(getConfig as jest.Mock).mockReturnValue({
			profileMandatoryFields: [
				"firstName",
				"lastName",
				"birthMonth",
				"birthYear",
				"gender",
				"isSpectaclesWearer",
				"lensesUsage",
			],
		});

		const fakeProfile: IGetProfileResponse = {
			myAcuvueId: null,
			phone: null,
			hasParentalConsent: null,
			firstName: "",
			lastName: "fakeLastName",
			email: "fakeEMail",
			birthMonth: "10",
			birthYear: "2020",
			gender: Gender.MALE,
			isSpectaclesWearer: true,
			lensesUsage: "ACUVUE_USER",
		};

		const profileCompleteness = getProfileCompleteness(fakeProfile);

		expect(profileCompleteness).toEqual(ProfileCompleteness.INCOMPLETE);
	});
});

describe("updateAuthenticationDone", () => {
	const fakeSessionToken = "fake-session-token";
	it("should call post with correct parameters", async () => {
		(HTTPService.post as jest.Mock).mockResolvedValue({
			data: { sessionToken: "session token string" },
		});
		await updateAuthenticationDone(fakeSessionToken);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"user/authentication/done",
			{},
			fakeSessionToken
		);
	});
});

describe("getPromocode", () => {
	const fakePromocode: IPromocode = {
		promocode: "1234567890",
		isTrialCompleted: false,
	};

	it("should call getPromocode request", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: fakePromocode,
		});

		const response = await getPromocode(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/promocode/active",
			fakeSessionToken
		);
		expect(response).toStrictEqual(fakePromocode);
	});

	it("should throw GlobalError when post errors", async () => {
		const fakeDeviceToken = "session token";

		const mockedPostError = {
			response: {
				status: 404,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.get as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(
			async () => await getPromocode(fakeDeviceToken)
		).rejects.toStrictEqual(new GlobalError({}));
	});
});

describe("generatePromocode", () => {
	const fakeSessionToken = "fake-session-token";
	it("should call post with correct parameters", async () => {
		(HTTPService.post as jest.Mock).mockResolvedValue({
			data: { promoCode: "123", isTrialCompleted: false },
		});
		const response = await generatePromocode(fakeSessionToken);
		expect(response).toStrictEqual({
			promoCode: "123",
			isTrialCompleted: false,
		});
		expect(HTTPService.post).toHaveBeenCalledWith(
			"user/promocode/generate",
			{},
			fakeSessionToken
		);
	});

	it("should throw InvalidFormSubmissionError when httpstatus error is CONFLICT ", async () => {
		const mockedPostError = {
			response: {
				status: 409,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);
		await expect(async () =>
			generatePromocode(fakeSessionToken)
		).rejects.toStrictEqual(new GlobalError({}));
	});
});
