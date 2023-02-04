import { FC } from "react";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import "./index.scss";
import { usePromocodeBlock } from "./usePromocodeBlock";
import PromocodeImage from "../../../images/promocode-block-image.png";

interface IProps {}

const PromocodeBlock: FC<IProps> = () => {
	const { promo, generatePromo, errorMessage } = usePromocodeBlock();

	return (
		<div className="acuvue-promocode-block">
			<div className="promocode-block-title typography-heading-2">
				<Text textKey="dashboardPage.promocodeBlock.title" />
			</div>

			{promo && (
				<div className="promocode">
					<p className="code">{promo.promocode}</p>
				</div>
			)}

			<Button className="generate-code-button" onClick={generatePromo}>
				<Text textKey="dashboardPage.promocodeBlock.generateCodeButton" />
			</Button>

			<div className="promo-bottom">
				{errorMessage && (
					<p className="error-message">
						<Text textKey={errorMessage.translationKey} />
					</p>
				)}

				{promo && !promo.isTrialCompleted && (
					<p className="share-text">
						<Text textKey="dashboardPage.promocodeBlock.shareTextAvailTrial" />
					</p>
				)}
				{promo && promo.isTrialCompleted && (
					<p className="avail-purchase-text">
						<Text textKey="dashboardPage.promocodeBlock.shareTextAvailPurchase" />
					</p>
				)}

				<p className="bottom-text">
					<Text textKey="dashboardPage.promocodeBlock.bottomText" />
				</p>
			</div>

			<div className="promocode-image">
				<img
					src={PromocodeImage}
					width="100%"
					height="100%"
					alt={PromocodeImage}
				/>
			</div>
		</div>
	);
};

export default PromocodeBlock;
