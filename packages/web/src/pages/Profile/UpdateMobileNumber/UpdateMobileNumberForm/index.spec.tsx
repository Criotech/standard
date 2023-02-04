import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UpdateMobileNumberForm from ".";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import TrackedGenericInput from "../../../../components/TrackedGenericInput";
import TrackedForm from "../../../../components/TrackedForm";

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../components/TrackedForm", () => ({
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

jest.mock("../../../../components/TrackedGenericInput", () => ({
	__esModule: true,
	default: ({
		prefix,
		onChange,
	}: ComponentProps<typeof TrackedGenericInput>) => (
		<div data-testid="generic-input">
			{prefix}
			<input
				type="text"
				data-testid="text-input"
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	),
}));

describe("UpdateMobileNumberForm", () => {
	it("should render without any error", () => {
		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				isSubmitDisabled
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);
	});

	it("should render tracking form name", () => {
		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				isSubmitDisabled
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		const trackingFormName = screen.getByTestId("tracking-form-name");

		expect(trackingFormName).toBeInTheDocument();
		expect(trackingFormName).toHaveTextContent("update_phone");
	});

	it("should render a text input and two buttons", () => {
		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				isSubmitDisabled
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		const textInput = screen.getByTestId("text-input");
		expect(textInput).toBeInTheDocument();

		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	it("should disabled button if mobile number is not valid", () => {
		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				isSubmitDisabled
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		const receiveOtpButton = screen.getAllByRole("button")[0];
		expect(receiveOtpButton).toHaveAttribute("disabled");
	});

	it("should call handleSubmit on form submission", async () => {
		const mockSubmit = jest.fn();
		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix=""
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={mockSubmit}
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		fireEvent.change(screen.getByTestId("text-input"), {
			target: { value: "123456789" },
		});
		const form = screen.getByTestId("form");
		fireEvent.submit(form);

		await waitFor(() => {
			expect(mockSubmit).toHaveBeenCalled();
		});
	});

	it("should render correct country code", () => {
		const { container } = render(
			<UpdateMobileNumberForm
				phoneNumberPrefix="+61"
				formData={{ phone: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		expect(container.querySelector(".country-code")).toBeInTheDocument();
		expect(container.querySelector(".country-code")).toHaveTextContent(
			"+61"
		);
	});

	it("should call setFormData on change", async () => {
		const mockSetFormData = jest.fn();

		render(
			<UpdateMobileNumberForm
				phoneNumberPrefix="+61"
				formData={{ phone: "" }}
				setFormData={mockSetFormData}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				phoneLength={10}
				onCancel={jest.fn()}
			/>
		);

		fireEvent.change(screen.getByTestId("text-input"), {
			target: { value: "123456789" },
		});

		await waitFor(() => {
			expect(mockSetFormData).toHaveBeenCalledWith({
				phone: "123456789",
			});
		});
	});
});
