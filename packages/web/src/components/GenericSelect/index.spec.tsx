import { act, waitFor, fireEvent } from "@testing-library/react";
import GenericSelect from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

function waitForSelectDropdownToBeInTheDocument(): Promise<void> {
	return waitFor(() => {
		return expect(
			document.querySelector(".ant-select-dropdown")
		).toBeInTheDocument();
	});
}

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("GenericSelect", () => {
	it("should display label of form", async () => {
		act(() => {
			renderWithLanguage(
				<GenericSelect
					value={"NON_USER"}
					onChange={jest.fn()}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
					placeholder={
						"completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
					}
					items={[
						{
							value: "NON_USER",
							label: "completeYourProfileForm.form.notWearingContactLens",
						},
						{
							value: "ACUVUE_USER",
							label: "completeYourProfileForm.form.wearingAcuvueContactLens",
						},
						{
							value: "OTHER_BRAND_USER",
							label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
						},
					]}
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const label = screen.getByText("Do you wear contact lenses?");
			expect(label).toBeVisible();
		});
	});

	it("should display correct default value", async () => {
		act(() => {
			renderWithLanguage(
				<GenericSelect
					value={"ACUVUE_USER"}
					onChange={jest.fn()}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
					placeholder={
						"completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
					}
					items={[
						{
							value: "NON_USER",
							label: "completeYourProfileForm.form.notWearingContactLens",
						},
						{
							value: "ACUVUE_USER",
							label: "completeYourProfileForm.form.wearingAcuvueContactLens",
						},
						{
							value: "OTHER_BRAND_USER",
							label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
						},
					]}
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const text = screen.getByText(
				"Yes, I am currently wearing ACUVUE brand contact lenses"
			);
			expect(text).toBeVisible();
		});
	});

	it("should call onChange on user selects option", async () => {
		const mockOnChange = jest.fn();

		renderWithLanguage(
			<GenericSelect
				value={"OTHER_BRAND_USER"}
				onChange={mockOnChange}
				label={"completeYourProfileForm.form.myAcuvueBrandLenseLabel"}
				placeholder={
					"completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
				}
				items={[
					{
						value: "NON_USER",
						label: "completeYourProfileForm.form.notWearingContactLens",
					},
					{
						value: "ACUVUE_USER",
						label: "completeYourProfileForm.form.wearingAcuvueContactLens",
					},
					{
						value: "OTHER_BRAND_USER",
						label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
					},
				]}
				sendFormError={jest.fn()}
			/>
		);

		act(() => {
			const select = screen.getAntSelect();
			fireEvent.mouseDown(select);
		});

		await waitForSelectDropdownToBeInTheDocument();

		expect(mockOnChange).not.toHaveBeenCalled();

		act(() => {
			const selectOption = screen.getAntSelectOption(
				"No, I am currently not wearing any contact lenses"
			);
			selectOption.click();
		});

		await waitFor(() => {
			expect(mockOnChange).toHaveBeenCalledWith("NON_USER");
		});
	});

	it("should display error when there is an errorKey and input is blur", async () => {
		renderWithLanguage(
			<GenericSelect
				value={"OTHER_BRAND_USER"}
				onChange={jest.fn()}
				label={"completeYourProfileForm.form.myAcuvueBrandLenseLabel"}
				placeholder={
					"completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
				}
				items={[
					{
						value: "NON_USER",
						label: "completeYourProfileForm.form.notWearingContactLens",
					},
					{
						value: "ACUVUE_USER",
						label: "completeYourProfileForm.form.wearingAcuvueContactLens",
					},
					{
						value: "OTHER_BRAND_USER",
						label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
					},
				]}
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
			const select = screen.getAntSelect();
			fireEvent.blur(select);
		});

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});

	it("should display error when there is an alwaysVisibleErrorKey", async () => {
		renderWithLanguage(
			<GenericSelect
				value={"ACUVUE_USER"}
				onChange={jest.fn()}
				label={"completeYourProfileForm.form.myAcuvueBrandLenseLabel"}
				placeholder={
					"completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
				}
				items={[
					{
						value: "NON_USER",
						label: "completeYourProfileForm.form.notWearingContactLens",
					},
					{
						value: "ACUVUE_USER",
						label: "completeYourProfileForm.form.wearingAcuvueContactLens",
					},
					{
						value: "OTHER_BRAND_USER",
						label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
					},
				]}
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
