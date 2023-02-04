import Icon from "@ant-design/icons";
import { FC } from "react";

const CalendarSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M20.4 2.4h-1.2V1.2A1.2 1.2 0 0018 0a1.2 1.2 0 00-1.2 1.2v1.2H7.2V1.2A1.2 1.2 0 006 0a1.2 1.2 0 00-1.2 1.2v1.2H3.6a2.39 2.39 0 00-2.39 2.4L1.2 21.6A2.4 2.4 0 003.6 24h16.8a2.4 2.4 0 002.4-2.4V4.8a2.4 2.4 0 00-2.4-2.4zm0 19.2H3.6v-12h16.8z" />
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
};

const CalendarIcon: FC<Props> = ({ size = IconSize.SMALL, color }: Props) => (
	<Icon component={CalendarSvg} style={{ fontSize: size, color }} />
);

export default CalendarIcon;
