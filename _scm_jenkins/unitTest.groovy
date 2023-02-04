def run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    ensure.insideDockerContainer("jnj.artifactrepo.jnj.com/jpm/node:14") {
        dir('project') {
            sh "export NODE_OPTIONS=--max-old-space-size=${jobVars.npm.memoryLimit}"
            sh 'yarn test'
            stashName = "unit-test-stash"
            reportFile = "coverage/lcov.info"
            reportFiles = findFiles(glob:"**/${reportFile}")
            if (jobManifest && reportFile && stashName && reportFiles.length > 0) {
                pPrint.info "Report Files:${reportFiles}"
                jobManifest.createCoverageStash(stashName, [includes:"**/${reportFile}"])
                pPrint.info "Coverage Stash Name:${jobVars.coverageStashes}"
            }
        }
    }
}

boolean expectsManifest() {
    return true
}

return this