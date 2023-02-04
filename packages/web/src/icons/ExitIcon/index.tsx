import Icon from "@ant-design/icons";
import { FC } from "react";

const ExitSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g>
			<path d="M0 0h24v24H0Z" fill="none" />
		</g>
		<g>
			<g>
				<path d="M5 5h6a1 1 0 0 0 1-1 1 1 0 0 0-1-1H5a2.006 2.006 0 0 0-2 2v14a2.006 2.006 0 0 0 2 2h6a1 1 0 0 0 1-1 1 1 0 0 0-1-1H5Z" />
				<path d="m20.65 11.65-2.79-2.79a.5.5 0 0 0-.86.35V11h-7a1 1 0 0 0-1 1 1 1 0 0 0 1 1h7v1.79a.5.5 0 0 0 .85.35l2.79-2.79a.492.492 0 0 0 .01-.7Z" />
			</g>
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
	className?: string;
};

const ExitIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
	className,
}: Props) => (
	<Icon
		className={className}
		component={ExitSvg}
		style={{ fontSize: size, color }}
	/>
);

export default ExitIcon;
