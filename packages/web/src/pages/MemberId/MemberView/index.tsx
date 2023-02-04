import { FC } from "react";
import ThinDivider from "../../../components/ThinDivider";
import "./index.scss";
import MemberCard from "../../../components/MemberCard";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import StoreBlock from "../../Home/StoreBlock";
import { usePoints } from "../../../hooks/usePoints";
import { useAsync } from "react-use";
import { IPoints, ProfileCompleteness } from "@myacuvue_thailand_web/services";
import LoadingBlock from "../../../components/LoadingBlock";
import platinumBadge from "../../../images/platinum-badge.png";
import ProfilePicture, {
	PictureSize,
} from "../../../components/ProfilePicture";

const MemberView: FC<{}> = () => {
	const { userProfile, profileCompleteness } = useUserProfile();
	const { getUserPoints } = usePoints();

	const { value, loading } = useAsync(() => getUserPoints(), [getUserPoints]);
	const points = value as IPoints;
	const isRegisteredUser =
		userProfile && profileCompleteness === ProfileCompleteness.COMPLETE;

	return (
		<div className="member-view">
			<main>
				{loading && <LoadingBlock />}
				{!loading && isRegisteredUser && userProfile && (
					<>
						<MemberCard
							name={`${userProfile.firstName} ${userProfile.lastName}`}
							memberId={userProfile.myAcuvueId!}
							picture={
								<ProfilePicture size={PictureSize.MEDIUM} />
							}
							badge={
								points.earnedPoints > 600 ? (
									<img
										src={platinumBadge}
										alt="Platinum Badge"
									/>
								) : null
							}
						/>
						<ThinDivider />
						<StoreBlock />
					</>
				)}
			</main>
		</div>
	);
};

export default MemberView;
