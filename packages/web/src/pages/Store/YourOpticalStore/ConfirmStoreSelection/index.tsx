import { IStore } from "@myacuvue_thailand_web/services";
import { FC, useState, useCallback } from "react";
import Button, { ButtonType } from "../../../../components/Button";
import StoreCell from "../../../../components/StoreCell";
import Text from "../../../../components/Text";
import { useStore } from "../../../../hooks/useStore";
import { useNavigate, useLocation } from "react-router-dom-v5-compat";
import "./index.scss";
import RegisterStoreSuccessModal from "./RegisterStoreSuccessModal";
import GlobalNavigationPanel from "../../../../components/GlobalNavigationPanel";
import Header from "../../../../components/Layout/Header";
import ShoppingBagIcon from "../../../../icons/ShoppingBagIcon";
import ThinDivider from "../../../../components/ThinDivider";

interface LocationProps {
	state: {
		store: IStore;
	};
}

const ConfirmStoreSelection: FC = () => {
	const navigate = useNavigate();
	const location: LocationProps = useLocation();
	const { store } = location.state;
	const [open, setOpen] = useState(false);
	const { registerStore } = useStore();

	const handleRegisterStore = async () => {
		await registerStore({ storeId: store.id });
		setOpen(true);
	};

	const closeRegisterStoreSuccessModal = useCallback(() => {
		setOpen(false);
		navigate("/store/your-optical-store");
	}, [navigate, setOpen]);

	return (
		<div className="confirm-store-selection">
			<Header
				titleKey="homePage.opticalStore.selectedOpticalStore"
				icon={<ShoppingBagIcon color="#003087" />}
			/>
			<main>
				<div className="store-details">
					<h1>
						<Text textKey="storePage.yourOpticalStore.confirmStore.header" />
						:
					</h1>
					<StoreCell store={store} />
				</div>

				<ThinDivider />

				<div className="store-confirmation-message">
					<p>
						<Text textKey="storePage.yourOpticalStore.confirmStore.cannotBeChanged" />
					</p>
					<p>
						<Text textKey="storePage.yourOpticalStore.confirmStore.wouldYouLikeQuestion" />
					</p>
				</div>

				<div className="action-buttons-container">
					<Button onClick={handleRegisterStore}>
						<Text textKey="storePage.yourOpticalStore.confirmStore.registerStore" />
					</Button>
					<Button
						type={ButtonType.OUTLINE}
						onClick={() => navigate(-1)}
					>
						<Text textKey="storePage.yourOpticalStore.confirmStore.goBack" />
					</Button>
				</div>

				<RegisterStoreSuccessModal
					isOpen={open}
					closeModal={() => closeRegisterStoreSuccessModal()}
					store={store}
					onOk={() => navigate("/store/your-optical-store")}
				/>
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default ConfirmStoreSelection;
