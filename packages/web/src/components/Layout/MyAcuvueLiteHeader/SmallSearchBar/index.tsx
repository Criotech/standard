import { FC, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import SearchInput from "../SearchBar/SearchInput";
import { Form } from "antd";
import "./index.scss";
import { useConfiguration } from "../../../../hooks/useConfiguration";

const SmallSearchBar: FC<{}> = () => {
	const { searchPrefixUrl } = useConfiguration();
	const [searchString, setSearchString] = useState("");

	const handleSubmit = () => {
		if (searchString) {
			window.open(`${searchPrefixUrl}${searchString}`, "_blank");
		}
	};

	return (
		<Form
			name="search-form"
			layout="vertical"
			className={"small-search-bar"}
			onFinish={handleSubmit}
		>
			<div className="search-input-wrapper">
				<SearchOutlined
					className="search-icon"
					onClick={handleSubmit}
				/>
				<SearchInput
					name="search"
					value={searchString}
					onChange={(newValue: string) => {
						setSearchString(newValue);
					}}
					placeholder="myacuvueLiteHeader.search.placeholder"
				/>
			</div>
		</Form>
	);
};

export default SmallSearchBar;
