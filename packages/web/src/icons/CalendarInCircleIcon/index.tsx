import Icon from "@ant-design/icons";
import { FC } from "react";

const CalendarInCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 76" {...props}>
		<g data-name="Group 3086" transform="translate(-935 -643)">
			<rect
				width="76"
				height="76"
				rx="38"
				transform="translate(935 643)"
				fill="#00a9b6"
			/>
			<g fill="#fff">
				<path d="M989.431 685.302v-17.469a3.733 3.733 0 0 0-3.728-3.728h-4.031v-.9a2.208 2.208 0 1 0-4.415 0v.856h-13.083v-.856a2.208 2.208 0 1 0-4.416 0v.9h-4.031a3.733 3.733 0 0 0-3.728 3.728v25.123a3.733 3.733 0 0 0 3.728 3.729h22.262a8.471 8.471 0 1 0 11.442-11.383Zm-3.909-.962h-.062v-12.292h2.568v12.668a8.446 8.446 0 0 0-2.506-.376Zm-8.464 8.243h-19.12a1.5 1.5 0 0 1-1.5-1.5v-19.031h28.556v12.316a8.475 8.475 0 0 0-7.936 8.215Zm1.133-29.376a1.273 1.273 0 1 1 2.546 0v2.89a1.273 1.273 0 1 1-2.546 0Zm-17.5 0a1.273 1.273 0 1 1 2.546 0v2.89a1.273 1.273 0 1 1-2.546 0Zm-4.966 2.3h4.031v.589a2.208 2.208 0 0 0 4.416 0v-.546h13.082v.546a2.208 2.208 0 1 0 4.415 0v-.589h4.031a2.329 2.329 0 0 1 2.326 2.326v3.282h-34.625v-3.282a2.329 2.329 0 0 1 2.326-2.325Zm0 29.775a2.329 2.329 0 0 1-2.326-2.326V672.05h2.568v19.033a1.971 1.971 0 0 0 1.969 1.969h19.12a8.433 8.433 0 0 0 .357 2.233Zm29.794 4.608a7.074 7.074 0 1 1 7.075-7.074 7.082 7.082 0 0 1-7.072 7.075Z" />
				<path d="M990.184 692.977h-4.482v-3.341a.468.468 0 1 0-.935 0v3.724c0 .015.007.027.009.042a.426.426 0 0 0-.009.042.467.467 0 0 0 .467.467h4.95a.468.468 0 1 0 0-.935Z" />
			</g>
		</g>
	</svg>
);

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
	LARGE = "76px",
}

export type Props = {
	color?: string;
	size?: IconSize;
};

const CalendarInCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={CalendarInCircleSvg} style={{ fontSize: size, color }} />
);

export default CalendarInCircleIcon;
