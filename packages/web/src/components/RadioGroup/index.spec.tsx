import { act, waitFor } from "@testing-library/react";
import RadioGroup from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { FC, useState } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const LABEL_KEYS_PER_VALUE: Record<string, TranslationKey> = {
	FIRST_VALUE: "completeYourProfileForm.form.notWearingContactLens",
	SECOND_VALUE: "completeYourProfileForm.form.wearingAcuvueContactLens",
	THIRD_VALUE: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
};

const LABELS_PER_VALUE: Record<string, string> = {
	FIRST_VALUE: "No, I am currently not wearing any contact lenses",
	SECOND_VALUE: "Yes, I am currently wearing ACUVUE brand contact lenses",
	THIRD_VALUE: "Yes, I am currently wearing non-ACUVUE brand contact lenses",
};

interface Props {
	initialValue: "FIRST_VALUE" | "SECOND_VALUE" | "THIRD_VALUE";
	label: TranslationKey;
	errorKey?: TranslationKey;
	alwaysVisibleErrorKey?: TranslationKey;
}

const RadioGroupSampleWithWiredState: FC<Props> = ({
	initialValue,
	label,
	errorKey,
	alwaysVisibleErrorKey,
}) => {
	const [value, setValue] = useState(initialValue);

	return (
		<RadioGroup
			value={value}
			onChange={(
				newValue: "FIRST_VALUE" | "SECOND_VALUE" | "THIRD_VALUE"
			) => setValue(newValue)}
			label={label}
			items={[
				{
					value: "FIRST_VALUE",
					label: LABEL_KEYS_PER_VALUE["FIRST_VALUE"],
				},
				{
					value: "SECOND_VALUE",
					label: LABEL_KEYS_PER_VALUE["SECOND_VALUE"],
				},
				{
					value: "THIRD_VALUE",
					label: LABEL_KEYS_PER_VALUE["THIRD_VALUE"],
				},
			]}
			errorKey={errorKey}
			alwaysVisibleErrorKey={alwaysVisibleErrorKey}
			sendFormError={jest.fn()}
		/>
	);
};

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("RadioGroup", () => {
	it("should have second option checked and FIRST and THIRD options unchecked when initial value is the SECOND option", async () => {
		act(() => {
			renderWithLanguage(
				<RadioGroupSampleWithWiredState
					initialValue={"SECOND_VALUE"}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
				/>
			);
		});

		await waitFor(() => {
			const firstOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["FIRST_VALUE"],
			});
			expect(firstOption).not.toBeChecked();

			const secondOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["SECOND_VALUE"],
			});
			expect(secondOption).toBeChecked();

			const thirdOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["THIRD_VALUE"],
			});
			expect(thirdOption).not.toBeChecked();
		});
	});

	it("should change selection from SECOND to THIRD when user selects THIRD one", async () => {
		act(() => {
			renderWithLanguage(
				<RadioGroupSampleWithWiredState
					initialValue={"SECOND_VALUE"}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
				/>
			);
		});

		await waitFor(() => {
			const firstOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["FIRST_VALUE"],
			});
			expect(firstOption).not.toBeChecked();

			const secondOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["SECOND_VALUE"],
			});
			expect(secondOption).toBeChecked();

			const thirdOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["THIRD_VALUE"],
			});
			expect(thirdOption).not.toBeChecked();
		});

		act(() => {
			const thirdOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["THIRD_VALUE"],
			});
			userEvent.click(thirdOption);
		});

		await waitFor(() => {
			const firstOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["FIRST_VALUE"],
			});
			expect(firstOption).not.toBeChecked();

			const secondOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["SECOND_VALUE"],
			});
			expect(secondOption).not.toBeChecked();

			const thirdOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["THIRD_VALUE"],
			});
			expect(thirdOption).toBeChecked();
		});
	});

	it("should display label of form", async () => {
		act(() => {
			renderWithLanguage(
				<RadioGroupSampleWithWiredState
					initialValue={"SECOND_VALUE"}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
				/>
			);
		});

		await waitFor(() => {
			const label = screen.getByText("Do you wear contact lenses?");
			expect(label).toBeVisible();
		});
	});

	it("should display error when there is an errorKey and user changed the options at least once", async () => {
		act(() => {
			renderWithLanguage(
				<RadioGroupSampleWithWiredState
					initialValue={"FIRST_VALUE"}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
					errorKey={
						"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
					}
				/>
			);
		});

		await waitFor(() => {
			const errorText = screen.queryByText("Please select an answer");
			expect(errorText).toStrictEqual(null);
		});

		act(() => {
			const secondOption = screen.getByRole("radio", {
				name: LABELS_PER_VALUE["SECOND_VALUE"],
			});
			userEvent.click(secondOption);
		});

		await waitFor(() => {
			const errorText = screen.getByText("Please select an answer");
			expect(errorText).toBeVisible();
		});
	});

	it("should display error message when alwaysVisibleErrorKey is defined", async () => {
		act(() => {
			renderWithLanguage(
				<RadioGroupSampleWithWiredState
					initialValue={"FIRST_VALUE"}
					label={
						"completeYourProfileForm.form.myAcuvueBrandLenseLabel"
					}
					alwaysVisibleErrorKey={
						"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
					}
				/>
			);
		});

		await waitFor(() => {
			const errorText = screen.getByText("Please select an answer");
			expect(errorText).toBeVisible();
		});
	});
});
