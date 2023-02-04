import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import decoIcon from "../../../images/alert-icon.svg";
import Text from "../../../components/Text";

type Props = {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	date: string;
	points: number;
};

const LifestyleCouponErrorModal: FC<Props> = ({
	isOpen = false,
	setOpen,
	date,
	points,
}) => {
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			titleKey="rewardsPage.lifestyleCouponErrorModal.errorPlatinumTitle"
			visible={isOpen}
			iconSrc={decoIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text
				textKey="rewardsPage.lifestyleCouponErrorModal.redeemPlatinumCoupon"
				data={{ points, date }}
			/>
		</CustomAlert>
	);
};

export default LifestyleCouponErrorModal;
