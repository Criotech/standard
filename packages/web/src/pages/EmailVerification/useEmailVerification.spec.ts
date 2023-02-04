import { renderHook } from "@testing-library/react-hooks";
import { useEmailVerification } from "./useEmailVerification";
import { useStorage } from "../../hooks/useStorage";
import { mocked } from "ts-jest/utils";
import { useEmail } from "../../hooks/useEmail";

jest.mock("../../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("../../hooks/useEmail", () => ({
	useEmail: jest.fn(),
}));

beforeEach(() => {
	mocked(useEmail).mockReturnValue({
		sendVerificationLink: jest.fn(),
		linkAccount: jest.fn(),
		verify: jest.fn(),
	});
});

const FIVE_MINUTES_IN_MILISECONDS = 5 * 60 * 1000;

describe("canIssueVerificationEmail", () => {
	it("should return true when it was never issued yet", async () => {
		const fakeIssuedAt = undefined;
		const mockSetStorage = jest.fn();
		const mockDeleteStorage = jest.fn();
		mocked(useStorage).mockReturnValue([
			fakeIssuedAt,
			mockSetStorage,
			mockDeleteStorage,
		]);

		const fakeNowInMs = 0;
		jest.useFakeTimers("modern").setSystemTime(fakeNowInMs);

		const { result } = renderHook(() => useEmailVerification());
		expect(result.current.canIssueVerificationEmail()).toStrictEqual(true);
	});

	it("should return true when elapsed more than 5min from last issue", async () => {
		const fakeIssuedAt = 0;
		const mockSetStorage = jest.fn();
		const mockDeleteStorage = jest.fn();
		mocked(useStorage).mockReturnValue([
			fakeIssuedAt,
			mockSetStorage,
			mockDeleteStorage,
		]);

		const fakeNowInMs = FIVE_MINUTES_IN_MILISECONDS + 1;
		jest.useFakeTimers("modern").setSystemTime(fakeNowInMs);

		const { result } = renderHook(() => useEmailVerification());
		expect(result.current.canIssueVerificationEmail()).toStrictEqual(true);
	});

	it("should return false when elapsed less than 5min from last issue", async () => {
		const fakeIssuedAt = 0;
		const mockSetStorage = jest.fn();
		const mockDeleteStorage = jest.fn();
		mocked(useStorage).mockReturnValue([
			fakeIssuedAt,
			mockSetStorage,
			mockDeleteStorage,
		]);

		const fakeNowInMs = FIVE_MINUTES_IN_MILISECONDS - 1;
		jest.useFakeTimers("modern").setSystemTime(fakeNowInMs);

		const { result } = renderHook(() => useEmailVerification());
		expect(result.current.canIssueVerificationEmail()).toStrictEqual(false);
	});
});

describe("sendEmail", () => {
	it("should call sendVerificationLink and setStorage with current timestamp", async () => {
		const mockSendVerificationLink = jest.fn();
		mocked(useEmail).mockReturnValue({
			sendVerificationLink: mockSendVerificationLink,
			linkAccount: jest.fn(),
			verify: jest.fn(),
		});

		const fakeIssuedAt = undefined;
		const mockSetStorage = jest.fn();
		const mockDeleteStorage = jest.fn();
		mocked(useStorage).mockReturnValue([
			fakeIssuedAt,
			mockSetStorage,
			mockDeleteStorage,
		]);

		const fakeNowInMs = 1;
		jest.useFakeTimers("modern").setSystemTime(fakeNowInMs);

		const { result } = renderHook(() => useEmailVerification());
		await result.current.sendEmail();

		expect(mockSendVerificationLink).toHaveBeenCalled();
		expect(mockSetStorage).toHaveBeenCalledWith(fakeNowInMs);
	});
});
