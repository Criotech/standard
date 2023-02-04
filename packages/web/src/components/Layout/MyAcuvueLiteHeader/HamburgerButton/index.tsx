import { FC } from "react";
import "./index.scss";
import { useService } from "../../../../hooks/useService";

interface IProps {
	isOpen: boolean;
	onClick: () => void;
}

const HamburgerButton: FC<IProps> = ({ isOpen, onClick }) => {
	const { ClassService } = useService();
	const menuIconClassNames = ClassService.createClassName(
		"hamburger-icon",
		isOpen ? "open" : ""
	);

	return (
		<div
			className="acuvue-hamburger-button"
			onClick={onClick}
			role="button"
		>
			<span className={menuIconClassNames} />
		</div>
	);
};

export default HamburgerButton;
