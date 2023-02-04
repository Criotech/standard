import Icon from "@ant-design/icons";
import { FC } from "react";
import "./index.scss";

const StoreSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3.5 24 24" {...props}>
		<path d="M5.67,6.615h18.3a1.307,1.307,0,0,0,0-2.615H5.67a1.307,1.307,0,0,0,0,2.615Zm19.82,2.353a1.3,1.3,0,0,0-1.281-1.046H5.434A1.3,1.3,0,0,0,4.153,8.968L2.846,15.5a1.314,1.314,0,0,0,1.281,1.569h.235V23.61A1.311,1.311,0,0,0,5.67,24.918H16.129a1.311,1.311,0,0,0,1.307-1.307V17.074h5.229V23.61a1.307,1.307,0,0,0,2.615,0V17.074h.235A1.314,1.314,0,0,0,26.8,15.5ZM14.821,22.3H6.977V17.074h7.844Z" />
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

const StoreIcon: FC<Props> = ({ color, size = IconSize.SMALL }: Props) => (
	<Icon
		className="store-icon"
		component={StoreSvg}
		style={{ color, fontSize: size }}
	/>
);

export default StoreIcon;
