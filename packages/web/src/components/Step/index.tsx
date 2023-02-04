import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../Text";
import "./index.scss";
import { useService } from "../../hooks/useService";

interface IProps {
	stepIndex: number;
	title: TranslationKey;
	isActive: boolean;
	className?: string;
	isLastStep: boolean;
	isFinished: boolean;
}

const Step: FC<IProps> = ({
	stepIndex,
	title,
	isActive,
	className,
	isLastStep,
	isFinished,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-step",
		isLastStep ? "acuvue-step-last" : "",
		isActive ? "acuvue-step-active" : "",
		isFinished ? "acuvue-step-finished" : "",
		className
	);

	return (
		<div className={classNames}>
			<div className="step-number-wrapper">
				<span>{stepIndex + 1}</span>
			</div>
			<p>
				<Text textKey={title} />
			</p>
		</div>
	);
};

export default Step;
