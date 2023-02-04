import { FC } from "react";
import "./index.scss";
import { useService } from "../../../../../../hooks/useService";
import PinIconWithNumber from "../../../../../../components/PinIconWithNumber";
import StoreName from "../../../StoreName";
import AddressSection from "../../../AddressSection";
import ContactSection from "../../../ContactSection";
import SelectStoreButton from "../../SelectStoreButton";
import Text from "../../../../../../components/Text";

interface IProps {
	number: number;
	storeName: string;
	storeAddress: string;
	telephone: string;
	distanceInKm?: number;
	onSelectStoreClick: () => void;
	onClick?: () => void;
	className?: string;
	isHighlighted?: boolean;
}

const StoreWithPinCardWide: FC<IProps> = ({
	number,
	storeName,
	storeAddress,
	telephone,
	distanceInKm,
	onSelectStoreClick,
	onClick,
	className,
	isHighlighted,
}) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-store-with-pin-card-wide",
		isHighlighted ? "highlighted" : "",
		className
	);

	return (
		<div className={classNames} onClick={onClick}>
			<PinIconWithNumber number={number} />
			<div className="store-name-address-wrapper">
				<div className="store-name-and-distance">
					<StoreName name={storeName} />
					{distanceInKm && (
						<p className="store-distance typography-caption">
							<Text
								textKey={"dashboardPage.opticalStore.distance"}
								data={{ distance: distanceInKm }}
							/>
						</p>
					)}
				</div>
				<div className="store-address-wrapper">
					<AddressSection address={storeAddress} />
					<ContactSection telephone={telephone} />
					<SelectStoreButton
						onClick={onSelectStoreClick}
						className="select-store-button-in-list"
					/>
				</div>
			</div>
		</div>
	);
};

export default StoreWithPinCardWide;
