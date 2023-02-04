String run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    version = null
    ensure.insideDockerContainer('jnj.artifactrepo.jnj.com/jpm/node:14') {
        dir('project') {
            version = sh(
                returnStdout:true,
                script:"node -e \"console.log(require('./package.json').version)\""
            ).trim()
            pPrint.info("Detected ${version} from package.json file")
        }
    }
    return version
}

boolean expectsManifest() {
    return true
}

return this