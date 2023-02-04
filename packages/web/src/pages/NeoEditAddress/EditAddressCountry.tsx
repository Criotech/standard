import { FC } from "react";
import Text from "../../components/Text";

const EditAddressCountry: FC<{}> = () => {
	return (
		<div className="address-detail-item">
			<label className="text-label">
				<Text textKey="editAddressPage.country" />:
			</label>
			<span className="text">
				<Text textKey="editAddressPage.countryName" />
			</span>
		</div>
	);
};

export default EditAddressCountry;
