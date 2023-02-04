import { ConfigService } from "@myacuvue_thailand_web/services";
import { act, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";
import RegisterBlock from ".";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import { mocked } from "ts-jest/utils";

jest.mock("../../../hooks/useConfiguration.ts", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("RegisterBlock", () => {
	it("should navigate to /registration when REGISTER NOW button is clicked", async () => {
		renderWithLanguage(<RegisterBlock />);

		await waitFor(() => {
			const registerButton = screen.getByText("REGISTER NOW");
			expect(registerButton).toBeVisible();
		});

		act(() => {
			const registerButton = screen.getByText("REGISTER NOW");
			registerButton.click();
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalledWith("/registration");
		});
	});
});
