import { FC } from "react";
import "./index.scss";
import Text from "../Text";
import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";

interface IProps {
	totalSeconds: number;
	hasExpiredMessageKey: TranslationKey;
	expiringInMessageKey: TranslationKey;
	className?: string;
}

const formatDigit = (number: number) => `0${number}`.slice(-2);

const getRemainingTime = (seconds: number) => {
	const remainingMinutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds - remainingMinutes * 60;
	return {
		remainingMinutes: formatDigit(remainingMinutes),
		remainingSeconds: formatDigit(remainingSeconds),
	};
};

const OtpTimerCountdown: FC<IProps> = ({
	totalSeconds,
	expiringInMessageKey,
	hasExpiredMessageKey,
	className,
}) => {
	const classNames = ClassService.createClassName(
		"timer-container",
		className
	);

	return (
		<div className={classNames}>
			<span>
				{totalSeconds <= 0 ? (
					<Text textKey={hasExpiredMessageKey} />
				) : (
					<Text
						textKey={expiringInMessageKey}
						data={getRemainingTime(totalSeconds)}
					/>
				)}
			</span>
		</div>
	);
};

export default OtpTimerCountdown;
