import { IUserAddress, TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import GenericInput from "../../components/GenericInput";

type IFormData = Pick<IUserAddress, "line1" | "line2">;

interface IProps {
	formData: IFormData;
	onChange: (name: string, value: string) => void;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
}

const EditAddressLine1AndLine2: FC<IProps> = ({
	formData,
	onChange,
	errorKeys,
	serverErrorKeys,
}) => {
	return (
		<>
			<div className="input-wrapper">
				<GenericInput
					alwaysVisibleErrorKey={serverErrorKeys.line1}
					errorKey={errorKeys.line1}
					type="text"
					name="line1"
					value={formData.line1}
					onChange={(newValue) => onChange("line1", newValue)}
					maxLength={35}
					placeholder="editAddressPage.addressLine1"
					label="editAddressPage.addressLine1Label"
				/>
			</div>

			<div className="input-wrapper">
				<GenericInput
					alwaysVisibleErrorKey={serverErrorKeys.line2}
					errorKey={errorKeys.line2}
					type="text"
					name="line2"
					value={formData.line2}
					onChange={(newValue) => onChange("line2", newValue)}
					maxLength={35}
					placeholder="editAddressPage.addressLine2"
					label="editAddressPage.addressLine2Label"
				/>
			</div>
		</>
	);
};

export default EditAddressLine1AndLine2;
