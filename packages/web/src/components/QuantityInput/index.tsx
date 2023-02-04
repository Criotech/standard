import { FC, useMemo } from "react";
import "./index.scss";
import MinusButton from "../MinusButton";
import PlusButtonWithCircle from "../PlusButtonWithCircle";
import { ButtonSize } from "../Button";

export interface IProps {
	value: number;
	maxValue?: number;
	minValue?: number;
	increment: () => void;
	decrement: () => void;
	size?: ButtonSize;
}

const QuantityInput: FC<IProps> = ({
	value,
	maxValue,
	minValue,
	increment,
	decrement,
	size = ButtonSize.SMALL,
}) => {
	const classNames = [
		"quantity-input",
		size === ButtonSize.SMALL ? "small" : "medium",
	].join(" ");

	const isMinusEnabled = useMemo(
		() => minValue === undefined || value > minValue,
		[minValue, value]
	);

	const isPlusEnabled = useMemo(
		() => maxValue === undefined || value < maxValue,
		[maxValue, value]
	);

	return (
		<div className={classNames}>
			<MinusButton
				size={size}
				disabled={!isMinusEnabled}
				onClick={decrement}
			/>
			<span className="quantity-value">{value}</span>
			<PlusButtonWithCircle
				size={size}
				disabled={!isPlusEnabled}
				onClick={increment}
			/>
		</div>
	);
};

export default QuantityInput;
