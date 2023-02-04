import { FC, lazy, ReactNode, Suspense } from "react";
import { useConfiguration } from "../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useWideScreen } from "../../hooks/useWideScreen";
import "./index.scss";

const EnglishFontFamilies = lazy(() => import("./EnglishFontFamilies"));
const ChineseFontFamilies = lazy(() => import("./ChineseFontFamilies"));

interface IProps {
	children?: ReactNode;
}

const StyleProvider: FC<IProps> = ({ children }) => {
	const { isWideScreen } = useWideScreen();
	const wideScreenClass = isWideScreen ? "wide-screen" : "";

	const { fontFamilySet } = useConfiguration();

	const fontFamiliesByStyle: Record<ConfigService.FontFamilySet, FC> = {
		[ConfigService.FontFamilySet.English]: EnglishFontFamilies,
		[ConfigService.FontFamilySet.Chinese]: ChineseFontFamilies,
	};

	const FontFamilies = fontFamiliesByStyle[fontFamilySet];

	return (
		<div className={wideScreenClass}>
			<Suspense fallback={<></>}>
				<FontFamilies />
			</Suspense>
			{children}
		</div>
	);
};

export default StyleProvider;
