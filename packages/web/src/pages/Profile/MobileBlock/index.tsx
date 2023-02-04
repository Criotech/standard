import { FC, useMemo } from "react";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useService } from "../../../hooks/useService";
import "./index.scss";
import Text from "../../../components/Text";
import Button, { ButtonType } from "../../../components/Button";
import { useHistory } from "react-router-dom";
import { usePhone } from "../../../hooks/usePhone";
import "./index.scss";

interface IProps {
	className?: string;
	phone?: string;
}

const MobileBlock: FC<IProps> = ({ phone, className }) => {
	const history = useHistory();
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-mobile-block",
		className
	);

	const { formatPhoneNumber } = usePhone();

	const formattedPhoneNumber = useMemo(() => {
		if (phone) {
			return formatPhoneNumber(phone);
		} else {
			return "";
		}
	}, [formatPhoneNumber, phone]);

	return (
		<div className={classNames}>
			<BlockTitle
				textKey="profilePage.mobileBlock.title"
				className="title"
			/>

			<Text textKey="profilePage.mobileBlock.updatingPhoneWillRequireOTP" />

			<table className="profile-table">
				<tbody>
					<tr>
						<td>
							<Text textKey={"profilePage.mobileBlock.mobile"} />:
						</td>
						<td>{formattedPhoneNumber}</td>
					</tr>
				</tbody>
			</table>

			<Button
				type={ButtonType.OUTLINE}
				className="update-button"
				onClick={() => history.push("/profile/phone")}
			>
				<Text textKey="profilePage.mobileBlock.button.label" />
			</Button>
		</div>
	);
};
export default MobileBlock;
