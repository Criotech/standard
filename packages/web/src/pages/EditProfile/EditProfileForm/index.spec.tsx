import { fireEvent, render, screen } from "@testing-library/react";
import EditProfileForm from ".";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import { Form as AntForm } from "antd";
import GenericInput from "../../../components/GenericInput";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<div data-testid="form" onClick={onFinish}>
			{children}
		</div>
	),
}));

jest.mock("../../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		name,
		value,
		onChange,
	}: ComponentProps<typeof GenericInput>) => (
		<input
			type="text"
			data-testid="generic-input"
			name={name}
			value={value}
			onChange={onChange as any}
		/>
	),
}));

jest.mock("../../../icons/QuestionMarkIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="question-mark-icon" />,
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		supportEmailAddress: "fakeMail",
	});
});

describe("EditProfileForm", () => {
	it("should render without any error", () => {
		render(
			<EditProfileForm
				formData={{ firstName: "", lastName: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				onCancel={jest.fn()}
			/>
		);
	});

	it("should render two text input", () => {
		render(
			<EditProfileForm
				formData={{ firstName: "", lastName: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				onCancel={jest.fn()}
			/>
		);

		const textInput = screen.getAllByTestId("generic-input");
		expect(textInput).toHaveLength(2);
	});

	it("should render the button disabled if isUpdateDisabled is not valid", () => {
		render(
			<EditProfileForm
				formData={{ firstName: "", lastName: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				isUpdateDisabled
				onCancel={jest.fn()}
			/>
		);

		const button = screen.getAllByRole("button")[0];
		expect(button).toHaveAttribute("disabled");
	});

	it("should call handleSubmit on form submission", () => {
		const fakeOnSubmit = jest.fn();
		render(
			<EditProfileForm
				formData={{ firstName: "", lastName: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={fakeOnSubmit}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				onCancel={jest.fn()}
			/>
		);

		fireEvent.change(screen.getAllByTestId("generic-input")[0], {
			target: { value: "123456789" },
		});
		const button = screen.getAllByRole("button")[0];
		fireEvent.click(button);

		expect(fakeOnSubmit).toHaveBeenCalled();
	});

	it("should call setFormData in onChange", () => {
		const fakeSetFormData = jest.fn();

		render(
			<EditProfileForm
				formData={{ firstName: "abc", lastName: "abc" }}
				setFormData={fakeSetFormData}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				onCancel={jest.fn()}
			/>
		);
		const genericInputs = screen.getAllByTestId("generic-input");
		expect(genericInputs[0]).toHaveAttribute("value", "abc");

		fireEvent.change(genericInputs[0], { target: { value: "abc123" } });
		expect(fakeSetFormData).toHaveBeenCalled();

		fireEvent.change(genericInputs[1], { target: { value: "abc123" } });
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should render member support link with correct email", () => {
		render(
			<EditProfileForm
				formData={{ firstName: "", lastName: "" }}
				setFormData={jest.fn()}
				errorKeys={{}}
				serverErrorKeys={{}}
				onSubmit={jest.fn()}
				dateOfBirthday=""
				emailAddress=""
				gender="editProfilePage.form.genderMaleLabel"
				onCancel={jest.fn()}
			/>
		);

		const memberEmailLink = screen.getByRole("link");

		expect(memberEmailLink).toBeInTheDocument();
		expect(memberEmailLink).toHaveAttribute("href");
		expect(memberEmailLink.getAttribute("href")).toBe("mailto:fakeMail");
	});
});
