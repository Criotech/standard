import Icon from "@ant-design/icons";
import { FC } from "react";

const ChevronRightWithCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 45" {...props}>
		<g transform="rotate(180 22 22)" fill="#fff" stroke="#ddd">
			<circle cx="22" cy="22" r="22" stroke="none" />
			<circle cx="22" cy="22" r="21.5" fill="none" />
		</g>
		<path d="M38 38H6V6h32Z" fill="none" />
		<path
			d="m17.274 14.602 7.41 7.407-7.41 7.407a1.9 1.9 0 0 0 0 2.692 1.9 1.9 0 0 0 2.692 0l8.762-8.762a1.9 1.9 0 0 0 0-2.692l-8.762-8.762a1.9 1.9 0 0 0-2.692 0 1.942 1.942 0 0 0 0 2.71Z"
			fill="#00abe4"
		/>
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "32px",
	LARGE = "44px",
}

export type Props = {
	color?: string;
	size?: IconSize;
};

const ChevronRightWithCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon
		component={ChevronRightWithCircleSvg}
		style={{ fontSize: size, color }}
	/>
);

export default ChevronRightWithCircleIcon;
