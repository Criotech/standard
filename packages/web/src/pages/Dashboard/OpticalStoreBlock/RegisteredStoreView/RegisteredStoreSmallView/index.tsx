import { FC } from "react";
import "./index.scss";
import { useService } from "../../../../../hooks/useService";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import AddressSection from "../../AddressSection";
import StoreName from "../../StoreName";
import ThinDivider from "../../../../../components/ThinDivider";
import IconWithLink from "../IconWithLink";
import { IIconWithLink } from "../index";
import BlockTitle from "../../../BlockTitle";
import ContactSection from "../../ContactSection";
import ChangeStoreButton from "../ChangeStoreButton";
import Button, {
	ButtonType,
	ButtonSize,
} from "../../../../../components/Button";
import Text from "../../../../../components/Text";

interface IProps {
	iconsWithLinks: IIconWithLink[];
	storeAddress: string;
	storeName: string;
	telephone: string;
	className?: string;
	onChangeStoreClick: () => void;
	onGoToHome: () => void;
}

const RegisteredStoreSmallView: FC<IProps> = ({
	iconsWithLinks,
	storeAddress,
	storeName,
	telephone,
	className,
	onChangeStoreClick,
	onGoToHome,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"registered-store-small-view",
		className
	);

	const { isChangeStoreAllowed, hasGoToHomeInRegisteredStore } =
		useConfiguration();

	return (
		<>
			<div className={classNames}>
				<div className="title">
					<BlockTitle
						className="title-heading"
						textKey="dashboardPage.opticalStore.yourOpticalStore"
					/>

					{isChangeStoreAllowed && (
						<ChangeStoreButton onClick={onChangeStoreClick} />
					)}
				</div>

				<ThinDivider />
				<StoreName name={storeName} className="store-name" />
				<AddressSection
					address={storeAddress}
					className="address-section"
				/>
				<ContactSection
					telephone={telephone}
					className="contact-section"
				/>
				{iconsWithLinks && iconsWithLinks.length > 0 && (
					<>
						<ThinDivider />
						<div className="icons-with-link-wrapper">
							{iconsWithLinks.map(
								(iconWithLink, iconWithLinkIndex) => (
									<IconWithLink
										className="icon-with-link"
										key={iconWithLinkIndex}
										icon={iconWithLink.icon}
										textKey={iconWithLink.textKey}
										link={iconWithLink.link}
									/>
								)
							)}
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

export default RegisteredStoreSmallView;
