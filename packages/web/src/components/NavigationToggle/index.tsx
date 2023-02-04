import { FC } from "react";
import { useNavigate, useLocation } from "react-router-dom-v5-compat";
import Toggle from "../Toggle";
import "./index.scss";
import { useService } from "../../hooks/useService";
import type { ReactNode } from "react";

interface NavigationItem {
	label: ReactNode;
	path: string;
}

interface IProps {
	navItems: NavigationItem[];
	className?: string;
}

const NavigationToggle: FC<IProps> = ({ navItems, className }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { ClassService } = useService();

	const toggleValue =
		navItems.find((item) => location.pathname.startsWith(item.path))
			?.path ?? navItems[0].path;

	const classNames = ClassService.createClassName(
		"navigation-toggle",
		className
	);

	return (
		<Toggle
			items={navItems.map((item) => ({
				label: item.label,
				value: item.path,
			}))}
			value={toggleValue}
			onChange={(tappedValue) => {
				navigate(tappedValue);
			}}
			className={classNames}
		/>
	);
};

export default NavigationToggle;
