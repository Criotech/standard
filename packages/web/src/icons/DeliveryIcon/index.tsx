import Icon from "@ant-design/icons";
import { FC } from "react";

const DeliverySvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
		<path d="M20.227 7.661h-2.772v-2.36a2 2 0 00-2-2H2.182A2.187 2.187 0 000 5.483v10a2 2 0 002 2h.182a3.272 3.272 0 003.329 3.215 3.273 3.273 0 003.216-3.215h6.545a3.272 3.272 0 003.329 3.215 3.273 3.273 0 003.216-3.215H23a1 1 0 001-1v-4.122a1.006 1.006 0 00-.2-.6l-2.773-3.7a1 1 0 00-.8-.4zm-.045 1.636l2.138 2.731h-4.865V9.301zM5.455 18.57a1.091 1.091 0 01-1.091-1.091 1.09 1.09 0 011.091-1.091 1.091 1.091 0 011.091 1.091 1.1 1.1 0 01-1.091 1.095zm2.421-3.273a3.233 3.233 0 00-4.565-.279 3.062 3.062 0 00-.279.279h-.85V5.479h13.091v9.818zm10.669 3.273a1.091 1.091 0 01-1.091-1.091 1.09 1.09 0 011.091-1.091 1.091 1.091 0 011.095 1.095 1.1 1.1 0 01-1.095 1.091z" />
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

const DeliveryIcon: FC<Props> = ({ size = IconSize.SMALL, color }: Props) => (
	<Icon
		className="delivery-icon"
		component={DeliverySvg}
		style={{ fontSize: size, color }}
	/>
);

export default DeliveryIcon;
