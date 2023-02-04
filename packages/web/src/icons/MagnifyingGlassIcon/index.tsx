import Icon from "@ant-design/icons";
import { FC } from "react";

const MagnifyingGlassSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
		<g>
			<path fill="none" d="M0 0h24v24H0z" />
		</g>
		<path d="m19.939 18.301-4.931-4.931a6.154 6.154 0 0 0-1.425-8.417 6.188 6.188 0 0 0-2.371-1.065 6.122 6.122 0 0 0-4.644.847 6.122 6.122 0 0 0-2.683 3.883 6.129 6.129 0 0 0 4.214 7.192 6.105 6.105 0 0 0 5.272-.8l4.91 4.911a1.148 1.148 0 0 0 .816.339 1.154 1.154 0 0 0 .819-.339 1.149 1.149 0 0 0 .34-.817 1.153 1.153 0 0 0-.317-.803Zm-6.164-8.38a3.854 3.854 0 0 1-3.851 3.849h-.01a3.809 3.809 0 0 1-2.708-1.118A3.818 3.818 0 0 1 6.075 9.94v-.019a3.855 3.855 0 0 1 3.85-3.851 3.855 3.855 0 0 1 3.849 3.85Z" />
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

const MagnifyingGlassIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon
		className="magnifying-glass-icon"
		component={MagnifyingGlassSvg}
		style={{ fontSize: size, color }}
	/>
);

export default MagnifyingGlassIcon;
