import { useAuthentication } from "./useAuthentication";
import { useCallbackWithLoading } from "./useCallbackWithLoading";
import { useService } from "./useService";
import { useFeedback } from "./useFeedback";
import { IFeedback, IPurchase } from "@myacuvue_thailand_web/services";
import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});

	(useService as jest.Mock).mockReturnValue({
		FeedbackService: {
			savePurchaseFeedback: jest.fn(),
		},
	});

	mocked(useCallbackWithLoading).mockImplementation((callback) => callback);
});

const fakePurchaseData: IPurchase = {
	id: "fakeId",
	storeName: "fakeStoreName",
	dateOfPurchase: "fakeDateOfPurchase",
	feedback: {
		contactLensesScore: 0,
		storeScore: 0,
		hasGivenFeedback: false,
	},
};

describe("savePurchaseFeedback", () => {
	it("should call FeedbackService.savePurchaseFeedback with correct params", async () => {
		const fakePurchaseId = "purchase id";
		const fakeSessionToken = "fake-session-token";
		const fakeFeedbackPayload: IFeedback = {
			contactLensesScore: 5,
			storeScore: 5,
		};
		const { result } = renderHook(() => useFeedback());

		await result.current.savePurchaseFeedback(
			fakePurchaseId,
			fakeFeedbackPayload
		);

		const { FeedbackService } = useService();

		expect(FeedbackService.savePurchaseFeedback).toHaveBeenCalledWith(
			fakePurchaseId,
			fakeFeedbackPayload,
			fakeSessionToken
		);
	});
});

describe("useFeedback", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			sessionToken: { rawValue: "fake-session-token" },
		});

		(useService as jest.Mock).mockReturnValue({
			FeedbackService: {
				getLatestPurchase: jest.fn().mockReturnValue(fakePurchaseData),
			},
		});
	});

	describe("getLatestPurchase", () => {
		it("should call FeedbackService.getLatestPurchase with session token", async () => {
			const { FeedbackService } = useService();
			const { result } = renderHook(() => useFeedback());

			await act(async () => {
				await result.current.getLatestPurchase();
			});

			expect(FeedbackService.getLatestPurchase).toHaveBeenCalledWith(
				"fake-session-token"
			);
		});
	});
});
