import { FC, PropsWithChildren } from "react";
import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";
import Button, { ButtonSize, ButtonType } from "../Button";
import Text from "../Text";
import "./index.scss";
import { useXiam } from "../../contexts/XiamContext";
import { useDeviceToken } from "../../contexts/DeviceTokenContext";
import { useSessionToken } from "../../contexts/SessionTokenContext";
import { useCallbackWithLoading } from "../../hooks/useCallbackWithLoading";

interface IProps {
	className?: string;
	buttonLabel: TranslationKey;
	type?: ButtonType;
}

const SignInButton: FC<PropsWithChildren<IProps>> = ({
	className,
	type = ButtonType.NO_OUTLINE,
	buttonLabel,
	...props
}) => {
	const { loginPopup, getXiamToken } = useXiam();
	const { deleteDeviceToken } = useDeviceToken();
	const { setSessionToken } = useSessionToken();

	const signIn = useCallbackWithLoading(async () => {
		try {
			const xiamToken = await getXiamToken();

			if (!xiamToken) {
				deleteDeviceToken();
				setSessionToken(undefined);
			}
			await loginPopup();
		} catch (error) {}
	}, [getXiamToken, loginPopup]);

	const classNames = ClassService.createClassName(
		"sign-in-button",
		className
	);

	return (
		<Button
			className={classNames}
			type={type}
			size={ButtonSize.MEDIUM}
			htmlType="button"
			onClick={async () => await signIn()}
		>
			<Text textKey={buttonLabel} />
			{props.children}
		</Button>
	);
};

export default SignInButton;
