#!/bin/groovy
@Library(["jpm_shared_lib@1.x"]) _
import org.jnj.*
def args = [:]
args.debug = false
args.cleanWorkspace = true
args.manifestSourcesFile = 'manifest-sources.yaml'
args.environmentMappingFile = 'environment-mapping.yaml'
new pipelines.stdPipeline().execute(args) 