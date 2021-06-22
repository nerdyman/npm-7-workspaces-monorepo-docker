# npm 7 Workspaces Monorepo with Docker (does not work)

npm v7 workspaces monorepo works locally on Linux but fails to resolve hoisted modules in Docker.

## Within the Docker Container

```sh
docker build --no-cache --tag npm-workspaces .
```

### Folder Structure

```
/srv/app
|-- node_modules
|   |-- @esbuild-plugins
|   |-- @this
|   |   |-- package-one -> ../../packages/package-one
|   |   `-- package-two -> ../../packages/package-two
|   |-- @types
|   |-- left-pad
|   |   `-- perf
|   `-- lodash
|       `-- fp
`-- packages
    |-- package-one
    `-- package-two
```

### Error

```
internal/modules/cjs/loader.js:888
  throw err;
  ^

Error: Cannot find module '@esbuild-plugins/node-resolve'
Require stack:
- /srv/app/packages/package-two/esbuild.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:885:15)
    at Function.Module._load (internal/modules/cjs/loader.js:730:27)
    at Module.require (internal/modules/cjs/loader.js:957:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (/srv/app/packages/package-two/esbuild.js:3:21)
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ '/srv/app/packages/package-two/esbuild.js' ]
}
npm ERR! Lifecycle script `start` failed with error:
npm ERR! Error: command failed
npm ERR!   in workspace: @this/package-two@1.0.0
npm ERR!   at location: /srv/app/packages/package-two
```
