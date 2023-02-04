import { FC } from "react";
import { IStore } from "@myacuvue_thailand_web/services";
import "./index.scss";
import Text from "../Text";
import DeliveryIcon from "../../icons/DeliveryIcon";

interface IProps {
	store: IStore;
}

const StoreCell: FC<IProps> = ({ store }) => (
	<div className="store-cell">
		<h2 className="store-name">{store.name}</h2>
		<p className="store-address">{store.address}</p>

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
		{store.isEligibleForHomeDelivery && (
			<div>
				<DeliveryIcon color="#003087" />
				<span className="store-delivery-eligibility">
					<Text textKey="storePage.storeCell.eligibleForDelivery" />
				</span>
			</div>
		)}
	</div>
);

export default StoreCell;
