import { FC } from "react";
import "./index.scss";
import { useService } from "../../hooks/useService";

interface IProps {
	className?: string;
}

const SectionDivider: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-section-divider",
		className
	);

	return <hr className={classNames} />;
};

export default SectionDivider;
