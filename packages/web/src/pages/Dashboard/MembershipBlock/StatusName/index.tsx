import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../components/Text";
import "./index.scss";
import { useService } from "../../../../hooks/useService";

interface IProps {
	statusKey: TranslationKey;
	className?: string;
}

const StatusName: FC<IProps> = ({ statusKey, className }) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-membership-block-status-name",
		className
	);

	return (
		<div className={classNames}>
			<Text textKey={statusKey} />
		</div>
	);
};

export default StatusName;
