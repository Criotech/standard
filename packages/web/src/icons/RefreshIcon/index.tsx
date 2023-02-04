import Icon from "@ant-design/icons";
import { FC } from "react";

const RefreshSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M12.001 5.4v1.971a.544.544 0 00.935.385l3.065-3.071a.545.545 0 000-.781L12.935.835a.55.55 0 00-.935.4V3.2A8.8 8.8 0 003.2 12a8.61 8.61 0 00.627 3.245 1.1 1.1 0 001.8.374 1.057 1.057 0 00.258-1.148A6.4 6.4 0 015.401 12a6.6 6.6 0 016.6-6.6zm6.368 2.981a1.061 1.061 0 00-.253 1.144 6.595 6.595 0 01-6.115 9.074V16.63a.544.544 0 00-.935-.385l-3.065 3.069a.545.545 0 000 .781l3.069 3.069a.549.549 0 00.935-.385v-1.98a8.8 8.8 0 008.8-8.8 8.61 8.61 0 00-.627-3.245 1.1 1.1 0 00-1.8-.374z" />
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
}

export type Props = {
	color?: string;
	size?: IconSize;
	className?: string;
};

const RefreshIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
	className,
}) => (
	<Icon
		className={className}
		component={RefreshSvg}
		style={{ fontSize: size, color }}
	/>
);

export default RefreshIcon;
