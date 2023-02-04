import { act, waitFor, fireEvent } from "@testing-library/react";
import GenericInput from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("GenericInput", () => {
	it("should display label of form", async () => {
		act(() => {
			renderWithLanguage(
				<GenericInput
					type={"text"}
					name={"fakeName"}
					value={"fakeValue"}
					onChange={jest.fn()}
					placeholder={
						"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
					}
					label={
						"joinNowPage.mobileNumberRegistration.mobileNumberLabel"
					}
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
				<GenericInput
					type={"text"}
					name={"fakeName"}
					value={"fakeValue"}
					onChange={jest.fn()}
					placeholder={
						"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
					}
					label={
						"joinNowPage.mobileNumberRegistration.mobileNumberLabel"
					}
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
			<GenericInput
				type={"text"}
				name={"fakeName"}
				value={"fakeValue"}
				onChange={mockOnChange}
				placeholder={
					"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				}
				label={"joinNowPage.mobileNumberRegistration.mobileNumberLabel"}
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
			<GenericInput
				type={"text"}
				name={"fakeName"}
				value={"fakeValue"}
				onChange={jest.fn()}
				placeholder={
					"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				}
				label={"joinNowPage.mobileNumberRegistration.mobileNumberLabel"}
				errorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
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
			<GenericInput
				type={"text"}
				name={"fakeName"}
				value={"fakeValue"}
				onChange={jest.fn()}
				placeholder={
					"joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				}
				label={"joinNowPage.mobileNumberRegistration.mobileNumberLabel"}
				alwaysVisibleErrorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});
});
