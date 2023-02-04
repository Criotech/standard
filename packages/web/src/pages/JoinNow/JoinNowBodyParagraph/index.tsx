import { FC } from "react";
import Text from "../../../components/Text";
import "./index.scss";

const JoinNowBodyParagraph: FC<{}> = () => {
	return (
		<div className="join-now-body-paragraph body-texts">
			<p key="paragraph1">
				<Text textKey="joinNowPage.body.paragraph1" />
			</p>
			<p key="paragraph2">
				<Text textKey="joinNowPage.body.paragraph2.first" />{" "}
				<b>
					<Text textKey="joinNowPage.body.paragraph2.second" />
				</b>{" "}
				<br />
				<Text textKey="joinNowPage.body.paragraph2.third" />
			</p>
		</div>
	);
};

export default JoinNowBodyParagraph;
