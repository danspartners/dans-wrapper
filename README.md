# DANS wrapper
Generic wrapper for DANS projects. The wrapper contains the main header and footer for a DANS website. Via the `pages` prop a config for pages is passed to `dans-wrapper`. For a definition and documentation of `PageConfig` see `./src/pages.ts`

## Local development
- Link React of `some-DANS-project` to avoid using multiple React version error
- $ npm i --no-save ../some-dans-project/node_modules/react
- Open 2 terminals and run:
    - $ npm run watch
    - $ npm run watch:types
- go to `some-DANS-project` and link to `dans-wrapper`
    -  $ npm i --no-save ../dans-wrapper
- when developing `dans-wrapper` you can see the changes at `some-DANS-project`

## TODO
- remove the inMenu option for `PageConfig` in `./src/pages.ts`?
- use lazy loading for pages, see `./src/index.tsx`