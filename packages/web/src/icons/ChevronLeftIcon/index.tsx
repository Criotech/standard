import Icon from "@ant-design/icons";
import { FC } from "react";

const ChevronLeftSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 45" {...props}>
		<g transform="rotate(180 -10025.5 -7438)">
			<circle
				cx="22"
				cy="22"
				r="22"
				transform="translate(-20095 -14920)"
				fill="#fff"
			/>
			<path
				d="M-20073-14919a21.006 21.006 0 0 0-8.174 40.35 21.006 21.006 0 0 0 16.348-38.7 20.868 20.868 0 0 0-8.174-1.65m0-1a22 22 0 1 1-22 22 22 22 0 0 1 22-22Z"
				fill="#ddd"
			/>
			<path d="M-20089-14914h32v32h-32Z" fill="none" />
			<path
				d="m-20077.727-14905.399 7.41 7.407-7.41 7.407a1.9 1.9 0 0 0 0 2.692 1.9 1.9 0 0 0 2.692 0l8.762-8.762a1.9 1.9 0 0 0 0-2.692l-8.762-8.762a1.9 1.9 0 0 0-2.692 0 1.942 1.942 0 0 0 0 2.71Z"
				fill="#00abe4"
			/>
		</g>
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
	LARGE = "44px",
}

export type Props = {
	color?: string;
	size?: IconSize;
};

const ChevronLeftIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={ChevronLeftSvg} style={{ fontSize: size, color }} />
);

export default ChevronLeftIcon;
