import Icon from "@ant-design/icons";
import { FC } from "react";

const PromotionSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
		<path d="M22.351 11.538l-9.9-9.9A2.186 2.186 0 0 0 10.9 1H3.2A2.206 2.206 0 0 0 1 3.2v7.7a2.2 2.2 0 0 0 .649 1.562l9.9 9.9A2.186 2.186 0 0 0 13.1 23a2.151 2.151 0 0 0 1.551-.649l7.7-7.7A2.151 2.151 0 0 0 23 13.1a2.222 2.222 0 0 0-.649-1.562zM4.85 6.5A1.65 1.65 0 1 1 6.5 4.85 1.648 1.648 0 0 1 4.85 6.5z" />
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

const PromotionIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon
		className="promotion-icon"
		component={PromotionSvg}
		style={{ fontSize: size, color }}
	/>
);

export default PromotionIcon;
