import { FC, useCallback, useMemo } from "react";
import { useService } from "../../../hooks/useService";
import BlockTitle from "../BlockTitle";
import EmptyView from "./EmptyView";
import "./index.scss";
import NonEmptyView from "./NonEmptyView";
import QuestionMarkIcon, { IconSize } from "../../../icons/QuestionMarkIcon";
import Text from "../../../components/Text";
import LoadingBlock from "../../../components/LoadingBlock";
import { TranslationKey } from "@myacuvue_thailand_web/services";

interface IProps {
	cards: { imageUrl: string; title: string }[];
	isLoading: boolean;
	minimumPointsToRedeem: number;
	isUserRegistedToStore: boolean;
	isCatalogsEmpty: boolean;
	hasReceivedWelcomeWallet: boolean;
}

const WalletBlock: FC<IProps> = ({
	cards,
	isLoading,
	minimumPointsToRedeem,
	isUserRegistedToStore,
	isCatalogsEmpty,
	hasReceivedWelcomeWallet,
}) => {
	const { WindowService } = useService();

	const scrollToView = useCallback(
		(id: string) => {
			const navigationHeaderHeight = 180;
			const section = WindowService.getElementById(id);

			if (section) {
				const top = section.offsetTop - navigationHeaderHeight;
				WindowService.scrollTo(top, 0, "smooth");
			}
		},
		[WindowService]
	);

	const emptyMessageKey = useMemo<TranslationKey>(() => {
		if (isCatalogsEmpty) {
			return "dashboardPage.rewardWallet.empty.earnPoints";
		} else if (!isUserRegistedToStore && !hasReceivedWelcomeWallet) {
			return "dashboardPage.rewardWallet.empty.selectStore";
		} else {
			return "dashboardPage.rewardWallet.empty.redeemRewardsCollectPoints";
		}
	}, [hasReceivedWelcomeWallet, isCatalogsEmpty, isUserRegistedToStore]);

	return (
		<div className="acuvue-reward-wallet-block">
			<div className="reward-wallet-and-redeem">
				<div className="wallet-block-title">
					<BlockTitle textKey="dashboardPage.rewardWallet.yourRewardWallet" />
				</div>
				<div
					className="question-mark-icon"
					onClick={() => scrollToView("invitation-block")}
				>
					<QuestionMarkIcon size={IconSize.SMALL} color="#6C7680" />
					<span>
						<Text textKey="dashboardPage.rewardWallet.howToRedeem" />
					</span>
				</div>
			</div>
			{isLoading && <LoadingBlock />}

			{!isLoading && (
				<>
					{cards.length > 0 ? (
						<NonEmptyView cards={cards} />
					) : (
						<EmptyView
							emptyMessageKey={emptyMessageKey}
							emptyMessageData={{ minimumPointsToRedeem }}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default WalletBlock;
