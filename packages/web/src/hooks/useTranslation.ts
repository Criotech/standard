import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

export function useTranslation() {
	const { ...rest } = useContext(LanguageContext);
	return {
		...rest,
		t: rest.translate,
	};
}
