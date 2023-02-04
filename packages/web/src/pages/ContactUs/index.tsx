import { FC } from "react";
import Text from "../../components/Text";
import "./index.scss";
import { Divider } from "antd";
import Header from "../../components/Layout/Header";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";

const ContactUs: FC<{}> = () => (
	<div className="contact-us">
		<Header titleKey="contactUsPage.title" />
		<main>
			<h1>
				<Text textKey="contactUsPage.title" />
			</h1>
			<div>
				<div>
					<h2>
						<Text textKey="contactUsPage.customerCareCenter" />
					</h2>

					<p>
						<Text textKey="contactUsPage.customerEnquiryText" />
					</p>

					<p className="customer-support">
						<Text textKey="contactUsPage.customerOpening" />
					</p>

					<p className="customer-opening-hour">
						<Text textKey="contactUsPage.customerOpeningHourTime" />
					</p>
					<p className="customer-support">
						<Text textKey="contactUsPage.hotLine" />
					</p>
					<p className="customer-support-contact">
						<a href="tel:02-328-8585">02-328-8585</a>
					</p>

					<p className="customer-support">
						<Text textKey="contactUsPage.email" />
					</p>
					<p className="customer-support-contact">
						<a href="mailto:supportTH@its.jnj.com">
							supportTH@its.jnj.com
						</a>
					</p>
				</div>

				<Divider className="ant-customer-acuvue-divider" />

				<div>
					<h2>
						<Text textKey="contactUsPage.myAcuvueTitle" />
					</h2>

					<p>
						<Text textKey="contactUsPage.myAcuvueSupportText" />
					</p>

					<p className="customer-support">
						<Text textKey="contactUsPage.customerOpening" />
					</p>

					<p>
						<Text textKey="contactUsPage.myAcuvueSupportOpeningHourTime" />
					</p>
					<p className="customer-support">
						<Text textKey="contactUsPage.hotLine" />
					</p>
					<p className="customer-support-contact">
						<a href="tel:02-328-8585">02-328-8585</a>
					</p>
					<p className="customer-support">
						<Text textKey="contactUsPage.email" />
					</p>
					<p className="customer-support-contact">
						<a href="mailto:supportTH@its.jnj.com">
							supportTH@its.jnj.com
						</a>
					</p>
				</div>
			</div>
		</main>
		<GlobalNavigationPanel />
	</div>
);
export default ContactUs;
