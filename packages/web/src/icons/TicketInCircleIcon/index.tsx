import Icon from "@ant-design/icons";
import { FC } from "react";

const TicketInCircleSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 76 76">
		<g transform="translate(-903 -1533)">
			<rect
				rx="38"
				transform="translate(903 1533)"
				fill="#f1744b"
				width="76"
				height="76"
			/>
			<g fill="#fff">
				<path d="M963.973 1567.07a3.029 3.029 0 0 0 2.028-2.905v-3.879a3.1 3.1 0 0 0-3.1-3.1h-43.804a3.1 3.1 0 0 0-3.1 3.1v21.428a3.1 3.1 0 0 0 3.1 3.1h43.809a3.1 3.1 0 0 0 3.1-3.1v-3.879a3.031 3.031 0 0 0-2.028-2.906 4.145 4.145 0 0 1 0-7.86Zm-4.257 3.93a5.566 5.566 0 0 0 3.8 5.285 1.624 1.624 0 0 1 1.053 1.55v3.879a1.669 1.669 0 0 1-1.667 1.667h-12.005v-.875a.476.476 0 1 0-.952 0v.875h-30.848a1.669 1.669 0 0 1-1.667-1.667v-21.428a1.669 1.669 0 0 1 1.667-1.667h30.854a.3.3 0 0 0-.006.03v.953a.476.476 0 0 0 .952 0v-.953a.3.3 0 0 0-.006-.03h12.014a1.669 1.669 0 0 1 1.667 1.667v3.879a1.624 1.624 0 0 1-1.053 1.55 5.566 5.566 0 0 0-3.803 5.285Z" />
				<path d="M950.421 1577.907a.476.476 0 0 0-.476.476v1.833a.476.476 0 0 0 .952 0v-1.833a.476.476 0 0 0-.476-.476Z" />
				<path d="M950.421 1573.784a.476.476 0 0 0-.476.476v1.833a.476.476 0 0 0 .952 0v-1.833a.476.476 0 0 0-.476-.476Z" />
				<path d="M950.421 1569.661a.476.476 0 0 0-.476.476v1.832a.476.476 0 1 0 .952 0v-1.832a.476.476 0 0 0-.476-.476Z" />
				<path d="M950.421 1565.542a.476.476 0 0 0-.476.476v1.833a.476.476 0 0 0 .952 0v-1.833a.476.476 0 0 0-.476-.476Z" />
				<path d="M950.421 1561.415a.476.476 0 0 0-.476.476v1.833a.476.476 0 1 0 .952 0v-1.833a.476.476 0 0 0-.476-.476Z" />
				<path d="M929.888 1574.453h-9.61a.238.238 0 1 0 0 .476h9.61a.238.238 0 1 0 0-.476Z" />
				<path d="M929.888 1576.982h-9.61a.238.238 0 1 0 0 .476h9.61a.238.238 0 1 0 0-.476Z" />
				<path d="M927.064 1579.511h-6.786a.238.238 0 0 0 0 .476h6.786a.238.238 0 0 0 0-.476Z" />
				<path d="M956.701 1562.012h-2.434a.238.238 0 1 0 0 .476h2.433a.238.238 0 1 0 0-.476Z" />
				<path d="M956.701 1564.512h-2.434a.238.238 0 1 0 0 .476h2.433a.238.238 0 1 0 0-.476Z" />
				<path d="M956.701 1567.012h-2.434a.238.238 0 0 0 0 .476h2.433a.238.238 0 0 0 0-.476Z" />
				<path d="M956.701 1569.512h-2.434a.238.238 0 1 0 0 .476h2.433a.238.238 0 1 0 0-.476Z" />
				<path d="M956.701 1572.012h-2.434a.238.238 0 1 0 0 .476h2.433a.238.238 0 1 0 0-.476Z" />
				<path d="M956.701 1574.512h-2.434a.238.238 0 0 0 0 .476h2.433a.238.238 0 0 0 0-.476Z" />
				<path d="M956.701 1577.012h-2.434a.238.238 0 0 0 0 .476h2.433a.238.238 0 0 0 0-.476Z" />
				<path d="M956.701 1579.511h-2.434a.238.238 0 0 0 0 .476h2.433a.238.238 0 0 0 0-.476Z" />
				<path d="M938.806 1567.808a2.152 2.152 0 1 0-2.15 2.239 2.2 2.2 0 0 0 2.15-2.239Zm-3.348 0a1.2 1.2 0 1 1 1.2 1.287 1.245 1.245 0 0 1-1.2-1.287Z" />
				<path d="M943.398 1565.905a.476.476 0 0 0-.667.09l-7.233 9.5a.476.476 0 0 0 .758.577l7.233-9.5a.476.476 0 0 0-.091-.667Z" />
				<path d="M942.306 1572.038a2.241 2.241 0 1 0 2.15 2.239 2.2 2.2 0 0 0-2.15-2.239Zm0 3.526a1.29 1.29 0 1 1 1.2-1.287 1.245 1.245 0 0 1-1.2 1.287Z" />
			</g>
		</g>
	</svg>
);

enum IconSize {
	MINI = "24px",
	SMALL = "40px",
	MEDIUM = "48px",
	LARGE = "76px",
}

type Props = {
	color?: string;
	size?: IconSize;
};

const TicketInCircleIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={TicketInCircleSvg} style={{ fontSize: size, color }} />
);

export default TicketInCircleIcon;
