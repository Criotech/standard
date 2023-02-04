import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import StepBar from "../../../components/StepBar";

interface IProps {
	currentIndex: number;
}

const steps: TranslationKey[] = [
	"joinNowPage.joinNowStepBar.mobileOtp",
	"joinNowPage.joinNowStepBar.termsAndConditions",
	"joinNowPage.joinNowStepBar.createAccount",
];

const JoinNowStepBar: FC<IProps> = ({ currentIndex }) => {
	return <StepBar steps={steps} currentIndex={currentIndex} />;
};

export default JoinNowStepBar;
