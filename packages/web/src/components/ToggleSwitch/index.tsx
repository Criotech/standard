import { FC } from "react";
import { Switch as AntSwitch } from "antd";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type ToggleSwitchProps = {
	disabled?: boolean;
	checked?: boolean;
	className?: string;
	onChange: (value: boolean) => void;
};

const ToggleSwitch: FC<ToggleSwitchProps> = ({
	disabled = false,
	checked,
	className,
	onChange,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-toggle-switch",
		className
	);

	return (
		<AntSwitch
			checked={checked}
			className={classNames}
			{...props}
			disabled={disabled}
			onChange={(value) => {
				onChange(value as any);
			}}
		/>
	);
};

export default ToggleSwitch;
