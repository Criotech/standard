import { FC } from "react";
import myAcuvueLogo from "../../../../images/myacuvue-icon.png";
import "./index.scss";
import { useService } from "../../../../hooks/useService";
import DropdownIcon, { IconSize } from "../../../../icons/DropdownIcon";
import UserMenu from "../UserMenu";
import Text from "../../../Text";

interface IProps {
	className?: string;
	name: string;
}

const MemberMenuDropdownTrigger: FC<IProps> = ({ className, name }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-member-menu-dropdown-trigger",
		className
	);

	return (
		<div className={classNames}>
			<img
				src={myAcuvueLogo}
				alt="MyAcuvue logo"
				className="acuvue-logo"
			/>
			<span className="member-name">
				<Text textKey="myacuvueLiteHeader.memberMenuDropdownTrigger.hello" />
				{name}
			</span>
			<DropdownIcon size={IconSize.MINI} color="#003087" />
			<UserMenu className="wide-header-user-menu" />
		</div>
	);
};

export default MemberMenuDropdownTrigger;
