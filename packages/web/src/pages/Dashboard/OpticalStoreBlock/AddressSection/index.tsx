import { ClassService } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../components/Text";
import "./index.scss";

interface IProps {
	address: string;
	className?: string;
}

const AddressSection: FC<IProps> = ({ address, className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-address-section",
		className
	);

	return (
		<div className={classNames}>
			<p className="address-title typography-overline">
				<Text textKey="dashboardPage.opticalStore.address" />
			</p>
			<p className="address typography-body-2">{address}</p>
		</div>
	);
};

export default AddressSection;
