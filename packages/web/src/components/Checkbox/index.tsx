import { FC, RefAttributes } from "react";
import { Checkbox as AntCheckbox, CheckboxProps } from "antd";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type Props = CheckboxProps & RefAttributes<HTMLInputElement>;

const Checkbox: FC<Props> = ({ className, children, ...props }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-checkbox",
		className
	);

	return (
		<AntCheckbox {...props} className={classNames}>
			{children}
		</AntCheckbox>
	);
};

export default Checkbox;
