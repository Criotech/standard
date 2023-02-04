import Icon from "@ant-design/icons";
import { FC } from "react";
import { useService } from "../../hooks/useService";

const ChevronRightSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20">
		<path d="m12.95 10.707.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
	LARGE = "76px",
}

export type Props = {
	color?: string;
	size?: IconSize;
	className?: string;
};

const ChevronRightIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
	className,
}: Props) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"chevron-right-icon",
		className
	);

	return (
		<Icon
			className={classNames}
			component={ChevronRightSvg}
			style={{ fontSize: size, color }}
		/>
	);
};

export default ChevronRightIcon;
