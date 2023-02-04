def run(jobVars) {
    jobVars.coverageStashes.each({ stashName ->
        unstash name:stashName
    })
    environment = jobVars?.jpmEnvironment.toLowerCase()
    applicationsDetails = jobVars?.applicationsDetails
    sonarURL = "https://sonar.eat.jnj.com"
    sonarProjectKey = "com.jnj.md.aspac.th.myacuvue.web"
    sonarProjectName = "MyAcuvue - TH - Web"
    bitbucketRepoURL = jobVars?.projectRepo
    jenkinsURL = "https://jenkins.eat.jnj.com/${applicationsDetails?.jenkinsKey}"
    inclusions = [
            "**/*.ts",
            "**/*.tsx",
        ].join(',')
    exclusions = ""
    testScriptsFilesPattern = [
            "**/setupTests.ts",
            "**/*.spec.ts",
            "**/*.spec.tsx",
        ].join(',')
    coverageExclusions = testScriptsFilesPattern
    duplicationExclusions = [
            "**/*.spec.ts",
            "**/*.spec.tsx",
            "packages/services/src/ConfigService/footer/footer*.ts",
            "packages/services/src/ConfigService/footer/socialNetworks*.ts",
            "packages/services/src/ConfigService/header/header*.ts",
        ].join(',')
    reportFile = "coverage/lcov.info"
    monorepoDirNames = sh(
        script:"echo packages/*",
        returnStdout:true
    ).replaceAll('packages/','').split(' ')
    pPrint.info(monorepoDirNames)
    StringBuilder sonarProperties = new StringBuilder();
    sonarProperties.append("""sonar.host.url="${sonarURL}"
        |sonar.projectKey=${sonarProjectKey}
        |sonar.projectName=${sonarProjectName}
        |sonar.links.homepage=${bitbucketRepoURL}
        |sonar.links.ci=${jenkinsURL}
        |sonar.sourceEncoding=UTF-8
        |sonar.inclusions=${inclusions}
        |sonar.exclusions=${exclusions}
        |sonar.coverage.exclusions=${coverageExclusions}
        |sonar.cpd.exclusions=${duplicationExclusions}
        |sonar.modules=${monorepoDirNames.join(',').trim()}
        |sonar.issue.ignore.multicriteria=e1
        |sonar.issue.ignore.multicriteria.e1.ruleKey=typescript:S109
        |sonar.issue.ignore.multicriteria.e1.resourceKey=${inclusions}
    """)
    for (int i = 0; i < monorepoDirNames.length; ++i) {
        String name = monorepoDirNames[i].trim()
        sonarProperties.append("""|${name}.sonar.projectBaseDir=./packages/${name}
            |${name}.sonar.sources=src
            |${name}.sonar.javascript.lcov.reportPaths=${reportFile}
        """);
    }
    writeFile file:'sonar-project.properties', text:sonarProperties.toString().stripMargin().stripIndent()
    sh 'cat sonar-project.properties'
    jobVars.coverageStashes.each({ stashName ->
        stash name:stashName, allowEmpty:true, includes:"sonar-project.properties,**/${reportFile}"
    })
}

return this