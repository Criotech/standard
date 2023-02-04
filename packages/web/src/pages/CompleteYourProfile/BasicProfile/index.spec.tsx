import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenericInput from "../../../components/GenericInput";
import Text from "../../../components/Text";
import { BasicProfile } from "./";
import { usePhone } from "../../../hooks/usePhone";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
	}: ComponentProps<typeof GenericInput>) => (
		<div>
			<div data-testid="generic-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
			<input
				type="text"
				data-testid="generic-input"
				onChange={onChange as any}
			/>
		</div>
	),
}));

jest.mock("../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

const defaultProps = {
	phone: "61484949482",
	formData: {
		firstName: "",
		lastName: "",
	},
	setFormData: jest.fn(),
	errorKeys: {},
	serverErrorKeys: {},
};

describe("BasicProfile", () => {
	beforeEach(() => {
		(usePhone as jest.Mock).mockReturnValue({
			formatPhoneNumber: jest.fn().mockReturnValue("+61 484949482"),
		});
	});

	it("should render without error", () => {
		render(<BasicProfile {...defaultProps} />);
	});

	it("should render two GenericInput components", async () => {
		render(<BasicProfile {...defaultProps} />);
		const GenericInput = await screen.findAllByTestId("generic-input");
		expect(GenericInput).toHaveLength(2);
	});

	it("should call setFormData on user input in first name GenericInput", () => {
		const fakeSetFormData = jest.fn();
		render(
			<BasicProfile {...defaultProps} setFormData={fakeSetFormData} />
		);

		const genericInput = screen.getAllByTestId("generic-input")[0];
		userEvent.click(genericInput);
		userEvent.keyboard("John");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should call setFormData on user input in last name input", () => {
		const fakeSetFormData = jest.fn();
		render(
			<BasicProfile {...defaultProps} setFormData={fakeSetFormData} />
		);

		const genericInput = screen.getAllByTestId("generic-input")[1];
		userEvent.click(genericInput);
		userEvent.keyboard("Doe");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should render the phone number in the form, which is passed as prop", () => {
		render(<BasicProfile {...defaultProps} />);
		const mobileNumber = screen.getByText("+61 484949482");
		expect(mobileNumber).toBeInTheDocument();
	});
});
