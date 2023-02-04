import { HTTPService } from "../index";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { GlobalError } from "../errors/GlobalError";
import EmailService from "./index";
import { IEmailVerifyPayload } from "./types";

jest.mock("../index");

describe("linkAccount", () => {
	it("should call email linkAccount request", async () => {
		(HTTPService.post as jest.Mock).mockResolvedValue(null);

		await EmailService.linkAccount(
			"fakeEncodedDeviceToken",
			"fakeXiamToken"
		);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"email/link-account",
			"fakeEncodedDeviceToken",
			"fakeXiamToken"
		);
	});

	it("should throw error when post errors", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(async () => {
			await EmailService.linkAccount(
				"fakeEncodedDeviceToken",
				"fakeXiamToken"
			);
		}).rejects.toStrictEqual(mockedPostError);
	});

	it("should throw GlobalError when post errors on 409", async () => {
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

		await expect(async () => {
			await EmailService.linkAccount(
				"fakeEncodedDeviceToken",
				"fakeXiamToken"
			);
		}).rejects.toStrictEqual(new GlobalError({}));
	});
});

describe("verify", () => {
	it("should call post with correct parameters", async () => {
		(HTTPService.post as jest.Mock).mockReturnValue(Promise.resolve());
		const payload = "test@testmail.com";
		await EmailService.verify(payload);
		const expectedPayload: IEmailVerifyPayload = {
			data: "test@testmail.com",
		};

		expect(HTTPService.post).toHaveBeenCalledWith(
			"email/verify",
			expectedPayload
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

		const payload = "test@testmail.com";

		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(async () => {
			await EmailService.verify(payload);
		}).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});

	it("should throw GlobalError when post errors on 409", async () => {
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

		await expect(async () => {
			await EmailService.verify("test@testmail.com");
		}).rejects.toStrictEqual(new GlobalError({}));
	});
});

describe("sendVerificationLink", () => {
	it("should call post with correct parameters", async () => {
		(HTTPService.post as jest.Mock).mockReturnValue(null);
		await EmailService.sendVerificationLink("fakeXiamToken");

		expect(HTTPService.post).toHaveBeenCalledWith(
			"email/send-verification-link",
			undefined,
			"fakeXiamToken"
		);
	});

	it("should throw error when post errors", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(async () => {
			await EmailService.sendVerificationLink("fakeXiamToken");
		}).rejects.toStrictEqual(mockedPostError);
	});

	it("should throw GlobalError when post errors on 409", async () => {
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

		await expect(async () => {
			await EmailService.sendVerificationLink("fakeXiamToken");
		}).rejects.toStrictEqual(new GlobalError({}));
	});
});
