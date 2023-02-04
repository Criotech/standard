import Icon from "@ant-design/icons";
import { CSSProperties, FC } from "react";

const CloseSvg: FC<{}> = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
			<path
				d="M19.645 4.367a1.208 1.208 0 0 0-1.711 0L12 10.292 6.065 4.354a1.208 1.208 0 0 0-1.711 0 1.208 1.208 0 0 0 0 1.711L10.292 12l-5.938 5.934a1.208 1.208 0 0 0 0 1.711 1.208 1.208 0 0 0 1.711 0l5.934-5.934 5.934 5.934a1.208 1.208 0 0 0 1.711 0 1.208 1.208 0 0 0 0-1.711L13.71 12l5.934-5.934a1.216 1.216 0 0 0 .001-1.699Z"
				fill="#003087"
			/>
		</svg>
	);
};

enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
}

interface IProps {
	color?: CSSProperties["color"];
	size?: IconSize;
	onClick?: () => void;
}

const CloseIcon: FC<IProps> = ({
	size = IconSize.SMALL,
	color = "#003087",
	...props
}) => {
	return (
		<Icon
			component={CloseSvg}
			style={{ fontSize: size, color }}
			{...props}
		/>
	);
};

export default CloseIcon;
