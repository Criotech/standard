import Icon from "@ant-design/icons";
import { FC } from "react";

const CheckmarkSvg: FC<{}> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		{...props}
	>
		<g>
			<path d="M0 0h24v24H0Z" fill="none" />
		</g>
		<g>
			<path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5.94 9.876-6.792 6.792a1.2 1.2 0 0 1-1.692 0l-3.4-3.4a1.2 1.2 0 0 1 1.696-1.688l2.548 2.544 5.94-5.94a1.2 1.2 0 0 1 1.7 1.692Z" />
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

const CheckmarkIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={CheckmarkSvg} style={{ fontSize: size, color }} />
);

export default CheckmarkIcon;
