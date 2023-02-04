import { FC, useMemo } from "react";
import { useMeasure } from "react-use";

interface IProps {
	classesByWidth: Record<number, string>;
}
const Size: FC<IProps> = ({ children, classesByWidth }) => {
	const [ref, { width }] = useMeasure();

	const selectedSize = useMemo(() => {
		const sizesInDescendingOrder = (
			Object.keys(classesByWidth) as unknown as number[]
		).sort((sizeA, sizeB) => sizeB - sizeA);
		const foundSize = sizesInDescendingOrder.find((size) => size < width);
		if (foundSize) {
			return classesByWidth[foundSize];
		}
		return undefined;
	}, [classesByWidth, width]);

	return (
		<div ref={ref as any} className={selectedSize}>
			{children}
		</div>
	);
};

export default Size;
