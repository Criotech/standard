import { FC } from "react";
import Tab from "../Tab";
import { useNavigate, useLocation } from "react-router-dom-v5-compat";
import { TranslationKey } from "@myacuvue_thailand_web/services";

interface NavigationItem {
	labelKey: TranslationKey;
	path: string;
}

interface IProps {
	navItems: NavigationItem[];
}

const NavigationTabs: FC<IProps> = ({ navItems }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const tabsValue =
		navItems.find((item) => location.pathname.startsWith(item.path))
			?.path ?? navItems[0].path;

	return (
		<Tab
			items={navItems.map((item) => ({
				labelKey: item.labelKey,
				value: item.path,
				disabled: false,
			}))}
			value={tabsValue}
			onChange={(tappedValue) => {
				navigate(tappedValue);
			}}
		/>
	);
};

export default NavigationTabs;
