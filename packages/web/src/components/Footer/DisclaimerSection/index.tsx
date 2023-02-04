import { FC } from "react";
import DisplayHTML from "../../DisplayHTML";
import "./index.scss";

interface IProps {
	htmlContent: string;
}

const DisclaimerSection: FC<IProps> = ({ htmlContent }) => {
	return (
		<div className="disclaimer-text">
			<DisplayHTML unsafeHTML={htmlContent} />
		</div>
	);
};

export default DisclaimerSection;
