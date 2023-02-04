import { FC } from "react";
import { IGetProfileResponse } from "@myacuvue_thailand_web/services";
import Text from "../../../components/Text";
import "./index.scss";

interface IProps {
	profile?: IGetProfileResponse | null;
}

const Greeting: FC<IProps> = ({ profile }) =>
	profile?.firstName ? (
		<h1 className="greeting">
			<Text
				textKey="homePage.userGreeting"
				data={{ username: profile.firstName || "" }}
			/>
		</h1>
	) : (
		<h1 className="greeting">
			<Text textKey="homePage.guestGreeting" />
		</h1>
	);

export default Greeting;
