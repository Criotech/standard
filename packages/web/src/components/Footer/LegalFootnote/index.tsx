import { FC } from "react";
import DisplayHTML from "../../DisplayHTML";
import "./index.scss";

interface IProps {
	htmlContent: string;
}

const LegalFootnote: FC<IProps> = ({ htmlContent }) => {
	return (
		<div className="legal-footnote">
			<DisplayHTML unsafeHTML={htmlContent} />
		</div>
	);
};

export default LegalFootnote;
