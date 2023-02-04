import Icon from "@ant-design/icons";
import { FC } from "react";

const OpticalStoreSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
		<path d="M22.56 7.433l-1.12-3.744A2.115 2.115 0 0019.403 2H4.586A2.115 2.115 0 002.56 3.689L1.44 7.433a3.746 3.746 0 00.96 3.522v8.822A2.186 2.186 0 004.533 22h14.934a2.186 2.186 0 002.133-2.222v-8.822a3.732 3.732 0 00.96-3.523zm-9.494-3.211h2.091l.576 3.911a1.409 1.409 0 01-1.365 1.644 1.39 1.39 0 01-1.3-1.456zm-7 4.289a1.365 1.365 0 01-1.291 1.267 1.45 1.45 0 01-1.266-1.822l1.077-3.734h2.1zm4.867-.189a1.4 1.4 0 01-1.376 1.456 1.419 1.419 0 01-1.3-1.644l.587-3.911h2.089zm8.288 1.456a1.357 1.357 0 01-1.288-1.267l-.619-4.289 2.059-.011 1.12 3.744a1.444 1.444 0 01-1.272 1.823z" />
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

const OpticalStoreIcon: FC<Props> = ({
	size = IconSize.SMALL,
	color,
}: Props) => (
	<Icon component={OpticalStoreSvg} style={{ fontSize: size, color }} />
);

export default OpticalStoreIcon;
