import { useService } from "./useService";
import { useLoading } from "./useLoading";
import { IEmailVerifyPayload } from "@myacuvue_thailand_web/services";
import { useEmail } from "./useEmail";
import { renderHook } from "@testing-library/react-hooks";
import { useXiam } from "../contexts/XiamContext";
import { useDeviceToken } from "../contexts/DeviceTokenContext";

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

describe("useEmail", () => {
	beforeEach(() => {
		(useLoading as jest.Mock).mockReturnValue({
			showLoading: jest.fn(),
			hideLoading: jest.fn(),
		});

		(useService as jest.Mock).mockReturnValue({
			EmailService: {
				verify: jest.fn().mockReturnValue(null),
				linkAccount: jest.fn().mockReturnValue(null),
				sendVerificationLink: jest.fn().mockReturnValue(null),
			},
		});

		(useXiam as jest.Mock).mockReturnValue({
			getXiamToken: jest
				.fn()
				.mockResolvedValue({ rawValue: "fake-xiam-token" }),
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: { rawValue: "fake-devive-token" },
		});
	});

	describe("verify", () => {
		const fakeVerifyData: IEmailVerifyPayload = {
			data: "test",
		};

		it("should call the EmailService.verify and with the data", async () => {
			const { EmailService } = useService();
			const { result } = renderHook(() => useEmail());

			await result.current.verify(fakeVerifyData);

			expect(EmailService.verify).toHaveBeenCalledWith("test");
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useEmail());

			await result.current.verify(fakeVerifyData);

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("linkAccount", () => {
		it("should call the EmailService.linkAccount with data", async () => {
			const { EmailService } = useService();
			const { result } = renderHook(() => useEmail());

			await result.current.linkAccount();

			expect(EmailService.linkAccount).toHaveBeenCalledWith(
				"fake-devive-token",
				"fake-xiam-token"
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useEmail());

			await result.current.linkAccount();

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("sendVerificationLink", () => {
		it("should call the EmailService.sendVerificationLink and with the fakeXiamToken", async () => {
			const { EmailService } = useService();
			const { result } = renderHook(() => useEmail());

			await result.current.sendVerificationLink();

			expect(EmailService.sendVerificationLink).toHaveBeenCalledWith(
				"fake-xiam-token"
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useEmail());

			await result.current.sendVerificationLink();

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});
});
