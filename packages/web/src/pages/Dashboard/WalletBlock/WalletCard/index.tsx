import { FC } from "react";
import "./index.scss";

interface IProps {
	imageUrl: string;
	title: string;
}

const WalletCard: FC<IProps> = ({ imageUrl, title }) => {
	return (
		<div className="wallet-card">
			<div className="image-container">
				<img className="wallet-card-image" src={imageUrl} alt="" />
			</div>
			<div className="wallet-card-title">{title}</div>
		</div>
	);
};

export default WalletCard;
