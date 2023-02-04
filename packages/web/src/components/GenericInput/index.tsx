import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Form, Input } from "antd";
import { FC, ReactNode, useMemo, useState } from "react";
import { useService } from "../../hooks/useService";
import { useText } from "../../hooks/useText";
import ExclamationIcon, {
	ExclamationIconSize,
} from "../../icons/ExclamationIcon";
import Text from "../Text";
import "./index.scss";

interface IProps {
	type: string;
	name: string;
	maxLength?: number;
	value: string;
	prefix?: ReactNode;
	onChange: (value: string) => void;
	onBlur?: () => void;
	placeholder: TranslationKey;
	label: TranslationKey;
	errorKey?: TranslationKey;
	alwaysVisibleErrorKey?: TranslationKey;
	className?: string;
}

const InputError: FC<{ errorKey: TranslationKey }> = ({ errorKey }) => (
	<span>
		<ExclamationIcon size={ExclamationIconSize.SMALL} />{" "}
		<Text textKey={errorKey} />
	</span>
);

const GenericInput: FC<IProps> = ({
	placeholder,
	label,
	errorKey,
	type,
	name,
	value,
	maxLength,
	onChange,
	className,
	prefix,
	alwaysVisibleErrorKey,
	onBlur,
}) => {
	const [isTouched, setIsTouched] = useState(false);
	const displayError = isTouched && errorKey;

	const errorToDisplay = useMemo(
		() =>
			alwaysVisibleErrorKey ? (
				<InputError errorKey={alwaysVisibleErrorKey} />
			) : (
				displayError && errorKey && <InputError errorKey={errorKey} />
			),
		[alwaysVisibleErrorKey, displayError, errorKey]
	);

	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-text-input",
		className
	);

	return (
		<Form.Item
			className={classNames}
			label={<Text textKey={label} />}
			validateStatus={displayError ? "error" : "success"}
			help={errorToDisplay}
		>
			<Input
				onBlur={() => {
					setIsTouched(true);
					onBlur?.();
				}}
				type={type}
				name={name}
				maxLength={maxLength}
				value={value}
				onChange={(event) => {
					onChange(event.target.value);
				}}
				addonBefore={prefix}
				placeholder={useText(placeholder)}
			/>
		</Form.Item>
	);
};

export default GenericInput;
