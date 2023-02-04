import { FC } from "react";
import opticalStoreIcon from "../../../../images/optical-store-icon.svg";
import { IStore } from "@myacuvue_thailand_web/services";
import Text from "../../../../components/Text";
import "./index.scss";

interface IProps {
	store: IStore;
}

const StoreSelectedView: FC<IProps> = ({ store }) => {
	return (
		<div className="acuvue-store-selected-view">
			<img
				className="optical-store-image"
				src={opticalStoreIcon}
				alt=""
			/>
			<div className="custom-store-block">
				<h2>
					<Text textKey="homePage.opticalStore.yourOpticalStore" />
				</h2>
				<p className="store-name">{store.name}</p>
				<p>{store.address}</p>
			</div>
		</div>
	);
};

export default StoreSelectedView;
