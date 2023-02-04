import { render, screen, act, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import { useRegistration } from "../../../hooks/useRegistration";
import PhoneForm from ".";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import userEvent from "@testing-library/user-event";
import { PayloadErrors } from "@myacuvue_thailand_web/services/dist/errors/InvalidFormSubmissionError";
import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import Text from "../../../components/Text";
import { Form as AntForm } from "antd";
import GenericInput from "../../../components/GenericInput";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
			data-testid="form"
		>
			{children}
		</form>
	),
	Image: () => <img data-testid="image" alt="" />,
}));

jest.mock("../../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
		value,
	}: ComponentProps<typeof GenericInput>) => (
		<div>
			<span data-testid="server-error-key">{alwaysVisibleErrorKey}</span>
			<input
				onChange={(e) => onChange(e.target.value)}
				type="text"
				data-testid="text-input"
				value={value}
				name="text-input"
			/>
		</div>
	),
}));

jest.mock("../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

beforeEach(() => {
	(useRegistration as jest.Mock).mockReturnValue({
		register: jest.fn(),
	});
	(useRegisterValidations as jest.Mock).mockReturnValue({
		isValidPhoneNumber: jest.fn(),
	});
});

describe("PhoneForm", () => {
	it("should render without any error", () => {
		render(<PhoneForm />);
	});

	it("should render a text input and a button", () => {
		render(<PhoneForm />);

		const textInput = screen.getByTestId("text-input");
		expect(textInput).toBeInTheDocument();

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("should render the button disabled if phone number is not valid", () => {
		const { isValidPhoneNumber } = useRegisterValidations();
		(isValidPhoneNumber as jest.Mock).mockReturnValueOnce(false);
		render(<PhoneForm />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("disabled");
	});

	it("should update formData when form input is updated", async () => {
		render(<PhoneForm />);

		act(() => {
			const input = screen.getByTestId("text-input");
			userEvent.click(input);
			userEvent.keyboard("9");
		});
		await waitFor(() => {
			let updatedText = screen.getByTestId("text-input");
			expect(updatedText).toHaveValue("9");
		});
	});

	it("should call register when form is submitted and has no errors", () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(true);

		render(<PhoneForm />);
		const { register } = useRegistration();

		const buttons = screen.queryAllByRole("button");

		const registerButton = buttons.find((button) =>
			button.className.includes("register-button")
		);
		expect(registerButton).toBeDefined();
		userEvent.click(registerButton!);
		expect(register).toHaveBeenCalled();
	});

	it("should display serverErrorKeys if any", async () => {
		const payloadErrors = {
			phone: {
				"validation.any.invalid": {},
			},
		} as PayloadErrors;

		const error = new InvalidFormSubmissionError(payloadErrors);

		const expectedFormFieldErrors = [
			{
				fieldName: "phone",
				translationKey: "validation.phone.any.invalid",
				translationData: {},
			},
		];

		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValueOnce(true);

		(useRegistration().register as jest.Mock).mockRejectedValue(error);

		render(<PhoneForm />);

		const buttons = screen.queryAllByRole("button");

		const registerButton = buttons.find((button) =>
			button.className.includes("register-button")
		);
		expect(registerButton).toBeDefined();
		act(() => {
			userEvent.click(registerButton!);
		});

		await waitFor(() => {
			expect(error.formFieldErrors).toStrictEqual(
				expectedFormFieldErrors
			);
		});
	});
});
