import Icon from "@ant-design/icons";
import { FC } from "react";

const CopyOutlinedSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M17.4,23.6H5.4V8A1.2,1.2,0,0,0,4.2,6.8h0A1.2,1.2,0,0,0,3,8V23.6A2.407,2.407,0,0,0,5.4,26h12a1.2,1.2,0,0,0,1.2-1.2h0A1.2,1.2,0,0,0,17.4,23.6Zm6-4.8V4.4A2.407,2.407,0,0,0,21,2H10.2A2.407,2.407,0,0,0,7.8,4.4V18.8a2.407,2.407,0,0,0,2.4,2.4H21A2.407,2.407,0,0,0,23.4,18.8Zm-2.4,0H10.2V4.4H21Z" />
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

const CopyOutlinedIcon: FC<Props> = ({
	size = IconSize.SMALL,
	color,
}: Props) => (
	<Icon component={CopyOutlinedSvg} style={{ fontSize: size, color }} />
);

export default CopyOutlinedIcon;
