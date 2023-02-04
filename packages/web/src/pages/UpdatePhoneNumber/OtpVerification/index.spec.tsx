import OtpVerificationPage from ".";
import { renderWithLanguage, screen } from "../../../test-utils";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useQuery } from "../../../hooks/useQuery";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { mocked } from "ts-jest/utils";
import { useNavigate } from "react-router-dom-v5-compat";
import { waitFor } from "@testing-library/dom";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useQuery", () => ({
	useQuery: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn().mockReturnValue({
		navigate: jest.fn(),
	}),
}));

jest.mock("./OtpVerificationForm", () => ({
	__esModule: true,
	default: () => null,
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	(useQuery as jest.Mock).mockReturnValue({
		get: jest.fn(),
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

it("should have title Enter OTP visible", async () => {
	renderWithLanguage(<OtpVerificationPage />);

	await waitFor(() => {
		const heading = screen.getByText("Enter OTP");
		expect(heading).toBeVisible();
	});
	await Promise.resolve();
});
