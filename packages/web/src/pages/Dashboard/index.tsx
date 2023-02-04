import { FC } from "react";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import "./index.scss";
import GreetingsBlock from "../GreetingsBlock";
import Footer from "../../components/Footer";
import SupportContactBlock from "./SupportContactBlock";
import OpticalStoreBlock from "./OpticalStoreBlock";
import { useAsyncRetry } from "react-use";
import InvitationBlock from "./InvitationBlock";
import PrivilegesBlock from "./PrivilegesBlock";
import { useStore } from "../../hooks/useStore";
import LoadingBlock from "../../components/LoadingBlock";
import RegistrationSuccessDialog from "../CompleteYourProfile/RegistrationSuccessDialog";
import { useCompleteYourProfile } from "../CompleteYourProfile/useCompleteYourProfile";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useDashboardData } from "./useDashboardData";
import { useHasReceivedWelcomeWallet } from "./useHasReceivedWelcomeWallet";
import { useWalletCouponCards } from "./useWalletCouponCards";
import { useCatalogCoupons } from "./useCatalogCoupons";

const Dashboard: FC<{}> = () => {
	const { getUserStore } = useStore();
	const { isRegistrationPopupOpen, setIsRegistrationPopupOpen } =
		useCompleteYourProfile();

	const { supportEmailAddress, supportTelephone } = useConfiguration();

	const {
		userPoints,
		userCoupons,
		userProfile,
		acuvueCoupons,
		lifeStyleCoupons,
		isPointsLoading,
		isUserCouponsLoading,
		isUserProfileLoading,
	} = useDashboardData();

	const walletCouponCards = useWalletCouponCards(userCoupons);

	const hasReceivedWelcomeWallet = useHasReceivedWelcomeWallet(userCoupons);

	const { catalogCoupons, leastExpensiveRewardValue } = useCatalogCoupons(
		acuvueCoupons ?? [],
		lifeStyleCoupons ?? []
	);

	const {
		value: userOpticalStore,
		loading: isUserStoreLoading,
		retry: refreshUserOpticalStore,
	} = useAsyncRetry(() => getUserStore(), [getUserStore]);

	return (
		<div className="acuvue-dashboard">
			<MyAcuvueLiteHeader />

			<div className="greetings-wrapper">
				{isUserProfileLoading && !userProfile && <LoadingBlock />}

				{!isUserProfileLoading && userProfile && (
					<GreetingsBlock
						userPoints={userPoints}
						isPointsLoading={isPointsLoading}
						firstName={userProfile.firstName || ""}
						walletProps={{
							isWalletLoading: isUserCouponsLoading,
							cards: walletCouponCards,
							minimumPointsToRedeem: leastExpensiveRewardValue,
							isCatalogsEmpty: catalogCoupons.length === 0,
							isUserRegistedToStore: !!userOpticalStore,
							hasReceivedWelcomeWallet: hasReceivedWelcomeWallet,
						}}
					/>
				)}
			</div>

			<OpticalStoreBlock
				isUserStoreLoading={isUserStoreLoading}
				userOpticalStore={userOpticalStore}
				refreshUserOpticalStore={refreshUserOpticalStore}
			/>

			<div className="invitation-block-wrapper" id="invitation-block">
				<InvitationBlock />
			</div>

			<div className="privileges-block-wrapper">
				<PrivilegesBlock />
			</div>

			<SupportContactBlock
				phone={supportTelephone}
				emailAddress={supportEmailAddress}
			/>
			<Footer />

			<RegistrationSuccessDialog
				registrationSuccessDialogHeadingKey={
					"profilePage.registrationSuccessDialogHeading"
				}
				registrationSuccessDialogBodyKey1={
					"profilePage.registrationSuccessDialogBody1"
				}
				registrationSuccessDialogBodyKey2={
					"profilePage.registrationSuccessDialogBody2"
				}
				registrationSuccessDialogBodyKey3={
					"profilePage.registrationSuccessDialogBody3"
				}
				isOpen={isRegistrationPopupOpen!}
				onClick={setIsRegistrationPopupOpen!}
			/>
		</div>
	);
};

export default Dashboard;
