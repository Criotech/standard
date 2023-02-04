import {
	IFeatureSwitch,
	demographicType,
	configType,
} from "@myacuvue_thailand_web/services";
import { useService } from "./useService";
import { useState } from "react";
import { useShallowCompareEffect } from "react-use";

export const useFeatureSwitch = <J extends keyof IFeatureSwitch>(
	featureName: J,
	demographics: Partial<demographicType<J>> = {}
): [value: configType<J> | undefined, isReady: boolean] => {
	const { FeatureSwitchService } = useService();

	const [value, setValue] = useState<configType<J> | undefined>(undefined);
	const [isReady, setIsReady] = useState<boolean>(false);

	useShallowCompareEffect(() => {
		let isMounted = true;
		(async () => {
			setIsReady(false);
			try {
				const featureSwitchValue =
					await FeatureSwitchService.getFeatureSwitch(
						featureName,
						demographics
					);
				if (isMounted) {
					setValue(featureSwitchValue);
				}
			} finally {
				if (isMounted) {
					setIsReady(true);
				}
			}
		})();
		return () => {
			isMounted = false;
		};
	}, [featureName, demographics]);

	return [value, isReady];
};
