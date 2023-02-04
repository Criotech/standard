import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { useLegalAge } from "../../../hooks/useLegalAge";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import { Gender, LegalAgeRange } from "@myacuvue_thailand_web/services";
import GenericSelect from "../../../components/GenericSelect";
import MonthYearInput from "../../../components/MonthYearInput";
import RadioGroup from "../../../components/RadioGroup";
import Text from "../../../components/Text";
import { OtherProfileDetails } from ".";
import { useUser } from "../../../hooks/useUser";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useSettings } from "../../../hooks/useSettings";
import { useToggleAll } from "../../../hooks/useToggleAll";
import userEvent from "@testing-library/user-event";
import Checkbox from "../../../components/Checkbox";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useConfiguration } from "../../../hooks/useConfiguration";

jest.mock("../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

jest.mock("../../../hooks/useToggleAll", () => ({
	useToggleAll: jest.fn(),
}));

jest.mock("../../../components/GenericSelect", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
	}: ComponentProps<typeof GenericSelect>) => (
		<div>
			<div data-testid="generic-select-server-error">
				{alwaysVisibleErrorKey}
			</div>
			<select
				data-testid="generic-select"
				onChange={onChange as any}
				onClick={onChange as any}
			/>
		</div>
	),
}));

jest.mock("../../../components/MonthYearInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		disabled,
	}: ComponentProps<typeof MonthYearInput>) => (
		<div data-testid="month-year-input">
			<div data-testid="month-year-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
			<span data-testid="month-year-disabled">
				{disabled ? "disabled" : "not-disabled"}
			</span>
		</div>
	),
}));

jest.mock("../../../components/RadioGroup", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
	}: ComponentProps<typeof RadioGroup>) => (
		<div data-testid="radio-group">
			<div data-testid="radio-group-server-error">
				{alwaysVisibleErrorKey}
			</div>
			<input
				type="radio"
				data-testid="radio-input"
				onChange={onChange as any}
			/>
		</div>
	),
}));

jest.mock("../../../components/Checkbox", () => ({
	__esModule: true,
	default: ({ onChange }: ComponentProps<typeof Checkbox>) => (
		<input
			type="checkbox"
			data-testid="checkbox"
			onChange={onChange as any}
		/>
	),
}));

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<div data-testid="block-title">{textKey}</div>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../../hooks/validations/useRegisterValidations");

jest.mock("../../../hooks/useLegalAge", () => ({
	useLegalAge: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const defaultProps = {
	formData: { firstName: "", lastName: "" },
	setFormData: jest.fn(),
	errorKeys: {},
	serverErrorKeys: {},
	handleSubmit: jest.fn(),
	onToggleCallEnabled: jest.fn(),
	onTogglePushEnabled: jest.fn(),
	onToggleEmailEnabled: jest.fn(),
	onToggleSmsEnabled: jest.fn(),
	onToggleLineEnabled: jest.fn(),
	isPreferencesChecked: false,
	onToggleAllPreferences: jest.fn(),
	month: 4,
	setMonth: jest.fn(),
	year: 1960,
	setYear: jest.fn(),
	validateBirth: jest.fn(),
	isParentalConsent: true,
	userProfile: undefined,
	marketingPreferences: {
		isCallEnabled: false,
		isPushEnabled: true,
		isEmailEnabled: false,
		isSmsEnabled: false,
		isLineEnabled: false,
	},
	hasError: false,
	hasLineNotification: false,
};

describe("OtherProfileDetails", () => {
	beforeEach(() => {
		(useUser as jest.Mock).mockReturnValue({
			saveProfile: jest.fn(),
		});

		(useAuthentication as jest.Mock).mockReturnValue({
			sessionToken: { rawValue: "fake-session-token" },
		});

		(useRegisterValidations as jest.Mock).mockReturnValue({
			validateEmail: jest.fn(),
			validateFirstName: jest.fn(),
			validateLastName: jest.fn(),
			validateBirthday: jest.fn(),
			validateLensesUsage: jest.fn(),
			isValidPhoneNumber: jest.fn(),
		});

		(useSettings as jest.Mock).mockReturnValue({
			getNotificationPreferences: jest.fn().mockResolvedValue({
				marketing: {
					isCallEnabled: false,
					isPushEnabled: true,
					isEmailEnabled: false,
					isSmsEnabled: false,
				},
			}),
			saveNotificationPreferences: jest.fn(),
		});

		(useLegalAge as jest.Mock).mockReturnValue({
			getLegalAgeRange: jest.fn(),
		});

		(useConfiguration as jest.Mock).mockReturnValue({
			hasNonBinaryGenderOption: true,
		});

		(useToggleAll as jest.Mock).mockReturnValue([true, jest.fn()]);
	});

	it("should render without error", () => {
		render(<OtherProfileDetails {...defaultProps} />);
	});

	it("should render 1 GenericSelect", async () => {
		render(<OtherProfileDetails {...defaultProps} />);
		const genericSelect = await screen.findAllByTestId("generic-select");
		expect(genericSelect).toHaveLength(1);
	});

	it("should render MonthYearInput", () => {
		render(<OtherProfileDetails {...defaultProps} />);

		const monthYearInput = screen.getByTestId("month-year-input");
		expect(monthYearInput).toBeInTheDocument();
	});

	it("should render 2 RadioGroup", async () => {
		render(<OtherProfileDetails {...defaultProps} />);
		const radioGroup = await screen.findAllByTestId("radio-group");
		expect(radioGroup).toHaveLength(2);
	});

	it("should render Checkbox if minor", async () => {
		(useLegalAge as jest.Mock).mockReturnValue({
			getLegalAgeRange: jest
				.fn()
				.mockReturnValue(LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT),
		});

		render(<OtherProfileDetails {...defaultProps} />);
		const checkbox = await screen.findAllByTestId("checkbox");
		expect(checkbox).toHaveLength(6);
	});

	it("should call setFormData on user clicks Radio button", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const radioInput = screen.getAllByTestId("radio-input")[0];
		userEvent.click(radioInput);
		userEvent.keyboard("1");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should call setFormData on user clicks spectacles radios", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const radioInput = screen.getAllByTestId("radio-input")[1];
		userEvent.click(radioInput);
		userEvent.keyboard("2");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should call setFormData on user selects option in generic select", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const genericSelect = screen.getAllByTestId("generic-select")[0];
		userEvent.click(genericSelect);
		userEvent.keyboard("1");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should call setFormData when user checks consent checkbox", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const checkbox = screen.getAllByTestId("checkbox")[0];
		userEvent.click(checkbox);
		userEvent.keyboard("1");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should not disable month year input when they are not filled in profile before", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const monthYearInput = screen.getByTestId("month-year-disabled");
		expect(monthYearInput).toHaveTextContent("not-disabled");
	});

	it("should disable month year input when they are filled in profile before", () => {
		const fakeSetFormData = jest.fn();
		render(
			<OtherProfileDetails
				{...defaultProps}
				userProfile={{
					birthYear: "1930",
					birthMonth: "12",
					myAcuvueId: "",
					firstName: "",
					lastName: "",
					phone: "",
					email: "",
					gender: Gender.FEMALE,
					isSpectaclesWearer: false,
					lensesUsage: "ACUVUE_USER",
					hasParentalConsent: false,
				}}
				setFormData={fakeSetFormData}
			/>
		);

		const monthYearInput = screen.getByTestId("month-year-disabled");
		expect(monthYearInput).not.toHaveTextContent("not-disabled");
		expect(monthYearInput).toHaveTextContent("disabled");
	});
});
