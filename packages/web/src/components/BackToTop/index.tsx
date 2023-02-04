import { BackTop } from "antd";
import { FC } from "react";
import BackToTopIcon from "../../icons/BackToTopIcon";
import "./index.scss";

const BackToTop: FC = ({ ...props }) => (
	<BackTop
		visibilityHeight={50}
		className="back-to-top"
		children={
			<div className="back-wrapper">
				<BackToTopIcon />
			</div>
		}
		{...props}
	/>
);

export default BackToTop;
