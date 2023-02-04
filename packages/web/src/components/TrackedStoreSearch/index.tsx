import { Form, FormProps } from "antd";
import { FC, useCallback } from "react";
import { useSearchStore } from "../../hooks/useTracking";
interface ITrackedStoreSearch extends FormProps<{}> {
	stateValue: string;
	zoneValue: string;
	findValue: string;
}

const TrackedStoreSearch: FC<ITrackedStoreSearch> = ({
	children,
	onChange,
	onFinish,
	stateValue,
	zoneValue,
	findValue,
	...formProps
}) => {
	const searchStore = useSearchStore({
		state_field: stateValue,
		suburb_field: zoneValue,
		find_field: findValue,
	});

	const handleFinish = useCallback(
		(values: {}) => {
			searchStore();
			onFinish && onFinish(values);
		},
		[onFinish, searchStore]
	);

	return (
		<Form {...formProps} onChange={onChange} onFinish={handleFinish}>
			{children}
		</Form>
	);
};

export default TrackedStoreSearch;
