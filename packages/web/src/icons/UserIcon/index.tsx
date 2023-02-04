import Icon from "@ant-design/icons";
import { FC } from "react";

const UserSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<g>
			<path fill="none" d="M0 0h24v24H0z" />
			<path d="M12 5.9A2.1 2.1 0 1 1 9.9 8 2.1 2.1 0 0 1 12 5.9m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 9c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z" />
		</g>
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

const UserIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={UserSvg} style={{ fontSize: size, color }} />
);

export default UserIcon;
