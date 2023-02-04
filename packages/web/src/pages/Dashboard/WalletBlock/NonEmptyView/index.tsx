import { FC, ReactNode, useMemo } from "react";
import WalletCard from "../WalletCard";
import WalletCarousel from "../WalletCarousel";
import "./index.scss";

interface IProps {
	cards: { imageUrl: string; title: string }[];
}

const NonEmptyView: FC<IProps> = ({ cards }) => {
	const walletCards = useMemo<ReactNode[]>(
		() =>
			cards.map((walletCard) => (
				<WalletCard
					imageUrl={walletCard.imageUrl}
					title={walletCard.title}
				/>
			)),
		[cards]
	);

	return (
		<div className="acuvue-wallet-non-empty-view">
			<WalletCarousel slides={walletCards} />
		</div>
	);
};

export default NonEmptyView;
