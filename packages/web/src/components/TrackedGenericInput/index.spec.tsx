import { act, waitFor, fireEvent } from "@testing-library/react";
import TrackedGenericInput from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("TrackedGenericInput", () => {
	it("should display label of form", async () => {
		act(() => {
			renderWithLanguage(
				<TrackedGenericInput
					type="text"
					name="fakeName"
					value="fakeValue"
					onChange={jest.fn()}
					placeholder={
						"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
					}
					label={
						"joinNowPage.mobileNumberRegistration.mobileNumberLabel"
					}
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const label = screen.getByText("Mobile Number");
			expect(label).toBeVisible();
		});
	});

	it("should display correct default value", async () => {
		act(() => {
			renderWithLanguage(
				<TrackedGenericInput
					type="text"
					name="fakeName"
					value="fakeValue"
					onChange={jest.fn()}
					placeholder={
						"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
					}
					label={
						"joinNowPage.mobileNumberRegistration.mobileNumberLabel"
					}
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const text = screen.getByDisplayValue("fakeValue");
			expect(text).toBeVisible();
		});
	});

	it("should call onChange on user selects option", async () => {
		const mockOnChange = jest.fn();
		renderWithLanguage(
			<TrackedGenericInput
				type="text"
				name="fakeName"
				value="fakeValue"
				onChange={mockOnChange}
				placeholder="joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				label="joinNowPage.mobileNumberRegistration.mobileNumberLabel"
				sendFormError={jest.fn()}
			/>
		);

		act(() => {
			const input = screen.getByRole("textbox");
			userEvent.click(input);
			userEvent.keyboard("fakeValue1");
		});

		await waitFor(() => {
			expect(mockOnChange).toHaveBeenCalledWith("fakeValue1");
		});
	});

	it("should display error when there is an errorKey and input is blur", async () => {
		renderWithLanguage(
			<TrackedGenericInput
				type="text"
				name="fakeName"
				value="fakeValue"
				onChange={jest.fn()}
				placeholder="joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				label="joinNowPage.mobileNumberRegistration.mobileNumberLabel"
				errorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
				sendFormError={jest.fn()}
			/>
		);

		await waitFor(() => {
			expect(screen.queryByText("Please select an answer")).toStrictEqual(
				null
			);
		});

		act(() => {
			const input = screen.getByRole("textbox");
			fireEvent.blur(input);
		});

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});

	it("should display error when there is an alwaysVisibleErrorKey", async () => {
		renderWithLanguage(
			<TrackedGenericInput
				type="text"
				name="fakeName"
				value="fakeValue"
				onChange={jest.fn()}
				placeholder="joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				label="joinNowPage.mobileNumberRegistration.mobileNumberLabel"
				alwaysVisibleErrorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
				sendFormError={jest.fn()}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});
});
