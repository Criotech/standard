import OtpInput from "./index";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "../../test-utils";
import { ComponentProps } from "react";
import { Form as AntForm } from "antd";

jest.mock("antd", () => ({
	Form: {
		Item: ({ children }: ComponentProps<typeof AntForm.Item>) => (
			<div data-testid="form">{children}</div>
		),
	},
}));

describe("OtpInput", () => {
	it("should render without errors", async () => {
		render(<OtpInput />);
	});

	it("should call onChange when typing text", async () => {
		const mockOnChange = jest.fn();
		const { container } = render(
			<OtpInput onChange={mockOnChange} sendFormError={jest.fn()} />
		);

		const input = container.querySelectorAll("input")[0];
		userEvent.click(input);
		userEvent.keyboard("1");

		expect(mockOnChange).toHaveBeenCalledWith("1");
	});

	it("should call sendFormError when there is an alwaysVisibleErrorKey", async () => {
		const mockOnChange = jest.fn();
		const mockSendFormError = jest.fn();

		render(
			<OtpInput
				value={"fakeValue"}
				onChange={mockOnChange}
				sendFormError={mockSendFormError}
				alwaysVisibleErrorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
			/>
		);

		expect(mockSendFormError).toHaveBeenCalled();
	});
});
