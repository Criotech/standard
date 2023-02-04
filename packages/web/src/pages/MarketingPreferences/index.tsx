import { FC } from "react";
import Footer from "../../components/Footer";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import Title from "../../components/Title";
import "./index.scss";
import MarketingPreferencesForm from "./MarketingPreferencesForm";
import { useMarketingPreferences } from "./useMarketingPreferences";

const MarketingPreferences: FC<{}> = () => {
	const {
		formData,
		setFormData,
		errorKeys,
		hasError,
		serverErrorKeys,
		onSubmit,
		onCancel,
		hasLineNotification,
	} = useMarketingPreferences();

	return (
		<div className="marketing-preferences-page">
			<MyAcuvueLiteHeader />

			<div className="content-wrapper">
				<div className="marketing-title">
					<Title
						textKey="marketPreferencePage.title"
						subKey="marketPreferencesPage.subTitle"
					/>
				</div>

				<MarketingPreferencesForm
					formData={formData}
					setFormData={setFormData}
					errorKeys={errorKeys}
					serverErrorKeys={serverErrorKeys}
					onSubmit={onSubmit}
					onCancel={onCancel}
					isSubmitEnabled={hasError}
					hasLineNotification={hasLineNotification}
				/>
			</div>

			<Footer />
		</div>
	);
};

export default MarketingPreferences;
