import { build } from 'esbuild'
import * as pkg from './package.json'

const distName = `${pkg.name}.user.js`
const buildEnv = (process.env.BUILD_ENV || 'dev') as 'dev' | 'prod'
const isProd = buildEnv === 'prod'
const watch = !!process.env.WATCH_FILES
const releaseTag = process.env.RELEASE_TAG || 'dev'

const VERSION = `${pkg.version}`

const userscriptBanner = `// ==UserScript==
// @id          ${pkg.name}
// @name        ${pkg.name}
// @namespace   Violentmonkey Scripts
// @match       https://www.pandabuy.com/*
// @match       https://pandabuy.com/*
// @grant       none
// @version     ${VERSION}
// @author      ${pkg.author}
// @description ${pkg.description}
// @downloadURL ${pkg.repository.url}/releases/download/release/${distName}
// @updateURL   ${pkg.repository.url}/releases/download/release/${distName}
// @homepageURL ${pkg.repository.url}
// ==/UserScript==
`

console.log('Build environment:', isProd)
;(async () => {
    await build({
        entryPoints: [pkg.main],
        banner: {
            js: userscriptBanner,
        },
        bundle: true,
        color: true,
        outfile: `./dist/${distName}`,
        format: 'iife',
        platform: 'browser',
        treeShaking: isProd,
        watch: watch,
        minify: isProd,
        minifyWhitespace: isProd,
        minifyIdentifiers: isProd,
        minifySyntax: isProd,
        logLevel: isProd ? 'error' : 'debug',
        define: {
            'process.env.USERSCRIPT_VERSION': `"${VERSION}"`,
        },
    })
})()
