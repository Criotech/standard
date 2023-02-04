import { FC } from "react";
import "./index.scss";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../Text";
import CutCircle from "../../images/cut-circle.svg";
import { useService } from "../../hooks/useService";

interface IProps {
	textKey: TranslationKey;
	subKey: TranslationKey;
	className?: string;
}

const Title: FC<IProps> = ({ textKey, subKey, className }) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName("acuvue-title", className);

	return (
		<div className={classNames}>
			<div className="title-text-wrapper">
				<span className="title-sub">
					<Text textKey={subKey} />
				</span>
				<h1 className="heading typography-heading-1">
					<Text textKey={textKey} />
				</h1>
			</div>

			<img src={CutCircle} alt="" />
		</div>
	);
};

export default Title;
