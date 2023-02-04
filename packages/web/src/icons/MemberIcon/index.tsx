import Icon from "@ant-design/icons";
import { FC } from "react";

const MemberSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768" {...props}>
		<path d="M384 415.5q48 0 105 13.5t104.25 45 47.25 70.5v96h-513v-96q0-39 47.25-70.5t104.25-45 105-13.5zM384 127.5q52.5 0 90 38.25t37.5 90.75-37.5 90-90 37.5-90-37.5-37.5-90 37.5-90.75 90-38.25zM384 477q-66 0-130.5 24.75t-64.5 42.75v34.5h390v-34.5q0-18-64.5-42.75t-130.5-24.75zM384 189q-28.5 0-48 19.5t-19.5 48 19.5 47.25 48 18.75 48-18.75 19.5-47.25-19.5-48-48-19.5z" />
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

const MemberIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
	className,
}: Props) => (
	<Icon
		className={className}
		component={MemberSvg}
		style={{ fontSize: size, color }}
	/>
);

export default MemberIcon;
