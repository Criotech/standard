import { renderHook, act } from "@testing-library/react-hooks";
import { useBanners } from "./useBanners";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { BannerService } from "@myacuvue_thailand_web/services";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	BannerService: {
		getBanners: jest.fn(),
	},
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
});

describe("getBanners", () => {
	it("should call service's getBanners with correct parameters", async () => {
		const { result } = renderHook(() => useBanners());

		await act(async () => {
			await result.current.getBanners();
		});

		expect(BannerService.getBanners).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useBanners());

		await act(async () => {
			await result.current.getBanners();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
