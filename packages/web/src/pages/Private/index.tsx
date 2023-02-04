import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom-v5-compat";
import Registration from "../Registration";
import Homepage from "../Home";
import Points from "../Points/index";
import AboutMyAcuvuePoints from "../AboutMyAcuvuePoints";
import Store from "../Store";
import Rewards from "../Rewards";
import PointsTransactions from "../Points/PointsTransactions";
import PointsTermsAndConditions from "../PointsTermsAndConditions";
import About from "../About";
import ContactUs from "../ContactUs";
import AboutTermsOfUse from "../About/AboutTermsOfUse";
import AboutPrivacyPolicy from "../About/AboutPrivacyPolicy";
import PromotionsAndEvents from "../PromotionsAndEvents/index";
import ConfirmStoreSelection from "../Store/YourOpticalStore/ConfirmStoreSelection";
import AcuvueCouponDetails from "../Rewards/AcuvueCouponDetails";
import { LifestyleCartProvider } from "../../contexts/LifestyleCartContext";
import Cart from "../Rewards/Cart";
import WalletCouponDetails from "../Rewards/WalletCouponDetails";
import LifestyleCouponDetails from "../Rewards/LifestyleCouponDetails/index";
import Membership from "../Membership";
import ProfileAndSettings from "../ProfileAndSettings/index";
import ProfileDetails from "../ProfileDetails";
import MemberId from "../MemberId";
import UpdatePhoneNumber from "../UpdatePhoneNumber/index";
import OtpVerificationPage from "../UpdatePhoneNumber/OtpVerification";
import EditProfileLegacy from "../EditProfileLegacy";
import NewAddress from "../Address/NewAddress";
import EditAddress from "../Address/EditAddress";

const Private: FC<{}> = () => (
	<Routes>
		<Route index path="/" element={<Homepage />} />
		<Route path="*" element={<Navigate to="/" />} />

		<Route path="registration" element={<Registration />} />

		<Route path="points">
			<Route index element={<Points />} />
			<Route path="about" element={<AboutMyAcuvuePoints />} />
			<Route path="transactions" element={<PointsTransactions />} />
			<Route
				path="terms-and-conditions"
				element={<PointsTermsAndConditions />}
			/>
		</Route>

		<Route
			path="rewards/*"
			element={
				<LifestyleCartProvider>
					<Rewards />
				</LifestyleCartProvider>
			}
		/>
		<Route path="wallet/:couponId" element={<WalletCouponDetails />} />
		<Route path="catalog/:couponId" element={<AcuvueCouponDetails />} />
		<Route
			path="lifestyle/:couponId"
			element={
				<LifestyleCartProvider>
					<LifestyleCouponDetails />
				</LifestyleCartProvider>
			}
		/>
		<Route
			path="rewards-cart"
			element={
				<LifestyleCartProvider>
					<Cart />
				</LifestyleCartProvider>
			}
		/>

		<Route path="store">
			<Route index path="*" element={<Store />} />
			<Route
				path="your-optical-store/register-confirmation"
				element={<ConfirmStoreSelection />}
			/>
		</Route>

		<Route path="profile">
			<Route index element={<ProfileAndSettings />} />
			<Route path="details" element={<ProfileDetails />} />
			<Route path="edit" element={<EditProfileLegacy />} />
			<Route path="default-address">
				<Route path="add" element={<NewAddress />} />
				<Route path="edit" element={<EditAddress />} />
			</Route>
		</Route>
		<Route path="update-mobile">
			<Route index element={<UpdatePhoneNumber />} />
			<Route path="otp-verification" element={<OtpVerificationPage />} />
		</Route>

		<Route path="promotions-events" element={<PromotionsAndEvents />} />
		<Route path="membership/*" element={<Membership />} />
		<Route path="member-id" element={<MemberId />} />

		<Route path="about">
			<Route index element={<About />} />
			<Route path="contact-us" element={<ContactUs />} />
			<Route path="terms-of-use" element={<AboutTermsOfUse />} />
			<Route path="privacy-policy" element={<AboutPrivacyPolicy />} />
		</Route>
	</Routes>
);

export default Private;
