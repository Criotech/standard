import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { ComponentProps } from "react";
import { Form as AntForm } from "antd";
import UpdatePhoneForm from ".";
import Text from "../../../components/Text";
import GenericInput from "../../../components/GenericInput";
import Button from "../../../components/Button";
import { useRegistration } from "../../../hooks/useRegistration";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import { useNavigate } from "react-router-dom-v5-compat";

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
			data-testid="update-form"
		>
			{children}
		</form>
	),
	Image: () => <img data-testid="image" alt="" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/GenericInput", () => ({
	__esModule: true,
	default: ({ value, onChange }: ComponentProps<typeof GenericInput>) => (
		<input
			type="text"
			data-testid="text-input"
			value={value}
			onChange={onChange as any}
		/>
	),
}));

jest.mock("../../../components/Button", () => ({
	__esModule: true,
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
	},
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
	},
	default: ({ onClick, disabled }: ComponentProps<typeof Button>) => (
		<button
			data-testid="submit-button"
			onClick={onClick}
			disabled={disabled}
		/>
	),
}));

jest.mock("../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(useRegistration).mockReturnValue({
		register: jest.fn(),
		resendOtp: jest.fn(),
		validateOtp: jest.fn(),
		registerPhone: jest.fn(),
	});

	mocked(useRegisterValidations).mockReturnValue({
		isValidPhoneNumber: jest.fn(),
		validateSpectableWearer: jest.fn(),
		validateLensesUsage: jest.fn(),
		validateBirthday: jest.fn(),
		removeZeroPrefix: jest.fn(),
		validateGender: jest.fn(),
		validateEmail: jest.fn(),
		validateLastName: jest.fn(),
		validateFirstName: jest.fn(),
	});
});

describe("UpdatePhoneForm", () => {
	it("should render without any error", () => {
		render(<UpdatePhoneForm />);
	});

	it("should render a textbox and a button", () => {
		render(<UpdatePhoneForm />);

		const textInput = screen.getByTestId("text-input");
		expect(textInput).toBeInTheDocument();

		const button = screen.getByTestId("submit-button");
		expect(button).toBeInTheDocument();
	});

	it("should render the button disabled if phone number is not valid", () => {
		(useRegisterValidations as jest.Mock).mockReturnValue({
			isValidPhoneNumber: jest.fn().mockReturnValue(false),
		});

		render(<UpdatePhoneForm />);

		const button = screen.getByTestId("submit-button");
		expect(button).toHaveAttribute("disabled");
	});

	it("should call navigate on form submission for resolved registerPhone", async () => {
		const { registerPhone } = useRegistration();
		const { isValidPhoneNumber } = useRegisterValidations();

		mocked(registerPhone).mockResolvedValueOnce();
		mocked(isValidPhoneNumber).mockReturnValue(true);

		render(<UpdatePhoneForm />);

		const textInput = screen.getByTestId("text-input");
		const button = screen.getByTestId("submit-button");

		fireEvent.change(textInput, {
			target: { value: "123456789" },
		});
		fireEvent.click(button);

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalled();
		});
	});
});
