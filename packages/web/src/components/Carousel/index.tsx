import { FC, PropsWithChildren } from "react";
import { Carousel as AntCarousel, CarouselProps } from "antd";
import "./index.scss";
import { useService } from "../../hooks/useService";

interface IProps {
	className?: string;
	carouselProps?: CarouselProps;
}

const Carousel: FC<PropsWithChildren<IProps>> = ({
	children,
	className,
	carouselProps,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-carousel",
		className
	);

	return (
		<AntCarousel
			className={classNames}
			autoplay
			dots={{ className: "navigation-dots" }}
			{...carouselProps}
		>
			{children}
		</AntCarousel>
	);
};

export default Carousel;
