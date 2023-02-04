import { FC } from "react";
import { useService } from "../../hooks/useService";
import Text from "../Text";
import "./MegaMenuListItemHeader.scss";

interface IProps {
	textKey: any;
	className?: string;
}

const MegaMenuListItemHeader: FC<IProps> = ({ textKey, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-mega-menu-list-item-header",
		className
	);

	return (
		<li className={classNames}>
			<h4 className="">
				<Text textKey={textKey} />
			</h4>
		</li>
	);
};

export default MegaMenuListItemHeader;
