import { FC, Fragment, useState, useCallback } from "react";
import { IStore, ProfileCompleteness } from "@myacuvue_thailand_web/services";
import "./index.scss";
import StoreCell from "../../../../components/StoreCell";
import { useUserProfile } from "../../../../contexts/UserProfileContext";
import { useHistory } from "react-router-dom";
import RegistrationInviteModal from "./RegistrationInviteModal";
import ThinDivider from "../../../../components/ThinDivider";

interface IProps {
	stores: IStore[];
	activeStoreId?: string;
}

const StoreList: FC<IProps> = ({ stores, activeStoreId }) => {
	const history = useHistory();
	const { profileCompleteness } = useUserProfile();
	const [isErrorModalOpen, setErrorModalOpen] = useState(false);
	const storeCellClickHandler = useCallback(
		(store: IStore) => {
			if (profileCompleteness !== ProfileCompleteness.COMPLETE) {
				setErrorModalOpen(true);
			} else {
				history.push({
					pathname: "/store/your-optical-store/register-confirmation",
					state: {
						store,
					},
				});
			}
		},
		[history, profileCompleteness]
	);

	return (
		<div className="store-list">
			{stores.map((store) => {
				const activeClass =
					activeStoreId === store.id ? "active" : undefined;
				return (
					<Fragment key={store.id}>
						<div
							id={store.id}
							className={`${activeClass} store-cell-wrapper`}
							onClick={(event) => {
								event.preventDefault();
								storeCellClickHandler(store);
							}}
						>
							<StoreCell store={store} />
						</div>
						<ThinDivider />
					</Fragment>
				);
			})}

			<RegistrationInviteModal
				isOpen={isErrorModalOpen}
				setOpen={setErrorModalOpen}
			/>
		</div>
	);
};

export default StoreList;
