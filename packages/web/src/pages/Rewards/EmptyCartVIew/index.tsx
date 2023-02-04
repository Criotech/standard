import { FC } from "react";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import magnifyingGlassOnSheet from "../../../images/magnifying-glass-on-sheet.svg";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";

const EmptyCartView: FC<{}> = () => {
	const navigate = useNavigate();

	return (
		<div className="empty-cart-view">
			<img
				className="magnifying-glass-on-sheet-image"
				src={magnifyingGlassOnSheet}
				alt=""
			/>
			<div className="rewards-description">
				<Text textKey="rewardsPage.emptyCartView.emptyCartDescription" />
			</div>
			<div className="browse-rewards-button-wrapper">
				<Button onClick={() => navigate("/rewards/catalog/lifestyle")}>
					<Text textKey="rewardsPage.emptyCartView.browseLifestyleRewards" />
				</Button>
			</div>
		</div>
	);
};

export default EmptyCartView;
