import Icon from "@ant-design/icons";
import { FC } from "react";

const ScanCodeSvg: FC<{}> = (props) => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg">
		<path fill="none" d="M0 0h24v24H0z" />
		<g>
			<path d="M21.9 6.5a1.1 1.1 0 0 1-1.1-1.1V3.2h-2.2a1.1 1.1 0 0 1-1.1-1.1A1.1 1.1 0 0 1 18.6 1h3.3A1.1 1.1 0 0 1 23 2.1v3.3a1.1 1.1 0 0 1-1.1 1.1ZM23 21.9v-3.3a1.1 1.1 0 0 0-1.1-1.1 1.1 1.1 0 0 0-1.1 1.1v2.2h-2.2a1.1 1.1 0 0 0-1.1 1.1 1.1 1.1 0 0 0 1.1 1.1h3.3a1.1 1.1 0 0 0 1.1-1.1ZM2.1 23h3.3a1.1 1.1 0 0 0 1.1-1.1 1.1 1.1 0 0 0-1.1-1.1H3.2v-2.2a1.1 1.1 0 0 0-1.1-1.1A1.1 1.1 0 0 0 1 18.6v3.3A1.1 1.1 0 0 0 2.1 23ZM1 2.1v3.3a1.1 1.1 0 0 0 1.1 1.1 1.1 1.1 0 0 0 1.1-1.1V3.2h2.2a1.1 1.1 0 0 0 1.1-1.1A1.1 1.1 0 0 0 5.4 1H2.1A1.1 1.1 0 0 0 1 2.1Z" />
			<path d="M18.132 10.9H5.867a1.1 1.1 0 1 0 0 2.2h12.264a1.1 1.1 0 1 0 0-2.2Z" />
		</g>
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

const ScanCodeIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={ScanCodeSvg} style={{ fontSize: size, color }} />
);

export default ScanCodeIcon;
