import { render, screen } from "@testing-library/react";
import { usePasswordValidation } from "./usePasswordValidation";

const TestComponent = ({ password, confirmPassword }: any) => {
	const {
		passwordCriteriasValidations: {
			hasNumber,
			hasLowercaseLetter,
			hasUppercaseLetter,
			hasMinimumLength,
		},
		validateNewPasswordConfirmation,
	} = usePasswordValidation(password);

	const confirmPasswordValidation =
		validateNewPasswordConfirmation(confirmPassword);

	return (
		<div data-testid="test-component">
			<div data-testid="has-number">{hasNumber.toString()}</div>
			<div data-testid="has-lowercase">
				{hasLowercaseLetter.toString()}
			</div>
			<div data-testid="has-uppercase">
				{hasUppercaseLetter.toString()}
			</div>
			<div data-testid="has-minimum-length">
				{hasMinimumLength.toString()}
			</div>
			<div data-testid="confirm-password-validation">
				{confirmPasswordValidation}
			</div>
		</div>
	);
};

describe("hasMinimumLength", () => {
	it("should return true when password is atleast than 8 characters", () => {
		render(<TestComponent password="fakepass" />);
		const hasMinimumLength = screen.getByTestId("has-minimum-length");
		expect(hasMinimumLength).toHaveTextContent("true");
	});

	it("should return false when password is less than 8 characters", () => {
		render(<TestComponent password="" />);
		const hasMinimumLength = screen.getByTestId("has-minimum-length");
		expect(hasMinimumLength).toHaveTextContent("false");
	});
});

describe("hasUppercaseLetter", () => {
	it("should return true when password has at least one uppercase character", () => {
		render(<TestComponent password="fakePAssword" />);
		const hasUppercaseLetter = screen.getByTestId("has-uppercase");
		expect(hasUppercaseLetter).toHaveTextContent("true");
	});

	it("should return false when password has no uppercase character", () => {
		render(<TestComponent password="fakepassword" />);
		const hasUppercaseLetter = screen.getByTestId("has-uppercase");
		expect(hasUppercaseLetter).toHaveTextContent("false");
	});
});

describe("hasLowercaseLetter", () => {
	it("should return true when password has at least one lowercase character", () => {
		render(<TestComponent password="fakepassword" />);
		const hasLowercaseLetter = screen.getByTestId("has-lowercase");
		expect(hasLowercaseLetter).toHaveTextContent("true");
	});

	it("should return false when password has no uppercase character", () => {
		render(<TestComponent password="FAKEPASSWORD" />);
		const hasLowercaseLetter = screen.getByTestId("has-lowercase");
		expect(hasLowercaseLetter).toHaveTextContent("false");
	});
});

describe("hasNumber", () => {
	it("should return true when password has at least one number", () => {
		render(<TestComponent password="fakep2assword" />);
		const hasNumber = screen.getByTestId("has-number");
		expect(hasNumber).toHaveTextContent("true");
	});

	it("should return false when password has no number", () => {
		render(<TestComponent password="fakepassword" />);
		const hasNumber = screen.getByTestId("has-number");
		expect(hasNumber).toHaveTextContent("false");
	});
});

describe("confirmPassword", () => {
	it("should return validation translation key both password do not match", () => {
		render(
			<TestComponent
				password="fakepassword"
				confirmPassword="wrongPassword"
			/>
		);

		const confirmPasswordValidation = screen.getByTestId(
			"confirm-password-validation"
		);

		expect(confirmPasswordValidation).toHaveTextContent(
			"updatePasswordPage.updatePasswordForm.validations.confirmPassword"
		);
	});
});
