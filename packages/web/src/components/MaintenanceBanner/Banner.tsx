import { FC } from "react";
import { useText } from "../../hooks/useText";
import DisplayHTML from "../DisplayHTML";
import "./index.scss";
import AcuvueBrandIconWhite from "../../images/acuvue-brand-icon-white.svg";
import Text from "../Text";

const Banner: FC<{}> = () => {
	const maintenanceText = useText("maintenanceBanner.appInMaintenance");
	return (
		<div className="acuvue-maintenance-banner">
			<img
				src={AcuvueBrandIconWhite}
				alt="acuvue logo"
				className="acuvue-logo"
			/>
			<div>
				<span className="alert-icon" />
			</div>
			<div>
				<DisplayHTML unsafeHTML={maintenanceText} />
			</div>
			<div className="maintenance-approval-text">
				<Text textKey="maintenanceBanner.appMaintenanceApproval" />
			</div>
		</div>
	);
};

export default Banner;
