import { FC } from "react";
import Text from "../../../../../components/Text";
import BlockTitle from "../../../BlockTitle";
import StoreListSection from "../StoreListSection";
import StoreMapSection from "../StoreMapSection";
import StoreSearchSection from "../StoreSearchSection";
import "./index.scss";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

const RegisterStoreViewSmall: FC<{}> = () => {
	const { storeCards, numberOfResults } = useOpticalStoreContext();

	return (
		<div className="register-store-small-view">
			<BlockTitle textKey="dashboardPage.opticalStore.registerYourPreferredOpticalStore" />
			<div className="register-store-description">
				<Text textKey="dashboardPage.opticalStore.registerPreferredStoreDescription" />
			</div>
			<StoreSearchSection />
			<h5 className="number-of-results">
				<Text
					textKey="dashboardPage.opticalStore.numberOfResults"
					data={{ number: numberOfResults }}
				/>
			</h5>
			<StoreMapSection />
			<StoreListSection storeCards={storeCards} />
		</div>
	);
};

export default RegisterStoreViewSmall;
