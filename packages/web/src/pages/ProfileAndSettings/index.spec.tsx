import { ComponentProps } from "react";
import {
	Gender,
	IGetProfileResponse,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { render, screen, waitFor } from "@testing-library/react";
import { useSettings } from "../../hooks/useSettings";
import { useUserProfile } from "../../contexts/UserProfileContext";
import Profile from "./index";
import Text from "../../components/Text";
import Header from "../../components/Layout/Header";
import ProfilePicture from "../../components/ProfilePicture";
import userEvent from "@testing-library/user-event";
import ToggleSwitch from "../../components/ToggleSwitch";
import { act } from "react-dom/test-utils";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("../../components/ToggleSwitch", () => ({
	__esModule: true,
	default: ({
		onChange,
		checked = false,
	}: ComponentProps<typeof ToggleSwitch>) => (
		<input
			type="checkbox"
			data-testid="toggle-switch"
			onChange={(e) => onChange(e.target.checked)}
			checked={checked}
		/>
	),
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("./ProfileMenu", () => ({
	__esModule: true,
	default: () => <div data-testid="profile-menu">Profile Menu</div>,
}));

jest.mock("../../components/ThinDivider", () => ({
	__esModule: true,
	default: () => <div data-testid="thin-divider" />,
}));

jest.mock("../../components/SectionDivider", () => ({
	__esModule: true,
	default: () => <div data-testid="section-divider" />,
}));

jest.mock("../../components/ProfilePicture", () => ({
	__esModule: true,
	PictureSize: {
		SMALL: "40px",
		MEDIUM: "48px",
	},
	default: ({ size }: ComponentProps<typeof ProfilePicture>) => (
		<div data-testid="profile-picture">{size}</div>
	),
}));

const fakeUser: IGetProfileResponse = {
	myAcuvueId: "fakeId",
	phone: "fakeNumber",
	firstName: "fakeName",
	lastName: "fakeLastname",
	birthMonth: "fakeBirthMonth",
	birthYear: "fakeBirthYear",
	email: "fakeEmail",
	gender: Gender.FEMALE,
	isSpectaclesWearer: false,
	lensesUsage: "NON_USER",
	hasParentalConsent: null,
};

beforeEach(() => {
	mocked(useUserProfile).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.COMPLETE,
		isLoading: false,
		refreshUserProfile: jest.fn(),
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
	});

	mocked(useSettings).mockReturnValue({
		getNotificationPreferences: jest.fn().mockResolvedValue({
			marketing: {
				smsEnabled: false,
				lineEnabled: false,
			},
		}),
		saveNotificationPreferences: jest.fn(),
	});
});

describe("Profile", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<Profile />);
		});
	});

	it("should render user's first name and last name are rendered correctly when the user profile is present", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const firstName = screen.queryByText(/fakeName/);
		expect(firstName).toBeInTheDocument();
		const lastName = screen.queryByText(/fakeLastname/);
		expect(lastName).toBeInTheDocument();
	});

	it("should not render user's first name and last name are rendered correctly when the user profile is not present", async () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		await act(async () => {
			render(<Profile />);
		});

		const firstName = screen.queryByText(/fakeName/);
		expect(firstName).not.toBeInTheDocument();
		const lastName = screen.queryByText(/fakeLastname/);
		expect(lastName).not.toBeInTheDocument();
	});

	it("should render the profile menu", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const profileMenu = screen.getByTestId("profile-menu");
		expect(profileMenu).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("profileAndSettingsPage.title");
	});

	it("should call getNotificationPreferences", async () => {
		mocked(useSettings).mockReturnValue({
			getNotificationPreferences: jest.fn().mockReturnValue({
				marketing: {
					smsEnabled: false,
					lineEnabled: false,
				},
			}),
			saveNotificationPreferences: jest.fn(),
		});

		await act(async () => {
			render(<Profile />);
		});

		const { getNotificationPreferences } = useSettings();

		await waitFor(() =>
			expect(getNotificationPreferences).toHaveBeenCalled()
		);
	});

	it("should render ProfilePicture", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const profilePicture = screen.getByTestId("profile-picture");
		expect(profilePicture).toBeInTheDocument();
	});

	it("should render ThinDivider", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const thinDivider = screen.getByTestId("thin-divider");
		expect(thinDivider).toBeInTheDocument();
	});

	it("should render SectionDivider", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const sectionDividers = screen.getAllByTestId("section-divider");
		expect(sectionDividers).toHaveLength(2);
	});

	it("should render ToggleSwitch", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const toggleSwitch = screen.getByTestId("toggle-switch");
		expect(toggleSwitch).toBeInTheDocument();
	});

	it("should call saveNotificationPreferences on toggle switch", async () => {
		const { saveNotificationPreferences } = useSettings();
		await act(async () => {
			render(<Profile />);
		});
		const toggleSwitch = screen.getByTestId("toggle-switch");
		userEvent.click(toggleSwitch);
		await waitFor(() => {
			expect(saveNotificationPreferences).toHaveBeenCalledWith({
				marketing: {
					smsEnabled: true,
					lineEnabled: true,
				},
			});
		});
	});
});
