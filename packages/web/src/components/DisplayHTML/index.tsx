import { FC, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";

interface IProps {
	unsafeHTML: string;
}

const DisplayHTML: FC<IProps> = ({ unsafeHTML }) => {
	const { SanitizeHtmlService } = useService();
	const [safeHTML, setSafeHTML] = useState<string>("");

	useEffect(() => {
		let isMounted = true;

		(async () => {
			const sanitizedHtml = await SanitizeHtmlService.sanitizeHtml(
				unsafeHTML
			);
			if (isMounted) {
				setSafeHTML(sanitizedHtml);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [SanitizeHtmlService, unsafeHTML]);

	// eslint-disable-next-line react/no-danger
	return <span dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};

export default DisplayHTML;
