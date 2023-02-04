import Icon from "@ant-design/icons";
import { FC } from "react";

const EnvelopeInCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 76 76">
		<g transform="translate(-740 -603)">
			<rect
				width="76"
				height="76"
				rx="38"
				transform="translate(740 603)"
			/>
			<path
				d="M793.249 624.561h-30.5a6.756 6.756 0 0 0-6.748 6.748v19.382a6.756 6.756 0 0 0 6.748 6.748h30.5a6.756 6.756 0 0 0 6.749-6.748v-19.382a6.756 6.756 0 0 0-6.749-6.748Zm5.249 26.131a5.214 5.214 0 0 1-.076.853l-12.416-9.478 12.495-9.536Zm-35.749-24.631h30.5a5.254 5.254 0 0 1 5.247 5.214l-20.417 15.583-20.574-15.7a5.252 5.252 0 0 1 5.244-5.097Zm-5.249 24.631v-18.285l12.656 9.66-12.564 9.589a5.234 5.234 0 0 1-.092-.964Zm35.752 5.249h-30.503a5.256 5.256 0 0 1-5.029-3.753l12.849-9.806 7.21 5.5a.5.5 0 0 0 .606 0l7.21-5.5 12.713 9.7a5.254 5.254 0 0 1-5.059 3.858Z"
				fill="#fff"
			/>
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

const EnvelopeInCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={EnvelopeInCircleSvg} style={{ fontSize: size, color }} />
);

export default EnvelopeInCircleIcon;
