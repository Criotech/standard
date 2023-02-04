import { fireEvent, render, screen } from "@testing-library/react";
import MobileNumberRegistrationForm from ".";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import { Form as AntForm } from "antd";
import TrackedGenericInput from "../../../../components/TrackedGenericInput";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../components/TrackedForm", () => ({
	__esModule: true,
	default: ({ children }: ComponentProps<typeof AntForm>) => (
		<div data-testid="form">{children}</div>
	),
}));

jest.mock("../../../../components/TrackedGenericInput", () => ({
	__esModule: true,
	default: ({ prefix }: ComponentProps<typeof TrackedGenericInput>) => (
		<div data-testid="generic-input">
			{prefix}
			<input type="text" data-testid="text-input" />
		</div>
	),
}));

describe("MobileNumberRegistrationForm", () => {
	it("should render without any error", () => {
		render(
			<MobileNumberRegistrationForm
				mobileNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={() => {}}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={() => {}}
				isSubmitDisabled
				phoneLength={10}
				setIsPhoneAlreadyExists={jest.fn().mockReturnValue(false)}
			/>
		);
	});

	it("should render a text input and a button", () => {
		render(
			<MobileNumberRegistrationForm
				mobileNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={() => {}}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={() => {}}
				isSubmitDisabled
				phoneLength={10}
				setIsPhoneAlreadyExists={jest.fn().mockReturnValue(false)}
			/>
		);

		const textInput = screen.getByTestId("text-input");
		expect(textInput).toBeInTheDocument();

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("should render the button disabled if phone number is not valid", () => {
		render(
			<MobileNumberRegistrationForm
				mobileNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={() => {}}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={() => {}}
				isSubmitDisabled
				phoneLength={10}
				setIsPhoneAlreadyExists={jest.fn().mockReturnValue(false)}
			/>
		);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("disabled");
	});

	it("should call handleSubmit on form submission", () => {
		render(
			<MobileNumberRegistrationForm
				mobileNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={() => {}}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={() => {}}
				phoneLength={10}
				setIsPhoneAlreadyExists={jest.fn().mockReturnValue(false)}
			/>
		);

		fireEvent.change(screen.getByTestId("text-input"), {
			target: { value: "123456789" },
		});
		const button = screen.getByRole("button");
		fireEvent.click(button);
	});

	it("should render correct country code", () => {
		const { container } = render(
			<MobileNumberRegistrationForm
				mobileNumberPrefix="+61"
				formData={{ phone: "" }}
				setFormData={() => {}}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={() => {}}
				phoneLength={10}
				setIsPhoneAlreadyExists={jest.fn().mockReturnValue(false)}
			/>
		);

		expect(container.querySelector(".country-code")).toBeInTheDocument();
		expect(container.querySelector(".country-code")).toHaveTextContent(
			"+61"
		);
	});
});
