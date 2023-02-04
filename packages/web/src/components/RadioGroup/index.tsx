import { Form as AntForm, Radio as AntRadio } from "antd";
import "./index.scss";
import { useState, useEffect, useMemo } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import { useService } from "../../hooks/useService";

type GroupItem<ValueType> = {
	label: TranslationKey;
	value: ValueType;
};

export type Props<ValueType> = {
	label: TranslationKey;
	value?: ValueType;
	items: Array<GroupItem<ValueType>>;
	disabled?: boolean;
	className?: string;
	id?: string;
	onChange: (value: ValueType) => void;
	name?: string;
	errorKey?: TranslationKey;
	alwaysVisibleErrorKey?: TranslationKey;
	sendFormError?: (errorMessage: string) => void;
};

function RadioGroup<ValueType>({
	errorKey,
	alwaysVisibleErrorKey,
	label,
	disabled,
	onChange,
	id,
	value,
	name,
	items,
	className,
	sendFormError,
}: Props<ValueType>) {
	const [isTouched, setIsTouched] = useState(false);
	const displayError = isTouched && errorKey;

	const errorToDisplay = useMemo(
		() =>
			alwaysVisibleErrorKey ? (
				<Text textKey={alwaysVisibleErrorKey} />
			) : (
				displayError && errorKey && <Text textKey={errorKey} />
			),
		[alwaysVisibleErrorKey, displayError, errorKey]
	);

	useEffect(() => {
		if (sendFormError && errorToDisplay) {
			sendFormError(`${name}:${alwaysVisibleErrorKey || errorKey}`);
		}
	}, [alwaysVisibleErrorKey, errorKey, errorToDisplay, name, sendFormError]);

	const { ClassService } = useService();
	const classNames = ClassService.createClassName("acuvue-radio", className);

	return (
		<AntForm.Item
			name={name}
			label={<Text textKey={label} />}
			id={id}
			className={classNames}
			help={errorToDisplay}
		>
			<AntRadio.Group
				disabled={disabled}
				onChange={(event) => {
					setIsTouched(true);
					onChange(event.target.value);
				}}
				value={value}
			>
				{items.map((item) => (
					<AntRadio key={item.label} value={item.value}>
						<Text textKey={item.label} />
					</AntRadio>
				))}
			</AntRadio.Group>
		</AntForm.Item>
	);
}

export default RadioGroup;
