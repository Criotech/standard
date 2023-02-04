import { FC, PropsWithChildren, useEffect, useMemo } from "react";

import moment from "moment";
import { useLoading } from "../../hooks/useLoading";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import Banner from "./Banner";

const MaintenanceBanner: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { showLoading, hideLoading } = useLoading();
	const [bannerStartAndEndDateTime, isReady] = useFeatureSwitch(
		"displayMaintenanceBanner"
	);

	const displayApplication = useMemo(() => {
		let shouldDisplayApp = true;

		if (isReady && bannerStartAndEndDateTime) {
			const isStartTimeValid = moment(
				bannerStartAndEndDateTime.startDateTimeISO
			).isValid();

			const isEndTimeValid = moment(
				bannerStartAndEndDateTime.startDateTimeISO
			).isValid();

			const currentDate = new Date();

			if (isStartTimeValid && isEndTimeValid) {
				const isCurrentTimeBetweenStartAndEndTime = moment(
					currentDate
				).isBetween(
					bannerStartAndEndDateTime.startDateTimeISO,
					bannerStartAndEndDateTime.endDateTimeISO
				);

				if (isCurrentTimeBetweenStartAndEndTime) {
					shouldDisplayApp = false;
				}
			}
		}
		return shouldDisplayApp;
	}, [bannerStartAndEndDateTime, isReady]);

	useEffect(() => {
		if (isReady) {
			hideLoading();
		} else {
			showLoading();
		}
	}, [isReady, hideLoading, showLoading]);

	if (!isReady) {
		return <></>;
	} else if (displayApplication) {
		return <>{children}</>;
	} else {
		return <Banner />;
	}
};

export default MaintenanceBanner;
