import Icon from "@ant-design/icons";
import { FC } from "react";

const QuestionMarkSvg: FC<{}> = (props) => (
	<svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
		<path d="M12 24a12 12 0 0 0 12-12A12 12 0 0 0 12 0 12 12 0 0 0 0 12a12 12 0 0 0 12 12Zm1.438-6.691a1.4 1.4 0 0 1-1.4 1.411 1.406 1.406 0 0 1-1.411-1.4v-.011a1.388 1.388 0 0 1 1.376-1.4h.035a1.373 1.373 0 0 1 1.4 1.345Zm-4.834-10.1a.915.915 0 0 1 .108-.2 3.924 3.924 0 0 1 3.3-1.724 3.778 3.778 0 0 1 3.371 1.7 3.382 3.382 0 0 1 .023 3.45c-.852 1.242-1.658 1.634-2.094 2.43a1.543 1.543 0 0 0-.214.706 1.009 1.009 0 0 1-1.008.874h-.067a.983.983 0 0 1-.99-.974.936.936 0 0 1 0-.1 2.826 2.826 0 0 1 .336-1.154c.548-.974 1.59-1.556 2.195-2.418a1.664 1.664 0 0 0-.406-2.317 1.663 1.663 0 0 0-1.128-.293 1.915 1.915 0 0 0-1.646.884 1.02 1.02 0 0 1-1.232.4.976.976 0 0 1-.548-1.265Z" />
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

const QuestionMarkIcon: FC<Props> = ({
	size = IconSize.MEDIUM,
	color,
}: Props) => (
	<Icon component={QuestionMarkSvg} style={{ fontSize: size, color }} />
);

export default QuestionMarkIcon;
