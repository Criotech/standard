import Icon from "@ant-design/icons";
import { FC, CSSProperties, ComponentProps } from "react";

const HamburgerSvg: FC<ComponentProps<"svg">> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			{...props}
		>
			<path d="M1.333 20h21.334A1.337 1.337 0 0 0 24 18.667a1.337 1.337 0 0 0-1.333-1.333H1.333A1.337 1.337 0 0 0 0 18.667 1.337 1.337 0 0 0 1.333 20Zm0-6.667h21.334A1.337 1.337 0 0 0 24 12a1.337 1.337 0 0 0-1.333-1.333H1.333A1.337 1.337 0 0 0 0 12a1.337 1.337 0 0 0 1.333 1.333ZM0 5.333a1.337 1.337 0 0 0 1.333 1.334h21.334A1.337 1.337 0 0 0 24 5.333 1.337 1.337 0 0 0 22.667 4H1.333A1.337 1.337 0 0 0 0 5.333Z" />
		</svg>
	);
};

interface IProps {
	color?: CSSProperties["color"];
}

const HamburgerIcon: FC<IProps> = ({ color = "#003087" }) => {
	return (
		<Icon component={HamburgerSvg} style={{ fontSize: "24px", color }} />
	);
};

export default HamburgerIcon;
