import { ChangeEventHandler, FC, LegacyRef, ReactNode } from "react";
import { Form as AntForm, Input as AntInput } from "antd";
import "./index.scss";
import ExclamationIcon, {
	ExclamationIconSize,
} from "../../icons/ExclamationIcon";
import { useService } from "../../hooks/useService";

export type Props = {
	ref?: LegacyRef<AntInput>;
	type?: string;
	id?: string;
	defaultValue?: string;
	maxLength?: number;
	className?: string;
	label?: string;
	name?: string;
	disabled?: boolean;
	size?: "large" | "middle" | "small";
	value?: string;
	placeholder?: string;
	errorMessage?: string | false;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onBlur?: any;
	addonBefore?: ReactNode;
	addonAfter?: ReactNode;
};

const TextInput: FC<Props> = ({
	ref,
	className,
	name,
	label,
	id,
	errorMessage,
	onBlur,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-text-input",
		className
	);

	return (
		<AntForm.Item
			help={
				errorMessage && (
					<span>
						<ExclamationIcon size={ExclamationIconSize.SMALL} />{" "}
						{errorMessage}
					</span>
				)
			}
			validateStatus={errorMessage ? "error" : ""}
			name={name}
			label={label}
			id={id}
			className={classNames}
		>
			<AntInput onBlur={onBlur} ref={ref} {...props} />
		</AntForm.Item>
	);
};

export default TextInput;
