import { FC, useCallback, useEffect, useState } from "react";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import "./index.scss";
import Text from "../../components/Text";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import ThinDivider from "../../components/ThinDivider";
import ProfileMenu from "./ProfileMenu";
import SectionDivider from "../../components/SectionDivider";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useSettings } from "../../hooks/useSettings";
import { useNavigate } from "react-router-dom-v5-compat";
import Header from "../../components/Layout/Header";
import ProfilePicture, { PictureSize } from "../../components/ProfilePicture";

const ProfileAndSettings: FC<{}> = () => {
	const navigate = useNavigate();
	const { userProfile, profileCompleteness } = useUserProfile();
	const { getNotificationPreferences, saveNotificationPreferences } =
		useSettings();
	const [isNewsPromotionsEnabled, setNewsPromotions] = useState<boolean>();

	useEffect(() => {
		(async () => {
			const settings = await getNotificationPreferences();
			const isLineAndSMSEnabled =
				settings?.marketing?.smsEnabled &&
				settings?.marketing?.lineEnabled
					? true
					: false;
			setNewsPromotions(isLineAndSMSEnabled);
		})();
	}, [getNotificationPreferences]);

	const handleToggleSwitch = useCallback(
		async (newValue: boolean) => {
			const payload = {
				marketing: {
					smsEnabled: newValue,
					lineEnabled: newValue,
				},
			};
			await saveNotificationPreferences(payload);
			setNewsPromotions(newValue);
		},
		[saveNotificationPreferences]
	);

	return (
		<div className="profile-and-settings-page">
			<Header titleKey="profileAndSettingsPage.title" />
			<main>
				{profileCompleteness === ProfileCompleteness.COMPLETE && (
					<div className="profile-container">
						<div className="details-wrapper">
							<ProfilePicture size={PictureSize.MEDIUM} />
							<div className="user-details">
								<span className="full-name">{`${userProfile?.firstName} ${userProfile?.lastName}`}</span>
								<span
									className="link-to-profile-details"
									onClick={() => navigate("/profile/details")}
								>
									<Text textKey="profileAndSettingsPage.viewEditProfie" />
								</span>
							</div>
						</div>
					</div>
				)}

				<ThinDivider />
				<ProfileMenu />
				<SectionDivider />

				<div className="settings">
					<h2>
						<Text textKey="profileAndSettingsPage.settings" />
					</h2>
					<p>
						<Text textKey="profileAndSettingsPage.notifications" />
					</p>
					<div className="settings-item-wrapper">
						<span>
							<Text textKey="profileAndSettingsPage.newsAndPromotions" />
						</span>

						<ToggleSwitch
							checked={isNewsPromotionsEnabled}
							onChange={(newValue) => {
								handleToggleSwitch(newValue);
							}}
						/>
					</div>
				</div>

				<SectionDivider />

				<GlobalNavigationPanel />
			</main>
		</div>
	);
};

export default ProfileAndSettings;
