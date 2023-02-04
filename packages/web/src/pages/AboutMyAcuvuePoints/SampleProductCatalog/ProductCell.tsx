import { FC } from "react";
import "./ProductCell.scss";
import { ISampleProduct } from "@myacuvue_thailand_web/services";

interface IProps {
	sampleProduct: ISampleProduct;
}

const ProductCell: FC<IProps> = ({ sampleProduct }) => (
	<div className="product-cell">
		<div className="product-image">
			<img src={sampleProduct.imageUrl} alt="" />
		</div>

		<div className="product-details">
			<h2>{sampleProduct.name}</h2>
			<p className="product-description">{sampleProduct.description}</p>
			<p className="product-category">{sampleProduct.category}</p>
			<p className="product-points">{sampleProduct.points} </p>
		</div>
	</div>
);

export default ProductCell;
