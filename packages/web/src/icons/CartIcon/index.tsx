import Icon from "@ant-design/icons";
import { FC } from "react";

const CartSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path
			d="M7.4,18a2.4,2.4,0,1,0,2.4,2.4A2.4,2.4,0,0,0,7.4,18Z"
			transform="translate(-0.199 1.2)"
		/>
		<path
			d="M17.4,18a2.4,2.4,0,1,0,2.4,2.4A2.4,2.4,0,0,0,17.4,18Z"
			transform="translate(1.798 1.2)"
		/>
		<path
			d="M18.456,15.2a2.388,2.388,0,0,0,2.1-1.236L24.85,6.176a1.2,1.2,0,0,0-2.081-1.2L18.456,12.8H10.034L5.248,2.686A1.2,1.2,0,0,0,4.164,2H2.2a1.2,1.2,0,0,0,0,2.4H3.4l4.319,9.108L6.1,16.436A2.4,2.4,0,0,0,8.2,20h13.2a1.2,1.2,0,0,0,0-2.4H8.2l1.32-2.4Z"
			transform="translate(-1 -2)"
		/>
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "26px",
}

export type Props = {
	color?: string;
	size?: IconSize;
};

const CartIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={CartSvg} style={{ fontSize: size, color }} />
);

export default CartIcon;
