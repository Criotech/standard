import { FC } from "react";
import { useService } from "../../../hooks/useService";
import Button, { ButtonType } from "../../Button";
import Text from "../../Text";
import codeOfConduct from "../../../images/code-of-ethics-logo-advamed.png";
import "./index.scss";

interface IProps {
	className?: string;
}

const CodeOfEthics: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"myacuvue-code-of-ethics",
		className
	);

	return (
		<div className={classNames}>
			<a className="logo-link" href="https://www.advamed.org">
				<img
					className="logo-img"
					src={codeOfConduct}
					alt="advamed code of ethics logo"
				/>
			</a>
			<p className="code-of-ethics-text">
				<Text textKey="footer.links.avamedCodeOfEthics" />
			</p>
			<a
				href="https://www.acuvueprofessional.com"
				className="link-button"
			>
				<Button className="link-button-btn" type={ButtonType.OUTLINE}>
					<span className="link-button-text">
						<Text textKey="footer.button.eyeCareProfessionals" />
					</span>
				</Button>
			</a>
		</div>
	);
};

export default CodeOfEthics;
