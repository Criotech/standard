import { render, screen } from "@testing-library/react";
import HomePage from ".";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { usePoints } from "../../hooks/usePoints";
import { useAsync } from "react-use";
import {
	CampaignBanner,
	CarouselBanner,
	GetBannersResponse,
	IPoints,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { useBanners } from "../../hooks/useBanners";
import Header from "../../components/Layout/Header";
import BackToTop from "../../components/BackToTop";

jest.mock("react-use");

jest.mock("antd", () => ({
	Divider: () => <div data-testid="divider" />,
}));

jest.mock("./RegisterBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="register-block" />,
}));

jest.mock("./CouponBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="coupon-block" />,
}));

jest.mock("./RegistrationSuccessModal", () => ({
	__esModule: true,
	default: () => <div data-testid="registration-success-modal" />,
}));

jest.mock("../../components/ImageCarousel", () => ({
	__esModule: true,
	default: () => <div data-testid="image-carousel" />,
}));

jest.mock("./PromotionsBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="promotions-block" />,
}));

jest.mock("./StoreBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="store-block" />,
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../components/PointsBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="points-block" />,
}));

jest.mock("./Greeting", () => ({
	__esModule: true,
	default: () => <div data-testid="greeting" />,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ icon }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{icon}</div>
	),
}));

jest.mock("../../components/BackToTop", () => ({
	__esModule: true,
	default: ({ children }: ComponentProps<typeof BackToTop>) => (
		<div data-testid="back-to-top">{children}</div>
	),
}));

jest.mock("../../components/ScanCodeButton", () => ({
	__esModule: true,
	default: () => <div data-testid="scan-code-button" />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../hooks/usePoints", () => ({
	usePoints: jest.fn(),
}));

jest.mock("../../hooks/useBanners", () => ({
	useBanners: jest.fn(),
}));

const points: IPoints = {
	ladder: "platinum",
	earnedPoints: 5000,
	remainingPointsToPlatinum: 1000,
	dateLimitToPlatinum: "2018-01-01",
	availablePoints: 1220,
	expiringPoints: 100,
	expiringAt: "2018-12-01",
};

const banners: GetBannersResponse = {
	banners: [
		{
			imageUrl: "fakeUrl",
			id: "fakeId",
			redirectLink: "fakeRedirectLink",
			alt: "fakeAlt",
		},
	] as CarouselBanner[],
	campaign: {
		imageUrl: "fakeUrl",
		id: "fakeId",
		redirectLink: "fakeRedirectLink",
		alt: "fakeAlt",
	} as CampaignBanner,
};

beforeEach(() => {
	(useUserProfile as jest.Mock).mockReturnValue({
		profileCompleteness: ProfileCompleteness.COMPLETE,
	});

	(usePoints as jest.Mock).mockReturnValue({
		getUserPoints: jest.fn().mockResolvedValue(points),
	});

	(useBanners as jest.Mock).mockReturnValue({
		getBanners: jest.fn().mockResolvedValue(banners),
	});
	const { getUserPoints } = usePoints();
	const { getBanners } = useBanners();

	(useAsync as jest.Mock).mockReturnValue({
		value: [getUserPoints(), getBanners()],
		loading: false,
	});
});

describe("HomePage", () => {
	it("should render without errors", () => {
		render(<HomePage />);
	});

	it("should render store block", async () => {
		render(<HomePage />);

		const storeBlock = screen.getByTestId("store-block");
		expect(storeBlock).toBeInTheDocument();
	});

	it("should render coupon block", async () => {
		render(<HomePage />);

		const couponBlock = screen.getByTestId("coupon-block");
		expect(couponBlock).toBeInTheDocument();
	});

	it("should render promotions block", async () => {
		render(<HomePage />);

		const promotionsBlock = screen.getByTestId("promotions-block");
		expect(promotionsBlock).toBeInTheDocument();
	});

	it("should render global navigation panel", async () => {
		render(<HomePage />);

		const globalNavigationPanel = screen.getByTestId(
			"global-navigation-panel"
		);
		expect(globalNavigationPanel).toBeInTheDocument();
	});

	it("should render back to top", async () => {
		render(<HomePage />);

		const BackToTop = screen.getByTestId("back-to-top");
		expect(BackToTop).toBeInTheDocument();
	});

	it("should render RegistrationSuccessModal", async () => {
		render(<HomePage />);

		const registrationSuccessModal = screen.getByTestId(
			"registration-success-modal"
		);
		expect(registrationSuccessModal).toBeInTheDocument();
	});

	it("should render loading block", () => {
		const { getUserPoints } = usePoints();
		const { getBanners } = useBanners();

		(useAsync as jest.Mock).mockReturnValueOnce({
			value: [getUserPoints(), getBanners()],
			loading: true,
		});

		render(<HomePage />);

		const loadingBlock = screen.queryByTestId("loading-block");
		expect(loadingBlock).toBeInTheDocument();
	});
});
