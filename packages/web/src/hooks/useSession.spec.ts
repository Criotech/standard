import { renderHook } from "@testing-library/react-hooks";
import { useService } from "./useService";
import { useXiam } from "../contexts/XiamContext";
import { useSession } from "./useSession";
import {
	ConfigService,
	ISessionToken,
	WindowService,
} from "@myacuvue_thailand_web/services";
import { useSessionToken } from "../contexts/SessionTokenContext";
import { useConfiguration } from "./useConfiguration";
import { useCallbackWithLoading } from "./useCallbackWithLoading";

jest.mock("./useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../contexts/SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("./useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	ConfigService: {
		getCurrentInstanceEnv: jest.fn(),
	},
	WindowService: {
		redirect: jest.fn(),
	},
}));

describe("useSeesion", () => {
	beforeEach(() => {
		(useXiam as jest.Mock).mockReturnValue({
			getXiamToken: jest
				.fn()
				.mockResolvedValue({ rawValue: "fake-xiam-token" }),
		});

		(useService as jest.Mock).mockReturnValue({
			SessionService: {
				startSession: jest.fn().mockReturnValue("fake-session-token1"),
			},
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			setSessionToken: jest.fn(),
		});

		(useCallbackWithLoading as jest.Mock).mockImplementation(
			(callback) => callback
		);

		(useConfiguration as jest.Mock).mockReturnValue({
			region: "AUS",
			domainInstanceEnvMap: {
				AUS: {
					LOCAL: "https://example.com",
					DEV: "https://example.com",
					PREDEV: "https://example.com",
					STAGING: "https://example.com",
					PROD: "https://example.com",
				},
			},
		});

		(ConfigService.getCurrentInstanceEnv as jest.Mock).mockReturnValue({
			instance: "AUS",
			env: "LOCAL",
		});
	});

	describe("startSession", () => {
		it("should call SessionService.startSession with xiamToken and save it with setSessionToken", async () => {
			(useXiam as jest.Mock).mockReturnValue({
				getXiamToken: jest
					.fn()
					.mockResolvedValue({ rawValue: "fake-xiam-token 1" }),
			});

			const fakeSessionToken: ISessionToken = {
				header: {
					typ: "JWT",
					alg: "HS256",
				},
				payload: {
					exp: 123,
					iat: 456,
					jti: "jti",
					userType: "user type",
					region: "AUS",
					sessionId: "session id",
					userId: "AUSuser",
				},
				rawValue: "raw value for session token",
			};

			const { SessionService } = useService();

			(SessionService.startSession as jest.Mock).mockResolvedValue(
				fakeSessionToken
			);

			const { result } = renderHook(() => useSession());

			await result.current.startSession();

			expect(SessionService.startSession).toHaveBeenCalledWith(
				"fake-xiam-token 1"
			);

			expect(useSessionToken().setSessionToken).toHaveBeenCalledWith(
				fakeSessionToken
			);
		});

		it("should call SessionService.startSession with xiamToken and redirect", async () => {
			(useXiam as jest.Mock).mockReturnValue({
				getXiamToken: jest
					.fn()
					.mockResolvedValue({ rawValue: "fake-xiam-token 1" }),
			});

			(useConfiguration as jest.Mock).mockReturnValue({
				region: "THA",
				domainInstanceEnvMap: {
					AUS: {
						LOCAL: "https://example.com",
						DEV: "https://example.com",
						PREDEV: "https://example.com",
						STAGING: "https://example.com",
						PROD: "https://example.com",
					},
				},
			});

			const fakeSessionToken: ISessionToken = {
				header: {
					typ: "JWT",
					alg: "HS256",
				},
				payload: {
					exp: 123,
					iat: 456,
					jti: "jti",
					userType: "user type",
					region: "AUS",
					sessionId: "session id",
					userId: "AUSuser",
				},
				rawValue: "raw value for session token",
			};

			const { SessionService } = useService();

			(SessionService.startSession as jest.Mock).mockResolvedValue(
				fakeSessionToken
			);

			const { result } = renderHook(() => useSession());

			await result.current.startSession();

			expect(SessionService.startSession).toHaveBeenCalledWith(
				"fake-xiam-token 1"
			);

			(ConfigService.getCurrentInstanceEnv as jest.Mock).mockReturnValue({
				instance: "AUS",
				env: "LOCAL",
			});

			expect(WindowService.redirect).toHaveBeenCalledWith(
				`https://example.com/sign-in`
			);
		});
	});
});
