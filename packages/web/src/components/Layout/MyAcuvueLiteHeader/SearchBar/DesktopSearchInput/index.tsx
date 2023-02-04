import { FC, useState } from "react";
import { useText } from "../../../../../hooks/useText";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Input } from "antd";
import "./index.scss";
import { SearchOutlined } from "@ant-design/icons";

interface IProps {
	name: string;
	onChange: (value: string) => void;
	value: string;
	placeholder: TranslationKey;
	onSubmit: () => void;
}

const DesktopSearchInput: FC<IProps> = ({
	placeholder,
	name,
	onChange,
	value,
	onSubmit,
}) => {
	const [isInputClicked, setInputClicked] = useState(false);
	const [inputMouseEventClasses, setInputMouseEventClasses] =
		useState("input-default");
	const [searchMouseEventClasses, setSearchMouseEventClasses] =
		useState("search-default");

	return (
		<div className="acuvue-desktop-search-input">
			<Input
				maxLength={128}
				name={name}
				className={inputMouseEventClasses}
				value={value}
				onChange={(event) => {
					onChange(event.target.value);
				}}
				placeholder={useText(placeholder)}
				onMouseOver={() => {
					setSearchMouseEventClasses("search-border");
				}}
				onMouseLeave={() => {
					if (!isInputClicked) {
						setInputMouseEventClasses("input-default");
						setSearchMouseEventClasses("search-default");
					}
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onSubmit();
					}
				}}
				onFocus={() => {
					setInputClicked(true);
					setInputMouseEventClasses("input-expand");
				}}
				onBlur={() => {
					setInputClicked(false);
					setInputMouseEventClasses("input-default");
					setSearchMouseEventClasses("search-default");
				}}
			/>
			<SearchOutlined
				className={searchMouseEventClasses}
				onMouseEnter={() => {
					setInputMouseEventClasses("input-expand");
					setSearchMouseEventClasses("search-color");
				}}
				onMouseOver={() => {
					if (isInputClicked) {
						setSearchMouseEventClasses("search-color");
					}
				}}
				onClick={() => {
					setInputMouseEventClasses("input-expand");
					onSubmit();
				}}
			/>
		</div>
	);
};

export default DesktopSearchInput;
