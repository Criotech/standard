import { FC, ReactNode } from "react";
import "./index.scss";

export interface IProps {
	image: string;
	title: string;
	description: ReactNode;
	bonus?: ReactNode;
	icons: ReactNode[];
	faded: boolean;
}

const HorizontalCoupon: FC<IProps> = ({
	image,
	title,
	description,
	bonus,
	icons,
	faded,
}) => (
	<div className={`horizontal-coupon ${faded ? "faded" : ""}`}>
		<img src={image} alt="coupon" className="horizontal-coupon-image" />
		<div className="horizontal-coupon-details">
			<div className="details-top">
				<h2>{title}</h2>
				<p className="description">{description}</p>
			</div>
			<div className="details-bottom">
				{bonus && <div className="details-bonus">{bonus}</div>}
				<div className="details-icons">
					{icons.map((icon, i) => (
						<div className="icon" key={i}>
							{icon}
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export default HorizontalCoupon;
