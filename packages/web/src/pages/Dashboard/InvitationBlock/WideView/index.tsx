import { FC } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../../../../components/Text";
import "./index.scss";

interface IProps {
	invitationTitleKey: TranslationKey;
	invitationBody: TranslationKey;
	qrCodeSubtitleKey: TranslationKey;
	qrCodeImagePath: string;
}

const InvitationBlockWideView: FC<IProps> = ({
	invitationTitleKey,
	invitationBody,
	qrCodeImagePath,
	qrCodeSubtitleKey,
}) => {
	return (
		<div className="invitation-block-wide-view">
			<img
				className="invitation-image-icon"
				src="/images/cropped-girls-looking-at-smartphone.png"
				alt=""
			/>
			<div className="invitation-block-contents">
				<div className="invitation-block-content-details">
					<h3 className="invitation-block-content-title">
						<Text textKey={invitationTitleKey} />
					</h3>
					<p className="invitation-block-content-body">
						<Text textKey={invitationBody} />
					</p>
				</div>
			</div>
			<div className="invitation-block-qr">
				<img
					className="qr-code-image"
					src={qrCodeImagePath}
					alt="qr-code"
				/>
				<p className="qr-subtitle">
					<Text textKey={qrCodeSubtitleKey} />
				</p>
			</div>
		</div>
	);
};

export default InvitationBlockWideView;
