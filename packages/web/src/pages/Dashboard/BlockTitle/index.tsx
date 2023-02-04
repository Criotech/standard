import { FC } from "react";
import "./index.scss";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../../../components/Text";
import { useService } from "../../../hooks/useService";

interface IProps {
	textKey: TranslationKey;
	className?: string;
}

const BlockTitle: FC<IProps> = ({ textKey, className }) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-block-title",
		className
	);

	return (
		<div className={classNames}>
			<Text textKey={textKey} />
		</div>
	);
};

export default BlockTitle;
