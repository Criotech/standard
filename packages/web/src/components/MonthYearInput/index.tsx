import {
	Dispatch,
	FC,
	SetStateAction,
	useState,
	useEffect,
	useMemo,
} from "react";
import { Select as AntSelect } from "antd";
import { useText } from "../../hooks/useText";
import "./index.scss";
import { useDate } from "../../hooks/useDate";
import { useService } from "../../hooks/useService";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import ExclamationIcon, {
	ExclamationIconSize,
} from "../../icons/ExclamationIcon";
import Select from "../Select";

const { Option } = AntSelect;

interface IProps {
	minYear: number;
	maxYear: number;
	year?: number;
	month?: number;
	setYear: Dispatch<SetStateAction<number | undefined>>;
	setMonth: Dispatch<SetStateAction<number | undefined>>;
	errorKey?: TranslationKey;
	alwaysVisibleErrorKey?: TranslationKey;
	label: TranslationKey;
	disabled?: boolean;
	sendFormError?: (errorMessage: string) => void;
}

const InputError: FC<{ errorKey: TranslationKey }> = ({ errorKey }) => (
	<span className="dob-error">
		<ExclamationIcon size={ExclamationIconSize.SMALL} />{" "}
		<Text textKey={errorKey} />
	</span>
);

const MonthYearInput: FC<IProps> = ({
	minYear,
	maxYear,
	month,
	year,
	setMonth,
	setYear,
	errorKey,
	alwaysVisibleErrorKey,
	label,
	disabled,
	sendFormError,
}) => {
	const [isMonthTouched, setIsMonthTouched] = useState(false);
	const [isYearTouched, setIsYearTouched] = useState(false);
	const displayError = isMonthTouched && isYearTouched && errorKey;

	const { getMonthName } = useDate();
	const { UtilityService } = useService();

	const months = UtilityService.numbersFromRange(1, 12);
	const years = UtilityService.numbersFromRange(minYear, maxYear).reverse();

	const errorToDisplay = useMemo(
		() =>
			alwaysVisibleErrorKey ? (
				<InputError errorKey={alwaysVisibleErrorKey} />
			) : (
				displayError && errorKey && <InputError errorKey={errorKey} />
			),
		[alwaysVisibleErrorKey, displayError, errorKey]
	);

	useEffect(() => {
		if (sendFormError && errorToDisplay) {
			sendFormError(
				`${month}-${year}:${alwaysVisibleErrorKey || errorKey}`
			);
		}
	}, [
		alwaysVisibleErrorKey,
		errorKey,
		errorToDisplay,
		month,
		sendFormError,
		year,
	]);

	return (
		<div className="month-year-input">
			<p className="month-year-input-label">
				<Text textKey={label} />
			</p>
			<div className="month-year-select">
				<Select
					className="month-select"
					showSearch
					placeholder={useText("select.month")}
					optionFilterProp="children"
					value={month}
					onChange={(value) => setMonth(value as number)}
					onBlur={() => setIsMonthTouched(true)}
					disabled={disabled}
				>
					{months.map((monthNumber) => (
						<Option key={monthNumber} value={monthNumber}>
							{getMonthName(monthNumber - 1)}
						</Option>
					))}
				</Select>
				<Select
					className="year-select"
					showSearch
					placeholder={useText("select.year")}
					optionFilterProp="children"
					value={year}
					onChange={(value) => setYear(value as number)}
					onBlur={() => setIsYearTouched(true)}
					disabled={disabled}
				>
					{years.map((_year) => (
						<Option key={_year} value={_year}>
							{_year}
						</Option>
					))}
				</Select>
			</div>
			{errorToDisplay}
		</div>
	);
};

export default MonthYearInput;
