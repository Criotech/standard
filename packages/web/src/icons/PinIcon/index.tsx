import Icon from "@ant-design/icons";
import { FC } from "react";
import { useService } from "../../hooks/useService";

const PinIconSvg: FC<{}> = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41.139 48" {...props}>
		<path
			d="M20.57 0C9.228 0 0 8.065 0 17.979v.258c0 .1.006.209.013.317 0 .031 0 .061.006.091.006.141.012.278.021.413v.068c.007.083.013.166.022.25a16.027 16.027 0 001.321 5.1c1.728 4.62 5.175 9.665 9.228 15.253a61.011 61.011 0 005.075 6.221 5.46 5.46 0 004.878 2.021c.926 0 3.386 1.043 10.15-8.357 4.048-5.625 7.463-10.72 9.143-15.388a16.006 16.006 0 001.207-4.821c.012-.117.021-.231.03-.346v-.019c.007-.11.012-.222.017-.332v-.038c0-.036 0-.069.006-.1.007-.111.013-.221.013-.326v-.123-.134a17.169 17.169 0 00-7.822-14.113A22.284 22.284 0 0020.562.007z"
			fill="#003087"
			fillRule="evenodd"
		/>
		<path
			d="M20.631 2.155a19.6 19.6 0 0111.232 3.484 16.863 16.863 0 015.148 5.682 14.87 14.87 0 011.834 7.147v.22c0 .115-.006.227-.013.331v.159c0 .076-.007.153-.012.229v.045c-.009.122-.018.219-.027.312a14.779 14.779 0 01-1.074 4.372c-1.4 3.931-4.16 8.233-7.878 13.482-4.812 6.793-7.262 7.579-8.686 7.579-.168 0-.308-.011-.421-.02-.062 0-.12-.01-.152-.01h-.255a5.717 5.717 0 01-4.454-1.983 53.389 53.389 0 01-4.389-5.463c-3.16-4.426-6.377-9.1-7.948-13.357a14.785 14.785 0 01-1.176-4.62l-.019-.223V19.448c-.009-.127-.014-.254-.019-.377v-.058c-.006-.1-.013-.211-.013-.325v-.111-.112c0-8.992 8.2-16.309 18.271-16.31h.064zm16.682 17.198v-.021c0-.073.008-.147.011-.221v-.081c0-.038 0-.072.006-.105.005-.08.01-.163.01-.236v-.072-.064-.087a13.369 13.369 0 00-1.651-6.426 15.361 15.361 0 00-4.693-5.173 18.087 18.087 0 00-10.37-3.212h-.053c-9.252 0-16.777 6.644-16.777 14.81V18.688c0 .071 0 .153.01.224v.009c0 .031 0 .061.005.09 0 .116.01.228.017.335v.053c.005.068.01.133.017.2v.014a13.289 13.289 0 001.066 4.175q.009.02.016.041c1.5 4.085 4.663 8.674 7.769 13.024a51.9 51.9 0 004.259 5.3 4.2 4.2 0 003.356 1.514h.262c.091 0 .177.007.268.014s.194.015.3.015c2.1 0 5.218-3.777 7.462-6.946 3.652-5.155 6.358-9.362 7.695-13.134l.014-.037a13.282 13.282 0 00.973-3.949v-.009c.012-.08.02-.163.028-.268z"
			fill="#fff"
		/>
	</svg>
);

export type Props = {
	color?: string;
	size?: IconSize;
	className?: string;
};

export enum IconSize {
	MINI = "12px",
	SMALL = "16px",
	MEDIUM = "24px",
	LARGE = "32px",
}

const PinIcon: FC<Props> = ({
	size = IconSize.SMALL,
	color,
	className,
}: Props) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-pin-icon",
		className
	);

	return (
		<Icon
			className={classNames}
			component={PinIconSvg}
			style={{ fontSize: size, color }}
		/>
	);
};

export default PinIcon;