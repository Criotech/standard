import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LinkProps } from "react-router-dom";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { Drawer as AntDrawer } from "antd";
import Drawer from "./index";
import { ComponentProps } from "react";
import Text from "../../Text";
import ProfilePicture from "../../ProfilePicture";
import {
	Gender,
	IGetProfileResponse,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../../icons/NextIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="next-icon" />,
}));

jest.mock("../../../icons/CloseIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="close-icon" />,
}));

jest.mock("../../../icons/PromotionIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="promotion-icon" />,
}));

jest.mock("../../LanguageToggle", () => ({
	__esModule: true,
	default: () => <div data-testid="language-toggle" />,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ to }: LinkProps) => <div>{to}</div>,
	useHistory: jest.fn(),
}));

jest.mock("antd", () => ({
	Drawer: ({
		visible,
		className,
		children,
	}: ComponentProps<typeof AntDrawer>) => (
		<>
			<div data-testid="visible-prop">
				{visible ? "isVisible" : "isNotVisible"}
			</div>
			<div data-testid="drawer-test-id" className={className}>
				{children}
			</div>
		</>
	),
}));

jest.mock("../../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => <div>{textKey}</div>,
}));

jest.mock("../../ProfilePicture", () => ({
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

beforeEach(() => {
	(useUserProfile as jest.Mock).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.COMPLETE,
	});

	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});
});

describe("Drawer", () => {
	it("should render without errors", () => {
		render(<Drawer visible onClose={jest.fn} />);
	});

	it("should receive the visible props in the internal component", () => {
		render(<Drawer visible onClose={jest.fn} />);
		const drawer = screen.getByTestId("drawer-test-id");
		expect(drawer).toBeInTheDocument();
		const isVisible = screen.getByTestId("visible-prop");
		expect(isVisible).toHaveTextContent("isVisible");
	});

	it("should have default acuvue-drawer class", () => {
		render(<Drawer visible onClose={jest.fn} />);
		const drawer = screen.getByTestId("drawer-test-id");
		expect(drawer).toHaveClass("acuvue-drawer");
	});

	it("should have about link present in drawer", () => {
		render(<Drawer visible onClose={jest.fn} />);
		expect(screen.queryByText("/about")).toBeInTheDocument();
	});

	it("should have promotions-events link present in drawer", () => {
		render(<Drawer visible onClose={jest.fn} />);
		expect(screen.queryByText("/promotions-events")).toBeInTheDocument();
	});

	it("should have membership link present in drawer", () => {
		render(<Drawer visible onClose={jest.fn} />);
		expect(screen.queryByText("/membership")).toBeInTheDocument();
	});

	it("should render ProfilePicture in the drawer", () => {
		render(<Drawer visible onClose={jest.fn} />);
		const profilePicture = screen.getByTestId("profile-picture");
		expect(profilePicture).toBeInTheDocument();
	});

	it("should call navigate to on clicking guest details /registration when profile is incomplete", async () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		const { container } = render(<Drawer visible onClose={jest.fn} />);

		act(() => {
			const guestDetails = container.querySelector(".guest-details");
			guestDetails && userEvent.click(guestDetails);
		});

		await waitFor(() => {
			expect(useHistory().push).toHaveBeenCalledWith("/registration");
		});
	});
});
