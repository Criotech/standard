import AcuvueCouponDetails from "./index";
import { act } from "@testing-library/react-hooks";
import { ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useLocation } from "react-router-dom-v5-compat";
import { mocked } from "ts-jest/utils";
import {
	IAcuvueCoupon,
	Gender,
	IGetProfileResponse,
	ProfileCompleteness,
	GlobalError,
} from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../hooks/useCoupon";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import Text from "../../../components/Text";
import DisplayHTML from "../../../components/DisplayHTML";
import RegistrationInviteModal from "./RegistrationInviteModal";
import AcuvueCouponErrorModal from "./AcuvueCouponErrorModal";

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn(),
}));

jest.mock("antd", () => ({
	Divider: () => <div data-testid="antd-divider" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <div data-testid="header" />,
}));

jest.mock("../../../icons/DeliveryIcon", () => ({
	__esModule: true,
	default: () => <div>home delivery icon</div>,
}));

jest.mock("../../../icons/StoreIcon", () => ({
	__esModule: true,
	default: () => <div>store icon</div>,
}));

jest.mock("../../../components/DisplayHTML", () => ({
	__esModule: true,
	default: ({ unsafeHTML }: ComponentProps<typeof DisplayHTML>) => (
		<div data-testid="display-html">{unsafeHTML}</div>
	),
}));

jest.mock("../../../hooks/useCoupon");

jest.mock("./AcuvueCouponSuccessModal", () => ({
	__esModule: true,
	default: () => <div data-testid="acuvue-coupon-success-modal" />,
}));

jest.mock("./AcuvueCouponErrorModal", () => ({
	__esModule: true,
	default: ({ isOpen }: ComponentProps<typeof AcuvueCouponErrorModal>) => (
		<div data-testid="acuvue-coupon-error-modal">
			{isOpen ? "error" : "NoError"}
		</div>
	),
}));

