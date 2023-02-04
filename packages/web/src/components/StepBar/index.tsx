import { FC } from "react";
import "./index.scss";
import { Steps } from "antd";
import Step from "../Step";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";

interface IProps {
	currentIndex: number;
	steps: TranslationKey[];
	className?: string;
}

const StepBar: FC<IProps> = ({ currentIndex, steps, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-step-bar",
		className
	);

	return (
		<Steps
			current={currentIndex}
			labelPlacement="vertical"
			className={classNames}
		>
			{steps.map((step, stepIndex) => (
				<Step
					isFinished={stepIndex < currentIndex}
					key={stepIndex}
					isActive={stepIndex === currentIndex}
					stepIndex={stepIndex}
					isLastStep={stepIndex === steps.length - 1}
					title={step}
				/>
			))}
		</Steps>
	);
};

export default StepBar;
