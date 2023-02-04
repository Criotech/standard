def run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    jobVars.packageStashes.each({ stashName ->
        unstash name:stashName
    })
    version = jobVars?.calculatedVersion
    applicationsDetails = jobVars?.applicationsDetails
    appsName = applicationsDetails.name
    fileName = "${appsName}-${version}.zip"
    downloadFolder = "./downloads"
    sh "unzip -o ${downloadFolder}/${fileName} -d ${downloadFolder}" 
    sh "cd ${downloadFolder} && ls -lR"
    stash name:jobVars.projectStash
}

boolean expectsManifest() {
    return true
}

return this