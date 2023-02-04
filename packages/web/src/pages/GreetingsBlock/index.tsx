import { FC } from "react";
import Text from "../../components/Text";
import ChevronRightIcon, { IconSize } from "../../icons/ChevronRightIcon";
import CircleDecorationIcon from "../../icons/CircleDecorationIcon";
import MemberIcon from "../../icons/MemberIcon";
import MembershipBlock from "../Dashboard/MembershipBlock";
import WalletBlock from "../Dashboard/WalletBlock";
import "./index.scss";
import { useService } from "../../hooks/useService";
import { IPoints } from "@myacuvue_thailand_web/services";
import LoadingBlock from "../../components/LoadingBlock";
import { Link } from "react-router-dom";
import { useConfiguration } from "../../hooks/useConfiguration";
import FeedbackBlock from "../FeedbackBlock";
import PromocodeBlock from "../Dashboard/PromocodeBlock";

interface IWalletProps {
	isWalletLoading: boolean;
	cards: { imageUrl: string; title: string }[];
	minimumPointsToRedeem: number;
	isUserRegistedToStore: boolean;
	isCatalogsEmpty: boolean;
	hasReceivedWelcomeWallet: boolean;
}

interface IProps {
	className?: string;
	userPoints?: IPoints;
	isPointsLoading?: boolean;
	firstName: string;
	walletProps?: IWalletProps;
}

const GreetingsBlock: FC<IProps> = ({
	className,
	userPoints,
	isPointsLoading,
	firstName,
	walletProps,
}) => {
	const { ClassService } = useService();
	const {
		hasProfileDetailsMenu,
		hasMembershipAndWalletBlock,
		hasPromocodeAndFeedbackBlock,
	} = useConfiguration();

	const classNames = ClassService.createClassName(
		"acuvue-greetings-block",
		className
	);

	return (
		<div className={classNames}>
			<div className="circle-decoration-icon-wrapper">
				<CircleDecorationIcon className="circle-decoration-icon" />
			</div>
			<div className="content-wrapper">
				<div className="greetings-section">
					<h3 className="greetings-text">
						<Text
							textKey="dashboardPage.greeting"
							data={{
								firstName,
							}}
						/>
					</h3>
					{hasProfileDetailsMenu && (
						<Link to="/profile" className="profile-details-link">
							<MemberIcon color="#003087" />
							<p className="profile-details-text typography-body-2">
								<Text textKey="dashboardPage.profileDetails" />
							</p>
							<ChevronRightIcon
								size={IconSize.SMALL}
								color="#003087"
							/>
						</Link>
					)}
				</div>
				{hasMembershipAndWalletBlock && (
					<div className="membership-and-wallet-section">
						<div className="membership-block">
							{isPointsLoading || !userPoints ? (
								<LoadingBlock />
							) : (
								<MembershipBlock
									availablePoints={userPoints.availablePoints}
									expiringPoints={userPoints.expiringPoints}
									expiringAt={userPoints.expiringAt}
									ladderKey={userPoints.ladder}
									isLoading={isPointsLoading!}
								/>
							)}
						</div>
						{walletProps && (
							<div className="wallet-block">
								<WalletBlock
									cards={walletProps.cards}
									isLoading={walletProps.isWalletLoading}
									minimumPointsToRedeem={
										walletProps.minimumPointsToRedeem
									}
									isUserRegistedToStore={
										walletProps.isUserRegistedToStore
									}
									isCatalogsEmpty={
										walletProps.isCatalogsEmpty
									}
									hasReceivedWelcomeWallet={
										walletProps.hasReceivedWelcomeWallet
									}
								/>
							</div>
						)}
					</div>
				)}
				{hasPromocodeAndFeedbackBlock && (
					<div className="promocode-and-feedback-section">
						<PromocodeBlock />
						<FeedbackBlock />
					</div>
				)}
			</div>
		</div>
	);
};

export default GreetingsBlock;
