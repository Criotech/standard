import { FC } from "react";
import StoreWithPinCard from "../StoreWithPinCard";
import "./index.scss";
import { useService } from "../../../../../hooks/useService";
import ThinDivider from "../../../../../components/ThinDivider";
import List from "rc-virtual-list";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

export interface IStoreCard extends ConfigService.Coordinates {
	storeId: string;
	number: number;
	storeName: string;
	storeAddress: string;
	telephone: string;
	distanceInKm?: number;
}

interface IProps {
	storeCards: IStoreCard[];
	className?: string;
}

const StoreListSection: FC<IProps> = ({ storeCards, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-store-list-section",
		className
	);

	const { highlightedStoreId, handleStoreSelection } =
		useOpticalStoreContext();

	return (
		<div className={classNames}>
			<List
				data={storeCards}
				itemKey="number"
				itemHeight={100}
				height={550}
			>
				{(storeCard, index) => {
					const isHighlighted =
						storeCard.storeId === highlightedStoreId;

					return (
						<div>
							<StoreWithPinCard
								number={storeCard.number}
								storeName={storeCard.storeName}
								storeAddress={storeCard.storeAddress}
								telephone={storeCard.telephone}
								onSelectStoreClick={() =>
									handleStoreSelection(storeCard)
								}
								isHighlighted={isHighlighted}
								distanceInKm={storeCard.distanceInKm}
							/>
							{index !== storeCards.length - 1 && (
								<ThinDivider className="store-list-thin-divider" />
							)}
						</div>
					);
				}}
			</List>
		</div>
	);
};

export default StoreListSection;
