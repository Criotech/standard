import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { TranslationType } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Button, { ButtonSize, ButtonType } from "../../../../components/Button";
import Checkbox from "../../../../components/Checkbox";
import Text from "../../../../components/Text";
import "./index.scss";
import { useService } from "../../../../hooks/useService";
import DisplayHTML from "../../../../components/DisplayHTML";
import { useText } from "../../../../hooks/useText";
import TrackedForm from "../../../../components/TrackedForm";
import { useConfiguration } from "../../../../hooks/useConfiguration";

export interface IFormData {
	"WEB:LITE:TERMS_AND_CONDITIONS": boolean;
	"WEB:LITE:PRIVACY_POLICY": boolean;
}

interface IProps {
	formData: Partial<IFormData>;
	setFormData: Dispatch<SetStateAction<Partial<IFormData>>>;
	onSubmit: () => void;
	onGoBackClick: () => void;
	isSubmitDisabled?: boolean;
	className?: string;
}

const TermsAndConditionsForm: FC<IProps> = ({
	formData,
	setFormData,
	onSubmit,
	onGoBackClick,
	isSubmitDisabled = false,
	className,
}) => {
	const { ClassService } = useService();

	const { termsAndConditionUrl } = useConfiguration();

	const termsAndCondition = useText(
		"joinNowPage.TermsAndConditions.iHaveReadText",
		TranslationType.default,
		{ termsAndConditionUrl }
	);

	const privacyPolicy = useText("pointsTermsandCondition.info");

	const isTermsAndConditionsVisible = useMemo(() => {
		return (
			Object.keys(formData).indexOf("WEB:LITE:TERMS_AND_CONDITIONS") > -1
		);
	}, [formData]);

	const isPrivacyPolicyVisible = useMemo(() => {
		return Object.keys(formData).indexOf("WEB:LITE:PRIVACY_POLICY") > -1;
	}, [formData]);

	const classNames = ClassService.createClassName(
		"acuvue-terms-and-conditions-form",
		className
	);

	const toggleTermsAndConditionsChecked = useCallback(
		(newTermsValue: boolean) => {
			setFormData(() => ({
				...formData,
				"WEB:LITE:TERMS_AND_CONDITIONS": newTermsValue,
			}));
		},
		[formData, setFormData]
	);

	const togglePrivacyChecked = useCallback(
		(newPrivacyValue: boolean) => {
			setFormData(() => ({
				...formData,
				"WEB:LITE:PRIVACY_POLICY": newPrivacyValue,
			}));
		},
		[formData, setFormData]
	);

	return (
		<TrackedForm
			trackingFormName="terms_and_conditions"
			name="terms-and-condition-form"
			onFinish={onSubmit}
			className={classNames}
			layout="vertical"
		>
			{isTermsAndConditionsVisible && (
				<Checkbox
					className="checkbox"
					checked={formData["WEB:LITE:TERMS_AND_CONDITIONS"]}
					onChange={(e) =>
						toggleTermsAndConditionsChecked(e.target.checked)
					}
				>
					<DisplayHTML unsafeHTML={termsAndCondition} />
				</Checkbox>
			)}

			{isPrivacyPolicyVisible && (
				<Checkbox
					className="checkbox"
					checked={formData["WEB:LITE:PRIVACY_POLICY"]}
					onChange={(e) => togglePrivacyChecked(e.target.checked)}
				>
					<DisplayHTML unsafeHTML={privacyPolicy} />
				</Checkbox>
			)}

			<p className="delete-request-text">
				<Text textKey="joinNowPage.TermsAndConditions.deletePersonalDetailsText" />
			</p>

			<Button
				className="accept-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={isSubmitDisabled}
			>
				<Text textKey="joinNowPage.TermsAndConditions.acceptText" />
			</Button>

			<Button
				className="go-back-button"
				type={ButtonType.OUTLINE}
				htmlType="button"
				size={ButtonSize.MEDIUM}
				onClick={onGoBackClick}
			>
				<Text textKey="joinNowPage.TermsAndConditions.goBackText" />
			</Button>
		</TrackedForm>
	);
};

export default TermsAndConditionsForm;
