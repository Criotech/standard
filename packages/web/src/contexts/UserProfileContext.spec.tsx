import { renderHook } from "@testing-library/react-hooks";
import { act } from "@testing-library/react";
import { ComponentProps } from "react";
import { useUser } from "../hooks/useUser";
import { useUserProfile, UserProfileProvider } from "./UserProfileContext";
import { useSessionToken } from "./SessionTokenContext";
import { mocked } from "ts-jest/utils";
import { useService } from "../hooks/useService";

jest.mock("../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("./SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("../hooks/useService", () => ({
	useService: jest.fn(),
}));

beforeEach(() => {
	mocked(useUser).mockReturnValue({
		getProfile: jest.fn().mockReturnValue({
			email: "fake-email",
			phone: "0123456789",
		}),
		updateAuthenticationDone: jest.fn(),
		saveProfile: jest.fn(),
		generatePromocode: jest.fn(),
		getPromocode: jest.fn(),
	});

	(useService as jest.Mock).mockReturnValue({
		UserService: {
			getProfileCompleteness: jest.fn(),
		},
	});

	mocked(useSessionToken).mockReturnValue({
		sessionToken: {
			header: {
				typ: "",
				alg: "",
			},
			payload: {
				region: "",
				iat: 0,
				exp: 1,
				jti: "",
				sessionId: "",
				userId: "",
				userType: "",
			},
			rawValue: "fakeSessionToken",
		},
		setSessionToken: jest.fn(),
	});
});

describe("useUserProfile", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useUserProfile());
		expect(result.current).toStrictEqual(undefined);
	});

	it("should call getProfile when initialized", async () => {
		const { getProfile } = useUser();

		const { waitFor, waitForNextUpdate } = renderHook(
			() => useUserProfile(),
			{
				wrapper: ({
					children,
				}: ComponentProps<typeof UserProfileProvider>) => (
					<UserProfileProvider>{children}</UserProfileProvider>
				),
			}
		);

		await act(async () => {
			await waitForNextUpdate();
		});

		await waitFor(() => {
			expect(getProfile).toHaveBeenCalled();
		});
	});
});
