import { Modal as AntModal, ModalProps } from "antd";
import { FC, PropsWithChildren } from "react";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type Props = ModalProps;

const Modal: FC<PropsWithChildren<Props>> = ({
	children,
	className,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("acuvue-modal", className);

	return (
		<AntModal {...props} className={classNames}>
			{children}
		</AntModal>
	);
};

export default Modal;
