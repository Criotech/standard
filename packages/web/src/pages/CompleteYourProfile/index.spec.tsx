import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import GenericInput from "../../components/GenericInput";
import MonthYearInput from "../../components/MonthYearInput";
import RadioGroup from "../../components/RadioGroup";
import Text from "../../components/Text";
import CompleteYourProfile from ".";
import { CompleteYourProfileForm } from "./CompleteYourProfileForm";
import { useCompleteYourProfile } from "./useCompleteYourProfile";

jest.mock("./CompleteYourProfileForm", () => ({
	CompleteYourProfileForm: ({
		handleSubmit,
	}: ComponentProps<typeof CompleteYourProfileForm>) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(handleSubmit as any)();
			}}
		/>
	),
}));

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: () => <div />,
}));

jest.mock("../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: () => <div />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="myacuvue-lite-header" />,
}));

jest.mock("../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
	}: ComponentProps<typeof GenericInput>) => (
		<div data-testid="generic-input">
			<div data-testid="generic-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
		</div>
	),
}));

jest.mock("../../components/MonthYearInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
	}: ComponentProps<typeof MonthYearInput>) => (
		<div data-testid="month-year-input">
			<div data-testid="month-year-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
		</div>
	),
}));

jest.mock("../../components/RadioGroup", () => ({
	__esModule: true,
	default: ({ alwaysVisibleErrorKey }: ComponentProps<typeof RadioGroup>) => (
		<div data-testid="radio-group">
			<div data-testid="radio-group-server-error">
				{alwaysVisibleErrorKey}
			</div>
		</div>
	),
}));

jest.mock("../../components/Checkbox", () => ({
	__esModule: true,
	default: () => <div data-testid="checkbox" />,
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("./useCompleteYourProfile", () => ({
	useCompleteYourProfile: jest.fn(),
}));

const defaultCompleteYourProfileMock = {
	userProfile: undefined,
	formData: {},
	setFormData: jest.fn(),
	errorKeys: {},
	serverErrorKeys: {},
	handleSubmit: jest.fn(),
	toggleCallEnabled: jest.fn(),
	togglePushEnabled: jest.fn(),
	toggleEmailEnabled: jest.fn(),
	toggleSmsEnabled: jest.fn(),
	isAllPreferencesChecked: false,
	toggleAllPreferences: jest.fn(),
	birthMonth: undefined,
	setBirthMonth: jest.fn(),
	birthYear: undefined,
	setBirthYear: jest.fn(),
	validateBirthday: jest.fn(),
	isParentalConsentRequired: false,
	marketingPreference: {},
	hasError: false,
};

beforeEach(() => {
	(useCompleteYourProfile as jest.Mock).mockReturnValue(
		defaultCompleteYourProfileMock
	);
});

describe("CompleteYourProfile", () => {
	it("should render without error", () => {
		render(<CompleteYourProfile />);
	});

	it("should render myacuvue lite header", async () => {
		render(<CompleteYourProfile />);

		const header = screen.getByTestId("myacuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should display loading when user has no profile", () => {
		(useCompleteYourProfile as jest.Mock).mockReturnValue({
			...defaultCompleteYourProfileMock,
			userProfile: undefined,
			userProfileIsLoading: true,
		});

		render(<CompleteYourProfile />);

		const loadingBlock = screen.getByTestId("loading-block");

		expect(loadingBlock).toBeInTheDocument();
	});

	it("should display form when userProfile has loaded", () => {
		(useCompleteYourProfile as jest.Mock).mockReturnValue({
			...defaultCompleteYourProfileMock,
			userProfile: { email: "fakeEmail", phone: "fakePhone" },
			userProfileIsLoading: false,
		});

		render(<CompleteYourProfile />);

		const completeYourProfileForm = screen.getByTestId("form");

		expect(completeYourProfileForm).toBeInTheDocument();
	});
});
