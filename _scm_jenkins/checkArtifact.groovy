def run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    withCredentials([
        usernamePassword(
            credentialsId:'jnj-eat-artifactory',
            usernameVariable:'artifactory_username',
            passwordVariable:'artifactory_password'
        )]
    ) {
        environment = jobVars?.jpmEnvironment.toLowerCase()
        version = jobVars?.calculatedVersion
        applicationsDetails = jobVars?.applicationsDetails
        appsName = applicationsDetails.name
        awsRegion = applicationsDetails.aws.region
        userPass = util.urlEncode(artifactory_password)
        userCreds = artifactory_username + ':' + userPass
        artifactUrl = "https://${userCreds}@artifactrepo.jnj.com/artifactory"
        artifactPath = jobVars?.artifactory.target
        fileName = "${appsName}-${version}.zip"
        artifactFullURL = "${artifactUrl}/${artifactPath}/${fileName}"
        loopCount = 120
        sleepTime = 15
        pPrint.info("Checking artifact url status code")
        for (i = 1; i <= loopCount; i++) {
            int statusCode = sh(
                script:"curl -sLI -w '%{http_code}' ${artifactFullURL} -o /dev/null",
                returnStdout:true
            )
            pPrint.info("Status code is ${statusCode}")
            if (statusCode != 200) {
                pPrint.info("${fileName} not exists in artifactory")
                if (i < loopCount){
                    echo "Check again after ${sleepTime} seconds, ${i} attempt"
                    sleep sleepTime
                } else {
                    throw new Exception("Please ensure it was pulished before resolving")
                }
            } else {
                echo "${fileName} exists in artifactory"
                break;
            }
        }
    }
}

boolean expectsManifest() {
    return true
}

return this