import { FC } from "react";
import { Tabs } from "antd";
import "./index.scss";
import DisplayHTML from "../DisplayHTML";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";
import Text from "../Text";

type TabItem = {
	labelKey: TranslationKey;
	value: string;
	data?: string;
	disabled: boolean;
};

interface IProps {
	value: string;
	onChange?: (activeKey: string) => void;
	items: TabItem[];
	className?: string;
}

const Tab: FC<IProps> = ({ items, onChange, value, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("acuvue-tab", className);

	return (
		<Tabs activeKey={value} onChange={onChange} className={classNames}>
			{items.map(({ value: tabItemValue, data, labelKey, disabled }) => (
				<Tabs.TabPane
					key={tabItemValue}
					tab={<Text textKey={labelKey} />}
					tabKey={tabItemValue}
					disabled={disabled}
				>
					{data && (
						<div className="tab-content">
							<DisplayHTML unsafeHTML={data} />
						</div>
					)}
				</Tabs.TabPane>
			))}
		</Tabs>
	);
};

export default Tab;
