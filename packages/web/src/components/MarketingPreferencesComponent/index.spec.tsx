import { ComponentProps } from "react";
import MarketingPreferencesComponent from ".";
import { useSettings } from "../../hooks/useSettings";
import { useToggleAll } from "../../hooks/useToggleAll";
import Text from "../Text";
import Checkbox from "../Checkbox";
import { render, screen } from "@testing-library/react";

jest.mock("../../hooks/useToggleAll", () => ({
	useToggleAll: jest.fn(),
}));

jest.mock("../Checkbox", () => ({
	__esModule: true,
	default: ({ onChange, checked }: ComponentProps<typeof Checkbox>) => (
		<div data-testid="checkbox-wrapper">
			<input
				type="checkbox"
				data-testid="check-box"
				onChange={onChange as any}
				checked={checked}
			/>
			<span data-testid="is-checked">{checked?.toString()}</span>
		</div>
	),
}));

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

beforeEach(() => {
	(useSettings as jest.Mock).mockReturnValue({
		getNotificationPreferences: jest.fn().mockResolvedValue({
			marketing: {
				isEmailEnabled: false,
				isCallEnabled: false,
				isSmsEnabled: false,
				isPushEnabled: true,
				isLineEnabled: false,
			},
		}),
		saveNotificationPreferences: jest.fn(),
	});

	(useToggleAll as jest.Mock).mockReturnValue([true, jest.fn()]);
});

describe("MarketingPreferencesComponent", () => {
	it("should render without error", () => {
		render(
			<MarketingPreferencesComponent
				formData={{
					isEmailEnabled: true,
					isCallEnabled: false,
					isSmsEnabled: false,
					isPushEnabled: false,
					isLineEnabled: false,
				}}
				toggleEmailEnabled={jest.fn()}
				toggleCallEnabled={jest.fn()}
				toggleSmsEnabled={jest.fn()}
				togglePushEnabled={jest.fn()}
				toggleLineEnabled={jest.fn()}
				isAllChecked={false}
				toggleAll={jest.fn()}
				hasLineNotification={false}
			/>
		);
	});

	it("should render five checkboxes if hasLineNotification configured to false", async () => {
		render(
			<MarketingPreferencesComponent
				formData={{
					isEmailEnabled: false,
					isCallEnabled: false,
					isSmsEnabled: false,
					isPushEnabled: false,
					isLineEnabled: false,
				}}
				toggleEmailEnabled={jest.fn()}
				toggleCallEnabled={jest.fn()}
				toggleSmsEnabled={jest.fn()}
				togglePushEnabled={jest.fn()}
				toggleLineEnabled={jest.fn()}
				isAllChecked={false}
				toggleAll={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const checkboxes = screen.getAllByTestId("check-box");
		expect(checkboxes).toHaveLength(5);
	});

	it("should render six checkboxes if hasLineNotification configured to true", async () => {
		render(
			<MarketingPreferencesComponent
				formData={{
					isEmailEnabled: false,
					isCallEnabled: false,
					isSmsEnabled: false,
					isPushEnabled: false,
					isLineEnabled: false,
				}}
				toggleEmailEnabled={jest.fn()}
				toggleCallEnabled={jest.fn()}
				toggleSmsEnabled={jest.fn()}
				togglePushEnabled={jest.fn()}
				toggleLineEnabled={jest.fn()}
				isAllChecked={false}
				toggleAll={jest.fn()}
				hasLineNotification={true}
			/>
		);
		const checkboxes = screen.getAllByTestId("check-box");
		expect(checkboxes).toHaveLength(6);
	});

	it("should call corresponding checkbox event handler when each check box is clicked", () => {
		const mockedToggleEmailEnabled = jest.fn();
		const mockedToggleCallEnabled = jest.fn();
		const mockedToggleSmsEnabled = jest.fn();
		const mockedTogglePushEnabled = jest.fn();
		const mockedToggleLineEnabled = jest.fn();

		render(
			<MarketingPreferencesComponent
				formData={{
					isEmailEnabled: false,
					isCallEnabled: false,
					isSmsEnabled: false,
					isPushEnabled: false,
					isLineEnabled: false,
				}}
				toggleEmailEnabled={mockedToggleEmailEnabled}
				toggleCallEnabled={mockedToggleCallEnabled}
				toggleSmsEnabled={mockedToggleSmsEnabled}
				togglePushEnabled={mockedTogglePushEnabled}
				toggleLineEnabled={mockedToggleLineEnabled}
				isAllChecked={false}
				toggleAll={jest.fn()}
				hasLineNotification={true}
			/>
		);

		const emailCheckBox = screen.getAllByTestId("check-box")[1];
		const callCheckBox = screen.getAllByTestId("check-box")[2];
		const smsCheckBox = screen.getAllByTestId("check-box")[3];
		const pushCheckBox = screen.getAllByTestId("check-box")[4];
		const lineCheckBox = screen.getAllByTestId("check-box")[5];

		emailCheckBox.click();
		expect(mockedToggleEmailEnabled).toHaveBeenCalled();

		callCheckBox.click();
		expect(mockedToggleCallEnabled).toHaveBeenCalled();

		smsCheckBox.click();
		expect(mockedToggleSmsEnabled).toHaveBeenCalled();

		pushCheckBox.click();
		expect(mockedTogglePushEnabled).toHaveBeenCalled();

		lineCheckBox.click();
		expect(mockedToggleLineEnabled).toHaveBeenCalled();
	});

	it("should call toggleAll when 'All' checkBox is clicked", () => {
		const mockedToggleAll = jest.fn();

		render(
			<MarketingPreferencesComponent
				formData={{
					isEmailEnabled: true,
					isCallEnabled: false,
					isSmsEnabled: false,
					isPushEnabled: false,
					isLineEnabled: false,
				}}
				toggleEmailEnabled={jest.fn()}
				toggleCallEnabled={jest.fn()}
				toggleSmsEnabled={jest.fn()}
				togglePushEnabled={jest.fn()}
				toggleLineEnabled={jest.fn()}
				isAllChecked={false}
				toggleAll={mockedToggleAll}
				hasLineNotification={false}
			/>
		);

		const allCheckBox = screen.getAllByTestId("check-box")[0];

		allCheckBox.click();
		expect(mockedToggleAll).toHaveBeenCalled();
	});
});
