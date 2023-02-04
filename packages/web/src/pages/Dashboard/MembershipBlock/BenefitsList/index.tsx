import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../components/Text";
import "./index.scss";

interface IProps {
	benefitsHeadingKey: TranslationKey;
	benefitsKeys: TranslationKey[];
	className?: string;
}

const BenefitsList: FC<IProps> = ({
	benefitsHeadingKey,
	benefitsKeys,
	className,
}) => {
	const classNames = ["acuvue-membership-block-benefits-list", className]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={classNames}>
			<h4 className="benefits-heading">
				<Text textKey={benefitsHeadingKey} />
			</h4>

			<ul className="benefits-list">
				{benefitsKeys.map((benefit) => (
					<li key={benefit}>
						<Text textKey={benefit} />
					</li>
				))}
			</ul>
		</div>
	);
};

export default BenefitsList;
