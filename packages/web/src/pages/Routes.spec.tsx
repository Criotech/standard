import { render, screen } from "@testing-library/react";
import { useConfiguration } from "../hooks/useConfiguration";
import Routes from "./Routes";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthStatus } from "../contexts/AuthContext";
import {
	IUserProfileContext,
	useUserProfile,
} from "../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { mocked } from "ts-jest/utils";

const PassThroughFakeComponent = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

jest.mock("@myacuvue_thailand_web/services", () => ({
	AzureConfigurationService: {
		getConfig: jest.fn().mockReturnValue({
			clientId: "client id",
			policies: {
				registration: {
					name: "",
					authority: "registration-authority",
				},
				login: {
					name: "",
					authority: "login-authority",
				},
				updatePassword: {
					name: "",
					authority: "update-password-authority",
				},
			},
			authorityDomain: "",
			redirectUri: "",
		}),
	},
	JsonWebTokenService: {
		parse: jest.fn(),
	},
	ConfigService: {
		Instance: {
			AU: "",
		},
		ENV: {
			PROD: "prod",
		},
		SocialNetworkIcons: {
			FACEBOOK: "facebook",
		},
	},
	ProfileCompleteness: {
		COMPLETE: "COMPLETE",
		INCOMPLETE: "INCOMPLETE",
	},
}));

jest.mock("../contexts/LanguageContext", () => ({
	__esModule: true,
	LanguageProvider: PassThroughFakeComponent,
}));

jest.mock("@azure/msal-browser");

jest.mock("./Debug", () => ({
	__esModule: true,
	default: () => <>debug</>,
}));

jest.mock("./EditProfile", () => ({
	__esModule: true,
	default: () => <>edit profile</>,
}));

jest.mock("./DebugXiam", () => ({
	__esModule: true,
	default: () => <>debugxiam</>,
}));

jest.mock("./CompleteYourProfile", () => ({
	__esModule: true,
	default: () => <>complete your profile</>,
}));

jest.mock("../hooks/useConfiguration", () => ({ useConfiguration: jest.fn() }));

jest.mock("../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./DebugXiam", () => ({
	__esModule: true,
	default: () => <>debugxiam</>,
}));

jest.mock("./Dashboard", () => ({
	__esModule: true,
	default: () => <>dashboard</>,
}));

jest.mock("./EmailRegistration", () => ({
	__esModule: true,
	default: () => <>email registration</>,
}));

jest.mock("./EmailConfirmation", () => ({
	__esModule: true,
	default: () => <>email confirmation</>,
}));

jest.mock("./EmailVerification", () => ({
	__esModule: true,
	default: () => <>email verification</>,
}));

jest.mock("./UpdatePhoneNumber", () => ({
	__esModule: true,
	default: () => <>update profile</>,
}));

jest.mock("./SignIn", () => ({
	__esModule: true,
	default: () => <>Sign in</>,
}));

jest.mock("./SignIn", () => ({
	__esModule: true,
	default: () => <>Sign in</>,
}));

jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("./Profile", () => ({
	__esModule: true,
	default: () => <>Profile</>,
}));

jest.mock("./ResetPasswordSuccess", () => ({
	__esModule: true,
	default: () => <>ResetPasswordSucces</>,
}));

const defaultUseUserProfile: IUserProfileContext = {
	profileCompleteness: ProfileCompleteness.INCOMPLETE,
	isLoading: true,
	userProfile: undefined,
	refreshUserProfile: jest.fn(),
	setEmptyBefore: jest.fn(),
	wasEmptyBefore: true,
};

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		status: AuthStatus.LOADING,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		allowDebugRoutes: false,
	});

	mocked(useUserProfile).mockReturnValue({
		...defaultUseUserProfile,
	});
});

describe("Routes", () => {
	it("should NOT render Debug on route /debug when allowDebugRoutes is false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			allowDebugRoutes: false,
		});

		render(
			<MemoryRouter initialEntries={["/debug"]}>
				<Routes />
			</MemoryRouter>
		);

		const debug = screen.queryByText("debug");
		expect(debug).not.toBeInTheDocument();
	});

	it("should render Debug on route /debug when environment is DEV", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			allowDebugRoutes: true,
		});

		render(
			<MemoryRouter initialEntries={["/debug"]}>
				<Routes />
			</MemoryRouter>
		);

		const debug = screen.getByText("debug");
		expect(debug).toBeInTheDocument();
	});

	it("should NOT render DebugXiam on route /debug-xiam when allowDebugRoutes is false", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			allowDebugRoutes: false,
		});

		render(
			<MemoryRouter initialEntries={["/debug"]}>
				<Routes />
			</MemoryRouter>
		);

		const debugXiam = screen.queryByText("debugxiam");
		expect(debugXiam).not.toBeInTheDocument();
	});

	it("should render DebugXiam on route /debug-xiam when allowDebugRoutes is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			allowDebugRoutes: true,
		});

		render(
			<MemoryRouter initialEntries={["/debug-xiam"]}>
				<Routes />
			</MemoryRouter>
		);

		const debugXiam = screen.queryByText("debugxiam");
		expect(debugXiam).toBeInTheDocument();
	});

	it("should render CompleteYourProfile on any route (example /profile) when user is authenticated, but profile is not complete and loading finished", () => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.AUTHENTICATED,
		});

		mocked(useUserProfile).mockReturnValue({
			...defaultUseUserProfile,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			isLoading: false,
		});

		render(
			<MemoryRouter initialEntries={["/profile"]}>
				<Routes />
			</MemoryRouter>
		);

		const completeYourProfilePage = screen.queryByText(
			"complete your profile"
		);
		expect(completeYourProfilePage).toBeInTheDocument();
	});

	it("should NOT render CompleteYourProfile on any route (example /profile) when user is authenticated, but the userProfile did not finish loading", () => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.AUTHENTICATED,
		});

		mocked(useUserProfile).mockReturnValue({
			...defaultUseUserProfile,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			isLoading: true,
		});

		render(
			<MemoryRouter initialEntries={["/profile"]}>
				<Routes />
			</MemoryRouter>
		);

		const completeYourProfilePage = screen.queryByText(
			"complete your profile"
		);
		expect(completeYourProfilePage).not.toBeInTheDocument();
	});

	it("should render Profile on route /profile when user is authenticated, profile is complete and loading finished", () => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.AUTHENTICATED,
		});

		mocked(useUserProfile).mockReturnValue({
			...defaultUseUserProfile,
			profileCompleteness: ProfileCompleteness.COMPLETE,
			isLoading: false,
		});

		render(
			<MemoryRouter initialEntries={["/profile"]}>
				<Routes />
			</MemoryRouter>
		);

		const profilePage = screen.queryByText("Profile");
		expect(profilePage).toBeInTheDocument();
	});
});
