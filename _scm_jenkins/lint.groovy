def run(jobManifest) {
    jobVars = jobManifest.getJobVars()
    ensure.insideDockerContainer('jnj.artifactrepo.jnj.com/jpm/node:14') {
        dir('project') {
            sh "export NODE_OPTIONS=--max-old-space-size=${jobVars.npm.memoryLimit}"
            sh 'yarn format'
        }
    }
}

boolean expectsManifest() {
    return true
}

return this