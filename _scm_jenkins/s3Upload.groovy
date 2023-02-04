def run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    ensure.insideDockerContainer('jnj.artifactrepo.jnj.com/jpm/awscli') {
        dir('project') {
            deleteDir()
            unstash jobVars.projectStash
            jobVars.packageStashes.each({ stashName ->
                unstash name:stashName
            })
            environment = jobVars?.jpmEnvironment.toLowerCase()
            version = jobVars?.calculatedVersion
            applicationsDetails = jobVars?.applicationsDetails
            appsName = applicationsDetails.name
            awsRegion = applicationsDetails.aws.region
            folderName = "${appsName}-${environment}"
            buildFolder = "./downloads/packages/web/build"
            loopCount = 40
            sleepTime = 15
            withEnv(["AWS_DEFAULT_REGION=${awsRegion}"]) {
                withCredentials([[
                    $class:'AmazonWebServicesCredentialsBinding', 
                    credentialsId:'s3api', 
                    accessKeyVariable:'AWS_ACCESS_KEY_ID', 
                    secretKeyVariable:'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    for (i = 1; i <= loopCount; i++) {
                        int folderExists = sh(
                            script:"aws s3api list-buckets --query \"Buckets[?Name=='${folderName}']\" --output text | wc -l",
                            returnStdout:true
                        )
                        if (folderExists == 1) {
                            pPrint.info("s3 bucket ${folderName} exists")
                            sh "aws s3 cp ${buildFolder} s3://${folderName}/ --recursive --sse"
                            break;
                        } else {
                            pPrint.info("s3 bucket ${folderName} not exists")
                            if (i < loopCount){
                                pPrint.info("Check again after ${sleepTime} seconds, ${i} attempt")
                                sleep sleepTime
                            } else {
                                throw new Exception("Please ensure s3 bucket ${folderName} was created")
                            }
                        }
                    }
                }
            }
        }
    }
}

boolean expectsManifest() {
    return true
}

return this