import { FC } from "react";
import PersonWithHeadsetIcon from "../../../icons/PersonWithHeadsetIcon";
import "./index.scss";
import Text from "../../../components/Text";
interface IProps {
	emailAddress: string;
	phone: string;
}

const SupportContactBlock: FC<IProps> = ({ emailAddress, phone }) => {
	return (
		<div className="support-contact-block">
			<div className="member-support-title-with-icon">
				<PersonWithHeadsetIcon color="#003087" />
				<a
					className="member-support-title"
					href={`mailto:${emailAddress}`}
				>
					<Text textKey="dashboard.memberSupport.myacuvueMemberSupport" />
				</a>
			</div>
			<div className="contact-information">
				<div className="phone-and-email-block">
					<div>
						<Text
							textKey="dashboard.memberSupport.phone"
							data={{ phone }}
						/>
					</div>
					{emailAddress && (
						<div>
							<Text
								textKey="dashboard.memberSupport.emailAddress"
								data={{ emailAddress }}
							/>
						</div>
					)}
				</div>
				<div>
					<Text textKey="dashboard.memberSupport.operatingHours" />
				</div>
			</div>
		</div>
	);
};

export default SupportContactBlock;
