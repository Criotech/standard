import { FC } from "react";
import "./index.scss";
import Text from "../../../Text";
import { useConfiguration } from "../../../../hooks/useConfiguration";

const TopHeader: FC<{}> = () => {
	const { topHeaderLinks } = useConfiguration();

	if (topHeaderLinks.length === 0) {
		return null;
	}
	return (
		<div className="acuvue-top-header">
			<div className="top-header-content">
				{topHeaderLinks.map(({ url, label }, index) => (
					<a href={url} key={index} className="top-header-link">
						<Text textKey={label} />
					</a>
				))}
			</div>
		</div>
	);
};
export default TopHeader;
