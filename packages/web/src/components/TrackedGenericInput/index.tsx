import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC, ReactNode, useEffect, useState } from "react";
import GenericInput from "../GenericInput";

interface IProps {
	type: string;
	name: string;
	maxLength?: number;
	value: string;
	prefix?: ReactNode;
	onChange: (value: string) => void;
	placeholder: TranslationKey;
	label: TranslationKey;
	errorKey?: TranslationKey;
	alwaysVisibleErrorKey?: TranslationKey;
	className?: string;
	sendFormError: (errorMessage: string) => void;
}

const TrackedGenericInput: FC<IProps> = ({
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
	sendFormError,
}) => {
	const [isTouched, setIsTouched] = useState(false);
	const displayError = isTouched && errorKey;

	useEffect(() => {
		if (displayError) {
			sendFormError(`${name}:${alwaysVisibleErrorKey || errorKey}`);
		}
	}, [alwaysVisibleErrorKey, displayError, errorKey, name, sendFormError]);

	return (
		<GenericInput
			className={className}
			errorKey={errorKey}
			alwaysVisibleErrorKey={alwaysVisibleErrorKey}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			maxLength={maxLength}
			placeholder={placeholder}
			label={label}
			prefix={prefix}
			onBlur={() => setIsTouched(true)}
		/>
	);
};

export default TrackedGenericInput;
