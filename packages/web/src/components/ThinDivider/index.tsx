import { FC } from "react";
import "./index.scss";
import { useService } from "../../hooks/useService";

interface IProps {
	className?: string;
}

const ThinDivider: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("thin-divider", className);

	return <hr className={classNames} />;
};

export default ThinDivider;
