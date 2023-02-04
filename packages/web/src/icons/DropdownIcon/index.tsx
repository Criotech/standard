import Icon from "@ant-design/icons";
import { FC } from "react";

const DropdownSVG: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 8 16 7" {...props}>
		<path d="m6.451 7.704 5.551 5.556 5.56-5.556a1.426 1.426 0 0 1 2.019 0 1.426 1.426 0 0 1 0 2.019l-6.572 6.572a1.426 1.426 0 0 1-2.019 0L4.418 9.723a1.426 1.426 0 0 1 0-2.019 1.457 1.457 0 0 1 2.033 0Z" />
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

const DropdownIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={DropdownSVG} style={{ fontSize: size, color }} />
);

export default DropdownIcon;
