import { render, screen } from "@testing-library/react";
import MarketingPreferencesForm from ".";
import userEvent from "@testing-library/user-event";
import { useToggleAll } from "../../../hooks/useToggleAll";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import Checkbox from "../../../components/Checkbox";
import BlockTitle from "../../Dashboard/BlockTitle";
import TrackedForm from "../../../components/TrackedForm";

jest.mock("../../../hooks/useToggleAll", () => ({
	useToggleAll: jest.fn(),
}));

jest.mock("../../../components/Checkbox", () => ({
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

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/TrackedForm", () => ({
	__esModule: true,
	default: ({
		children,
		onFinish,
		trackingFormName,
	}: ComponentProps<typeof TrackedForm>) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
		>
			<span data-testid="tracking-form-name">{trackingFormName}</span>
			{children}
		</form>
	),
}));

describe("MarketingPreferencesForm", () => {
	beforeEach(() => {
		(useToggleAll as jest.Mock).mockReturnValue([true, jest.fn()]);
	});

	it("should render without errors", () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
	});

	it("should render tracking form name", () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);

		const trackingFormName = screen.getByTestId("tracking-form-name");

		expect(trackingFormName).toBeInTheDocument();
		expect(trackingFormName).toHaveTextContent(
			"update_marketing_preference"
		);
	});

	it("should render BlockTitle", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const blockTitle = screen.getByTestId("block-title");
		expect(blockTitle).toBeInTheDocument();
		expect(blockTitle).toHaveTextContent(
			"marketPreferencePage.marketPreferenceForm.updateHeader"
		);
	});

	it("should render five checkboxes when hasLineNotification is false", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const checkboxes = screen.getAllByTestId("check-box");
		expect(checkboxes).toHaveLength(5);
	});

	it("should render six checkboxes when hasLineNotification is true", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={true}
			/>
		);
		const checkboxes = screen.getAllByTestId("check-box");
		expect(checkboxes).toHaveLength(6);
	});

	it("should render two Button components", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	it("should render update Button", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const updateButton = screen.getAllByRole("button")[0];
		expect(updateButton).toHaveAttribute("type", "submit");
		expect(updateButton).toHaveTextContent(
			"marketPreferencePage.marketPreferenceForm.updateButton"
		);
	});

	it("should render cancel Button", async () => {
		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={jest.fn()}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={false}
			/>
		);
		const cancelButton = screen.getAllByRole("button")[1];
		expect(cancelButton).toHaveAttribute("type", "button");
		expect(cancelButton).toHaveTextContent(
			"marketPreferencePage.marketPreferenceForm.cancelButton"
		);
	});

	it("should call setFormData when the component renders and checkbox is checked and when", async () => {
		const setFormDataMock = jest.fn();

		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={setFormDataMock}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={true}
			/>
		);

		const checkboxes = screen.getAllByTestId("check-box");

		userEvent.click(checkboxes[1]);
		expect(setFormDataMock).toHaveBeenCalledTimes(1);

		userEvent.click(checkboxes[2]);
		expect(setFormDataMock).toHaveBeenCalledTimes(2);

		userEvent.click(checkboxes[3]);
		expect(setFormDataMock).toHaveBeenCalledTimes(3);

		userEvent.click(checkboxes[4]);
		expect(setFormDataMock).toHaveBeenCalledTimes(4);

		userEvent.click(checkboxes[5]);
		expect(setFormDataMock).toHaveBeenCalledTimes(5);
	});

	it("should call toggleAll when All checkbox is clicked", async () => {
		const toggleAllMock = jest.fn();

		(useToggleAll as jest.Mock).mockReturnValue([false, toggleAllMock]);

		const setFormDataMock = jest.fn();

		render(
			<MarketingPreferencesForm
				formData={{
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: false,
					isSmsEnabled: false,
					isLineEnabled: false,
				}}
				setFormData={setFormDataMock}
				serverErrorKeys={{}}
				isSubmitEnabled={false}
				errorKeys={{}}
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				hasLineNotification={true}
			/>
		);

		const checkboxAll = screen.getAllByTestId("check-box")[0];

		userEvent.click(checkboxAll);
		expect(toggleAllMock).toHaveBeenCalledTimes(1);
	});
});
