import { render, screen } from "@testing-library/react";
import OtpTimerCountdown from ".";
import Text from "../Text";
import { ComponentProps } from "react";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

describe("OtpTimerCountdown", () => {
	it("should render without errors", () => {
		render(
			<OtpTimerCountdown
				totalSeconds={0}
				expiringInMessageKey="otpTimerCountdown.expiring"
				hasExpiredMessageKey="otpTimerCountdown.hasExpired"
			/>
		);
	});

	it("should render expiring in key when total seconds is greater than 0", () => {
		render(
			<OtpTimerCountdown
				totalSeconds={100}
				expiringInMessageKey="otpTimerCountdown.expiring"
				hasExpiredMessageKey="otpTimerCountdown.hasExpired"
			/>
		);

		const expiringKey = screen.getByText("otpTimerCountdown.expiring");

		expect(expiringKey).toBeInTheDocument();
	});

	it("should render hasExpired in key when total seconds is 0 or less", () => {
		render(
			<OtpTimerCountdown
				totalSeconds={0}
				expiringInMessageKey="otpTimerCountdown.expiring"
				hasExpiredMessageKey="otpTimerCountdown.hasExpired"
			/>
		);

		const hasExpiredKey = screen.getByText("otpTimerCountdown.hasExpired");

		expect(hasExpiredKey).toBeInTheDocument();
	});
});
