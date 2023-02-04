import Icon from "@ant-design/icons";
import { FC } from "react";

const BackToTop: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
		<g>
			<path d="M0 0h24v24H0z" fill="none" />
		</g>
		<g>
			<g>
				<g>
					<path
						d="M13.053 19.156V7.386l5.139 5.142a1.062 1.062 0 001.5 0 1.049 1.049 0 000-1.486l-6.944-6.943a1.049 1.049 0 00-1.486 0l-6.954 6.933a1.049 1.049 0 000 1.486 1.049 1.049 0 001.486 0l5.152-5.131v11.77A1.057 1.057 0 0012 20.211a1.057 1.057 0 001.053-1.055z"
						fill="#003087"
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

const BackToTopIcon: FC<Props> = ({ size = IconSize.SMALL, color }: Props) => (
	<Icon component={BackToTop} style={{ fontSize: size, color }} />
);

export default BackToTopIcon;
