import { FC } from "react";
import Text from "../../components/Text";
import "./index.scss";
import ThinDivider from "../../components/ThinDivider";
import Button, { ButtonType } from "../../components/Button";
import PencilIcon from "../../icons/PencilIcon";
import { Gender, TranslationKey } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import LoadingBlock from "../../components/LoadingBlock";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import Header from "../../components/Layout/Header";
import { useProfileDetails } from "./useProfileDetails";
import { useUserProfile } from "../../contexts/UserProfileContext";

const genderLabels: Record<Gender, TranslationKey> = {
	[Gender.MALE]: "profileAndSettingsPage.profileDetails.genderMaleLabel",
	[Gender.FEMALE]: "profileAndSettingsPage.profileDetails.genderFemaleLabel",
	[Gender.NON_BINARY]:
		"profileAndSettingsPage.profileDetails.genderNonBinaryLabel",
};

const ProfileDetails: FC<{}> = () => {
	const navigate = useNavigate();
	const { address, isLoading, stateName } = useProfileDetails();

	const { userProfile } = useUserProfile();
	const firstName = userProfile?.firstName ?? "";
	const lastName = userProfile?.lastName ?? "";
	const userEmail = userProfile?.email ?? "";

	let genderKey: TranslationKey | undefined;
	if (userProfile?.gender) {
		genderKey = genderLabels[userProfile.gender];
	}

	let formattedBirthday = "";
	if (userProfile?.birthMonth && userProfile?.birthYear) {
		formattedBirthday = `${userProfile.birthMonth}/${userProfile.birthYear}`;
	}

	let formattedUserPhone = "";
	if (userProfile?.phone) {
		formattedUserPhone = `+${userProfile.phone}`;
	}

	return (
		<div className="profile-details">
			<Header titleKey="profileAndSettingsPage.profileDetails.title" />
			<main>
				<h1>
					<Text textKey="profileAndSettingsPage.profileDetails.title" />
				</h1>
				{(!userProfile || isLoading) && <LoadingBlock />}

				{userProfile && !isLoading && (
					<>
						<div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.firstNameLabel" />
									</p>
									<p className="profile-field-value">
										{firstName}
									</p>
								</div>
								<Button
									className="edit-button"
									onClick={() => navigate("/profile/edit")}
									type={ButtonType.OUTLINE}
								>
									<PencilIcon />
									<span>
										<Text textKey="profileAndSettingsPage.editProfileDetails.edit" />
									</span>
								</Button>
							</div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.lastNameLabel" />
									</p>
									<p className="profile-field-value">
										{lastName}
									</p>
								</div>
							</div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.genderLabel" />
									</p>
									<p className="profile-field-value">
										{genderKey && (
											<Text textKey={genderKey} />
										)}
									</p>
								</div>
							</div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.birthdayLabel" />
									</p>
									<p className="profile-field-value">
										{formattedBirthday}
									</p>
								</div>
							</div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.email" />
									</p>
									<p className="profile-field-value">
										{userEmail}
									</p>
								</div>
							</div>

							<div className="profile-fields-row">
								{address ? (
									<>
										<div className="col">
											<p className="profile-field-label">
												<Text textKey="profileAndSettingsPage.defaultAddress" />
											</p>
											<p className="profile-field-value">
												{`${address.line1}, ${address.line2},`}
											</p>
											<p className="profile-field-value">
												{`${address.line3}, ${address.city},`}
											</p>
											<p className="profile-field-value">
												{stateName &&
													`${stateName}, ${address.postCode}`}
											</p>
										</div>
										<Button
											className="edit-button"
											onClick={() =>
												navigate(
													"/profile/default-address/edit"
												)
											}
											type={ButtonType.OUTLINE}
										>
											<PencilIcon />
											<span>
												<Text textKey="profileAndSettingsPage.editProfileDetails.edit" />
											</span>
										</Button>
									</>
								) : (
									<button
										className="add-new-address"
										onClick={() =>
											navigate(
												"/profile/default-address/add"
											)
										}
									>
										<Text textKey="profileAndSettingsPage.profileDetails.addNewAddress" />
									</button>
								)}
							</div>
						</div>
						<ThinDivider className="divider" />
						<div>
							<div className="profile-fields-row profile-phone">
								<div className="col">
									<h4>
										<Text textKey="profileAndSettingsPage.profileDetails.phoneNumber" />
									</h4>
								</div>
								<Button
									className="edit-button"
									onClick={() => navigate("/update-mobile")}
									type={ButtonType.OUTLINE}
								>
									<PencilIcon />
									<span>
										<Text textKey="profileAndSettingsPage.editProfileDetails.edit" />
									</span>
								</Button>
							</div>

							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-text">
										<Text textKey="profileAndSettingsPage.updatingPhoneWillRequireOTP" />
									</p>
								</div>
							</div>
							<div className="profile-fields-row">
								<div className="col">
									<p className="profile-field-label">
										<Text textKey="profileAndSettingsPage.profileDetails.phoneNumber" />
									</p>
									<p className="profile-field-value">
										{formattedUserPhone}
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};
export default ProfileDetails;
