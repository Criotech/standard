import { PropsWithChildren, useEffect, useState } from "react";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import {
	configType,
	demographicType,
	IFeatureSwitch,
} from "@myacuvue_thailand_web/services";
// @ts-ignore
import { shallowEqualObjects } from "shallow-equal";

interface IProps<J extends keyof IFeatureSwitch> {
	name: J;
	value: configType<J>;
	control?: boolean;
	demographics?: Partial<demographicType<J>>;
}

function FeatureSwitch<J extends keyof IFeatureSwitch>({
	children,
	name,
	value,
	control,
	demographics = {},
}: PropsWithChildren<IProps<J>>) {
	const [fsValue, isReady] = useFeatureSwitch(name, demographics);
	const [shouldDisplay, setShouldDisplay] = useState(false);
	useEffect(() => {
		if (isReady) {
			if (fsValue !== undefined) {
				setShouldDisplay(shallowEqualObjects(fsValue, value));
			} else if (control) {
				setShouldDisplay(true);
			}
		}
	}, [isReady, fsValue, value, control]);
	return shouldDisplay ? <>{children}</> : <></>;
}

export default FeatureSwitch;
