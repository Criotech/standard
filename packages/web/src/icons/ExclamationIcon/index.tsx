import Icon from "@ant-design/icons";
import { FC } from "react";

const ExclamationSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
		<path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm0 13.2a1.2 1.2 0 01-1.2-1.2V7.2A1.2 1.2 0 0112 6a1.2 1.2 0 011.2 1.2V12a1.2 1.2 0 01-1.2 1.2zm0 4.8a1.2 1.2 0 01-1.2-1.2 1.2 1.2 0 011.2-1.2 1.2 1.2 0 011.2 1.2A1.2 1.2 0 0112 18z" />
	</svg>
);

export enum ExclamationIconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
}

export type ExclamationProps = {
	color?: string;
	size?: ExclamationIconSize;
};

const ExclamationIcon: FC<ExclamationProps> = ({
	size = ExclamationIconSize.SMALL,
	color,
}: ExclamationProps) => (
	<Icon component={ExclamationSvg} style={{ fontSize: size, color }} />
);

export default ExclamationIcon;
