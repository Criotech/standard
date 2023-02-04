import { FC } from "react";
import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";
import "./index.scss";
import RatingInput from "../../../../components/RatingInput";
import Text from "../../../../components/Text";

interface IProps {
	value: number;
	label: TranslationKey;
	description: TranslationKey;
	onChange?: (newValue: number) => void;
	isDisabled?: boolean;
	className?: string;
}

const RatingInputWithLabel: FC<IProps> = ({
	value,
	label,
	description,
	onChange,
	isDisabled,
	className,
}) => {
	const disableForm = isDisabled ? "disable-form" : "";
	const classNames = ClassService.createClassName(
		"acuvue-rating-input-with-label",
		className,
		disableForm
	);

	return (
		<div className={classNames}>
			<RatingInput
				value={value}
				isDisabled={isDisabled}
				onChange={onChange}
			/>
			<h4 className="label">
				<Text textKey={label} />
			</h4>
			<p className="description">
				<Text textKey={description} />
			</p>
		</div>
	);
};

export default RatingInputWithLabel;
