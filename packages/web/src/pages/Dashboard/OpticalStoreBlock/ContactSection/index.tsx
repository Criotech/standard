import { FC } from "react";
import Text from "../../../../components/Text";
import { useService } from "../../../../hooks/useService";
import "./index.scss";

interface IProps {
	telephone: string;
	className?: string;
}

const ContactSection: FC<IProps> = ({ telephone, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-contact-section",
		className
	);

	return (
		<div className={classNames}>
			<h3 className="contact-title">
				<Text textKey="dashboardPage.opticalStore.contact" />
			</h3>
			<div className="contact-block">
				<a href={`tel:${telephone}`} className="telephone">
					{telephone}
				</a>
			</div>
		</div>
	);
};

export default ContactSection;
