import {
	IAddressState,
	IUserAddress,
	InvalidFormSubmissionError,
	Region,
} from "@myacuvue_thailand_web/services";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { Form as AntForm, Select as AntSelect } from "antd";
import { ComponentProps } from "react";
import { useHistory } from "react-router-dom";
import EditAddressComplete from "./index";
import GenericInput from "../../components/GenericInput";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useAddress } from "../../hooks/useAddress";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useString } from "../../hooks/useString";
import { useTranslation } from "../../hooks/useTranslation";
import useAddressValidation from "../../hooks/validations/useAddressValidation";

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form data-testid="antd-form" onSubmit={onFinish}>
			{children}
		</form>
	),
	Select: {
		Option: ({ value }: ComponentProps<typeof AntSelect>) => (
			<option data-testid="antd-select-option">{value}</option>
		),
	},
}));

jest.mock("../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		name,
		value,
		onChange,
		alwaysVisibleErrorKey,
	}: ComponentProps<typeof GenericInput>) => (
		<>
			<input
				type="text"
				data-testid="generic-input"
				name={name}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{alwaysVisibleErrorKey && (
				<span data-testid="generic-sever-error">
					{alwaysVisibleErrorKey}
				</span>
			)}
		</>
	),
}));

jest.mock("../../components/Select", () => ({
	__esModule: true,
	default: ({ children }: ComponentProps<typeof Select>) => (
		<select data-testid="select">{children}</select>
	),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="myacuvue-lite-header" />,
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="myacuvue-lite-footer" />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-profile-title" />,
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useString", () => ({
	useString: jest.fn(),
}));

jest.mock("../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
}));

jest.mock("../../hooks/useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("../../hooks/validations/useAddressValidation");

const fakeGetAddress: IUserAddress = {
	line1: "fakeLine1",
	line2: "fakeLine2",
	line3: "fakeLine3",
	city: "fakeCity",
	state: "fakeState",
	postCode: "123456",
	countryCode: Region.MYS,
};

const fakeStates: IAddressState[] = [
	{
		id: "fakeId1",
		names: {
			en: "fakeName1",
		},
	},
	{
		id: "fakeId2",
		names: {
			en: "fakeName2",
		},
	},
];

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		instance: "scdf",
		postalCodeLength: 5,
	});

	(useString as jest.Mock).mockReturnValue({
		deleteNonDigits: jest.fn(),
	});

	(useAddress as jest.Mock).mockReturnValue({
		getMailingAddress: jest.fn().mockResolvedValue(fakeGetAddress),
		getStates: jest.fn().mockResolvedValue(fakeStates),
		saveMailingAddress: jest.fn().mockResolvedValue({}),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		Status: {
			SUCCESS: "success",
			WARN: "warn",
		},
		showSnackbar: jest.fn(),
	});

	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		postalCodeLength: 5,
		region: "MYS",
	});

	(useString as jest.Mock).mockReturnValue({
		deleteNonDigits: jest.fn(),
	});

	(useAddressValidation as jest.Mock).mockReturnValue({
		validateAddressLine1: jest.fn().mockReturnValue(undefined),
		validateAddressLine2: jest.fn().mockReturnValue(undefined),
		validateAddressLine3: jest.fn().mockReturnValue(undefined),
		validateCity: jest.fn().mockReturnValue(undefined),
		validateState: jest.fn().mockReturnValue(undefined),
		validatePostCode: jest.fn().mockReturnValue(undefined),
	});
});

describe("EditAddressComplete", () => {
	it("should render without error", async () => {
		await act(async () => {
			render(<EditAddressComplete />);
		});
	});

	it("should render myacuvue lite header", async () => {
		await act(async () => {
			render(<EditAddressComplete />);
		});

		const header = screen.getByTestId("myacuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render myacuvue lite footer", async () => {
		await act(async () => {
			render(<EditAddressComplete />);
		});

		const header = screen.getByTestId("myacuvue-lite-footer");
		expect(header).toBeInTheDocument();
	});

	it("should update profile with correct form data when submitting the form with no errors", async () => {
		const fakeUpdateAddress = jest.fn();

		(useAddress as jest.Mock).mockReturnValue({
			getMailingAddress: jest.fn().mockReturnValue(fakeGetAddress),
			getStates: jest.fn().mockResolvedValue(fakeStates),
			saveMailingAddress: fakeUpdateAddress,
		});

		await act(async () => {
			render(<EditAddressComplete />);
		});

		const formElement = screen.getByTestId("antd-form");

		expect(formElement).toBeInTheDocument();

		act(() => {
			fireEvent.submit(formElement);
		});

		await waitFor(() => {
			expect(fakeUpdateAddress).toHaveBeenCalled();
		});
	});

	it("should display errors if API returns error", async () => {
		const payloadErrors = {
			postCode: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(useAddress as jest.Mock).mockReturnValue({
			getMailingAddress: jest.fn().mockReturnValue(fakeGetAddress),
			getStates: jest.fn().mockResolvedValue(fakeStates),
			saveMailingAddress: jest.fn().mockImplementation(() => {
				throw error;
			}),
		});

		await act(async () => {
			render(<EditAddressComplete />);
		});

		const formElement = screen.getByTestId("antd-form");

		expect(formElement).toBeInTheDocument();

		act(() => {
			fireEvent.submit(formElement);
		});

		await waitFor(() => {
			const postCodeError = screen.queryByText(
				"validation.postCode.any.invalid"
			);
			expect(postCodeError).toBeInTheDocument();
		});
	});

	it("should call setFormData on input change", async () => {
		await act(async () => {
			render(<EditAddressComplete />);
		});

		const genericInputs = screen.getAllByTestId("generic-input");
		const line1 = genericInputs[0];
		const line2 = genericInputs[1];
		const line3 = genericInputs[2];
		const city = genericInputs[3];
		const postCode = genericInputs[4];

		fireEvent.change(line1, { target: { value: "newLine1" } });
		fireEvent.change(line2, { target: { value: "newLine2" } });
		fireEvent.change(line3, { target: { value: "newLine3" } });
		fireEvent.change(city, { target: { value: "newCity" } });
		fireEvent.change(postCode, { target: { value: "123456" } });

		await waitFor(() => {
			expect(line1).toHaveAttribute("value", "newLine1");
			expect(line2).toHaveAttribute("value", "newLine2");
			expect(line3).toHaveAttribute("value", "newLine3");
			expect(city).toHaveAttribute("value", "newCity");
			expect(postCode).toHaveAttribute("value", "123456");
		});
	});

	it("should redirect to /profile when clicking cancel", async () => {
		await act(async () => {
			render(<EditAddressComplete />);
		});

		const cancelButton = screen.getByText("editProfilePage.form.cancel");
		cancelButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/profile");
	});
});
