import { FC } from "react";
import StoreMapSection from "../StoreMapSection";
import StoreSearchSection from "../StoreSearchSection";
import StoreListSection from "../StoreListSection";
import "./index.scss";
import Text from "../../../../../components/Text";
import BlockTitle from "../../../BlockTitle";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

const RegisterStoreWideView: FC<{}> = () => {
	const { storeCards, numberOfResults } = useOpticalStoreContext();

	return (
		<div className="register-store-wide-view">
			<BlockTitle textKey="dashboardPage.opticalStore.registerYourPreferredOpticalStore" />
			<p className="register-store-instruction typography-body-1">
				<Text textKey="dashboardPage.opticalStore.registerPreferredStoreDescription" />
			</p>
			<StoreSearchSection />
			<div className="store-list-and-map">
				<div className="store-list-section">
					<span className="register-store-results">
						<Text
							textKey="dashboardPage.opticalStore.numberOfResults"
							data={{ number: numberOfResults }}
						/>
					</span>
					<StoreListSection storeCards={storeCards} />
				</div>
				<StoreMapSection className="register-store-map-section" />
			</div>
		</div>
	);
};

export default RegisterStoreWideView;
