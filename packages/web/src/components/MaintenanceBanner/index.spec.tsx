import { act, waitFor } from "@testing-library/react";
import MaintenanceBanner from ".";
import { useConfiguration } from "../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { mocked } from "ts-jest/utils";
import { useLoading } from "../../hooks/useLoading";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import { renderWithLanguage } from "../../test-utils";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("../../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.TH,
	});

	(useFeatureSwitch as jest.Mock).mockReturnValue([
		{
			startDateTimeISO: "2022-12-07T08:24:51.841Z",
			endDateTimeISO: "2022-12-10T08:26:51.841Z",
		},
		true,
	]);

	mocked(useLoading).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
		isLoading: false,
	});
});

describe("MaintenanceBanner", () => {
	it("should render maintenance banner current time is within maintenance time", async () => {
		jest.useFakeTimers("modern").setSystemTime(
			new Date("2022-12-09T08:26:51.841Z")
		);
		act(() => {
			renderWithLanguage(<MaintenanceBanner />);
		});

		await waitFor(async () => {
			const maintenanceText = document.querySelector(
				".acuvue-maintenance-banner"
			);
			expect(maintenanceText).toBeInTheDocument();
		});
	});

	it("should not render maintenance banner current time is after maintenance end time", async () => {
		jest.useFakeTimers("modern").setSystemTime(
			new Date("2022-12-11T08:26:51.841Z")
		);
		act(() => {
			renderWithLanguage(<MaintenanceBanner />);
		});

		await waitFor(async () => {
			const maintenanceText = document.querySelector(
				".acuvue-maintenance-banner"
			);
			expect(maintenanceText).not.toBeInTheDocument();
		});
	});
});
