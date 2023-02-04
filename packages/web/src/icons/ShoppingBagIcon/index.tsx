import Icon from "@ant-design/icons";
import { FC } from "react";

const ShoppingBagSvg: FC<{}> = (props) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<g>
			<path fill="none" d="M0 0h24v24H0z" />
		</g>
		<path d="M19.2 4.8h-2.4a4.8 4.8 0 0 0-9.6 0H4.8a2.407 2.407 0 0 0-2.4 2.4v14.4A2.407 2.407 0 0 0 4.8 24h14.4a2.407 2.407 0 0 0 2.4-2.4V7.2a2.407 2.407 0 0 0-2.4-2.4ZM12 2.4a2.407 2.407 0 0 1 2.4 2.4H9.6A2.407 2.407 0 0 1 12 2.4Zm7.2 19.2H4.8V7.2h2.4v2.4a1.2 1.2 0 1 0 2.4 0V7.2h4.8v2.4a1.2 1.2 0 1 0 2.4 0V7.2h2.4Z" />
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

const ShoppingBagIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={ShoppingBagSvg} style={{ fontSize: size, color }} />
);

export default ShoppingBagIcon;
