import Icon from "@ant-design/icons";
import { FC } from "react";

const NextSvg: FC<{}> = (props) => (
	<svg
		id="Icon_Next"
		data-name="Icon Next"
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
	>
		<g id="Group_1176" data-name="Group 1176">
			<path
				id="Path_792"
				data-name="Path 792"
				d="M0,0H24V24H0Z"
				fill="none"
			/>
		</g>
		<g
			id="Group_1179"
			data-name="Group 1179"
			transform="translate(-1.712 -1.997)"
		>
			<g
				id="Group_1178"
				data-name="Group 1178"
				transform="translate(8.997 5.997)"
			>
				<g id="Group_1177" data-name="Group 1177">
					<path
						id="Path_793"
						data-name="Path 793"
						d="M9.416,19.546l5.555-5.555L9.416,8.435a1.426,1.426,0,0,1,0-2.019h0a1.426,1.426,0,0,1,2.019,0l6.572,6.572a1.426,1.426,0,0,1,0,2.019l-6.572,6.572a1.426,1.426,0,0,1-2.019,0h0A1.457,1.457,0,0,1,9.416,19.546Z"
						transform="translate(-8.998 -5.998)"
						fill="#2a3138"
					/>
				</g>
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

const NextIcon: FC<Props> = ({ size = IconSize.SMALL, color }: Props) => (
	<Icon
		className="next-icon"
		component={NextSvg}
		style={{ fontSize: size, color }}
	/>
);

export default NextIcon;
