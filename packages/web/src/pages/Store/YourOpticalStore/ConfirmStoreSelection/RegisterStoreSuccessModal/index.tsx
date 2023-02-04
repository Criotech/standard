import { IStore } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Button from "../../../../../components/Button";
import CustomAlert from "../../../../../components/CustomModal";
import Text from "../../../../../components/Text";
import successIcon from "../../../../../images/success-icon.svg";
import "./index.scss";

interface IProps {
	store: IStore;
	isOpen: boolean;
	closeModal: () => void;
	onOk: () => void;
}

const RegisterStoreSuccessModal: FC<IProps> = ({
	store,
	isOpen,
	closeModal,
	onOk,
}) => (
	<CustomAlert
		className="register-store-success-modal"
		titleKey="storePage.yourOpticalStore.confirmStore.successTitle"
		visible={isOpen}
		iconSrc={successIcon}
		buttons={[
			<Button onClick={onOk}>
				<Text textKey="button.okLabel" />
			</Button>,
		]}
		close={closeModal}
	>
		<h2>{store.name}</h2>
		<p className="store-address">{store.address}</p>
	</CustomAlert>
);

export default RegisterStoreSuccessModal;
