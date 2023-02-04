import { ConfigService } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import { useConfiguration } from "../../hooks/useConfiguration";
import EditAddressWithNoAddressLine3 from "../EditAddressWithNoAddressLine3";
import EditAddressComplete from "../EditAddressComplete";
import EditAddressWithNoCityNoState from "../EditAddressWithNoCityNoState";

const { EditAddressPageType } = ConfigService;

const NeoEditAddress: FC<{}> = () => {
	const { editAddressPageType } = useConfiguration();

	const editPageByType: Record<ConfigService.EditAddressPageType, FC> = {
		[EditAddressPageType.WITH_NO_ADDRESS_LINE_3]:
			EditAddressWithNoAddressLine3,
		[EditAddressPageType.COMPLETE_ADDRESS]: EditAddressComplete,
		[EditAddressPageType.WITH_NO_CITY_NO_STATE]:
			EditAddressWithNoCityNoState,
	};

	const EditAddressPage = editPageByType[editAddressPageType];

	return <EditAddressPage />;
};

export default NeoEditAddress;
