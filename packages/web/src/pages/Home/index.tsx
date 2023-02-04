import { FC } from "react";
import PointsBlock from "../../components/PointsBlock";
import { Divider } from "antd";
import "./index.scss";
import CouponBlock from "./CouponBlock";
import RegisterBlock from "./RegisterBlock";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import ImageCarousel from "../../components/ImageCarousel";
import PromotionsBlock from "./PromotionsBlock";
import StoreBlock from "./StoreBlock";
import { useUserProfile } from "../../contexts/UserProfileContext";
import Greeting from "./Greeting";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import BackToTop from "../../components/BackToTop";
import { usePoints } from "../../hooks/usePoints";
import {
	GetBannersResponse,
	IPoints,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useAsync } from "react-use";
import { useBanners } from "../../hooks/useBanners";
import LoadingBlock from "../../components/LoadingBlock";
import Header from "../../components/Layout/Header";
import ScanCodeButton from "../../components/ScanCodeButton";

const Homepage: FC<{}> = () => {
	const couponValue = sessionStorage.getItem("myacuvue:coupon-value");
	const { profileCompleteness, userProfile } = useUserProfile();

	const { getUserPoints } = usePoints();
	const { getBanners } = useBanners();
	const { value, loading } = useAsync(
		() => Promise.all([getUserPoints(), getBanners()]),
		[getUserPoints, getBanners]
	);
	const [userPoints, bannersResponse] =
		(value as [IPoints, GetBannersResponse]) || [];

	return (
		<div className="home-page">
			<Header titleKey="homePage.title" icon={<ScanCodeButton />} />
			<main>
				{!loading && (
					<ImageCarousel banners={bannersResponse?.banners} />
				)}
				<Greeting profile={userProfile} />

				{loading ? (
					<LoadingBlock />
				) : profileCompleteness === ProfileCompleteness.COMPLETE ? (
					<PointsBlock points={userPoints} />
				) : (
					<RegisterBlock />
				)}

				<Divider plain />
				<StoreBlock />
				<Divider plain />
				<CouponBlock />
				{!loading && (
					<PromotionsBlock banner={bannersResponse.campaign} />
				)}
				<GlobalNavigationPanel />
				<BackToTop />
				<RegistrationSuccessModal isOpen={!!couponValue} />
			</main>
		</div>
	);
};

export default Homepage;
