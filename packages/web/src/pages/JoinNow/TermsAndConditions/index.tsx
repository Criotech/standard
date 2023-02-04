import { FC } from "react";
import Title from "../../../components/Title";
import MyAcuvueLiteHeader from "../../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../../components/Footer";
import JoinNowStepBar from "../JoinNowStepBar";
import BlockTitle from "../../Dashboard/BlockTitle";
import TermsAndConditionsForm from "./TermsAndConditionsForm";
import { useTermsAndConditions } from "./useTermsAndConditions";
import "./index.scss";
import JoinNowBodyParagraph from "../JoinNowBodyParagraph";

const TermsAndConditions: FC<{}> = () => {
	const {
		formData,
		setFormData,
		currentIndex,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
	} = useTermsAndConditions();

	return (
		<div className="terms-and-condition-page">
			<MyAcuvueLiteHeader />

			<div className="content-wrapper">
				<div className="terms-and-condition">
					<Title
						textKey="joinNowPage.title"
						subKey="joinNowPage.subTitle"
					/>
				</div>

				<JoinNowBodyParagraph />

				<JoinNowStepBar currentIndex={currentIndex} />

				<BlockTitle
					className="content-title"
					textKey="pointsTermsAndCondition.title"
				/>

				<TermsAndConditionsForm
					formData={formData}
					setFormData={setFormData}
					onSubmit={onSubmit}
					onGoBackClick={onGoBack}
					isSubmitDisabled={isSubmitDisabled}
				/>
			</div>

			<Footer />
		</div>
	);
};

export default TermsAndConditions;
