import { FC } from "react";
import { useService } from "../../../../../../hooks/useService";
import AddressSection from "../../../AddressSection";
import ContactSection from "../../../ContactSection";
import SelectStoreButton from "../../SelectStoreButton";
import StoreName from "../../../StoreName";
import "./index.scss";
import PinIconWithNumber from "../../../../../../components/PinIconWithNumber";
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

const StoreWithPinCardSmall: FC<IProps> = ({
	number,
	storeName,
	storeAddress,
	telephone,
	distanceInKm,
	onSelectStoreClick,
	className,
	isHighlighted,
	onClick,
}) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"store-with-pin-card-small",
		isHighlighted ? "highlighted" : "",
		className
	);

	return (
		<div className={classNames} onClick={onClick}>
			<div className="number">
				<PinIconWithNumber number={number} />
			</div>

			<div className="store">
				<StoreName name={storeName} />
				{distanceInKm && (
					<p className="store-distance typography-caption">
						<Text
							textKey={"dashboardPage.opticalStore.distance"}
							data={{ distance: distanceInKm }}
						/>
					</p>
				)}
				<AddressSection
					className="address-section"
					address={storeAddress}
				/>

				<div className="contact-and-select-store">
					<ContactSection
						telephone={telephone}
						className="contact-section"
					/>

					<SelectStoreButton
						className="select-store-button"
						onClick={onSelectStoreClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default StoreWithPinCardSmall;
