import { Form, FormProps } from "antd";
import { FC, FormEvent, useCallback } from "react";
import {
	useFormView,
	useFormStart,
	useFormComplete,
	useFormError,
} from "../../hooks/useTracking";
import { FormType, TranslationKey } from "@myacuvue_thailand_web/services";
import { useDeepCompareEffect } from "react-use";

interface IProps extends FormProps<{}> {
	trackingFormName: FormType;
	trackingErrorKeys?: Record<string, TranslationKey>;
}

const TrackedForm: FC<IProps> = ({
	children,
	trackingFormName,
	trackingErrorKeys,
	onChange,
	onFinish,
	...formProps
}) => {
	useFormView(trackingFormName);
	const sendFormStart = useFormStart(trackingFormName);
	const sendFormComplete = useFormComplete(trackingFormName);
	const sendFormError = useFormError(trackingFormName);

	const handleChange = useCallback(
		(event: FormEvent<HTMLFormElement>) => {
			sendFormStart();
			onChange && onChange(event);
		},
		[onChange, sendFormStart]
	);

	const handleFinish = useCallback(
		(values: {}) => {
			sendFormComplete();
			onFinish && onFinish(values);
		},
		[sendFormComplete, onFinish]
	);

	useDeepCompareEffect(() => {
		if (trackingErrorKeys) {
			Object.entries(trackingErrorKeys).forEach(([key, value]) => {
				if (key && value) {
					sendFormError(`${key}:${value}`);
				}
			});
		}
	}, [sendFormError, trackingErrorKeys]);

	return (
		<Form {...formProps} onChange={handleChange} onFinish={handleFinish}>
			{children}
		</Form>
	);
};

export default TrackedForm;
