import Icon from "@ant-design/icons";
import { FC } from "react";

const TruckInCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 76 76">
		<g transform="translate(-903 -1533)">
			<rect
				width="76"
				height="76"
				rx="38"
				transform="translate(903 1533)"
			/>
			<g fill="#fff">
				<path d="m964.551 1572.552-8.756-8.756a1.526 1.526 0 0 0-1.085-.449h-7.341v-6.407a2.88 2.88 0 0 0-2.877-2.877h-24.614a2.88 2.88 0 0 0-2.877 2.877v23.962a2.88 2.88 0 0 0 2.877 2.877h1.862a4.816 4.816 0 0 0 9.541 0h20.336a4.815 4.815 0 0 0 9.54 0h2.308a1.537 1.537 0 0 0 1.536-1.535v-8.606a1.545 1.545 0 0 0-.45-1.086Zm-38.041 14.057a3.493 3.493 0 1 1 3.494-3.494 3.5 3.5 0 0 1-3.493 3.494Zm19.531-4.157h-14.76a4.816 4.816 0 0 0-9.541 0h-1.862a1.551 1.551 0 0 1-1.549-1.549v-23.962a1.551 1.551 0 0 1 1.549-1.549h24.612a1.551 1.551 0 0 1 1.549 1.549Zm17.5-9.035h-7.582a.819.819 0 0 1-.818-.818v-3.4a.819.819 0 0 1 .818-.818h2.544Zm-7.151 13.192a3.493 3.493 0 1 1 3.494-3.494 3.5 3.5 0 0 1-3.494 3.494Zm7.078-4.157h-2.308a4.815 4.815 0 0 0-9.54 0h-4.248v-17.776h7.341a.206.206 0 0 1 .147.061l3.2 3.2h-2.1a1.262 1.262 0 0 0-1.261 1.261v3.4a1.262 1.262 0 0 0 1.261 1.26h7.718v8.385a.208.208 0 0 1-.213.208Z" />
				<path d="M930.45 1561.462v.106c.639.42.686.994.3 1.966l-5.237 11.81h1.447l1.747-4.158h6.312l1.778 4.158h2.057l-6.27-13.882Zm-1.287 8.651 2.682-6.384 2.723 6.384Z" />
				<path d="M960.958 1572.538a.221.221 0 0 0 .313-.313l-2.97-2.97a.221.221 0 1 0-.313.313Z" />
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

const TruckInCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={TruckInCircleSvg} style={{ fontSize: size, color }} />
);

export default TruckInCircleIcon;
