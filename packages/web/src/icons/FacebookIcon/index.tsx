import Icon from "@ant-design/icons";
import { FC } from "react";

const FacebookLogoSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
		<path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z" />
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
	LARGE = "30px",
}

export type Props = {
	color?: string;
	size?: IconSize;
};

const FacebookIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={FacebookLogoSvg} style={{ fontSize: size, color }} />
);

export default FacebookIcon;
