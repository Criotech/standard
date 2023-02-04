import { FC, useContext } from "react";
import AvatarIcon from "../../icons/AvatarIcon";
import { LineContext } from "../../contexts/LineContext";
import LinePicture from "../LinePicture";

export enum PictureSize {
	SMALL = "40px",
	MEDIUM = "48px",
}

export interface IProps {
	size: PictureSize;
}

const ProfilePicture: FC<IProps> = ({ size }) => {
	const lineContext = useContext(LineContext);
	return lineContext?.lineProfile?.pictureUrl ? (
		<LinePicture
			pictureUrl={lineContext?.lineProfile?.pictureUrl}
			size={size}
		/>
	) : (
		<AvatarIcon size={size} />
	);
};

export default ProfilePicture;
