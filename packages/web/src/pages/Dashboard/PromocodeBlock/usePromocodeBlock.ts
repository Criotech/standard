import {
	ErrorTranslations,
	GlobalError,
	IPromocode,
} from "@myacuvue_thailand_web/services";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";

interface IUsePromocodeBlock {
	promo: IPromocode | undefined;
	isLoading: boolean;
	generatePromo: () => void;
	errorMessage: ErrorTranslations | undefined;
}

export const usePromocodeBlock = (): IUsePromocodeBlock => {
	const [errorMessage, setErrorMessage] = useState<ErrorTranslations>();
	const [promo, setPromo] = useState<IPromocode | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(false);

	const { getPromocode, generatePromocode } = useUser();

	const generatePromo = useCallback(async () => {
		setIsLoading(true);
		try {
			const promo = await generatePromocode();
			if (promo) {
				setPromo(promo);
			}
		} catch (error) {
			if (error && error instanceof GlobalError) {
				setErrorMessage(error.globalErrorData);
			}
		} finally {
			setIsLoading(false);
		}
	}, [generatePromocode]);

	const fetchPromocode = useCallback(async () => {
		setIsLoading(true);
		try {
			const promo = await getPromocode();
			if (promo) {
				setPromo(promo);
			}
		} catch (error) {
			await generatePromo();
		} finally {
			setIsLoading(false);
		}
	}, [generatePromo, getPromocode]);

	useEffect(() => {
		fetchPromocode();
	}, [fetchPromocode]);

	return {
		isLoading,
		promo,
		generatePromo,
		errorMessage,
	};
};
