import { FC, ReactElement, Fragment, PropsWithChildren } from "react";
import Modal from "../Modal";
import "./index.scss";
import Text from "../Text";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";

export enum ButtonsStyleType {
	INLINE = "inline",
	BLOCK = "block",
}

export interface Props {
	className?: string;
	titleKey?: TranslationKey;
	close?(): void;
	iconSrc?: string;
	visible: boolean;
	buttons?: ReactElement[];
	buttonsStyleType?: ButtonsStyleType;
	closable?: boolean;
	maskClosable?: boolean;
}

const CustomAlert: FC<PropsWithChildren<Props>> = ({
	children,
	className,
	titleKey,
	iconSrc,
	close,
	buttons = [],
	buttonsStyleType = ButtonsStyleType.BLOCK,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("custom-modal", className);

	return (
		<Modal footer={null} className={classNames} onCancel={close} {...props}>
			{titleKey && (
				<h1>
					<Text textKey={titleKey} />
				</h1>
			)}

			{iconSrc && <img src={iconSrc} alt="" />}

			{children}

			{buttons.length > 0 && (
				<div className={`btns-container ${buttonsStyleType}`}>
					{buttons.map((button, i) => (
						<Fragment key={i}>{button}</Fragment>
					))}
				</div>
			)}
		</Modal>
	);
};

export default CustomAlert;
