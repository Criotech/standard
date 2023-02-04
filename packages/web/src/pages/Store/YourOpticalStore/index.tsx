import { FC } from "react";
import { useStore } from "../../../hooks/useStore";
import SelectYourStoreView from "./SelectYourStoreView";
import YourOpticalStoreView from "./YourOpticalStoreView";
import { useAsync } from "react-use";
import { IStore, IStoreWithCoordinates } from "@myacuvue_thailand_web/services";
import LoadingBlock from "../../../components/LoadingBlock";

const YourOpticalStore: FC = () => {
	const { getStores, getUserStore } = useStore();

	const { value, loading } = useAsync(
		() => Promise.all([getUserStore(), getStores()]),
		[getStores, getUserStore]
	);

	const [userStore, stores] =
		(value as [IStore | null, IStoreWithCoordinates[]]) || [];

	return (
		<div className="your-optical-store">
			{loading ? (
				<LoadingBlock />
			) : (
				<>
					{userStore ? (
						<YourOpticalStoreView store={userStore} />
					) : (
						<SelectYourStoreView stores={stores} />
					)}
				</>
			)}
		</div>
	);
};

export default YourOpticalStore;
