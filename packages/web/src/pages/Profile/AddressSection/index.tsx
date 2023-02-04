import { FC, useMemo } from "react";
import { useAsync } from "react-use";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import Text from "../../../components/Text";
import { useAddress } from "../../../hooks/useAddress";
import { useHistory } from "react-router-dom";
import BlockTitle from "../../Dashboard/BlockTitle";
import "./index.scss";

const AddressSection: FC<{}> = () => {
	const history = useHistory();
	const { getMailingAddress } = useAddress();

	const { value: mailingAddress, loading: isMailingAddressLoading } =
		useAsync(() => getMailingAddress(), [getMailingAddress]);

	const mailingAddressString = useMemo(() => {
		if (!isMailingAddressLoading && mailingAddress) {
			const { line1, line2, line3, state, city, postCode } =
				mailingAddress;

			let address = Object.values({
				line1,
				line2,
				line3,
				state,
				city,
				postCode,
			}).filter((item) => item);

			return address.join(", ");
		}
		return "";
	}, [isMailingAddressLoading, mailingAddress]);

	return (
		<div className="address-section">
			<BlockTitle
				className="address-section-title"
				textKey="profilePage.addressSection.title"
			/>
			{!isMailingAddressLoading && mailingAddress && (
				<div className="address-section-content">
					<label className="text-label">
						<Text textKey="profilePage.addressSection.label" />:
					</label>
					<div className="text">
						<p>{mailingAddressString}</p>
					</div>
				</div>
			)}

			<Button
				className="update-address-button"
				type={ButtonType.OUTLINE}
				size={ButtonSize.MEDIUM}
				htmlType="button"
				onClick={() => history.push("/profile/address")}
			>
				<Text textKey="profilePage.addressSection.updateButton" />
			</Button>
		</div>
	);
};

export default AddressSection;
