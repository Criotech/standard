import { FC } from "react";
import { useService } from "../../hooks/useService";
import "./index.scss";
import PinIcon, { IconSize } from "../../icons/PinIcon";

interface IProps {
	number: number;
	className?: string;
}

const PinIconWithNumber: FC<IProps> = ({ number, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-pin-with-number",
		className
	);

	return (
		<div className={classNames}>
			<PinIcon
				className="acuvue-pin-icon"
				size={IconSize.LARGE}
				color="#003087"
			/>
			<span className="number">{number}</span>
		</div>
	);
};

export default PinIconWithNumber;
