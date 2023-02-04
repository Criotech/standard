import { FC } from "react";
import "./index.scss";
import { PictureSize } from "../ProfilePicture";

interface IProps {
	pictureUrl: string;
	size?: PictureSize;
}

const LinePicture: FC<IProps> = ({ pictureUrl, size = PictureSize.SMALL }) => (
	<div className="line-picture">
		<img width={size} height={size} src={pictureUrl} alt="Profile" />
	</div>
);

export default LinePicture;
