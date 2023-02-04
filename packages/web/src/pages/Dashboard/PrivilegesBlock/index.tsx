import { FC } from "react";
import Title from "../../../components/Title";
import AppPrivilegesCard from "./AppPrivilegesCard";
import "./index.scss";
import { useConfiguration } from "../../../hooks/useConfiguration";

const PrivilegesBlock: FC<{}> = () => {
	const { appPrivileges } = useConfiguration();

	return (
		<div className="app-privileges">
			<div className="app-privileges-header">
				<Title
					textKey="dashboardPage.invitation.appPrivilegeHeader"
					subKey="dashboardPage.invitation.appPrivilegeSubHeader"
				/>
			</div>
			<div className="app-privileges-content">
				{appPrivileges.map((appPrivilege) => (
					<AppPrivilegesCard
						key={appPrivilege.titleKey + appPrivilege.bodyKey}
						iconType={appPrivilege.iconType}
						titleKey={appPrivilege.titleKey}
						descriptionKey={appPrivilege.bodyKey}
					/>
				))}
			</div>
		</div>
	);
};

export default PrivilegesBlock;
