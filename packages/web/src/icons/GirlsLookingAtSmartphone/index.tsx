import { FC } from "react";
import CircleDecorationIcon from "../CircleDecorationIcon";
import girlsLookingAtSmartphoneImage from "../../images/girls-looking-at-smartphone.png";
import "./index.scss";

export type IProps = {
	className?: string;
};

const GirlsLookingAtSmartphone: FC<IProps> = ({ className }) => {
	const classNames = ["girls-looking-at-smartphone", className].join(" ");

	return (
		<div className={classNames}>
			<img
				className="girls-looking-at-smartphone-image"
				src={girlsLookingAtSmartphoneImage}
				alt="girls looking at smartphone"
			/>
			<CircleDecorationIcon />
		</div>
	);
};

export default GirlsLookingAtSmartphone;
