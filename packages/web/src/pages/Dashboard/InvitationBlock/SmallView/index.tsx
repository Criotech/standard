import { FC } from "react";
import Text from "../../../../components/Text";
import appstoreImage from "../../../../images/AppStoreLogo.svg";
import playstoreImage from "../../../../images/google-play-logo.svg";
import "./index.scss";
import { TranslationKey } from "@myacuvue_thailand_web/services";

interface IProps {
	invitationTitleKey: TranslationKey;
	invitationBody: TranslationKey;
	googlePlayStoreLink: string;
	appleAppStoreLink: string;
}

const SmallView: FC<IProps> = ({
	invitationTitleKey,
	invitationBody,
	appleAppStoreLink,
	googlePlayStoreLink,
}) => {
	return (
		<div className="small-view">
			<h3 className="title">
				<Text textKey={invitationTitleKey} />
			</h3>

			<p className="body">
				<Text textKey={invitationBody} />
			</p>

			<div className="image-and-download-links">
				<img
					className="image"
					src="/images/cropped-girls-looking-at-smartphone.png"
					alt=""
				/>

				<div className="links">
					<a href={appleAppStoreLink}>
						<img
							className="appstore-image"
							src={appstoreImage}
							alt=""
						/>
					</a>

					<a href={googlePlayStoreLink}>
						<img
							className="playstore-image"
							src={playstoreImage}
							alt=""
						/>
					</a>
				</div>
			</div>
		</div>
	);
};

export default SmallView;
