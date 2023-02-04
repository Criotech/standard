import { FC, useEffect, useMemo, useState } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useText } from "../../hooks/useText";
import { Form, Select as AntSelect } from "antd";
import ExclamationIcon, {
	ExclamationIconSize,
} from "../../icons/ExclamationIcon";
import Text from "../Text";
import Select from "../Select";
import { useService } from "../../hooks/useService";
import "./index.scss";

const { Option } = AntSelect;

type GroupItem<ValueType extends string | number> = {
	label: TranslationKey;
	value: ValueType;
};

interface IProps<ValueType extends string | number> {
	value: string;
	onChange: (value: string) => void;
	label: TranslationKey;
	errorKey?: TranslationKey;
	className?: string;
	placeholder: TranslationKey;
	items: Array<GroupItem<ValueType>>;
	alwaysVisibleErrorKey?: TranslationKey;
	disabled?: boolean;
	sendFormError?: (errorMessage: string) => void;
}

const InputError: FC<{ errorKey: TranslationKey }> = ({ errorKey }) => (
	<span>
		<ExclamationIcon size={ExclamationIconSize.SMALL} />{" "}
		<Text textKey={errorKey} />
	</span>
);

function GenericSelect<ValueType extends string | number>({
	label,
	errorKey,
	value,
	onChange,
	className,
	placeholder,
	items,
	alwaysVisibleErrorKey,
	disabled,
	sendFormError,
}: IProps<ValueType>) {
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

	useEffect(() => {
		if (sendFormError && errorToDisplay) {
			sendFormError(`${value}:${alwaysVisibleErrorKey || errorKey}`);
		}
	}, [alwaysVisibleErrorKey, errorKey, errorToDisplay, value, sendFormError]);

	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-select-input",
		className
	);

	return (
		<Form.Item
			className={classNames}
			label={<Text textKey={label} />}
			validateStatus={displayError ? "error" : "success"}
			help={errorToDisplay}
		>
			<Select
				onBlur={() => setIsTouched(true)}
				value={value}
				onChange={(value) => {
					onChange(value as any);
				}}
				placeholder={useText(placeholder)}
				disabled={disabled}
			>
				{items.map(({ value, label }) => (
					<Option key={value} value={value}>
						<Text textKey={label} />
					</Option>
				))}
			</Select>
		</Form.Item>
	);
}

export default GenericSelect;
