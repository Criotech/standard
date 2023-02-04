import { FC } from "react";
import AddressForm from "../AddressForm";
import Text from "../../../components/Text";
import "./index.scss";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";
import Header from "../../../components/Layout/Header";

const NewAddress: FC<{}> = () => {
	return (
		<div className="new-address">
			<Header titleKey="addressPage.addNewAddress" />
			<main>
				<h2>
					<Text textKey="addressPage.addNewAddress" />
				</h2>
				<AddressForm />
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default NewAddress;
