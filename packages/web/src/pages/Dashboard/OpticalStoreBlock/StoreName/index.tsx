import { FC } from "react";
import "./index.scss";
import { useService } from "../../../../hooks/useService";

interface IProps {
	name: string;
	className?: string;
}

const StoreName: FC<IProps> = ({ name, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-store-name",
		"typography-heading-3",
		className
	);

	return <h3 className={classNames}>{name}</h3>;
};

export default StoreName;
