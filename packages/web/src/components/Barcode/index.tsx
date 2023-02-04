import { FC } from "react";
import { useAsync } from "react-use";
import "./index.scss";

interface IProps {
	value: string;
}

const Barcode: FC<IProps> = ({ value }) => {
	useAsync(async () => {
		const { default: JsBarcode } = await import("jsbarcode");
		JsBarcode("#barcode", value, { displayValue: false });
	}, [value]);
	return <svg id="barcode" className="barcode" />;
};

export default Barcode;
