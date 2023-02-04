import { FC } from "react";
import Title from "../../components/Title";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../components/Footer";
import MyProfileBlock from "./MyProfileBlock";
import "./index.scss";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import { useHistory } from "react-router-dom";
import Text from "../../components/Text";
import PasswordBlock from "./PasswordBlock";
import MarketingPreferencesBlock from "./MarketingPreferencesBlock";
import MobileBlock from "./MobileBlock";
import AddressSection from "./AddressSection";
import { useAsync } from "react-use";
import { useUser } from "../../hooks/useUser";
import LoadingBlock from "../../components/LoadingBlock";
import { useConfiguration } from "../../hooks/useConfiguration";

const Profile: FC<{}> = () => {
	const { getProfile } = useUser();
	const { value: user, loading } = useAsync(() => getProfile(), [getProfile]);
	const { hasAddressFeature } = useConfiguration();
	const history = useHistory();

	return loading ? (
		<LoadingBlock />
	) : (
		<>
			<MyAcuvueLiteHeader />
			<div className="profile-page">
				<div className="content-wrapper">
					<div className="profile-title">
						<Title
							textKey="profilePage.title"
							subKey="profilePage.subTitle"
						/>
					</div>

					<MyProfileBlock
						firstName={user?.firstName!}
						lastName={user?.lastName!}
						email={user?.email!}
						birthMonth={user?.birthMonth!}
						birthYear={user?.birthYear!}
						gender={user?.gender!}
					/>

					<Button
						className="update-profile-button"
						type={ButtonType.OUTLINE}
						size={ButtonSize.MEDIUM}
						htmlType="button"
						onClick={() => history.push("/profile/edit")}
					>
						<Text textKey="editProfilePage.updateMyProfileButton" />
					</Button>

					<PasswordBlock />

					<MobileBlock phone={user?.phone!} />

					{hasAddressFeature && <AddressSection />}

					<MarketingPreferencesBlock />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Profile;
