import { FC, useState, useCallback, useMemo } from "react";
import { useDate } from "../../../hooks/useDate";
import { ClassService } from "@myacuvue_thailand_web/services";
import "./index.scss";
import RatingInputWithLabel from "./RatingInputWithLabel";
import ThinDivider from "../../../components/ThinDivider";
import Text from "../../../components/Text";
import GreenButton from "../../../components/GreenButton";
import { useWideScreen } from "../../../hooks/useWideScreen";
import VerticalDivider from "../../../components/VerticalDivider";
import { useFeedback } from "../../../hooks/useFeedback";
import SavePurchaseFeedbackSuccessDialog from "./SavePurchaseFeedbackSuccessDialog";
interface IProps {
	className?: string;
	contactLensesScore: number;
	storeScore: number;
	storeName?: string;
	dateOfPurchase?: string;
	isFeedbackFormDisabled: boolean;
	purchaseId?: string;
}

const FeedbackForm: FC<IProps> = ({
	className,
	purchaseId,
	contactLensesScore,
	storeScore,
	storeName,
	dateOfPurchase,
	isFeedbackFormDisabled,
}) => {
	const { isWideScreen } = useWideScreen();
	const { savePurchaseFeedback } = useFeedback();
	const { longDateToDisplay } = useDate();
	const classNames = ClassService.createClassName(
		"acuvue-feedback-form",
		className
	);

	const [rating, setRatings] = useState<{
		storeRating: number;
		contactLensesRating: number;
	}>({
		storeRating: storeScore,
		contactLensesRating: contactLensesScore,
	});

	const [showSuccessModal, toggleSuccessModal] = useState<boolean>(false);

	const handleSubmit = async () => {
		try {
			await savePurchaseFeedback(purchaseId!, {
				storeScore: rating.storeRating,
				contactLensesScore: rating.contactLensesRating,
			});
			toggleSuccessModal(true);
		} catch (error) {}
	};

	const closeModal = useCallback(() => {
		toggleSuccessModal(false);
	}, [toggleSuccessModal]);

	const isSubmitDisabled = useMemo(() => {
		const { storeRating, contactLensesRating } = rating;
		if (storeRating && contactLensesRating) {
			return false;
		}
		return true;
	}, [rating]);

	return (
		<div className={classNames}>
			<div className="top-section">
				{storeName && dateOfPurchase && (
					<>
						<div className="store-name-label">
							<Text textKey="feedbackBlock.feedbackForm.storeName" />
							{`: ${storeName}`}
						</div>
						<div className="date-of-purchase-label">
							<Text
								textKey="feedbackBlock.feedbackForm.dateOfPurchase"
								data={{
									dateOfPurchase: longDateToDisplay(
										new Date(dateOfPurchase)
									),
								}}
							/>
						</div>
					</>
				)}
			</div>
			<div className="middle-section">
				<RatingInputWithLabel
					value={rating.contactLensesRating}
					onChange={(newValue) => {
						setRatings({
							...rating,
							contactLensesRating: newValue,
						});
					}}
					label={"feedbackBlock.feedbackForm.contactLensesScoreLabel"}
					description={
						"feedbackBlock.feedbackForm.contactLensesScoreDescription"
					}
					className="contact-lenses-score-block"
					isDisabled={isFeedbackFormDisabled}
				/>
				{isWideScreen ? (
					<VerticalDivider className="vertical-divider" />
				) : (
					<ThinDivider className="horizontal-divider" />
				)}
				<RatingInputWithLabel
					value={rating.storeRating}
					onChange={(newValue) => {
						setRatings({
							...rating,
							storeRating: newValue,
						});
					}}
					label={"feedbackBlock.feedbackForm.storeScoreLabel"}
					description={
						"feedbackBlock.feedbackForm.storeScoreDescription"
					}
					className="store-score-block"
					isDisabled={isFeedbackFormDisabled}
				/>
			</div>
			<GreenButton
				htmlType="submit"
				className="submit-feedback-button"
				onClick={handleSubmit}
				disabled={isSubmitDisabled}
			>
				<Text textKey="feedbackBlock.feedbackForm.submitFeedback" />
			</GreenButton>

			<SavePurchaseFeedbackSuccessDialog
				isOpen={showSuccessModal}
				onClose={closeModal}
			/>
		</div>
	);
};

export default FeedbackForm;
