import { render, screen } from "@testing-library/react";
import ProductCell from "./ProductCell";
import { ISampleProduct } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { Image as AntImage } from "antd";

const sampleProduct: ISampleProduct = {
	imageUrl: "fakeImageUrl",
	name: "fakeName",
	category: "fakeCategory",
	description: "fakeDescription",
	points: 15,
};

jest.mock("../../../hooks/useTranslation", () => ({ useText: jest.fn() }));

describe("ProductCell", () => {
	it("should render without errors", () => {
		render(<ProductCell sampleProduct={sampleProduct} />);
	});

	it("should render product image", () => {
		render(<ProductCell sampleProduct={sampleProduct} />);
		const productImage = screen.getByRole("img");
		expect(productImage).toBeInTheDocument();
		expect(productImage).toHaveAttribute("src", "fakeImageUrl");
	});

	it("should render name and description and points", () => {
		render(<ProductCell sampleProduct={sampleProduct} />);

		const productName = screen.getByText("fakeName");
		expect(productName).toBeInTheDocument();

		const productDescription = screen.getByText("fakeDescription");
		expect(productDescription).toBeInTheDocument();

		const productCategory = screen.getByText("fakeCategory");
		expect(productCategory).toBeInTheDocument();

		const productPoints = screen.getByText(sampleProduct.points.toString());
		expect(productPoints).toBeInTheDocument();
	});
});
