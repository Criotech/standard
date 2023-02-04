import { FC } from "react";
import { Carousel } from "antd";
import "./index.scss";
import { CarouselBanner } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";

export interface CarouselProps {
	banners: CarouselBanner[];
	className?: string;
}

const ImageCarousel: FC<CarouselProps> = ({ banners, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"image-carousel",
		className
	);

	return (
		<Carousel
			className={classNames}
			autoplay
			dots={{ className: "navigation-dots" }}
		>
			{banners.map(({ id, alt, imageUrl, redirectLink }) =>
				redirectLink ? (
					<a
						key={id}
						href={redirectLink}
						target="_blank"
						rel="noreferrer"
					>
						<img src={imageUrl} alt={alt} className="image" />
					</a>
				) : (
					<img key={id} src={imageUrl} alt={alt} className="image" />
				)
			)}
		</Carousel>
	);
};

export default ImageCarousel;
