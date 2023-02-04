import Icon from "@ant-design/icons";
import { FC } from "react";

const NonCrossedEyeSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M0 0h24v24H0Z" fill="none" />
		<path d="M12 6a9.77 9.77 0 0 1 8.82 5.5 9.822 9.822 0 0 1-17.64 0A9.77 9.77 0 0 1 12 6m0-2a11.827 11.827 0 0 0-11 7.5 11.817 11.817 0 0 0 22 0A11.827 11.827 0 0 0 12 4Zm0 5a2.5 2.5 0 1 1-2.5 2.5A2.5 2.5 0 0 1 12 9m0-2a4.5 4.5 0 1 0 4.5 4.5A4.507 4.507 0 0 0 12 7Z" />
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

const NonCrossedEyeIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={NonCrossedEyeSvg} style={{ fontSize: size, color }} />
);

export default NonCrossedEyeIcon;
