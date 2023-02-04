import Icon from "@ant-design/icons";
import { FC } from "react";
import { PictureSize } from "../../components/ProfilePicture";

const AvatarSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" {...props}>
		<path d="M0,0H40V40H0Z" fill="none" />
		<path
			d="M18.5,24A2.5,2.5,0,1,1,16,21.5,2.5,2.5,0,0,1,18.5,24ZM28,21.5A2.5,2.5,0,1,0,30.5,24,2.5,2.5,0,0,0,28,21.5ZM42,22A20,20,0,1,1,22,2,20.007,20.007,0,0,1,42,22Zm-4,0a15.76,15.76,0,0,0-.66-4.48A20.611,20.611,0,0,1,33,18a20,20,0,0,1-15.52-7.38A20.032,20.032,0,0,1,6,21.72,1.307,1.307,0,0,1,6,22a16,16,0,1,0,32,0Z"
			transform="translate(-2 -2)"
			fill="#003087"
		/>
	</svg>
);

export type Props = {
	color?: string;
	size?: PictureSize;
};

const AvatarIcon: FC<Props> = ({ size = PictureSize.SMALL, color }: Props) => (
	<Icon
		className="avatar-icon"
		component={AvatarSvg}
		style={{ fontSize: size, color }}
	/>
);

export default AvatarIcon;
