import {
	TranslationKey,
	TranslationType,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { message as antMessage } from "antd";
import { useTranslation } from "../useTranslation";
import "./index.scss";
import { useCallback } from "react";

export enum Status {
	SUCCESS = "success",
	WARN = "warn",
}

type SnackbarPosition = "top" | "bottom";

interface IUseSnackbar {
	showSnackbar: (
		status: Status,
		translationKey: TranslationKey,
		translationData?: TranslationData,
		durationInSeconds?: number,
		position?: SnackbarPosition,
		type?: TranslationType
	) => void;
}

export const useSnackbar = (): IUseSnackbar => {
	const { t } = useTranslation();

	const showSnackbar = useCallback(
		async (
			status: Status,
			translationKey: TranslationKey,
			translationData?: TranslationData,
			durationInSeconds?: number,
			position: SnackbarPosition = "bottom",
			type = TranslationType.default
		) => {
			const message = await t(translationKey, type, translationData);
			antMessage[status]({
				content: <>{message}</>,
				className: `snackbar-${status}`,
				style: {
					marginTop: position === "bottom" ? "85vh" : "10vh",
				},
				duration: durationInSeconds,
			});
		},
		[t]
	);

	return { showSnackbar };
};
