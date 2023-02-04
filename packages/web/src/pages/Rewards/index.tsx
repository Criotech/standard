import { FC } from "react";
import { Navigate, Routes, Route } from "react-router-dom-v5-compat";
import { Affix, Divider } from "antd";
import NavigationTabs from "../../components/NavigationTabs";
import Wallet from "./Wallet";
import Catalog from "./Catalog";
import { IPoints, ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { usePoints } from "../../hooks/usePoints";
import Text from "../../components/Text";
import "./index.scss";
import { useUserProfile } from "../../contexts/UserProfileContext";
import RewardsPoints from "./RewardsPoints";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import CartButton from "../../components/CartButton";
import Header from "../../components/Layout/Header";
import { useAsync } from "react-use";
import LoadingBlock from "../../components/LoadingBlock";

const Rewards: FC<{}> = () => {
	const { profileCompleteness } = useUserProfile();
	const { getUserPoints } = usePoints();

	const { value, loading } = useAsync(() => getUserPoints(), [getUserPoints]);
	const points = value as IPoints;

	return (
		<div className="rewards-page">
			<Header titleKey="globalNavigation.rewards" icon={<CartButton />} />
			<main>
				{loading && <LoadingBlock />}
				{profileCompleteness === ProfileCompleteness.COMPLETE &&
					!loading && <RewardsPoints points={points} />}
				{profileCompleteness === ProfileCompleteness.INCOMPLETE &&
					!loading && (
						<p className="available-points">
							<Text
								textKey="rewardsPage.cart.availablePoints"
								data={{
									availablePoints: 0,
								}}
							/>
						</p>
					)}
				<Divider plain />
				<Affix>
					<NavigationTabs
						navItems={[
							{
								labelKey: "rewardsPage.yourRewardsWallet",
								path: "/rewards/wallet",
							},
							{
								labelKey: "rewardsPage.rewardsCatalog",
								path: "/rewards/catalog",
							},
						]}
					/>
				</Affix>
				<Routes>
					<Route index element={<Navigate to="/rewards/wallet" />} />
					<Route path="wallet/*" element={<Wallet />} />
					<Route path="catalog/*" element={<Catalog />} />
				</Routes>
				<GlobalNavigationPanel />
			</main>
		</div>
	);
};

export default Rewards;
