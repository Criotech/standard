import { FC } from "react";
import { IStore } from "@myacuvue_thailand_web/services";
import opticalStoreIcon from "../../../../images/optical-store-icon.svg";
import Text from "../../../../components/Text";
import DeliveryIcon from "../../../../icons/DeliveryIcon";
import "./index.scss";

interface IProps {
	store: IStore;
}

const YourOpticalStoreView: FC<IProps> = ({ store }) => (
	<div className="your-optical-store">
		<h2 className="your-store-title">
			<Text textKey="storePage.opticalStore.yourOpticalStore" />
		</h2>

		<div className="store-info">
			<img className="optical-store-icon" src={opticalStoreIcon} alt="" />

			<div>
				<h2>{store.name}</h2>
				<p className="store-address">{store.address}</p>
			</div>
		</div>

		<div className="store-opening-telephone">
			<div className="store-opening-hours">
				<p className="opening-hour-label">
					<Text textKey="storePage.storeCell.openingHours" />
				</p>

				<p className="opening-hours">
					<Text
						textKey="storePage.storeCell.openingDays"
						data={{
							openingTime: store.openingTime,
							closingTime: store.closingTime,
						}}
					/>
				</p>
			</div>
			<div className="store-telephone">
				<p className="telephone-label">
					<Text textKey="storePage.storeCell.telephone" />
				</p>
				<p className="telephone">
					<a href={`tel:${store.phone}`}>{store.phone}</a>
				</p>
			</div>
		</div>

		{store.isEligibleForHomeDelivery && (
			<div className="store-delivery">
				<DeliveryIcon color="#003087" />
				<p className="eligible-for-filter">
					<Text textKey="storePage.storeCell.eligibleForDelivery" />
				</p>
			</div>
		)}
	</div>
);

export default YourOpticalStoreView;
