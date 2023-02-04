import { FC } from "react";
import Title from "../../components/Title";
import BlockTitle from "../Dashboard/BlockTitle";

const EditAddressTitleAndBlockTitle: FC<{}> = () => {
	return (
		<>
			<div className="edit-address-title">
				<Title
					textKey="editAddressPage.title"
					subKey="editAddressPage.subTitle"
				/>
			</div>

			<div className="address-form-title">
				<BlockTitle textKey="editAddressPage.formTitle" />
			</div>
		</>
	);
};

export default EditAddressTitleAndBlockTitle;
