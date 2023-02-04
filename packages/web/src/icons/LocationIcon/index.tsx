import Icon from "@ant-design/icons";
import { FC } from "react";

const LocationSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M0 0h24v24H0Z" fill="none" />
		<path d="M12 7.636A4.364 4.364 0 1 0 16.364 12 4.362 4.362 0 0 0 12 7.636Zm9.753 3.273a9.812 9.812 0 0 0-8.662-8.662V1.091a1.091 1.091 0 1 0-2.182 0v1.156a9.812 9.812 0 0 0-8.662 8.662H1.091a1.091 1.091 0 0 0 0 2.182h1.156a9.812 9.812 0 0 0 8.662 8.662v1.156a1.091 1.091 0 1 0 2.182 0v-1.156a9.812 9.812 0 0 0 8.662-8.662h1.156a1.091 1.091 0 1 0 0-2.182h-1.156ZM12 19.636A7.636 7.636 0 1 1 19.636 12 7.631 7.631 0 0 1 12 19.636Z" />
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
	onClick: () => void;
};

const LocationIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color = "#0055F2",
	onClick,
}: Props) => (
	<Icon
		className="location-icon"
		component={LocationSvg}
		style={{ fontSize: size, color }}
		onClick={onClick}
	/>
);

export default LocationIcon;
