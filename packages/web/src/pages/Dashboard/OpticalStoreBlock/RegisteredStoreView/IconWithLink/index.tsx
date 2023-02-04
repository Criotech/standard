import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";
import { FC, ReactNode } from "react";
import Text from "../../../../../components/Text";
import "./index.scss";

interface IProps {
	icon: ReactNode;
	textKey: TranslationKey;
	link: string;
	className?: string;
}

const IconWithLink: FC<IProps> = ({ icon, textKey, link, className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-icon-with-link",
		className
	);

	return (
		<div className={classNames}>
			<a href={link} className="link">
				{icon}
				<p className="link-text">
					<Text textKey={textKey} />
				</p>
			</a>
		</div>
	);
};

export default IconWithLink;
