import { FC } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useService } from "../../../hooks/useService";
import "./index.scss";
import Text from "../../../components/Text";
import Button, { ButtonType } from "../../../components/Button";
import { useXiam } from "../../../contexts/XiamContext";

interface IProps {
	className?: string;
}

const PasswordBlock: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-password",
		className
	);

	const { updatePassword } = useXiam();

	return (
		<div className={classNames}>
			<BlockTitle
				textKey="profilePage.password.title"
				className="title"
			/>

			<Button
				type={ButtonType.OUTLINE}
				className="update-button"
				onClick={() => updatePassword()}
			>
				<Text textKey="profilePage.password.updatePassword" />
			</Button>
		</div>
	);
};
export default PasswordBlock;