jest.mock("../../../components/HighlightedValue", () => ({
	__esModule: true,
	default: () => <span data-testid="highlighted-value" />,
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("./RegistrationInviteModal", () => ({
	__esModule: true,
	default: ({ isOpen }: ComponentProps<typeof RegistrationInviteModal>) => (
		<div data-testid="registration-invite-modal">
			{isOpen ? "open" : "closed"}
		</div>
	),
}));

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
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

const fakeCoupon: IAcuvueCoupon = {
	type: "acuvue",
	subType: "other",
	isEligibleForHomeDelivery: true,
	isEligibleForInStore: true,
	bonusMultiplier: 1.5,
	id: "7v894576e4n0bn7",
	imageUrl:
		"https://ochkarik.ru/skins/default/en/modules/Zebrains/MyAcuvue/page/landing/images/MyAcuvue_Ochkarik_Banner_1250x440px1.png",
	title: "ACUVUE® ฿50 Discount Coupon",
	points: 100,
	validPeriod: {
		from: "2021-12-01",
		to: "2021-12-06",
	},
	terms: "some terms",
	absoluteCashDiscount: 10,
};

beforeEach(() => {
	mocked(useLocation).mockReturnValue({
		state: {
			coupon: fakeCoupon,
		},
		key: "",
		pathname: "",
		search: "",
		hash: "",
	});

	mocked(useCoupon).mockReturnValue({
		checkoutAcuvueCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
		getUserCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.COMPLETE,
		isLoading: false,
		setEmptyBefore: jest.fn(),
		wasEmptyBefore: false,
		refreshUserProfile: jest.fn(),
	});
});

describe("AcuvueCouponDetails", () => {
	it("should render without errors", () => {
		render(<AcuvueCouponDetails />);
	});

	it("should render antd diver", async () => {
		render(<AcuvueCouponDetails />);

		const divider = await screen.findByTestId("antd-divider");
		expect(divider).toBeInTheDocument();
	});

	it("should render header", async () => {
		render(<AcuvueCouponDetails />);

		const divider = await screen.findByTestId("header");
		expect(divider).toBeInTheDocument();
	});

	it("should render the add to wallet button", async () => {
		render(<AcuvueCouponDetails />);

		const buttons = await screen.findByRole("button");
		expect(buttons).toBeInTheDocument();
	});

	it("should render store icon and home icon", async () => {
		render(<AcuvueCouponDetails />);

		const storeIcon = screen.queryByText("store icon");
		expect(storeIcon).toBeInTheDocument();

		const homeIcon = screen.queryByText("home delivery icon");
		expect(homeIcon).toBeInTheDocument();
	});

	it("should not render store icon and home icon if not eligible", async () => {
		const fakeCoupon: IAcuvueCoupon = {
			type: "acuvue",
			subType: "other",
			isEligibleForHomeDelivery: false,
			isEligibleForInStore: false,
			bonusMultiplier: 1.5,
			id: "7v894576e4n0bn7",
			imageUrl:
				"https://ochkarik.ru/skins/default/en/modules/Zebrains/MyAcuvue/page/landing/images/MyAcuvue_Ochkarik_Banner_1250x440px1.png",
			title: "ACUVUE® ฿50 Discount Coupon",
			points: 100,
			validPeriod: {
				from: "2021-12-01",
				to: "2021-12-06",
			},
			terms: "",
			absoluteCashDiscount: 10,
		};

		mocked(useLocation).mockReturnValue({
			state: {
				coupon: fakeCoupon,
			},
			hash: "",
			search: "",
			pathname: "",
			key: "",
		});

		render(<AcuvueCouponDetails />);

		const storeIcon = screen.queryByText("store icon");
		expect(storeIcon).not.toBeInTheDocument();

		const homeIcon = screen.queryByText("home delivery icon");
		expect(homeIcon).not.toBeInTheDocument();
	});

	it("should have the coupon location props", async () => {
		render(<AcuvueCouponDetails />);

		const validPeriod = screen.queryByText(
			"rewardsPage.couponDetails.validPeriod"
		);
		expect(validPeriod).toBeInTheDocument();

		const eligibleForStore = screen.queryByText(
			"rewardsPage.couponDetails.eligibleForStore"
		);
		expect(eligibleForStore).toBeInTheDocument();

		const eligibleForHome = screen.queryByText(
			"rewardsPage.couponDetails.eligibleForHome"
		);
		expect(eligibleForHome).toBeInTheDocument();
	});

	it("should display coupon terms", async () => {
		render(<AcuvueCouponDetails />);

		const couponTerms = await screen.findByTestId("display-html");
		expect(couponTerms).toHaveTextContent(fakeCoupon.terms);
	});

	it("should render acuvue coupon success modal", async () => {
		render(<AcuvueCouponDetails />);

		const successModal = await screen.findByTestId(
			"acuvue-coupon-success-modal"
		);

		expect(successModal).toBeInTheDocument();
	});

	it("should render acuvue coupon error modal", async () => {
		render(<AcuvueCouponDetails />);

		const errorModal = await screen.findByTestId(
			"acuvue-coupon-error-modal"
		);

		expect(errorModal).toBeInTheDocument();
	});

	it("should register checkoutAcuvueCoupons after clicking add to wallet button", async () => {
		render(<AcuvueCouponDetails />);

		const addToWallet = await screen.findByText(
			"rewardsPage.couponDetails.addToWallet"
		);
		act(() => {
			addToWallet.click();
		});
		await waitFor(() => {
			const { checkoutAcuvueCoupons } = useCoupon();

			expect(checkoutAcuvueCoupons).toHaveBeenCalled();
		});
	});

	it("should render RegistrationInviteModalOpen when profile is incomplete", async () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		render(<AcuvueCouponDetails />);

		const addToWallet = await screen.findByText(
			"rewardsPage.couponDetails.addToWallet"
		);
		act(() => {
			addToWallet.click();
		});

		await waitFor(() => {
			const registrationInviteModal = screen.getByTestId(
				"registration-invite-modal"
			);
			expect(registrationInviteModal).toHaveTextContent("open");
		});
	});

	it("should render AcuvueCouponErrorModal when there is error in checkoutAcuvueCoupons API call", async () => {
		mocked(useCoupon).mockReturnValue({
			redeemCoupon: jest.fn(),
			getUserCoupons: jest.fn(),
			getAcuvueCoupons: jest.fn(),
			getLifestyleCoupons: jest.fn(),
			checkoutAcuvueCoupons: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.insufficientPoints": {},
				})
			),
			checkoutLifestyleCoupons: jest.fn(),
		});

		render(<AcuvueCouponDetails />);

		const addToWallet = await screen.findByText(
			"rewardsPage.couponDetails.addToWallet"
		);
		act(() => {
			addToWallet.click();
		});

		await waitFor(() => {
			const acuvueCouponErrorModal = screen.getByTestId(
				"acuvue-coupon-error-modal"
			);
			expect(acuvueCouponErrorModal).toHaveTextContent("error");
		});
	});

	it("should render higlightedValue component", async () => {
		render(<AcuvueCouponDetails />);
		const highlightedValue = screen.getByTestId("highlighted-value");
		expect(highlightedValue).toBeInTheDocument();
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<AcuvueCouponDetails />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should render RegistrationInviteModal", async () => {
		render(<AcuvueCouponDetails />);

		const guestUserErrorModal = screen.getByTestId(
			"registration-invite-modal"
		);
		expect(guestUserErrorModal).toBeInTheDocument();
	});
});
