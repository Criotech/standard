import React, { FC, ReactNode, Fragment } from "react";
import "./index.scss";
import { ClassService } from "@myacuvue_thailand_web/services";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import RightArrowButton from "../../../../components/RightArrowButton";
import LeftArrowButton from "../../../../components/LeftArrowButton";
import Carousel from "../../../../components/Carousel";
import { CarouselProps } from "antd";

interface IProps {
	slides: ReactNode[];
	className?: string;
}

const RightButtonWrapper = ({
	onClick,
	currentSlide,
	numberOfVisibleSlides,
	numberOfSlides,
}: any) => {
	const shouldRender = currentSlide + numberOfVisibleSlides < numberOfSlides;
	return shouldRender ? (
		<RightArrowButton className="right-arrow-button" onClick={onClick} />
	) : (
		<Fragment />
	);
};

const LeftButtonWrapper = ({ onClick, currentSlide }: any) => {
	const shouldRender = currentSlide > 0;
	return shouldRender ? (
		<LeftArrowButton className="left-arrow-button" onClick={onClick} />
	) : (
		<Fragment />
	);
};

const WalletCarousel: FC<IProps> = ({ slides, className }) => {
	const { isWideScreen } = useWideScreen();
	const classNames = ClassService.createClassName(
		"reward-wallet-carousel",
		className
	);

	const numberOfVisibleSlides = isWideScreen ? 2 : 1;
	const numberOfSlides = slides.length;

	const sliderProps: CarouselProps = {
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide: 0,
		rows: 1,
		slidesPerRow: 1,
		infinite: false,
		speed: 500,
		draggable: true,
		dots: false,
		arrows: true,
		autoplay: false,
		nextArrow: (
			<RightButtonWrapper
				numberOfVisibleSlides={numberOfVisibleSlides}
				numberOfSlides={numberOfSlides}
			/>
		),
		prevArrow: <LeftButtonWrapper />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};

	return (
		<div className={classNames}>
			<Carousel carouselProps={sliderProps}>
				{slides.map((slide, slideIndex) => (
					<Fragment key={slideIndex}>{slide}</Fragment>
				))}
			</Carousel>
		</div>
	);
};

export default WalletCarousel;
