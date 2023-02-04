import { FC } from "react";
import "./index.scss";
import StoreSelectedView from "./StoreSelectedView";
import NoStoreSelectedView from "./NoStoreSelectedView";
import { useStore } from "../../../hooks/useStore";
import { IStore } from "@myacuvue_thailand_web/services";
import { useAsync } from "react-use";
import LoadingBlock from "../../../components/LoadingBlock";

const StoreBlock: FC<{}> = () => {
	const { getUserStore } = useStore();

	const { value, loading } = useAsync(() => getUserStore(), [getUserStore]);
	const store = value as IStore;

	return (
		<div className="store-block">
			{loading ? (
				<LoadingBlock />
			) : store ? (
				<StoreSelectedView store={store} />
			) : (
				<NoStoreSelectedView />
			)}
		</div>
	);
};

export default StoreBlock;
