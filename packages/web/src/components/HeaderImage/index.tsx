import { FC } from "react";
import buyingAtEyeCare from "../../images/buying-at-eye-care.svg";
import "./index.scss";

const HeaderImage: FC<{}> = () => (
	<div className="header-image">
		<img
			className="header-image-img"
			src={buyingAtEyeCare}
			alt="Header Decoration"
			width="100"
			height="100"
		/>
	</div>
);

export default HeaderImage;
