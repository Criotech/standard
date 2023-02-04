import { FC } from "react";
import Text from "../../../../components/Text";
import "./index.scss";
import { useService } from "../../../../hooks/useService";

interface IProps {
	className?: string;
}

const StatusHeading: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-membership-block-status-heading",
		className
	);

	return (
		<div className={classNames}>
			<Text textKey="dashboardPage.membershipDetails.yourStatus" />
		</div>
	);
};

export default StatusHeading;
