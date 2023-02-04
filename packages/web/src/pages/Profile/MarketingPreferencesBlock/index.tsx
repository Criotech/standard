import { FC } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useService } from "../../../hooks/useService";
import "./index.scss";
import Text from "../../../components/Text";
import Button, { ButtonType } from "../../../components/Button";
import { useHistory } from "react-router-dom";

interface IProps {
	className?: string;
}

const MarketingPreferencesBlock: FC<IProps> = ({ className }) => {
	const history = useHistory();

	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-marketing-preferences-block",
		className
	);

	return (
		<div className={classNames}>
			<BlockTitle
				textKey="profilePage.marketingPreference.title"
				className="title"
			/>

			<Button
				type={ButtonType.OUTLINE}
				className="update-button"
				onClick={() => history.push("/profile/marketing")}
			>
				<Text textKey="profilePage.marketingPreference.updateMarketingPreference" />
			</Button>
		</div>
	);
};
export default MarketingPreferencesBlock;
