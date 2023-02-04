import { FC, useEffect } from "react";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../components/Footer";
import OpticalStoreBlock from "../Dashboard/OpticalStoreBlock";
import { useStore } from "../../hooks/useStore";
import { useAsyncRetry } from "react-use";
import "./index.scss";
import { useCompleteYourProfile } from "../CompleteYourProfile/useCompleteYourProfile";
import RegistrationSuccessDialog from "../CompleteYourProfile/RegistrationSuccessDialog";
import { useStorage } from "../../hooks/useStorage";
import { IQrQueryParams } from "../UrlReaderProxy";
import GreetingsBlock from "../GreetingsBlock";
import { useUserProfile } from "../../contexts/UserProfileContext";
import LoadingBlock from "../../components/LoadingBlock";
import { RenderGreetingBlockStatus } from "@myacuvue_thailand_web/services";
import FeatureSwitch from "../../components/FeatureSwitch";

const DashboardWithOnlyOpticalStore: FC<{}> = () => {
	const { getUserStore, registerStore } = useStore();
	const [qrQueryParam] = useStorage<IQrQueryParams>("qr-query-params");

	const { userProfile, isLoading: isUserProfileLoading } = useUserProfile();

	const { isRegistrationPopupOpen, setIsRegistrationPopupOpen } =
		useCompleteYourProfile();

	const {
		value: userOpticalStore,
		loading: isUserStoreLoading,
		retry: refreshUserOpticalStore,
	} = useAsyncRetry(() => getUserStore(), [getUserStore]);

	useEffect(() => {
		(async () => {
			if (
				qrQueryParam &&
				!!qrQueryParam.ecp &&
				!isUserStoreLoading &&
				!userOpticalStore
			) {
				await registerStore({ storeId: qrQueryParam.ecp });
				refreshUserOpticalStore();
			}
		})();
	}, [
		isUserStoreLoading,
		qrQueryParam,
		refreshUserOpticalStore,
		registerStore,
		userOpticalStore,
	]);

	return (
		<div className="acuvue-dashboard-with-only-optical-store">
			<MyAcuvueLiteHeader />

			<FeatureSwitch
				name={"greetingsBlock"}
				value={RenderGreetingBlockStatus.ENABLED}
			>
				<div className="greetings-wrapper">
					{isUserProfileLoading && !userProfile && <LoadingBlock />}

					{!isUserProfileLoading && userProfile && (
						<GreetingsBlock
							firstName={userProfile.firstName || ""}
						/>
					)}
				</div>
			</FeatureSwitch>

			<OpticalStoreBlock
				isUserStoreLoading={isUserStoreLoading}
				userOpticalStore={userOpticalStore}
				refreshUserOpticalStore={refreshUserOpticalStore}
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
				isOpen={isRegistrationPopupOpen!}
				onClick={setIsRegistrationPopupOpen!}
			/>
		</div>
	);
};

export default DashboardWithOnlyOpticalStore;
