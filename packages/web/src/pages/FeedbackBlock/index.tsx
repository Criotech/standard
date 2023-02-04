import { FC, useMemo } from "react";
import { useAsync } from "react-use";
import { ClassService } from "@myacuvue_thailand_web/services";
import { useFeedback } from "../../hooks/useFeedback";
import "./index.scss";
import Text from "../../components/Text";
import FeedbackForm from "./FeedbackForm";

interface IProps {
	className?: string;
}

const FeedbackBlock: FC<IProps> = ({ className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-feedback-block",
		className
	);

	const { getLatestPurchase } = useFeedback();

	const { value: lastestPurchase } = useAsync(
		() => getLatestPurchase(),
		[getLatestPurchase]
	);

	const shouldDisabledFeedbackForm = useMemo(() => {
		if (lastestPurchase && !lastestPurchase.feedback.hasGivenFeedback) {
			return false;
		}
		return true;
	}, [lastestPurchase]);

	return (
		<div className={classNames}>
			<div className="top-section">
				<div className="feedback-block-title typography-heading-2">
					<Text textKey="feedbackBlock.title.hopeYouHadAGreateExperience" />
				</div>
				<p className="feedback-block-sub-title">
					<Text textKey="feedbackBlock.subtitle.pleaseSelectARating" />
				</p>
			</div>

			<FeedbackForm
				storeScore={
					(lastestPurchase && lastestPurchase.feedback.storeScore) ||
					0
				}
				contactLensesScore={
					(lastestPurchase &&
						lastestPurchase.feedback.contactLensesScore) ||
					0
				}
				storeName={lastestPurchase && lastestPurchase.storeName}
				dateOfPurchase={
					lastestPurchase && lastestPurchase.dateOfPurchase
				}
				isFeedbackFormDisabled={shouldDisabledFeedbackForm}
				purchaseId={lastestPurchase && lastestPurchase.id}
			/>
		</div>
	);
};

export default FeedbackBlock;
