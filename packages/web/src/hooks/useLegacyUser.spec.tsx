import { renderHook, act } from "@testing-library/react-hooks";
import { useLegacyUser } from "./useLegacyUser";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import { UpdateProfileRequest } from "@myacuvue_thailand_web/services";

jest.mock("react-router-dom", () => ({
	useHistory: () => ({
		push: jest.fn(),
	}),
}));

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

const fakeSessionTokenString = "session token";

const fakePayload: UpdateProfileRequest = {
	firstName: "test1",
	lastName: "test2",
	email: "example@its.jnj.com",
};

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: fakeSessionTokenString },
		processSessionToken: jest.fn(),
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
	(useService as jest.Mock).mockReturnValue({
		LegacyUserService: {
			updateProfile: jest.fn(),
			getConsents: jest.fn().mockReturnValue([]),
			saveConsents: jest.fn().mockReturnValue(null),
		},
	});
});

describe("updateProfile", () => {
	it("should call service's updateProfile with correct parameters", async () => {
		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.updateProfile(fakePayload);
		});

		const { LegacyUserService } = useService();

		expect(LegacyUserService.updateProfile).toHaveBeenCalledWith(
			fakeSessionTokenString,
			fakePayload
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.updateProfile(fakePayload);
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("getConsents", () => {
	it("should call LegacyUserService.getConsents with session token", async () => {
		const { LegacyUserService } = useService();

		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.getConsents();
		});

		expect(LegacyUserService.getConsents).toHaveBeenCalledWith(
			fakeSessionTokenString
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.getConsents();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("saveConsents", () => {
	it("should call LegacyUserService.saveConsents with session token", async () => {
		const { LegacyUserService } = useService();

		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.saveConsents([]);
		});

		expect(LegacyUserService.saveConsents).toHaveBeenCalledWith(
			fakeSessionTokenString,
			[]
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useLegacyUser());

		await act(async () => {
			await result.current.saveConsents([]);
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
