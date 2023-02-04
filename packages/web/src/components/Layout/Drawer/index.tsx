import { FC, useCallback } from "react";
import { Drawer as AntDrawer, DrawerProps } from "antd";
import "./index.scss";
import CloseIcon from "../../../icons/CloseIcon";
import LanguageToggle from "../../LanguageToggle";
import NextIcon from "../../../icons/NextIcon";
import { data } from "./data";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import Text from "../../Text";
import { Link, useHistory } from "react-router-dom";
import ProfilePicture, { PictureSize } from "../../ProfilePicture";

export type Props = {
	onClose: () => void;
	visible: boolean;
} & DrawerProps;

const Drawer: FC<Props> = ({ onClose, visible }) => {
	const { userProfile, profileCompleteness } = useUserProfile();
	const history = useHistory();

	const onBecomeMember = useCallback(() => {
		history.push("/registration");
	}, [history]);

	return (
		<AntDrawer
			className="acuvue-drawer"
			placement="left"
			closable={false}
			onClose={onClose}
			visible={visible}
			width="90%"
		>
			<div className="top-icons">
				<CloseIcon onClick={onClose} />
				<LanguageToggle />
			</div>

			<div className="profile-container">
				<ProfilePicture size={PictureSize.SMALL} />

				{profileCompleteness === ProfileCompleteness.COMPLETE ? (
					<div className="user-details">
						<span className="full-name">{`${userProfile?.firstName} ${userProfile?.lastName}`}</span>
						<Link to="/profile">
							<span className="view-user-profile">
								<Text textKey="drawer.viewUserProfile" />
							</span>
						</Link>
					</div>
				) : (
					<div className="guest-details" onClick={onBecomeMember}>
						<span className="become-member">
							<Text textKey="drawer.becomeMember" />
						</span>
						<span className="start-earning">
							<Text textKey="drawer.startEarning" />
						</span>
					</div>
				)}

				<div className="right-chevron-icon">
					<NextIcon />
				</div>
			</div>

			<hr />

			{data.map(({ icon, link, textKey }) => (
				<Link key={link} to={link} className="menu-item">
					<div className="item-icon">{icon}</div>
					<div className="item-text">
						<Text textKey={textKey} />
					</div>
					<div className="right-chevron-icon">
						<NextIcon />
					</div>
				</Link>
			))}

			<div className="footer">
				<h6>MyACUVUE™</h6>
				<span className="version-details">App Version v1.01</span>
			</div>
		</AntDrawer>
	);
};

export default Drawer;
