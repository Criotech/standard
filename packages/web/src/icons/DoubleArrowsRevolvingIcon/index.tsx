import Icon from "@ant-design/icons";
import { FC } from "react";

const DoubleArrowsRevolvingSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 16 16">
		<g>
			<path d="M0 0h16v16H0Z" fill="none" />
			<path d="M8 3.601v1.312a.363.363 0 0 0 .623.257l2.046-2.046a.363.363 0 0 0 0-.521L8.624.557a.367.367 0 0 0-.623.264v1.313A5.865 5.865 0 0 0 2.134 8a5.74 5.74 0 0 0 .418 2.163.735.735 0 0 0 1.2.249.7.7 0 0 0 .169-.763 4.27 4.27 0 0 1-.323-1.65A4.4 4.4 0 0 1 8 3.601Zm4.246 1.987a.708.708 0 0 0-.169.763A4.4 4.4 0 0 1 8 12.401v-1.314a.363.363 0 0 0-.623-.257l-2.043 2.047a.363.363 0 0 0 0 .521l2.043 2.048A.366.366 0 0 0 8 15.189v-1.32a5.865 5.865 0 0 0 5.866-5.866 5.74 5.74 0 0 0-.418-2.163.735.735 0 0 0-1.2-.249Z" />
		</g>
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
};

const DoubleArrowsRevolvingIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon
		component={DoubleArrowsRevolvingSvg}
		style={{ fontSize: size, color }}
	/>
);

export default DoubleArrowsRevolvingIcon;
