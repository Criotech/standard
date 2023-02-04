import { FC } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import "./index.scss";
import CheckmarkIcon, { IconSize } from "../../icons/CheckmarkIcon";
import { useService } from "../../hooks/useService";

interface IProps {
	isCheckLit: boolean;
	labelKey: TranslationKey;
	className?: string;
}

const CheckListItem: FC<IProps> = ({ labelKey, isCheckLit, className }) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-check-list-item",
		className
	);

	return (
		<div className={classNames}>
			{isCheckLit ? (
				<CheckmarkIcon color="#19a619" size={IconSize.SMALL} />
			) : (
				<CheckmarkIcon color="#C2C7CC" size={IconSize.SMALL} />
			)}
			<span className="label-text">
				<Text textKey={labelKey} />
			</span>
		</div>
	);
};

export default CheckListItem;
