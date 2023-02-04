import { Select as AntSelect } from "antd";
import { RefSelectProps, SelectProps, SelectValue } from "antd/lib/select";
import { FC, Ref, useState } from "react";
import "./index.scss";
import { useService } from "../../hooks/useService";
import DropdownIcon from "../../icons/DropdownIcon";
import MagnifyingGlassIcon from "../../icons/MagnifyingGlassIcon";

export type Props = SelectProps<SelectValue> & {
	ref?: Ref<RefSelectProps> | undefined;
};

const Select: FC<Props> = ({ className, children, showSearch, ...props }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("acuvue-select", className);
	const [isDropdownOpen, setDropdown] = useState(false);

	let suffixIcon = (
		<span
			onClick={() => {
				setDropdown(!isDropdownOpen);
			}}
		>
			<DropdownIcon />
		</span>
	);

	if (showSearch && isDropdownOpen) {
		suffixIcon = <MagnifyingGlassIcon />;
	}

	return (
		<AntSelect
			{...props}
			className={classNames}
			suffixIcon={suffixIcon}
			open={isDropdownOpen}
			onDropdownVisibleChange={(isOpen) => setDropdown(isOpen)}
			showSearch={showSearch}
		>
			{children}
		</AntSelect>
	);
};

export default Select;
