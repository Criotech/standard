import { useCallback, useEffect, useState } from "react";
import { useService } from "./useService";
import { useUserProfile } from "../contexts/UserProfileContext";
import {
	FormType,
	SearchStoreType,
	SelectStoreType,
} from "@myacuvue_thailand_web/services";
import { useLocation } from "react-router-dom";
import { useDebounce } from "react-use";

export const usePageView = (pageName: string, pageCategory: string) => {
	const { pathname } = useLocation();
	const { TrackingService } = useService();
	const { userProfile } = useUserProfile();

	const sendPageView = useCallback(() => {
		TrackingService.pageView(
			{
				page_name: pageName,
				page_referrer: document.referrer,
				page_title: document.title,
				page_path: pathname || "",
				page_category: pageCategory,
				user_login_state: userProfile ? "signedIn" : "notSignedIn",
			},
			userProfile && userProfile.myAcuvueId
				? {
						user_id: userProfile.myAcuvueId,
						user_login_state: userProfile
							? "signedIn"
							: "notSignedId",
				  }
				: undefined
		);
	}, [TrackingService, pathname, userProfile, pageCategory, pageName]);

	useDebounce(() => sendPageView(), 2000, [sendPageView]);
};

export const useFormView = (name: FormType) => {
	const { TrackingService } = useService();

	const sendFormView = useCallback(() => {
		TrackingService.formView(name);
	}, [TrackingService, name]);

	useEffect(() => {
		sendFormView();
	}, [sendFormView]);
};

export const useFormStart = (name: FormType) => {
	const { TrackingService } = useService();
	const [eventSent, setEventSent] = useState(false);

	const sendFormStart = useCallback(() => {
		if (!eventSent) {
			setEventSent((current) => {
				if (!current) {
					TrackingService.formStart(name);
				}
				return true;
			});
		}
	}, [TrackingService, name, eventSent]);

	return sendFormStart;
};

export const useFormComplete = (name: FormType) => {
	const { TrackingService } = useService();
	const { userProfile } = useUserProfile();

	const sendFormComplete = useCallback(() => {
		TrackingService.formComplete(
			name,
			userProfile && userProfile.myAcuvueId
				? {
						user_id: userProfile.myAcuvueId,
						user_login_state: userProfile
							? "signedIn"
							: "notSignedId",
				  }
				: undefined
		);
	}, [TrackingService, name, userProfile]);

	return sendFormComplete;
};

export const useFormError = (name: FormType) => {
	const { TrackingService } = useService();

	const sendFormError = useCallback(
		(errorMessage: string) => {
			TrackingService.formError(name, errorMessage);
		},
		[TrackingService, name]
	);

	return sendFormError;
};

export const useSelectStore = () => {
	const { TrackingService } = useService();

	const sendStoreSelect = useCallback(
		({ store_name, store_address }: SelectStoreType) => {
			if (store_name || store_address) {
				TrackingService.storeSelect({
					store_name,
					store_address,
				});
			}
		},
		[TrackingService]
	);

	return sendStoreSelect;
};

export const useSearchStore = ({
	state_field,
	suburb_field,
	find_field,
}: SearchStoreType) => {
	const { TrackingService } = useService();
	const sendFormStart = useCallback(() => {
		if (state_field || suburb_field || find_field) {
			TrackingService.storeSearch({
				state_field,
				suburb_field,
				find_field,
			});
		}
	}, [TrackingService, find_field, state_field, suburb_field]);

	return sendFormStart;
};
