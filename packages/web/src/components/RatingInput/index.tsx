import { FC, useState } from "react";
import { useService } from "../../hooks/useService";
import "./index.scss";
import RatingInputStar, { RatingInputStarState } from "./RatingInputStar";

interface IProps {
	value?: number;
	onChange?: (newValue: number) => void;
	isDisabled?: boolean;
	className?: string;
}

const RatingInput: FC<IProps> = ({
	value,
	isDisabled,
	onChange,
	className,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-rating-input",
		className
	);
	const [mouseOverValue, setMouseOverValue] = useState<number | undefined>(
		undefined
	);

	return (
		<div
			className={classNames}
			onMouseLeave={() => {
				setMouseOverValue(undefined);
			}}
		>
			{[1, 2, 3, 4, 5].map((starNumber) => {
				let starState: RatingInputStarState;
				if (isDisabled) {
					starState = "disabled";
				} else if (mouseOverValue && mouseOverValue >= starNumber) {
					starState = "highlighted";
				} else if (!mouseOverValue && value && value >= starNumber) {
					starState = "highlighted";
				} else {
					starState = "unselected";
				}

				return (
					<RatingInputStar
						key={starNumber}
						state={starState}
						onClick={() => {
							if (!isDisabled) {
								onChange?.(starNumber);
							}
						}}
						onMouseOver={() => {
							if (!isDisabled) {
								setMouseOverValue(starNumber);
							}
						}}
					/>
				);
			})}
		</div>
	);
};

export default RatingInput;
