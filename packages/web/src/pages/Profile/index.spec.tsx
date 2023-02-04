import { render, screen, act } from "@testing-library/react";
import Profile from ".";
import { useHistory } from "react-router-dom";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useUser } from "../../hooks/useUser";
import { Gender } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../hooks/useConfiguration";

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: () => <span data-testid="title" />,
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <span data-testid="acuvue-lite-header" />,
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <span data-testid="acuvue-lite-footer" />,
}));

jest.mock("./MyProfileBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="my-profile-block" />,
}));

jest.mock("./MobileBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="mobile-block" />,
}));

jest.mock("./AddressSection", () => ({
	__esModule: true,
	default: () => <span data-testid="address-section" />,
}));

jest.mock("./MarketingPreferencesBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="preference-block" />,
}));

jest.mock("./PasswordBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="password-block" />,
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/Button", () => ({
	__esModule: true,
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
	},
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
		SMALL: "acuvue-btn-small",
	},
	default: ({ onClick, children }: ComponentProps<typeof Button>) => (
		<button data-testid="button" onClick={onClick}>
			{children}
		</button>
	),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

const fakeGetProfile = {
	myAcuvueId: "fakeId",
	phone: "fakeNumber",
	birthday: "1995",
	birthMonth: "07",
	email: "fake@mail.com",
	firstName: "fakeName",
	gender: Gender.FEMALE,
	lastName: "fakeLastName",
};

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useUser as jest.Mock).mockReturnValue({
		getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		hasAddressFeature: true,
	});
});

describe("Profile", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<Profile />);
		});
	});

	it("should render title component", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const titleComponent = screen.getByTestId("title");
		expect(titleComponent).toBeInTheDocument();
	});

	it("should render header component", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const header = screen.getByTestId("acuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render footer component", async () => {
		await act(async () => {
			render(<Profile />);
		});
		const footer = screen.getByTestId("acuvue-lite-footer");
		expect(footer).toBeInTheDocument();
	});

	it("should render my profile block", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const profile = screen.getByTestId("my-profile-block");
		expect(profile).toBeInTheDocument();
	});

	it("should render update profile button", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const profileButton = screen.getByText(
			"editProfilePage.updateMyProfileButton"
		);
		profileButton.click();

		expect(useHistory().push).toHaveBeenCalledWith("/profile/edit");
	});

	it("should render Address section", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const addressSection = screen.getByTestId("address-section");

		expect(addressSection).toBeInTheDocument();
	});

	it("should render MarketingPreferenceBlock", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const preferenceBlock = screen.getByTestId("preference-block");

		expect(preferenceBlock).toBeInTheDocument();
	});

	it("should render password block", async () => {
		await act(async () => {
			render(<Profile />);
		});

		const passwordBlock = screen.getByTestId("password-block");
		expect(passwordBlock).toBeInTheDocument();
	});
});
