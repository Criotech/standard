import { ComponentProps, FC } from "react";
import { useService } from "../../hooks/useService";
import "./RatingInputStar.scss";

export type RatingInputStarState = "unselected" | "highlighted" | "disabled";

interface IRatingInputStarProps {
	state: RatingInputStarState;
	onClick?: ComponentProps<"div">["onClick"];
	onMouseOver?: ComponentProps<"div">["onMouseOver"];
}

const RatingInputStar: FC<IRatingInputStarProps> = ({
	state,
	onClick,
	onMouseOver,
}) => {
	const { ClassService } = useService();

	const classByState: Record<RatingInputStarState, string> = {
		highlighted: "highlighted",
		disabled: "disabled",
		unselected: "",
	};

	const starClassname = ClassService.createClassName(
		"acuvue-rating-input-star",
		classByState[state]
	);

	return (
		<div
			className={starClassname}
			onClick={onClick}
			onMouseOver={onMouseOver}
		>
			★
		</div>
	);
};

export default RatingInputStar;
