import { act, waitFor } from "@testing-library/react";
import Greeting from "./index";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import { Gender, IGetProfileResponse } from "@myacuvue_thailand_web/services";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});
});

describe("Greeting", () => {
	it("should display hi there message when there is no profile", async () => {
		act(() => {
			renderWithLanguage(<Greeting />);
		});

		await waitFor(() => {
			const label = screen.getByText("Hi there!");
			expect(label).toBeVisible();
		});
	});

	it("should display hi fakeFirstName message when profile is passed through props", async () => {
		const fakeProfileProps: IGetProfileResponse | null = {
			myAcuvueId: "fakeId",
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			email: "fakeEmail",
			birthMonth: "fakeBirthMonth",
			birthYear: "fakeBirthYear",
			gender: Gender.FEMALE,
			phone: "fakeNumber",
			isSpectaclesWearer: false,
			lensesUsage: "NON_USER",
			hasParentalConsent: null,
		};
		act(() => {
			renderWithLanguage(<Greeting profile={fakeProfileProps} />);
		});

		await waitFor(() => {
			const label = screen.getByText("Hi fakeFirstName!");
			expect(label).toBeVisible();
		});
	});
});
