import { FC, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom-v5-compat";
import { ISampleProduct } from "@myacuvue_thailand_web/services";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import Text from "../../../components/Text";
import ProductCell from "./ProductCell";
import "./index.scss";
import ThinDivider from "../../../components/ThinDivider";
import { useProduct } from "../../../hooks/useProduct";
import { useAsync } from "react-use";

const SampleProductCatalog: FC<{}> = () => {
	const navigate = useNavigate();

	const onBackToPoints = useCallback(() => {
		navigate("/points");
	}, [navigate]);

	const { getProducts } = useProduct();

	const { value: sampleProducts, loading } = useAsync(
		() => getProducts(),
		[getProducts]
	);

	return (
		<div className="sample-product-catalog">
			<h1>
				<Text textKey="aboutPointsPage.sampleProductCatalog.myAcuvuePointDetails" />
			</h1>
			{!loading &&
				sampleProducts &&
				sampleProducts.map((product: ISampleProduct, index) => {
					const isLast = index === sampleProducts.length - 1;
					return (
						<Fragment key={index}>
							<ProductCell key={index} sampleProduct={product} />
							{!isLast && <ThinDivider />}
						</Fragment>
					);
				})}
			<Button
				className="back-to-points-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				onClick={onBackToPoints}
			>
				<Text textKey="aboutPointsPage.sampleProductCatalog.backToPoints" />
			</Button>
		</div>
	);
};

export default SampleProductCatalog;
