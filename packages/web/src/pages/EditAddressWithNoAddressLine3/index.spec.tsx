import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
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
import EditAddressWithNoAddressLine3 from ".";
import GenericInput from "../../components/GenericInput";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { useAddress } from "../../hooks/useAddress";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useString } from "../../hooks/useString";
import { useTranslation } from "../../hooks/useTranslation";
import { useConfiguration } from "../../hooks/useConfiguration";
import useAddressValidation from "../../hooks/validations/useAddressValidation";

jest.mock("../../hooks/useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form data-testid="form" onSubmit={onFinish}>
			{children}
		</form>
	),
	Select: {
		Option: ({ value }: ComponentProps<typeof AntSelect>) => (
			<option data-testid="select-option">{value}</option>
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
		<div data-testid="select">{children}</div>
	),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../hooks/validations/useAddressValidation");

jest.mock("../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("../../hooks/useString", () => ({
	useString: jest.fn(),
}));

jest.mock("../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		WARN: "warn",
	},
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
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

jest.mock("../NeoEditAddress/EditAddressTitleAndBlockTitle", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-title-and-blocktitle" />,
}));

const fakeGetAddress = {
	line1: "fakeLine1",
	line2: "fakeLine2",
	city: "fakeCity",
	state: "fakeState",
	postCode: "12345",
};

const fakeStates = [
	{
		id: "fakeId",
		names: { en: "fakeName" },
	},
];

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useAddress as jest.Mock).mockReturnValue({
		getMailingAddress: jest.fn().mockResolvedValue(fakeGetAddress),
		getStates: jest.fn().mockResolvedValue(fakeStates),
		saveMailingAddress: jest.fn(),
	});

	(useAddressValidation as jest.Mock).mockReturnValue({
		validateAddressLine1: jest.fn().mockReturnValue(undefined),
		validateAddressLine2: jest.fn().mockReturnValue(undefined),
		validateCity: jest.fn().mockReturnValue(undefined),
		validatePostCode: jest.fn().mockReturnValue(undefined),
		validateState: jest.fn().mockReturnValue(undefined),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: jest.fn(),
	});

	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		postalCodeLength: 5,
	});

	(useString as jest.Mock).mockReturnValue({
		deleteNonDigits: jest.fn(),
	});
});

describe("EditAddressWithNoAddressLine3", () => {
	it("should render without error", async () => {
		await act(async () => {
			render(<EditAddressWithNoAddressLine3 />);
		});
	});

	it("should render myacuvue lite header", async () => {
		await act(async () => {
			render(<EditAddressWithNoAddressLine3 />);
		});

		const header = screen.getByTestId("myacuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render myacuvue lite footer", async () => {
		await act(async () => {
			render(<EditAddressWithNoAddressLine3 />);
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
			render(<EditAddressWithNoAddressLine3 />);
		});

		const form = screen.getByTestId("form");

		expect(form).toBeInTheDocument();

		act(() => {
			fireEvent.submit(form);
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
			render(<EditAddressWithNoAddressLine3 />);
		});

		const form = screen.getByTestId("form");

		expect(form).toBeInTheDocument();

		act(() => {
			fireEvent.submit(form);
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
			render(<EditAddressWithNoAddressLine3 />);
		});

		const genericInputs = screen.getAllByTestId("generic-input");
		const line1 = genericInputs[0];
		const line2 = genericInputs[1];
		const city = genericInputs[2];

		fireEvent.change(line1, { target: { value: "newLine1" } });
		fireEvent.change(line2, { target: { value: "newLine2" } });
		fireEvent.change(city, { target: { value: "newCity" } });

		await waitFor(() => {
			expect(line1).toHaveAttribute("value", "newLine1");
			expect(line2).toHaveAttribute("value", "newLine2");
			expect(city).toHaveAttribute("value", "newCity");
		});
	});

	it("should redirect to /profile when clicking cancel", async () => {
		await act(async () => {
			render(<EditAddressWithNoAddressLine3 />);
		});

		const cancelButton = screen.getByText("editProfilePage.form.cancel");
		cancelButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/profile");
	});
});
