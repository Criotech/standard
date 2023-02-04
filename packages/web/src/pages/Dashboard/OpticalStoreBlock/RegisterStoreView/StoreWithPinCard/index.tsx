import { FC } from "react";
import StoreWithPinCardWide from "./StoreWithPinCardWide";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import StoreWithPinCardSmall from "./StoreWithPinCardSmall";

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

const StoreWithPinCard: FC<IProps> = ({
	number,
	storeName,
	storeAddress,
	telephone,
	distanceInKm,
	onSelectStoreClick,
	onClick,
	className,
	isHighlighted = false,
}) => {
	const { isWideScreen } = useWideScreen();

	if (isWideScreen) {
		return (
			<StoreWithPinCardWide
				number={number}
				storeName={storeName}
				storeAddress={storeAddress}
				telephone={telephone}
				distanceInKm={distanceInKm}
				onSelectStoreClick={onSelectStoreClick}
				onClick={onClick}
				isHighlighted={isHighlighted}
				className={className}
			/>
		);
	} else {
		return (
			<StoreWithPinCardSmall
				number={number}
				storeName={storeName}
				storeAddress={storeAddress}
				telephone={telephone}
				distanceInKm={distanceInKm}
				onSelectStoreClick={onSelectStoreClick}
				onClick={onClick}
				isHighlighted={isHighlighted}
				className={className}
			/>
		);
	}
};

export default StoreWithPinCard;
