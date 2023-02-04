import { FC, useMemo, useEffect } from "react";
import "./index.scss";
import { Form } from "antd";
import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import ReactOtpInput from "react-otp-input";

interface IProps {
	alwaysVisibleErrorKey?: TranslationKey;
	disabled?: boolean;
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
	sendFormError?: (errorMessage: string) => void;
}

const OtpInput: FC<IProps> = ({
	disabled,
	value,
	onChange,
	alwaysVisibleErrorKey,
	className,
	sendFormError,
}) => {
	const errorToDisplay = useMemo(
		() =>
			alwaysVisibleErrorKey ? (
				<div className="otp-server-error-message">
					<Text textKey={alwaysVisibleErrorKey} />
				</div>
			) : null,
		[alwaysVisibleErrorKey]
	);

	useEffect(() => {
		if (sendFormError && errorToDisplay) {
			sendFormError(`${value}:${alwaysVisibleErrorKey}`);
		}
	}, [alwaysVisibleErrorKey, errorToDisplay, sendFormError, value]);

	const classNames = ClassService.createClassName(
		"acuvue-otp-input-label",
		className
	);

	return (
		<Form.Item
			help={errorToDisplay}
			validateStatus={alwaysVisibleErrorKey ? "error" : "success"}
			className={classNames}
		>
			<div className="acuvue-otp-input">
				<ReactOtpInput
					value={value}
					onChange={(_value: string) => {
						if (onChange) {
							onChange(_value);
						}
					}}
					numInputs={4}
					inputStyle="otp-input"
					isInputNum
					isDisabled={disabled}
					shouldAutoFocus
				/>
			</div>
		</Form.Item>
	);
};

export default OtpInput;
