import AddressForm from "./index";
import {
	render,
	screen,
	act,
	fireEvent,
	waitFor,
} from "@testing-library/react";
import { ComponentProps } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useLegacyAddressValidation from "../../../hooks/validations/useLegacyAddressValidation";
import { useNavigate } from "react-router-dom-v5-compat";
import {
	IAddressState,
	InvalidFormSubmissionError,
	IUserAddress,
	Region,
} from "@myacuvue_thailand_web/services";
import { useAddress } from "../../../hooks/useAddress";
import { useTranslation } from "../../../hooks/useTranslation";
import { useConfiguration } from "../../../hooks/useConfiguration";
import Text from "../../../components/Text";
import { Form as AntForm, Select as AntSelect } from "antd";
import Select from "../../../components/Select";
import { mocked } from "ts-jest/utils";

const fakeAddressStates: IAddressState[] = [
	{
		id: "01-BANGKOK",
		names: {
			en: "Bangkok",
			th: "กรุงเทพมหร",
		},
	},

	{
		id: "02-BANGKOK",
		names: {
			en: "Bangkok2",
			th: "กรุงเทพมหานคร",
		},
	},
];

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../../hooks/validations/useLegacyAddressValidation");

jest.mock("../../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn().mockReturnValue({
		showSnackbar: jest.fn().mockReturnValue(null),
	}),
	Status: {
		SUCCESS: "success",
	},
}));

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form data-testid="ant-form" onSubmit={() => (onFinish as Function)()}>
			{children}
		</form>
	),
	Select: {
		Option: ({ value }: ComponentProps<typeof AntSelect>) => (
			<option data-testid="select-option">{value}</option>
		),
	},
}));

jest.mock("../../../components/GenericInput", () => ({
	__esModule: true,
	default: () => <input data-testid="generic-input" />,
}));

jest.mock("../../../components/Select", () => ({
	__esModule: true,
	default: ({ children }: ComponentProps<typeof Select>) => (
		<select data-testid="select">{children}</select>
	),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <option data-testid="select-loading-block" />,
}));

const fakeAddress: IUserAddress = {
	line1: "line1",
	line2: "line2",
	line3: "line3",
	city: "fake city",
	state: "state",
	postCode: "12345",
	countryCode: Region.THA,
};

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	(useAddress as jest.Mock).mockReturnValue({
		getStates: jest.fn().mockResolvedValue(fakeAddressStates),
		getShippingAddress: jest.fn().mockResolvedValue(fakeAddress),
		saveShippingAddress: jest.fn().mockResolvedValue(null),
	});

	mocked(useSnackbar).mockReturnValue({
		showSnackbar: jest.fn().mockReturnValue(null),
	});

	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		postalCodeLength: 5,
	});

	(useLegacyAddressValidation as jest.Mock).mockReturnValue({
		validateUnitNo: jest.fn().mockReturnValue(true),
		validateBuildingOrStreet: jest.fn().mockReturnValue(true),
		validateSubDistrict: jest.fn().mockReturnValue(true),
		validateDistrict: jest.fn().mockReturnValue(true),
		validateZipCode: jest.fn().mockReturnValue(true),
		validateProvince: jest.fn().mockReturnValue(true),
	});
});

describe("AddressForm", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<AddressForm />);
		});
	});

	it("should render the ant Form", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const antForm = screen.getByTestId("ant-form");
		expect(antForm).toBeInTheDocument();
	});

	it("should render 5 text inputs", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const textInputs = screen.getAllByTestId("generic-input");
		expect(textInputs.length).toEqual(5);
	});

	it("should render Select", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const select = screen.getByTestId("select");
		expect(select).toBeInTheDocument();
	});

	it("should render submit and cancel buttons", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);

		expect(buttons[0]).toHaveTextContent("addressPage.button.submitLabel");
		expect(buttons[1]).toHaveTextContent("addressPage.button.cancelLabel");
	});

	it("should call history.goBack when cancel button is clicked", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const cancelButton = screen.getByText("addressPage.button.cancelLabel");
		expect(cancelButton).toBeInTheDocument();

		act(() => {
			cancelButton.click();
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalled();
		});
	});

	it("should disable submit button if form is not valid", async () => {
		await act(async () => {
			render(<AddressForm />);
		});

		const submitButton = screen.queryByText(
			"addressPage.button.submitLabel"
		);
		expect(submitButton).toHaveAttribute("disabled");
	});

	it("should not disable submit button if form is valid", async () => {
		(useLegacyAddressValidation as jest.Mock).mockReturnValue({
			validateUnitNo: jest.fn().mockReturnValue(false),
			validateBuildingOrStreet: jest.fn().mockReturnValue(false),
			validateSubDistrict: jest.fn().mockReturnValue(false),
			validateDistrict: jest.fn().mockReturnValue(false),
			validateZipCode: jest.fn().mockReturnValue(false),
			validateProvince: jest.fn().mockReturnValue(false),
		});

		await act(async () => {
			render(<AddressForm />);
		});

		const submitButton = screen.queryByText(
			"addressPage.button.submitLabel"
		);
		expect(submitButton).not.toHaveAttribute("disabled");
	});

	it("should call handleAddressSubmit on submit button clicked if form is valid", async () => {
		const { saveShippingAddress } = useAddress();

		mocked(useLegacyAddressValidation).mockReturnValue({
			validateUnitNo: jest.fn().mockReturnValue(false),
			validateBuildingOrStreet: jest.fn().mockReturnValue(false),
			validateSubDistrict: jest.fn().mockReturnValue(false),
			validateDistrict: jest.fn().mockReturnValue(false),
			validateZipCode: jest.fn().mockReturnValue(false),
			validateProvince: jest.fn().mockReturnValue(false),
		});

		await act(async () => {
			render(<AddressForm />);
		});

		const form = screen.getByTestId("ant-form");

		fireEvent.submit(form);

		await waitFor(() => {
			expect(saveShippingAddress).toHaveBeenCalled();
		});
	});

	it("should show serverErrors when saveShippingAddress call fails", async () => {
		mocked(useLegacyAddressValidation).mockReturnValue({
			validateUnitNo: jest.fn().mockReturnValue(false),
			validateBuildingOrStreet: jest.fn().mockReturnValue(false),
			validateSubDistrict: jest.fn().mockReturnValue(false),
			validateDistrict: jest.fn().mockReturnValue(false),
			validateZipCode: jest.fn().mockReturnValue(false),
			validateProvince: jest.fn().mockReturnValue(false),
		});

		(useAddress as jest.Mock).mockReturnValue({
			getStates: jest.fn().mockResolvedValue(fakeAddressStates),
			getShippingAddress: jest.fn().mockResolvedValue(fakeAddress),
			saveShippingAddress: jest.fn().mockRejectedValue(
				new InvalidFormSubmissionError({
					payloadErrors: {
						line1: {
							"addressPage.error.line1":
								"addressPage.error.line1",
						},
					},
				})
			),
		});

		await act(async () => {
			render(<AddressForm />);
		});

		const form = screen.getByTestId("ant-form");

		fireEvent.submit(form);

		const { saveShippingAddress } = useAddress();

		await waitFor(async () => {
			await expect(saveShippingAddress).rejects.toThrow(
				new InvalidFormSubmissionError({})
			);
		});
	});
});
