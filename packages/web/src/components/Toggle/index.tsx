import { FC } from "react";
import { Tabs } from "antd";
import "./index.scss";
import { useService } from "../../hooks/useService";
import type { ReactNode } from "react";

type ToggleItem = {
	label: ReactNode;
	value: string;
};

export type Props = {
	value?: string;
	onChange?: (activeKey: string) => void;
	items?: ToggleItem[];
	className?: string;
};

const Toggle: FC<Props> = ({ items = [], onChange, value, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("acuvue-toggle", className);

	return (
		<Tabs activeKey={value} onChange={onChange} className={classNames}>
			{items.map((item) => (
				<Tabs.TabPane
					key={item.value}
					tab={item.label}
					tabKey={item.value}
				/>
			))}
		</Tabs>
	);
};

export default Toggle;
