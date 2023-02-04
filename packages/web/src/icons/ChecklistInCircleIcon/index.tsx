import Icon from "@ant-design/icons";
import { FC } from "react";

const ChecklistInCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 76 76">
		<g transform="translate(-935 -643)">
			<rect
				width="76"
				height="76"
				rx="38"
				transform="translate(935 643)"
			/>
			<g>
				<g>
					<path
						d="M985.028 702.052h-23.066a6.916 6.916 0 0 1-6.909-6.909v-29.015a6.917 6.917 0 0 1 6.909-6.91h23.066a6.917 6.917 0 0 1 6.909 6.91v29.015a6.916 6.916 0 0 1-6.909 6.909Zm-23.066-41.3a5.38 5.38 0 0 0-5.374 5.374v29.015a5.38 5.38 0 0 0 5.374 5.374h23.066a5.38 5.38 0 0 0 5.374-5.374v-29.015a5.38 5.38 0 0 0-5.374-5.374Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M967.447 694.738h-4.215a.512.512 0 0 1-.512-.512v-4.215a.512.512 0 0 1 .512-.512h4.215a.512.512 0 0 1 .512.512v4.215a.512.512 0 0 1-.512.512Zm-3.7-1.024h3.191v-3.191h-3.191Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M983.44 668.519H971.8a.256.256 0 0 1 0-.512h11.64a.256.256 0 0 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M978.166 670.476H971.8a.256.256 0 1 1 0-.512h6.366a.256.256 0 1 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M983.44 679.915H971.8a.256.256 0 1 1 0-.512h11.64a.256.256 0 1 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M978.166 681.872H971.8a.256.256 0 1 1 0-.512h6.366a.256.256 0 0 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M983.44 691.397H971.8a.256.256 0 1 1 0-.512h11.64a.256.256 0 1 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<g>
					<path
						d="M978.166 693.354H971.8a.256.256 0 1 1 0-.512h6.366a.256.256 0 0 1 0 .512Z"
						fill="#fff"
					/>
				</g>
				<path
					d="M970.781 674.407a.514.514 0 0 0-.72.079l-2.854 3.556h-3.975l-.417-.477a.512.512 0 1 0-.771.674l.676.773v3.757a.512.512 0 0 0 .512.512h4.215a.512.512 0 0 0 .512-.512v-4.028l2.9-3.614a.512.512 0 0 0-.078-.72Zm-4.395 4.658-1.081 1.348-1.178-1.348Zm.55 3.192h-3.192v-2.074l1.191 1.363a.512.512 0 0 0 .385.175h.011a.516.516 0 0 0 .389-.191l1.215-1.514Z"
					fill="#fff"
				/>
				<path
					d="M970.781 662.949a.514.514 0 0 0-.72.079l-2.853 3.556h-3.976l-.417-.477a.512.512 0 1 0-.771.674l.676.773v3.757a.512.512 0 0 0 .512.512h4.215a.512.512 0 0 0 .512-.512v-4.028l2.9-3.614a.512.512 0 0 0-.078-.72Zm-4.394 4.659-1.082 1.348-1.178-1.348Zm.549 3.192h-3.192v-2.074l1.191 1.364a.512.512 0 0 0 .385.175h.011a.515.515 0 0 0 .389-.192l1.215-1.514Z"
					fill="#fff"
				/>
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

const ChecklistInCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={ChecklistInCircleSvg} style={{ fontSize: size, color }} />
);

export default ChecklistInCircleIcon;