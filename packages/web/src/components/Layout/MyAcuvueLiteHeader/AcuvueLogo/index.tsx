import { FC } from "react";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import AcuvueBrandIcon from "../../../../images/acuvue-brand-icon.svg";
import "./index.scss";

const AcuvueLogo: FC<{}> = (props) => {
	const { canvasHomePageUrl } = useConfiguration();

	return (
		<a href={canvasHomePageUrl} className="acuvue-logo" {...props}>
			<img src={AcuvueBrandIcon} alt="acuvue logo" />
		</a>
	);
};

export default AcuvueLogo;
