import { FC } from "react";
import MemberView from "./MemberView";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import GuestView from "./GuestView";
import Header from "../../components/Layout/Header";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import "./index.scss";

const MemberId: FC<{}> = () => {
	const { profileCompleteness } = useUserProfile();

	return (
		<div className="member-id">
			<Header titleKey="memberIdPage.title" />
			<main>
				{profileCompleteness === ProfileCompleteness.COMPLETE ? (
					<MemberView />
				) : (
					<GuestView />
				)}
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default MemberId;
