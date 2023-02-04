import { FC } from "react";
import "./index.scss";
import Text from "../Text";
import { useService } from "../../hooks/useService";

export interface IProps {
	value: string;
	className?: string;
}

const CouponPoints: FC<IProps> = ({ value, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("coupon-points", className);

	return (
		<p className={classNames}>
			{value}{" "}
			<span className="points-word">
				<Text textKey="couponDetails.points" />
			</span>
		</p>
	);
};

export default CouponPoints;
