import Button, { ButtonSize, ButtonType } from "../../../../components/Button";
import Text from "../../../../components/Text";
import opticalStoreIcon from "../../../../images/optical-store-icon.svg";
import { FC } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";

const NoStoreSelectedView: FC<{}> = () => {
	const navigate = useNavigate();

	return (
		<div className="acuvue-no-store-selected-view">
			<img
				className="optical-store-image"
				src={opticalStoreIcon}
				alt=""
			/>
			<div className="custom-store-block">
				<h2>
					<Text textKey="homePage.opticalStore.yourOpticalStore" />
				</h2>
				<p>
					<Text textKey="homePage.opticalStore.noStoreDescription" />
				</p>
			</div>
			<Button
				className="select-store-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				onClick={() => navigate("/store/your-optical-store")}
			>
				<Text textKey="homePage.opticalStore.selectStore" />
			</Button>
		</div>
	);
};

export default NoStoreSelectedView;
