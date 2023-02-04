import { ComponentProps, FC } from "react";
import HamburgerIcon from "../../icons/HamburgerIcon";
import CloseIcon from "../../icons/CloseIcon";
import UnstyledButton from "../UnstyledButton";

interface IProps
	extends Omit<ComponentProps<typeof UnstyledButton>, "children"> {
	isToggled?: boolean;
}

const HamburgerToggle: FC<IProps> = ({ isToggled = false, ...buttonProps }) => {
	const buttonContent = isToggled ? <CloseIcon /> : <HamburgerIcon />;

	return <UnstyledButton {...buttonProps}>{buttonContent}</UnstyledButton>;
};

export default HamburgerToggle;
