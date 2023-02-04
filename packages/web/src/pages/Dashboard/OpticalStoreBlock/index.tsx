import { FC, useCallback, useMemo, useState } from "react";
import LoadingBlock from "../../../components/LoadingBlock";
import RegisteredStoreView from "./RegisteredStoreView";
import RegisterStoreView from "./RegisterStoreView";
import "./index.scss";
import { useStore } from "../../../hooks/useStore";
import { HttpStatus, IStore } from "@myacuvue_thailand_web/services";
import RegisterStoreConfirmationDialog from "./RegisterStoreView/RegisterStoreConfirmationDialog";
import RegisterStoreSuccessDialog from "./RegisterStoreView/RegisterStoreSuccessDialog";
import ChangeOpticalStoreDialog from "./RegisterStoreView/ChangeOpticalStoreDialog";
import {
	OpticalStoreProvider,
	useOpticalStoreContext,
} from "./OpticalStoreProvider";
import axios from "axios";

const { isAxiosError } = axios;

interface IProps {
	userOpticalStore: IStore | null | undefined;
	refreshUserOpticalStore: () => void;
	isUserStoreLoading: boolean;
}

const OpticalStoreBlockInternal: FC<IProps> = ({
	userOpticalStore,
	refreshUserOpticalStore,
	isUserStoreLoading,
}) => {
	const {
		opticalStores,
		isStoresLoading,
		onChangeStoreClick,
		shouldForceDisplayRegisterView,
		isChangeStoreDialogOpen,
		setChangeStoreDialogOpen,
		setShouldForceDisplayRegisterView,
		onGoToHome,
		selectedStore,
		isRegisterConfirmationDialogOpen,
		setRegisterConfirmationDialogOpen,
	} = useOpticalStoreContext();

	const [isConfirmationDialogOpen, setConfirmationDialogOpen] =
		useState(false);

	const { registerStore } = useStore();

	const registerStoreOnConfirmation = useCallback(async () => {
		if (selectedStore?.storeId) {
			setRegisterConfirmationDialogOpen(false);
			try {
				await registerStore({
					storeId: selectedStore.storeId,
				});
				refreshUserOpticalStore();
				setConfirmationDialogOpen(true);
				setShouldForceDisplayRegisterView(false);
			} catch (error) {
				if (
					isAxiosError(error) &&
					error.response?.status === HttpStatus.CONFLICT
				) {
					setChangeStoreDialogOpen(true);
				}
			}
		}
	}, [
		refreshUserOpticalStore,
		registerStore,
		selectedStore?.storeId,
		setChangeStoreDialogOpen,
		setRegisterConfirmationDialogOpen,
		setShouldForceDisplayRegisterView,
	]);

	const isLoading = useMemo(() => {
		return isUserStoreLoading || isStoresLoading;
	}, [isUserStoreLoading, isStoresLoading]);

	return (
		<div className="optical-store-block">
			{isLoading && <LoadingBlock />}

			{!isLoading &&
				(userOpticalStore && !shouldForceDisplayRegisterView ? (
					<RegisteredStoreView
						telephone={userOpticalStore.phone}
						storeName={userOpticalStore.name}
						storeAddress={userOpticalStore.address}
						onChangeStoreClick={onChangeStoreClick}
						onGoToHome={onGoToHome}
					/>
				) : (
					opticalStores && <RegisterStoreView />
				))}

			{selectedStore && (
				<RegisterStoreConfirmationDialog
					onClose={() => setRegisterConfirmationDialogOpen(false)}
					onCancel={() => setRegisterConfirmationDialogOpen(false)}
					isOpen={isRegisterConfirmationDialogOpen}
					onConfirm={registerStoreOnConfirmation}
					address={selectedStore.storeAddress}
					storeName={selectedStore.storeName}
				/>
			)}

			<RegisterStoreSuccessDialog
				isOpen={isConfirmationDialogOpen}
				onClose={() => setConfirmationDialogOpen(false)}
			/>

			<ChangeOpticalStoreDialog
				isOpen={isChangeStoreDialogOpen}
				onClose={() => setChangeStoreDialogOpen(false)}
			/>
		</div>
	);
};

const OpticalStoreBlock: FC<IProps> = ({
	userOpticalStore,
	refreshUserOpticalStore,
	isUserStoreLoading,
}) => {
	return (
		<OpticalStoreProvider>
			<OpticalStoreBlockInternal
				userOpticalStore={userOpticalStore}
				isUserStoreLoading={isUserStoreLoading}
				refreshUserOpticalStore={refreshUserOpticalStore}
			/>
		</OpticalStoreProvider>
	);
};

export default OpticalStoreBlock;
