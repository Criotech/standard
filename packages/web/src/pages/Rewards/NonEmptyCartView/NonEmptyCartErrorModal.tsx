import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import pointBadge from "../../../images/point-badge.svg";
import Text from "../../../components/Text";
import { ErrorTranslations } from "@myacuvue_thailand_web/services";

type Props = {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	error: ErrorTranslations;
};

const NonEmptyCartErrorModal: FC<Props> = ({
	isOpen = false,
	setOpen,
	error,
}) => {
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			titleKey="acuvueRewards.errorTitle"
			visible={isOpen}
			iconSrc={pointBadge}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text textKey={error.translationKey} data={error.translationData} />
		</CustomAlert>
	);
};

export default NonEmptyCartErrorModal;
