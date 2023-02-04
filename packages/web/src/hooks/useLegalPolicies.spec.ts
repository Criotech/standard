import { renderHook, act } from "@testing-library/react-hooks";
import { useService } from "./useService";
import { useTranslation } from "./useTranslation";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { useLegalPolicies } from "./useLegalPolicies";

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	LegalPoliciesService: {
		getTermsAndConditions: jest.fn(),
		getPrivacyPolicy: jest.fn(),
		acceptLegalTerms: jest.fn(),
		getPointsTermsAndConditions: jest.fn(),
	},
}));
const fakeSessionTokenString = "fake-session-token";
const fakeDeviceTokenString = "fake-device-token";
const region = "THA";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
	processSessionToken: jest.fn(),
	sessionToken: fakeSessionTokenString,
	deviceToken: fakeDeviceTokenString,
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		processSessionToken: jest.fn(),
		sessionToken: { rawValue: fakeSessionTokenString },
		deviceToken: { rawValue: fakeDeviceTokenString },
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});
	(useService as jest.Mock).mockReturnValue({
		LegalPoliciesService: {
			getTermsAndConditions: jest.fn().mockReturnValue(Promise.resolve()),
			getPrivacyPolicy: jest.fn().mockReturnValue(Promise.resolve()),
			acceptLegalTerms: jest.fn().mockReturnValue(Promise.resolve()),
			getPointsTermsAndConditions: jest
				.fn()
				.mockReturnValue(Promise.resolve()),
		},
	});
});

describe("getTermsAndConditions", () => {
	it("should call LegalPoliciesService.getTermsAndConditions with correct params", async () => {
		const { LegalPoliciesService } = useService();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getTermsAndConditions();
		});

		expect(LegalPoliciesService.getTermsAndConditions).toHaveBeenCalledWith(
			"en"
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getTermsAndConditions();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("getPrivacyPolicy", () => {
	it("should call LegalPoliciesService.getPrivacyPolicy with correct params", async () => {
		const { LegalPoliciesService } = useService();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getPrivacyPolicy();
		});

		expect(LegalPoliciesService.getPrivacyPolicy).toHaveBeenCalledWith(
			"en"
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getPrivacyPolicy();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("acceptLegalTerms", () => {
	it("should call LegalPoliciesService.acceptLegalTerms with correct params", async () => {
		const { LegalPoliciesService } = useService();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.acceptLegalTerms();
		});

		expect(LegalPoliciesService.acceptLegalTerms).toHaveBeenCalledWith(
			fakeDeviceTokenString
		);
	});

	it("should call processSessionToken when called", async () => {
		const { processSessionToken } = useAuthentication();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.acceptLegalTerms();
		});
		expect(processSessionToken).toHaveBeenCalled();
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.acceptLegalTerms();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("getPointsTermsAndConditions", () => {
	it("should call LegalPoliciesService.getPointsTermsAndConditions with correct params", async () => {
		const { LegalPoliciesService } = useService();
		const { language } = useTranslation();

		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getPointsTermsAndConditions();
		});

		expect(
			LegalPoliciesService.getPointsTermsAndConditions
		).toHaveBeenCalledWith(language, region, fakeSessionTokenString);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();
		const { result } = renderHook(() => useLegalPolicies());

		await act(async () => {
			await result.current.getPointsTermsAndConditions();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
