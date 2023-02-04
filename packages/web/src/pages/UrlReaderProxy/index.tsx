import { SanitizeHtmlService } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import { useEffectOnce } from "react-use";
import { useQuery } from "../../hooks/useQuery";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../hooks/useStorage";

export interface IQrQueryParams {
	type: string;
	ecp: string;
}

const UrlReaderProxy: FC<{}> = () => {
	const history = useHistory();
	const url = useQuery();
	const [, setQrQueryParams] = useStorage<IQrQueryParams>("qr-query-params");

	useEffectOnce(() => {
		(async () => {
			const base64String = url.get("data");
			const decodedString = atob(base64String!);
			const sanitized = await SanitizeHtmlService.sanitizeHtml(
				decodedString
			);
			setQrQueryParams(JSON.parse(sanitized));
			history.push("/");
		})();
	});

	return <></>;
};

export default UrlReaderProxy;
