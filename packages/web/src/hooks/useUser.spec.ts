import {
	ProfileCompleteness,
	UpdateProfilePayload,
} from "@myacuvue_thailand_web/services";
import { useCallbackWithLoading } from "./useCallbackWithLoading";
import { renderHook } from "@testing-library/react-hooks";
import { useSessionToken } from "../contexts/SessionTokenContext";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import { useUser } from "./useUser";
import { mocked } from "ts-jest/utils";

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../contexts/SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

const fakePayLoad: UpdateProfilePayload = {
	firstName: "fakeFirstname",
	lastName: "fakeLastName",
};

beforeEach(() => {
	mocked(useSessionToken).mockReturnValue({
		sessionToken: {
			rawValue: "fake-session-token",
			payload: {
				sessionId: "",
				iat: 1,
				exp: 2,
				jti: "",
				region: "",
				userId: "",
				userType: "",
			},
			header: {
				alg: "",
				typ: "",
			},
		},
		setSessionToken: jest.fn(),
	});

	mocked(useLoading).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
		isLoading: false,
	});

	(useService as jest.Mock).mockReturnValue({
		UserService: {
			getProfile: jest.fn().mockReturnValue(null),
			saveProfile: jest.fn().mockReturnValue(null),
			getProfileCompleteness: jest
				.fn()
				.mockReturnValue(ProfileCompleteness.COMPLETE),
			updateAuthenticationDone: jest.fn().mockReturnValue(null),
			getPromocode: jest.fn(),
			generatePromocode: jest.fn().mockReturnValue(null),
		},
	});

	mocked(useCallbackWithLoading).mockImplementation((callback) => callback);
});

describe("getProfile", () => {
	it("should call the UserService.getProfile and with the session-token", async () => {
		const { UserService } = useService();
		const { result } = renderHook(() => useUser());

		await result.current.getProfile();

		expect(UserService.getProfile).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useUser());

		await result.current.getProfile();

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("saveProfile", () => {
	it("should call the UserService.saveProfile and with the session-token", async () => {
		const { UserService } = useService();
		const { result } = renderHook(() => useUser());

		await result.current.saveProfile(fakePayLoad);

		expect(UserService.saveProfile).toHaveBeenCalledWith(
			"fake-session-token",
			fakePayLoad
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useUser());

		await result.current.saveProfile(fakePayLoad);

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("updateAuthenticationDone", () => {
	it("should call the UserService.updateAuthenticationDone and with the session-token", async () => {
		const { UserService } = useService();
		const { result } = renderHook(() => useUser());

		await result.current.updateAuthenticationDone();

		expect(UserService.updateAuthenticationDone).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});
});

describe("getPromocode", () => {
	it("should call UserService.getPromocode with correct params", async () => {
		const { result } = renderHook(() => useUser());
		await result.current.getPromocode();

		const { UserService } = useService();
		expect(UserService.getPromocode).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});
});

describe("generatePromocode", () => {
	it("should call the UserService.generatePromocode and with the session-token", async () => {
		const { UserService } = useService();
		const { result } = renderHook(() => useUser());

		await result.current.generatePromocode();

		expect(UserService.generatePromocode).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});
});
