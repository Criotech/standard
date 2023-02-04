import { act, waitFor, fireEvent } from "@testing-library/react";
import MonthYearInput from "./index";
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

describe("MonthYearInput", () => {
	it("should display label of form", async () => {
		act(() => {
			renderWithLanguage(
				<MonthYearInput
					minYear={1900}
					maxYear={2021}
					year={1993}
					month={1}
					setYear={jest.fn()}
					setMonth={jest.fn()}
					errorKey={undefined}
					alwaysVisibleErrorKey={undefined}
					label="registrationPage.form.birthdayLabel"
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const label = screen.getByText("Date of Birth");
			expect(label).toBeVisible();
		});
	});

	it("should display correct default value", async () => {
		act(() => {
			renderWithLanguage(
				<MonthYearInput
					minYear={1900}
					maxYear={2021}
					year={1993}
					month={1}
					setYear={jest.fn()}
					setMonth={jest.fn()}
					errorKey={undefined}
					alwaysVisibleErrorKey={undefined}
					label="registrationPage.form.birthdayLabel"
					sendFormError={jest.fn()}
				/>
			);
		});

		await waitFor(() => {
			const year = screen.getByText("1993");
			expect(year).toBeVisible();

			const month = screen.getByText("January");
			expect(month).toBeVisible();
		});
	});

	it("should call setMonth with correct value when user selects a different month option", async () => {
		const mockSetMonth = jest.fn();

		renderWithLanguage(
			<MonthYearInput
				minYear={1900}
				maxYear={2021}
				year={1993}
				month={1}
				setYear={jest.fn()}
				setMonth={mockSetMonth}
				errorKey={undefined}
				alwaysVisibleErrorKey={undefined}
				label="registrationPage.form.birthdayLabel"
				sendFormError={jest.fn()}
			/>
		);
		act(() => {
			const [monthSelect] = screen.getAllAntSelects();
			fireEvent.mouseDown(monthSelect);
		});

		await waitForSelectDropdownToBeInTheDocument();

		expect(mockSetMonth).not.toHaveBeenCalled();

		act(() => {
			const selectOption = screen.getAntSelectOption("February");
			selectOption.click();
		});

		await waitFor(() => {
			expect(mockSetMonth).toHaveBeenCalledWith(2);
		});
	});

	it("should call setYear with correct value when user selects a different year option", async () => {
		const mockSetYear = jest.fn();

		renderWithLanguage(
			<MonthYearInput
				minYear={1900}
				maxYear={2021}
				year={1993}
				month={1}
				setYear={mockSetYear}
				setMonth={jest.fn()}
				errorKey={undefined}
				alwaysVisibleErrorKey={undefined}
				label="registrationPage.form.birthdayLabel"
				sendFormError={jest.fn()}
			/>
		);
		act(() => {
			const yearSelect = screen.getAllAntSelects();
			fireEvent.mouseDown(yearSelect[1]);
		});

		await waitForSelectDropdownToBeInTheDocument();

		expect(mockSetYear).not.toHaveBeenCalled();

		act(() => {
			const selectOption = screen.getAntSelectOption("2016");
			selectOption.click();
		});

		await waitFor(() => {
			expect(mockSetYear).toHaveBeenCalledWith(2016);
		});
	});

	it("should display error when there is an errorKey and input is blur", async () => {
		renderWithLanguage(
			<MonthYearInput
				minYear={1900}
				maxYear={2021}
				year={1993}
				month={1}
				setYear={jest.fn()}
				setMonth={jest.fn()}
				errorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
				alwaysVisibleErrorKey={undefined}
				label="registrationPage.form.birthdayLabel"
				sendFormError={jest.fn()}
			/>
		);

		await waitFor(() => {
			expect(screen.queryByText("Please select an answer")).toStrictEqual(
				null
			);
		});

		const selects = screen.getAllAntSelects();
		const yearSelect = selects[1];

		const monthSelect = selects[0];

		act(() => {
			fireEvent.blur(monthSelect);
			fireEvent.blur(yearSelect);
		});

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});

	it("should display error when there is an alwaysVisibleErrorKey", async () => {
		renderWithLanguage(
			<MonthYearInput
				minYear={1900}
				maxYear={2021}
				year={1993}
				month={1}
				setYear={jest.fn()}
				setMonth={jest.fn()}
				errorKey={undefined}
				alwaysVisibleErrorKey={
					"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
				}
				label="registrationPage.form.birthdayLabel"
				sendFormError={jest.fn()}
			/>
		);

		await waitFor(() => {
			expect(screen.getByText("Please select an answer")).toBeVisible();
		});
	});
});
