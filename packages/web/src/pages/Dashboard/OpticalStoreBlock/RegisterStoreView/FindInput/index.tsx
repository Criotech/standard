import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import GenericInput from "../../../../../components/GenericInput";
import { useService } from "../../../../../hooks/useService";
import MagnifyingGlassIcon, {
	IconSize,
} from "../../../../../icons/MagnifyingGlassIcon";

interface IProps {
	className?: string;
	name: string;
	value: string;
	onChange: (value: string) => void;
	label: TranslationKey;
	placeholder: TranslationKey;
}

const FindInput: FC<IProps> = ({
	value,
	onChange,
	label,
	placeholder,
	name,
	className,
}) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"register-store-find-input",
		className
	);

	return (
		<div className={classNames}>
			<GenericInput
				type="text"
				className="input"
				name={name}
				placeholder={placeholder}
				label={label}
				value={value}
				onChange={(value) => {
					onChange(value);
				}}
				prefix={
					<MagnifyingGlassIcon
						size={IconSize.SMALL}
						color="#003087"
					/>
				}
			/>
		</div>
	);
};

export default FindInput;
