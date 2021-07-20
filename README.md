# Client SDK

This repository aim to deserve and uniformize services,
models and generic utilities that can be used independently
of frameworks and devices running javascript architecture
or VMs. 

For better node modules package handling, this documentation uses
`yarn`, but you can also use `npm` if you prefer.

## Implementation

Make sure you cloned `@langpress/sdk` somewhere and switch to its
directory. Run `yarn link` at the root folder of `@langpress/sdk`.
Now, switch to your current project directory and run
`yarn link @langpress/sdk`. A symlink has now being created and your
project will hot-reload automatically.

## Preparation

Make sure your IDE supports `.editorconfig` files, so we can all
work in harmony using the same coding standards.

#### Local dependencies
Once cloned, run the following command line.
```
yarn
```

#### Environment variables
Copy and paste and adjust the following settings.
```
API_URL=https://api.langpress.blog
```

## Launch
Run the following command to run the project in development mode.
```
yarn run watch
```

## Build
```
yarn run build
```
