import { render, screen } from "@testing-library/react";
import MemberView from ".";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { usePoints } from "../../../hooks/usePoints";
import { useAsync } from "react-use";
import {
	Gender,
	IPoints,
	IGetProfileResponse,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import MemberCard from "../../../components/MemberCard";
import ProfilePicture from "../../../components/ProfilePicture";

jest.mock("react-use");

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("antd", () => ({
	Spin: () => <></>,
}));

jest.mock("../../Home/StoreBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="store-block" />,
}));

jest.mock("../../../components/MemberCard", () => ({
	__esModule: true,
	default: ({
		name,
		memberId,
		picture,
		badge,
	}: ComponentProps<typeof MemberCard>) => (
		<div data-testid="member-card">
			{name} {memberId} {picture} {badge}
		</div>
	),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../../components/ProfilePicture", () => ({
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
	firstName: "fakeFirstName",
	lastName: "fakeLastName",
	birthMonth: "fakeBirthMonth",
	birthYear: "fakeBirthYear",
	email: "fakeEmail",
	gender: Gender.FEMALE,
	isSpectaclesWearer: false,
	lensesUsage: "NON_USER",
	hasParentalConsent: null,
};

const points: IPoints = {
	ladder: "platinum",
	earnedPoints: 5000,
	remainingPointsToPlatinum: 1000,
	dateLimitToPlatinum: "2018-01-01",
	availablePoints: 1220,
	expiringPoints: 100,
	expiringAt: "2018-12-01",
};

jest.mock("../../../hooks/usePoints", () => ({
	usePoints: jest.fn(),
}));

describe("MemberView", () => {
	beforeEach(() => {
		(useAsync as jest.Mock).mockImplementation(() => ({
			value: points,
			loading: false,
		}));

		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: fakeUser,
			profileCompleteness: ProfileCompleteness.COMPLETE,
		});

		(usePoints as jest.Mock).mockReturnValue({
			points,
		});
	});

	it("should render without errors", async () => {
		render(<MemberView />);
	});

	it("should render member card if user profile is present", async () => {
		render(<MemberView />);

		const memberCard = screen.getByTestId("member-card");
		expect(memberCard).toBeInTheDocument();
	});

	it("should render store block", async () => {
		render(<MemberView />);

		const storeBlock = screen.getByTestId("store-block");
		expect(storeBlock).toBeInTheDocument();
	});

	it("should render platinum badge if user is platinum", () => {
		render(<MemberView />);
		const platinumBadge = screen.getByRole("img");
		expect(platinumBadge).toBeInTheDocument();
		expect(platinumBadge).toHaveAttribute("src", "platinum-badge.png");
	});

	it("should render not render platinum badge if user is normal", () => {
		const points: IPoints = {
			ladder: "platinum",
			earnedPoints: 50,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		(useAsync as jest.Mock).mockImplementation((callback) => ({
			value: points,
			loading: false,
		}));

		(usePoints as jest.Mock).mockReturnValue({
			points,
		});

		const { container } = render(<MemberView />);
		expect(container.innerHTML.includes("img")).toBeFalsy();
	});

	it("should render loading block", () => {
		(useAsync as jest.Mock).mockImplementation((callback) => ({
			value: points,
			loading: true,
		}));

		render(<MemberView />);

		const loadingBlock = screen.queryByTestId("loading-block");
		expect(loadingBlock).toBeInTheDocument();
	});

	it("should render ProfilePicture", () => {
		render(<MemberView />);
		const profilePicture = screen.getByTestId("profile-picture");
		expect(profilePicture).toBeInTheDocument();
	});
});
