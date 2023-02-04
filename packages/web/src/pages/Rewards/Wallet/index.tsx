import { FC } from "react";
import { Affix } from "antd";
import NavigationToggle from "../../../components/NavigationToggle";
import WalletCouponList from "./WalletCouponList";
import "./index.scss";
import Text from "../../../components/Text";
import { Navigate, Routes, Route } from "react-router-dom-v5-compat";

const Wallet: FC<{}> = () => {
	return (
		<div className="wallet">
			<Affix offsetTop={60}>
				<NavigationToggle
					navItems={[
						{
							label: <Text textKey="rewardsPage.wallet.active" />,
							path: "/rewards/wallet/active",
						},
						{
							label: (
								<Text textKey="rewardsPage.wallet.redeemedExpired" />
							),
							path: "/rewards/wallet/redeemed-expired",
						},
					]}
					className="wallet-navigation"
				/>
			</Affix>
			<Routes>
				<Route
					index
					element={<Navigate to="/rewards/wallet/active" />}
				/>
				<Route path="active" element={<WalletCouponList />} />
				<Route path="redeemed-expired" element={<WalletCouponList />} />
			</Routes>
		</div>
	);
};

export default Wallet;
