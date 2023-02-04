import { HTTPService } from "../index";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { GlobalError } from "../errors/GlobalError";
import FeedbackService from "./index";
import { IFeedback } from "./IFeedback";
import { IPurchase } from "./IPurchase";
import { mocked } from "ts-jest/utils";

jest.mock("../index");

jest.mock("..", () => ({
	HTTPService: {
		get: jest.fn(),
		post: jest.fn(),
	},
}));

describe("savePurchaseFeedback ", () => {
	it("should call post with correct parameters", async () => {
		const fakePurchaseId = "purchase id";
		const fakeSessionToken = "session token";
		const fakeFeedbackPayload: IFeedback = {
			contactLensesScore: 5,
			storeScore: 5,
		};

		await FeedbackService.savePurchaseFeedback(
			fakePurchaseId,
			fakeFeedbackPayload,
			fakeSessionToken
		);

		expect(HTTPService.post).toHaveBeenCalledWith(
			`user/purchases/${fakePurchaseId}/feedback`,
			fakeFeedbackPayload,
			fakeSessionToken
		);
	});

	it("should throw InvalidFormSubmissionError when the http post errors with BAD_REQUEST", async () => {
		const mockedPostError = {
			response: {
				status: HttpStatus.BAD_REQUEST,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};

		mocked(HTTPService.post).mockRejectedValue(mockedPostError);

		const fakePurchaseId = "purchase id";
		const fakeSessionToken = "session token";
		const fakeFeedbackPayload: IFeedback = {
			contactLensesScore: 5,
			storeScore: 5,
		};

		await expect(async () =>
			FeedbackService.savePurchaseFeedback(
				fakePurchaseId,
				fakeFeedbackPayload,
				fakeSessionToken
			)
		).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});

	it("should throw GlobalError when post errors on 409", async () => {
		const mockedPostError = {
			response: {
				status: HttpStatus.CONFLICT,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};

		mocked(HTTPService.post).mockRejectedValue(mockedPostError);

		const fakePurchaseId = "purchase id";
		const fakeSessionToken = "session token";
		const fakeFeedbackPayload: IFeedback = {
			contactLensesScore: 5,
			storeScore: 5,
		};

		await expect(async () =>
			FeedbackService.savePurchaseFeedback(
				fakePurchaseId,
				fakeFeedbackPayload,
				fakeSessionToken
			)
		).rejects.toStrictEqual(new GlobalError({}));
	});
});

describe("getLatestPurchase", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IPurchase = {
			id: "fakeId",
			storeName: "fakeStoreName",
			dateOfPurchase: "fakeDateOfPurchase",
			feedback: {
				contactLensesScore: 0,
				storeScore: 0,
				hasGivenFeedback: false,
			},
		};

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});

		await FeedbackService.getLatestPurchase(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/purchases/latest",
			fakeSessionToken
		);
	});

	it("should return a list of wallet coupons", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IPurchase = {
			id: "fakeId",
			storeName: "fakeStoreName",
			dateOfPurchase: "fakeDateOfPurchase",
			feedback: {
				contactLensesScore: 0,
				storeScore: 0,
				hasGivenFeedback: false,
			},
		};

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		const response = await FeedbackService.getLatestPurchase(
			fakeSessionToken
		);
		expect(response).toEqual(expectedResponse);
	});

	it("should throw GlobalError when get request errors", async () => {
		const fakeSessionToken = "session token";

		const mockedError = {
			response: {
				status: HttpStatus.NOT_FOUND,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};

		mocked(HTTPService.get).mockRejectedValue(mockedError);

		await expect(() =>
			FeedbackService.getLatestPurchase(fakeSessionToken)
		).rejects.toStrictEqual(new GlobalError({}));
	});

	it("should throw if the http response is any other error", async () => {
		const fakeSessionToken = "session token";
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		mocked(HTTPService.get).mockRejectedValue(anyOtherError);

		await expect(
			FeedbackService.getLatestPurchase(fakeSessionToken)
		).rejects.toStrictEqual(anyOtherError);
	});
});
