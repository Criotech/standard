import Icon from "@ant-design/icons";
import { FC } from "react";

const PersonWithHeadsetSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g fill="none">
			<path d="M0 0h24v24H0z" />
			<path d="M0 0h24v24H0z" />
		</g>
		<g>
			<g transform="translate(2 3)">
				<path d="M19 9.22a9 9 0 1 0-18 .06A1.968 1.968 0 0 0 0 11v2a2.006 2.006 0 0 0 2 2 1 1 0 0 0 1-1V9.19A7.19 7.19 0 0 1 9.78 1.9a7.007 7.007 0 0 1 7.22 7V16h-7a1 1 0 0 0-1 1 1 1 0 0 0 1 1h7a2.006 2.006 0 0 0 2-2v-1.22a1.849 1.849 0 0 0 1-1.64v-2.3a1.841 1.841 0 0 0-1-1.62Z" />
				<circle cx="1" cy="1" r="1" transform="translate(6 9)" />
				<circle cx="1" cy="1" r="1" transform="translate(12 9)" />
				<path d="M16 8.03A6.039 6.039 0 0 0 4.02 9.45a8.075 8.075 0 0 0 4.86-5.89A8.037 8.037 0 0 0 16 8.03Z" />
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
};

const PersonWithHeadsetIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={PersonWithHeadsetSvg} style={{ fontSize: size, color }} />
);

export default PersonWithHeadsetIcon;
