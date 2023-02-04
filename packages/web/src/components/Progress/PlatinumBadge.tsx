import platinumBadge from "../../images/platinum-badge.png";
import Text from "../Text";

export const PlatinumBadge = () => {
	return (
		<>
			<img className="platinum-badge" src={platinumBadge} alt="" />
			<figcaption>
				<Text textKey="component.platinumBadge.label" />
			</figcaption>
		</>
	);
};
