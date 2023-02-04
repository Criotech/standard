import { FC, useState } from "react";
import DesktopSearchInput from "../SearchBar/DesktopSearchInput";
import { Form } from "antd";
import { useConfiguration } from "../../../../hooks/useConfiguration";

const WideSearchForm: FC<{}> = () => {
	const { searchPrefixUrl } = useConfiguration();
	const [searchString, setSearchString] = useState("");

	const handleSubmit = () => {
		if (searchString) {
			window.open(`${searchPrefixUrl}${searchString}`, "_blank");
		}
	};

	return (
		<Form name="search-form" layout="vertical" onFinish={handleSubmit}>
			<DesktopSearchInput
				name="search"
				value={searchString}
				onChange={(newValue: string) => {
					setSearchString(newValue);
				}}
				placeholder="myacuvueLiteHeader.search.placeholder"
				onSubmit={handleSubmit}
			/>
		</Form>
	);
};

export default WideSearchForm;
