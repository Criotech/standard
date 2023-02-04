# MyACUVUE Thailand & MyACUVUE Lite

##Packages
###web
`npx create-react-app web --template cra-template-pwa-typescript`

## Starting the server

```shell
yarn start:<instance code>
```

Instances available: `th`, `au`, `tw`, `hk`, `sg`, `my`, `nz`, `in`.

## Azure Access

This is needed for testing the access with Azure.

Run the following code to generate the localhost HTTPS certificate:

```shell
cd packages/templates/local-ssl
./create-local-ssl.sh
```

The command above only needs to be run if the certificate doesn't exist yet, or has been expired.

Then run the following command to start a webserver using the generated certificate, replacing `<instance code>` by the appropriate code (e.g. `au`).

```shell
yarn start_templates:<instance code>
```
