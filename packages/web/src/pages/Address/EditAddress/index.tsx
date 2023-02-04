import { FC } from "react";
import AddressForm from "../AddressForm";
import Text from "../../../components/Text";
import "./index.scss";
import { IUserAddress } from "@myacuvue_thailand_web/services";
import { useAsync } from "react-use";
import { useAddress } from "../../../hooks/useAddress";
import LoadingBlock from "../../../components/LoadingBlock";
import Header from "../../../components/Layout/Header";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";

const EditAddress: FC<{}> = () => {
	const { getShippingAddress } = useAddress();

	const { value, loading } = useAsync(
		() => getShippingAddress(),
		[getShippingAddress]
	);
	const defaultAddress = value as IUserAddress;

	return (
		<div className="edit-address">
			<Header titleKey="addressPage.editAddress" />
			<main>
				<h2>
					<Text textKey="addressPage.editAddress" />
				</h2>
				{loading ? (
					<LoadingBlock />
				) : (
					<AddressForm defaultAddressValue={defaultAddress} />
				)}
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default EditAddress;
