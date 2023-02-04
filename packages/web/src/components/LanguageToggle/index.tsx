import { FC, useMemo } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import Toggle from "../../components/Toggle";
import { Language } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";

interface IProps {
	className?: string;
}

const LanguageToggle: FC<IProps> = ({ className }) => {
	const { language, setLanguage, languages, languageNames } =
		useTranslation();

	const toggleValues = useMemo(
		() =>
			languages.map((_language) => ({
				label: languageNames[_language],
				value: _language,
			})),
		[languages, languageNames]
	);

	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-language-toggle",
		className
	);

	return (
		<Toggle
			className={classNames}
			value={language}
			onChange={(language) => setLanguage(language as Language)}
			items={toggleValues}
		/>
	);
};

export default LanguageToggle;
