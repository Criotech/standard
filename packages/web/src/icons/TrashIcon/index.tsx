import Icon from "@ant-design/icons";
import { FC } from "react";

const TrashSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props}>
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M6.667 18.222A1.783 1.783 0 008.445 20h7.111a1.783 1.783 0 001.778-1.778V7.556H6.667zM17.334 4.889h-2.223l-.633-.631a.9.9 0 00-.62-.258h-3.716a.9.9 0 00-.622.258l-.631.631H6.667a.889.889 0 000 1.778h10.667a.889.889 0 100-1.778z" />
	</svg>
);

enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
}

type Props = {
	color?: string;
	size?: IconSize;
};

const TrashIcon: FC<Props> = ({ size = IconSize.MEDIUM, color }: Props) => (
	<Icon component={TrashSvg} style={{ fontSize: size, color }} />
);

export default TrashIcon;
