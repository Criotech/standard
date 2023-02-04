import Icon from "@ant-design/icons";
import { FC } from "react";

const PencilSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M4 16.854v2.7a.44.44 0 0 0 .444.444h2.7a.417.417 0 0 0 .311-.133l9.705-9.7-3.33-3.327-9.7 9.7a.436.436 0 0 0-.13.316Z" />
		<path d="m19.74 6.341-2.08-2.08a.885.885 0 0 0-1.253 0l-1.626 1.627 3.333 3.333 1.626-1.627a.885.885 0 0 0 0-1.253Z" />
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

const PencilIcon: FC<Props> = ({ size = IconSize.SMALL, color }: Props) => (
	<Icon component={PencilSvg} style={{ fontSize: size, color }} />
);

export default PencilIcon;
