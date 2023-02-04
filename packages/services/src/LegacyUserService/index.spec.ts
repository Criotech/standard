import LegacyUserService from ".";
import { HTTPService } from "../index";
import {
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
} from "../PhoneService/types";
import { IUser } from "./IUser";
import { UpdateProfileRequest } from "./UpdateProfileRequest";

const { getUser, updateProfile } = LegacyUserService;

jest.mock("../index");

describe("getUser", () => {
	it("should call HTTPService.get with correct parameters", async () => {
		const fakeSessionToken = "fake-session-token";
		(HTTPService.get as jest.Mock).mockReturnValue(
			Promise.resolve({ data: undefined })
		);
		await getUser(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"profile",
			fakeSessionToken
		);
	});

	it("should return user from HTTPService.get response", async () => {
		const fakeSessionToken = "fake-session-token";
		const fakeUser: IUser = {
			id: "fake-id",
			phone: "fake phone",
			profile: null,
		};
		(HTTPService.get as jest.Mock).mockReturnValue(
			Promise.resolve({ data: fakeUser })
		);

		const user = await getUser(fakeSessionToken);

		expect(user).toEqual(fakeUser);
	});
});

describe("updateProfile", () => {
	it("should call HTTPService.patch with correct parameters", async () => {
		const fakeSessionToken = "fake-session-token";
		const fakeUpdatePayload: UpdateProfileRequest = {
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			email: "fakeEmail",
		};

		await updateProfile(fakeSessionToken, fakeUpdatePayload);

		expect(HTTPService.patch).toHaveBeenCalledWith(
			"profile",
			fakeUpdatePayload,
			fakeSessionToken
		);
	});
});

describe("getConsents", () => {
	it("should call user getConsents request", async () => {
		const fakeSessionToken = "session token";
		const fakeResponseData: ListConsentsResponseBody = [
			{
				type: "WEB:LITE:TERMS_AND_CONDITIONS",
				accepted: false,
			},
		];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: fakeResponseData,
		});

		const response = await LegacyUserService.getConsents(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/consents",
			fakeSessionToken
		);
		expect(response).toStrictEqual(fakeResponseData);
	});
});

describe("saveConsents", () => {
	it("should call user saveConsents request", async () => {
		const fakeDeviceToken = "device-token";
		const fakeRequestData: SaveConsentsRequestBody = [
			"WEB:LITE:TERMS_AND_CONDITIONS",
		];

		(HTTPService.post as jest.Mock).mockResolvedValue(null);

		await LegacyUserService.saveConsents(fakeDeviceToken, fakeRequestData);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"user/consents",
			fakeRequestData,
			fakeDeviceToken
		);
	});
});
