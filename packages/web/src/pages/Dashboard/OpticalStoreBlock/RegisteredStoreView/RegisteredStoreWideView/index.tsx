import { FC } from "react";
import { IIconWithLink } from "../index";
import BlockTitle from "../../../BlockTitle";
import AddressSection from "../../AddressSection";
import ChangeStoreButton from "../ChangeStoreButton";
import ContactSection from "../../ContactSection";
import IconWithLink from "../IconWithLink";
import StoreName from "../../StoreName";
import Button, {
	ButtonType,
	ButtonSize,
} from "../../../../../components/Button";
import Text from "../../../../../components/Text";
import "./index.scss";
import { useConfiguration } from "../../../../../hooks/useConfiguration";

interface IProps {
	iconsWithLinks: IIconWithLink[];
	storeName: string;
	storeAddress: string;
	telephone: string;
	onChangeStoreClick: () => void;
	onGoToHome: () => void;
}

const RegisteredStoreWideView: FC<IProps> = ({
	storeName,
	storeAddress,
	iconsWithLinks,
	telephone,
	onChangeStoreClick,
	onGoToHome,
}) => {
	const { isChangeStoreAllowed, hasGoToHomeInRegisteredStore } =
		useConfiguration();

	return (
		<>
			<div className="registered-store-wide-view">
				<div className="optical-store">
					<div className="header">
						<BlockTitle
							className="title"
							textKey="dashboardPage.opticalStore.registeredView.title"
						/>

						{isChangeStoreAllowed && (
							<ChangeStoreButton onClick={onChangeStoreClick} />
						)}
					</div>

					<StoreName className="store-name" name={storeName} />
					<div className="address-and-contact">
						<AddressSection
							className="address-section"
							address={storeAddress}
						/>
						<ContactSection
							telephone={telephone}
							className="contact-section"
						/>
					</div>
				</div>

				{iconsWithLinks && iconsWithLinks.length > 0 && (
					<>
						<div className="vertical-separator" />
						<div className="icons-list-wrapper">
							<div className="icons-list">
								{iconsWithLinks.map((data) => (
									<IconWithLink
										className="icon"
										key={data.link + data.textKey}
										textKey={data.textKey}
										icon={data.icon}
										link={data.link}
									/>
								))}
							</div>
						</div>
					</>
				)}
			</div>
			{hasGoToHomeInRegisteredStore && (
				<div className="optical-store-goback-button-wrapper">
					<Button
						className="optical-store-goback-button"
						onClick={onGoToHome}
						type={ButtonType.PRIMARY}
						size={ButtonSize.MEDIUM}
					>
						<Text textKey="storePage.yourOpticalStore.backToHome" />
					</Button>
				</div>
			)}
		</>
	);
};

export default RegisteredStoreWideView;
