import { FC } from "react";
import { Form, Input } from "antd";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useText } from "../../../../../hooks/useText";
import "./index.scss";
import { useService } from "../../../../../hooks/useService";

interface IProps {
	name: string;
	value: string;
	placeholder: TranslationKey;
	className?: string;
	onChange: (value: string) => void;
}

const SearchInput: FC<IProps> = ({
	placeholder,
	name,
	onChange,
	value,
	className,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-search-input",
		className
	);

	return (
		<Form.Item className={classNames}>
			<Input
				name={name}
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				placeholder={useText(placeholder)}
				maxLength={128}
			/>
		</Form.Item>
	);
};

export default SearchInput;
