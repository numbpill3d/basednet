(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[727],{

/***/ 67:
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ 195:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 480:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ nHandler)
});

// NAMESPACE OBJECT: ./src/middleware.ts
var src_middleware_namespaceObject = {};
__webpack_require__.r(src_middleware_namespaceObject);
__webpack_require__.d(src_middleware_namespaceObject, {
  "default": () => (src_middleware)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/globals.js
async function registerInstrumentation() {
    if ("_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && _ENTRIES.middleware_instrumentation.register) {
        try {
            await _ENTRIES.middleware_instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/utils.js
var utils = __webpack_require__(723);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/next-url.js + 12 modules
var next_url = __webpack_require__(950);
// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
var spec_extension_cookies = __webpack_require__(639);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        (0,utils/* validateURL */.r4)(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new next_url/* NextURL */.c(url, {
            headers: (0,utils/* toNodeOutgoingHttpHeaders */.lb)(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new spec_extension_cookies/* RequestCookies */.q(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/response.js
var spec_extension_response = __webpack_require__(651);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function relativizeURL(url, base) {
    const baseURL = typeof base === "string" ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, "") : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC_HEADER = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH_HEADER = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC_HEADER + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH_HEADER + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC_HEADER
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH_HEADER
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc";
const NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed"; //# sourceMappingURL=app-router-headers.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/esm/shared/lib/modern-browserslist-target.js
var modern_browserslist_target = __webpack_require__(253);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/constants.js


const COMPILER_NAMES = {
    client: "client",
    server: "server",
    edgeServer: "edge-server"
};
/**
 * Headers that are set by the Next.js server and should be stripped from the
 * request headers going to the user's application.
 */ const constants_INTERNAL_HEADERS = (/* unused pure expression or super */ null && ([
    "x-invoke-error",
    "x-invoke-output",
    "x-invoke-path",
    "x-invoke-query",
    "x-invoke-status",
    "x-middleware-invoke"
]));
const COMPILER_INDEXES = {
    [COMPILER_NAMES.client]: 0,
    [COMPILER_NAMES.server]: 1,
    [COMPILER_NAMES.edgeServer]: 2
};
const PHASE_EXPORT = "phase-export";
const PHASE_PRODUCTION_BUILD = "phase-production-build";
const PHASE_PRODUCTION_SERVER = "phase-production-server";
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";
const PHASE_TEST = "phase-test";
const PHASE_INFO = "phase-info";
const PAGES_MANIFEST = "pages-manifest.json";
const APP_PATHS_MANIFEST = "app-paths-manifest.json";
const APP_PATH_ROUTES_MANIFEST = "app-path-routes-manifest.json";
const BUILD_MANIFEST = "build-manifest.json";
const APP_BUILD_MANIFEST = "app-build-manifest.json";
const FUNCTIONS_CONFIG_MANIFEST = "functions-config-manifest.json";
const SUBRESOURCE_INTEGRITY_MANIFEST = "subresource-integrity-manifest";
const NEXT_FONT_MANIFEST = "next-font-manifest";
const EXPORT_MARKER = "export-marker.json";
const EXPORT_DETAIL = "export-detail.json";
const PRERENDER_MANIFEST = "prerender-manifest.json";
const ROUTES_MANIFEST = "routes-manifest.json";
const IMAGES_MANIFEST = "images-manifest.json";
const SERVER_FILES_MANIFEST = "required-server-files.json";
const DEV_CLIENT_PAGES_MANIFEST = "_devPagesManifest.json";
const MIDDLEWARE_MANIFEST = "middleware-manifest.json";
const DEV_MIDDLEWARE_MANIFEST = "_devMiddlewareManifest.json";
const REACT_LOADABLE_MANIFEST = "react-loadable-manifest.json";
const FONT_MANIFEST = "font-manifest.json";
const SERVER_DIRECTORY = "server";
const CONFIG_FILES = (/* unused pure expression or super */ null && ([
    "next.config.js",
    "next.config.mjs"
]));
const BUILD_ID_FILE = "BUILD_ID";
const BLOCKED_PAGES = (/* unused pure expression or super */ null && ([
    "/_document",
    "/_app",
    "/_error"
]));
const CLIENT_PUBLIC_FILES_PATH = "public";
const CLIENT_STATIC_FILES_PATH = "static";
const STRING_LITERAL_DROP_BUNDLE = "__NEXT_DROP_CLIENT_FILE__";
const NEXT_BUILTIN_DOCUMENT = "__NEXT_BUILTIN_DOCUMENT__";
const BARREL_OPTIMIZATION_PREFIX = "__barrel_optimize__";
// server/[entry]/page_client-reference-manifest.js
const CLIENT_REFERENCE_MANIFEST = "client-reference-manifest";
// server/server-reference-manifest
const SERVER_REFERENCE_MANIFEST = "server-reference-manifest";
// server/middleware-build-manifest.js
const MIDDLEWARE_BUILD_MANIFEST = "middleware-build-manifest";
// server/middleware-react-loadable-manifest.js
const MIDDLEWARE_REACT_LOADABLE_MANIFEST = "middleware-react-loadable-manifest";
// static/runtime/main.js
const CLIENT_STATIC_FILES_RUNTIME_MAIN = "main";
const CLIENT_STATIC_FILES_RUNTIME_MAIN_APP = "" + CLIENT_STATIC_FILES_RUNTIME_MAIN + "-app";
// next internal client components chunk for layouts
const APP_CLIENT_INTERNALS = "app-pages-internals";
// static/runtime/react-refresh.js
const CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH = "react-refresh";
// static/runtime/amp.js
const CLIENT_STATIC_FILES_RUNTIME_AMP = "amp";
// static/runtime/webpack.js
const CLIENT_STATIC_FILES_RUNTIME_WEBPACK = "webpack";
// static/runtime/polyfills.js
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS = "polyfills";
const CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL = Symbol(CLIENT_STATIC_FILES_RUNTIME_POLYFILLS);
const EDGE_RUNTIME_WEBPACK = "edge-runtime-webpack";
const STATIC_PROPS_ID = "__N_SSG";
const SERVER_PROPS_ID = "__N_SSP";
const GOOGLE_FONT_PROVIDER = "https://fonts.googleapis.com/";
const OPTIMIZED_FONT_PROVIDERS = [
    {
        url: GOOGLE_FONT_PROVIDER,
        preconnect: "https://fonts.gstatic.com"
    },
    {
        url: "https://use.typekit.net",
        preconnect: "https://use.typekit.net"
    }
];
const DEFAULT_SERIF_FONT = {
    name: "Times New Roman",
    xAvgCharWidth: 821,
    azAvgWidth: 854.3953488372093,
    unitsPerEm: 2048
};
const DEFAULT_SANS_SERIF_FONT = {
    name: "Arial",
    xAvgCharWidth: 904,
    azAvgWidth: 934.5116279069767,
    unitsPerEm: 2048
};
const STATIC_STATUS_PAGES = (/* unused pure expression or super */ null && ([
    "/500"
]));
const TRACE_OUTPUT_VERSION = 1;
// in `MB`
const TURBO_TRACE_DEFAULT_MEMORY_LIMIT = 6000;
const RSC_MODULE_TYPES = {
    client: "client",
    server: "server"
};
// comparing
// https://nextjs.org/docs/api-reference/edge-runtime
// with
// https://nodejs.org/docs/latest/api/globals.html
const EDGE_UNSUPPORTED_NODE_APIS = (/* unused pure expression or super */ null && ([
    "clearImmediate",
    "setImmediate",
    "BroadcastChannel",
    "ByteLengthQueuingStrategy",
    "CompressionStream",
    "CountQueuingStrategy",
    "DecompressionStream",
    "DomException",
    "MessageChannel",
    "MessageEvent",
    "MessagePort",
    "ReadableByteStreamController",
    "ReadableStreamBYOBRequest",
    "ReadableStreamDefaultController",
    "TransformStreamDefaultController",
    "WritableStreamDefaultController"
]));
const SYSTEM_ENTRYPOINTS = new Set([
    CLIENT_STATIC_FILES_RUNTIME_MAIN,
    CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH,
    CLIENT_STATIC_FILES_RUNTIME_AMP,
    CLIENT_STATIC_FILES_RUNTIME_MAIN_APP
]); //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/internal-utils.js


const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound",
    NEXT_RSC_UNION_QUERY
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === "string";
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */ function stripInternalHeaders(headers) {
    for (const key of INTERNAL_HEADERS){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, "$1");
} //# sourceMappingURL=app-paths.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
const RSC_SUFFIX = ".rsc";
const NEXT_DATA_SUFFIX = ".json";
const NEXT_META_SUFFIX = ".meta";
const NEXT_BODY_SUFFIX = ".body";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
// in seconds
const CACHE_ONE_YEAR = 31536000;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-action-proxy";
const RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ("The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead."));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    "app",
    "pages",
    "components",
    "lib",
    "src"
]));
const ESLINT_PROMPT_VALUES = [
    {
        title: "Strict",
        recommended: true,
        config: {
            extends: "next/core-web-vitals"
        }
    },
    {
        title: "Base",
        config: {
            extends: "next"
        }
    },
    {
        title: "Cancel",
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        server: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler
        ],
        nonClientServerTarget: [
            // plus middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js


/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookies = new spec_extension_cookies/* ResponseCookies */.n(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookies.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore.call(fetch)) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new spec_extension_cookies/* ResponseCookies */.n(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookies, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/api-utils/index.js


/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(578);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js





function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new spec_extension_cookies/* RequestCookies */.q(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new spec_extension_cookies/* RequestCookies */.q(HeadersAdapter.from(headers));
    return MutableRequestCookiesAdapter.wrap(cookies, onUpdateCookies);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        function defaultOnUpdateCookies(cookies) {
            if (res) {
                res.setHeader("Set-Cookie", cookies);
            }
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/async-local-storage.js
const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/request-async-storage.external.js

const requestAsyncStorage = createAsyncLocalStorage(); //# sourceMappingURL=request-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/lib/trace/constants.js
/**
 * Contains predefined constants for the trace span name in next/server.
 *
 * Currently, next/server/tracer is internal implementation only for tracking
 * next.js's implementation only with known span names defined here.
 **/ // eslint typescript has a bug with TS enums
/* eslint-disable no-shadow */ var BaseServerSpan;
(function(BaseServerSpan) {
    BaseServerSpan["handleRequest"] = "BaseServer.handleRequest";
    BaseServerSpan["run"] = "BaseServer.run";
    BaseServerSpan["pipe"] = "BaseServer.pipe";
    BaseServerSpan["getStaticHTML"] = "BaseServer.getStaticHTML";
    BaseServerSpan["render"] = "BaseServer.render";
    BaseServerSpan["renderToResponseWithComponents"] = "BaseServer.renderToResponseWithComponents";
    BaseServerSpan["renderToResponse"] = "BaseServer.renderToResponse";
    BaseServerSpan["renderToHTML"] = "BaseServer.renderToHTML";
    BaseServerSpan["renderError"] = "BaseServer.renderError";
    BaseServerSpan["renderErrorToResponse"] = "BaseServer.renderErrorToResponse";
    BaseServerSpan["renderErrorToHTML"] = "BaseServer.renderErrorToHTML";
    BaseServerSpan["render404"] = "BaseServer.render404";
})(BaseServerSpan || (BaseServerSpan = {}));
var LoadComponentsSpan;
(function(LoadComponentsSpan) {
    LoadComponentsSpan["loadDefaultErrorComponents"] = "LoadComponents.loadDefaultErrorComponents";
    LoadComponentsSpan["loadComponents"] = "LoadComponents.loadComponents";
})(LoadComponentsSpan || (LoadComponentsSpan = {}));
var NextServerSpan;
(function(NextServerSpan) {
    NextServerSpan["getRequestHandler"] = "NextServer.getRequestHandler";
    NextServerSpan["getServer"] = "NextServer.getServer";
    NextServerSpan["getServerRequestHandler"] = "NextServer.getServerRequestHandler";
    NextServerSpan["createServer"] = "createServer.createServer";
})(NextServerSpan || (NextServerSpan = {}));
var NextNodeServerSpan;
(function(NextNodeServerSpan) {
    NextNodeServerSpan["compression"] = "NextNodeServer.compression";
    NextNodeServerSpan["getBuildId"] = "NextNodeServer.getBuildId";
    NextNodeServerSpan["getLayoutOrPageModule"] = "NextNodeServer.getLayoutOrPageModule";
    NextNodeServerSpan["generateStaticRoutes"] = "NextNodeServer.generateStaticRoutes";
    NextNodeServerSpan["generateFsStaticRoutes"] = "NextNodeServer.generateFsStaticRoutes";
    NextNodeServerSpan["generatePublicRoutes"] = "NextNodeServer.generatePublicRoutes";
    NextNodeServerSpan["generateImageRoutes"] = "NextNodeServer.generateImageRoutes.route";
    NextNodeServerSpan["sendRenderResult"] = "NextNodeServer.sendRenderResult";
    NextNodeServerSpan["proxyRequest"] = "NextNodeServer.proxyRequest";
    NextNodeServerSpan["runApi"] = "NextNodeServer.runApi";
    NextNodeServerSpan["render"] = "NextNodeServer.render";
    NextNodeServerSpan["renderHTML"] = "NextNodeServer.renderHTML";
    NextNodeServerSpan["imageOptimizer"] = "NextNodeServer.imageOptimizer";
    NextNodeServerSpan["getPagePath"] = "NextNodeServer.getPagePath";
    NextNodeServerSpan["getRoutesManifest"] = "NextNodeServer.getRoutesManifest";
    NextNodeServerSpan["findPageComponents"] = "NextNodeServer.findPageComponents";
    NextNodeServerSpan["getFontManifest"] = "NextNodeServer.getFontManifest";
    NextNodeServerSpan["getServerComponentManifest"] = "NextNodeServer.getServerComponentManifest";
    NextNodeServerSpan["getRequestHandler"] = "NextNodeServer.getRequestHandler";
    NextNodeServerSpan["renderToHTML"] = "NextNodeServer.renderToHTML";
    NextNodeServerSpan["renderError"] = "NextNodeServer.renderError";
    NextNodeServerSpan["renderErrorToHTML"] = "NextNodeServer.renderErrorToHTML";
    NextNodeServerSpan["render404"] = "NextNodeServer.render404";
    NextNodeServerSpan["route"] = "route";
    NextNodeServerSpan["onProxyReq"] = "onProxyReq";
    NextNodeServerSpan["apiResolver"] = "apiResolver";
    NextNodeServerSpan["internalFetch"] = "internalFetch";
})(NextNodeServerSpan || (NextNodeServerSpan = {}));
var StartServerSpan;
(function(StartServerSpan) {
    StartServerSpan["startServer"] = "startServer.startServer";
})(StartServerSpan || (StartServerSpan = {}));
var RenderSpan;
(function(RenderSpan) {
    RenderSpan["getServerSideProps"] = "Render.getServerSideProps";
    RenderSpan["getStaticProps"] = "Render.getStaticProps";
    RenderSpan["renderToString"] = "Render.renderToString";
    RenderSpan["renderDocument"] = "Render.renderDocument";
    RenderSpan["createBodyResult"] = "Render.createBodyResult";
})(RenderSpan || (RenderSpan = {}));
var AppRenderSpan;
(function(AppRenderSpan) {
    AppRenderSpan["renderToString"] = "AppRender.renderToString";
    AppRenderSpan["renderToReadableStream"] = "AppRender.renderToReadableStream";
    AppRenderSpan["getBodyResult"] = "AppRender.getBodyResult";
    AppRenderSpan["fetch"] = "AppRender.fetch";
})(AppRenderSpan || (AppRenderSpan = {}));
var RouterSpan;
(function(RouterSpan) {
    RouterSpan["executeRoute"] = "Router.executeRoute";
})(RouterSpan || (RouterSpan = {}));
var NodeSpan;
(function(NodeSpan) {
    NodeSpan["runHandler"] = "Node.runHandler";
})(NodeSpan || (NodeSpan = {}));
var AppRouteRouteHandlersSpan;
(function(AppRouteRouteHandlersSpan) {
    AppRouteRouteHandlersSpan["runHandler"] = "AppRouteRouteHandlers.runHandler";
})(AppRouteRouteHandlersSpan || (AppRouteRouteHandlersSpan = {}));
var ResolveMetadataSpan;
(function(ResolveMetadataSpan) {
    ResolveMetadataSpan["generateMetadata"] = "ResolveMetadata.generateMetadata";
    ResolveMetadataSpan["generateViewport"] = "ResolveMetadata.generateViewport";
})(ResolveMetadataSpan || (ResolveMetadataSpan = {}));
// This list is used to filter out spans that are not relevant to the user
const NextVanillaSpanAllowlist = [
    "BaseServer.handleRequest",
    "Render.getServerSideProps",
    "Render.getStaticProps",
    "AppRender.fetch",
    "AppRender.getBodyResult",
    "Render.renderDocument",
    "Node.runHandler",
    "AppRouteRouteHandlers.runHandler",
    "ResolveMetadata.generateMetadata",
    "ResolveMetadata.generateViewport",
    "NextNodeServer.findPageComponents",
    "NextNodeServer.getLayoutOrPageModule"
];
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/lib/trace/tracer.js

let api;
// we want to allow users to use their own version of @opentelemetry/api if they
// want to, so we try to require it first, and if it fails we fall back to the
// version that is bundled with Next.js
// this is because @opentelemetry/api has to be synced with the version of
// @opentelemetry/tracing that is used, and we don't want to force users to use
// the version that is bundled with Next.js.
// the API is ~stable, so this should be fine
if (true) {
    api = __webpack_require__(38);
} else {}
const { context, propagation, trace, SpanStatusCode, SpanKind, ROOT_CONTEXT } = api;
const isPromise = (p)=>{
    return p !== null && typeof p === "object" && typeof p.then === "function";
};
const closeSpanWithError = (span, error)=>{
    if ((error == null ? void 0 : error.bubble) === true) {
        span.setAttribute("next.bubble", true);
    } else {
        if (error) {
            span.recordException(error);
        }
        span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error == null ? void 0 : error.message
        });
    }
    span.end();
};
/** we use this map to propagate attributes from nested spans to the top span */ const rootSpanAttributesStore = new Map();
const rootSpanIdKey = api.createContextKey("next.rootSpanId");
let lastSpanId = 0;
const getSpanId = ()=>lastSpanId++;
class NextTracerImpl {
    /**
   * Returns an instance to the trace with configured name.
   * Since wrap / trace can be defined in any place prior to actual trace subscriber initialization,
   * This should be lazily evaluated.
   */ getTracerInstance() {
        return trace.getTracer("next.js", "0.0.1");
    }
    getContext() {
        return context;
    }
    getActiveScopeSpan() {
        return trace.getSpan(context == null ? void 0 : context.active());
    }
    withPropagatedContext(carrier, fn, getter) {
        const activeContext = context.active();
        if (trace.getSpanContext(activeContext)) {
            // Active span is already set, too late to propagate.
            return fn();
        }
        const remoteContext = propagation.extract(activeContext, carrier, getter);
        return context.with(remoteContext, fn);
    }
    trace(...args) {
        var _trace_getSpanContext;
        const [type, fnOrOptions, fnOrEmpty] = args;
        // coerce options form overload
        const { fn, options } = typeof fnOrOptions === "function" ? {
            fn: fnOrOptions,
            options: {}
        } : {
            fn: fnOrEmpty,
            options: {
                ...fnOrOptions
            }
        };
        if (!NextVanillaSpanAllowlist.includes(type) && process.env.NEXT_OTEL_VERBOSE !== "1" || options.hideSpan) {
            return fn();
        }
        const spanName = options.spanName ?? type;
        // Trying to get active scoped span to assign parent. If option specifies parent span manually, will try to use it.
        let spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        let isRootSpan = false;
        if (!spanContext) {
            spanContext = ROOT_CONTEXT;
            isRootSpan = true;
        } else if ((_trace_getSpanContext = trace.getSpanContext(spanContext)) == null ? void 0 : _trace_getSpanContext.isRemote) {
            isRootSpan = true;
        }
        const spanId = getSpanId();
        options.attributes = {
            "next.span_name": spanName,
            "next.span_type": type,
            ...options.attributes
        };
        return context.with(spanContext.setValue(rootSpanIdKey, spanId), ()=>this.getTracerInstance().startActiveSpan(spanName, options, (span)=>{
                const onCleanup = ()=>{
                    rootSpanAttributesStore.delete(spanId);
                };
                if (isRootSpan) {
                    rootSpanAttributesStore.set(spanId, new Map(Object.entries(options.attributes ?? {})));
                }
                try {
                    if (fn.length > 1) {
                        return fn(span, (err)=>closeSpanWithError(span, err));
                    }
                    const result = fn(span);
                    if (isPromise(result)) {
                        // If there's error make sure it throws
                        return result.then((res)=>{
                            span.end();
                            // Need to pass down the promise result,
                            // it could be react stream response with error { error, stream }
                            return res;
                        }).catch((err)=>{
                            closeSpanWithError(span, err);
                            throw err;
                        }).finally(onCleanup);
                    } else {
                        span.end();
                        onCleanup();
                    }
                    return result;
                } catch (err) {
                    closeSpanWithError(span, err);
                    onCleanup();
                    throw err;
                }
            }));
    }
    wrap(...args) {
        const tracer = this;
        const [name, options, fn] = args.length === 3 ? args : [
            args[0],
            {},
            args[1]
        ];
        if (!NextVanillaSpanAllowlist.includes(name) && process.env.NEXT_OTEL_VERBOSE !== "1") {
            return fn;
        }
        return function() {
            let optionsObj = options;
            if (typeof optionsObj === "function" && typeof fn === "function") {
                optionsObj = optionsObj.apply(this, arguments);
            }
            const lastArgId = arguments.length - 1;
            const cb = arguments[lastArgId];
            if (typeof cb === "function") {
                const scopeBoundCb = tracer.getContext().bind(context.active(), cb);
                return tracer.trace(name, optionsObj, (_span, done)=>{
                    arguments[lastArgId] = function(err) {
                        done == null ? void 0 : done(err);
                        return scopeBoundCb.apply(this, arguments);
                    };
                    return fn.apply(this, arguments);
                });
            } else {
                return tracer.trace(name, optionsObj, ()=>fn.apply(this, arguments));
            }
        };
    }
    startSpan(...args) {
        const [type, options] = args;
        const spanContext = this.getSpanContext((options == null ? void 0 : options.parentSpan) ?? this.getActiveScopeSpan());
        return this.getTracerInstance().startSpan(type, options, spanContext);
    }
    getSpanContext(parentSpan) {
        const spanContext = parentSpan ? trace.setSpan(context.active(), parentSpan) : undefined;
        return spanContext;
    }
    getRootSpanAttributes() {
        const spanId = context.active().getValue(rootSpanIdKey);
        return rootSpanAttributesStore.get(spanId);
    }
}
const getTracer = (()=>{
    const tracer = new NextTracerImpl();
    return ()=>tracer;
})();
 //# sourceMappingURL=tracer.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/adapter.js
















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
}
const headersGetter = {
    keys: (headers)=>Array.from(headers.keys()),
    get: (headers, key)=>headers.get(key) ?? undefined
};
let propagator = (request, fn)=>{
    const tracer = getTracer();
    return tracer.withPropagatedContext(request.headers, fn, headersGetter);
};
let testApisIntercepted = false;
function ensureTestApisIntercepted() {
    if (!testApisIntercepted) {
        testApisIntercepted = true;
        if (process.env.NEXT_PRIVATE_TEST_PROXY === "true") {
            const { interceptTestApis, wrapRequestHandler } = __webpack_require__(895);
            interceptTestApis();
            propagator = wrapRequestHandler(propagator);
        }
    }
}
async function adapter(params) {
    ensureTestApisIntercepted();
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== "undefined";
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === "string" ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = normalizeRscURL(params.request.url);
    const requestUrl = new next_url/* NextURL */.c(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        if (key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX)) {
            const normalizedKey = key.substring(NEXT_QUERY_PARAM_PREFIX.length);
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    const requestHeaders = (0,utils/* fromNodeOutgoingHttpHeaders */.EK)(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of FLIGHT_PARAMETERS){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl =  false ? 0 : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== "development",
            fetchCacheKeyPrefix: undefined,
            dev: "production" === "development",
            requestHeaders: params.request.headers,
            requestProtocol: "https",
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: "development-id"
                    }
                };
            }
        });
    }
    const event = new NextFetchEvent({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    response = await propagator(request, ()=>{
        // we only care to make async storage available for middleware
        const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
        if (isMiddleware) {
            return RequestAsyncStorageWrapper.wrap(requestAsyncStorage, {
                req: request,
                renderOpts: {
                    onUpdateCookies: (cookies)=>{
                        cookiesFromResponse = cookies;
                    },
                    // @ts-expect-error: TODO: investigate why previewProps isn't on RenderOpts
                    previewProps: (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                        previewModeId: "development-id",
                        previewModeEncryptionKey: "",
                        previewModeSigningKey: ""
                    }
                }
            }, ()=>params.handler(request, event));
        }
        return params.handler(request, event);
    });
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError("Expected an instance of Response to be returned");
    }
    if (response && cookiesFromResponse) {
        response.headers.set("set-cookie", cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new next_url/* NextURL */.c(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (true) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set("x-middleware-rewrite", String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = relativizeURL(String(rewriteUrl), String(requestUrl));
        if (isDataReq && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(undefined && 0)) {
            response.headers.set("x-nextjs-rewrite", relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new next_url/* NextURL */.c(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set("Location", String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : spec_extension_response/* NextResponse */.x.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[waitUntilSymbol]),
        fetchMetrics: request.fetchMetrics
    };
} //# sourceMappingURL=adapter.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/exports/next-response.js
// This file is for modularized imports for next/server to get fully-treeshaking.
 //# sourceMappingURL=next-response.js.map

// EXTERNAL MODULE: ./node_modules/@upstash/ratelimit/dist/index.js
var dist = __webpack_require__(908);
// EXTERNAL MODULE: ./node_modules/crypto-js/enc-hex.js
var enc_hex = __webpack_require__(123);
// EXTERNAL MODULE: ./node_modules/crypto-js/sha1.js
var sha1 = __webpack_require__(761);
;// CONCATENATED MODULE: ./node_modules/@upstash/redis/chunk-NAQE7K3X.mjs
var __defProp = Object.defineProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
// pkg/error.ts
var error_exports = {};
__export(error_exports, {
    UpstashError: ()=>UpstashError,
    UrlError: ()=>UrlError
});
var UpstashError = class extends Error {
    constructor(message){
        super(message);
        this.name = "UpstashError";
    }
};
var UrlError = class extends Error {
    constructor(url){
        super(`Upstash Redis client was passed an invalid URL. You should pass a URL starting with https. Received: "${url}". `);
        this.name = "UrlError";
    }
};
// pkg/util.ts
function parseRecursive(obj) {
    const parsed = Array.isArray(obj) ? obj.map((o)=>{
        try {
            return parseRecursive(o);
        } catch  {
            return o;
        }
    }) : JSON.parse(obj);
    if (typeof parsed === "number" && parsed.toString() !== obj) {
        return obj;
    }
    return parsed;
}
function parseResponse(result) {
    try {
        return parseRecursive(result);
    } catch  {
        return result;
    }
}
function deserializeScanResponse(result) {
    return [
        result[0],
        ...parseResponse(result.slice(1))
    ];
}
function mergeHeaders(...headers) {
    const merged = {};
    for (const header of headers){
        if (!header) continue;
        for (const [key, value] of Object.entries(header)){
            if (value !== void 0 && value !== null) {
                merged[key] = value;
            }
        }
    }
    return merged;
}
// pkg/http.ts
var HttpClient = class {
    constructor(config){
        this.upstashSyncToken = "";
        this.options = {
            backend: config.options?.backend,
            agent: config.agent,
            responseEncoding: config.responseEncoding ?? "base64",
            // default to base64
            cache: config.cache,
            signal: config.signal,
            keepAlive: config.keepAlive ?? true
        };
        this.upstashSyncToken = "";
        this.readYourWrites = config.readYourWrites ?? true;
        this.baseUrl = (config.baseUrl || "").replace(/\/$/, "");
        const urlRegex = /^https?:\/\/[^\s#$./?].\S*$/;
        if (this.baseUrl && !urlRegex.test(this.baseUrl)) {
            throw new UrlError(this.baseUrl);
        }
        this.headers = {
            "Content-Type": "application/json",
            ...config.headers
        };
        this.hasCredentials = Boolean(this.baseUrl && this.headers.authorization.split(" ")[1]);
        if (this.options.responseEncoding === "base64") {
            this.headers["Upstash-Encoding"] = "base64";
        }
        this.retry = typeof config.retry === "boolean" && !config.retry ? {
            attempts: 1,
            backoff: ()=>0
        } : {
            attempts: config.retry?.retries ?? 5,
            backoff: config.retry?.backoff ?? ((retryCount)=>Math.exp(retryCount) * 50)
        };
    }
    mergeTelemetry(telemetry) {
        this.headers = merge(this.headers, "Upstash-Telemetry-Runtime", telemetry.runtime);
        this.headers = merge(this.headers, "Upstash-Telemetry-Platform", telemetry.platform);
        this.headers = merge(this.headers, "Upstash-Telemetry-Sdk", telemetry.sdk);
    }
    async request(req) {
        const requestHeaders = mergeHeaders(this.headers, req.headers ?? {});
        const requestUrl = [
            this.baseUrl,
            ...req.path ?? []
        ].join("/");
        const isEventStream = requestHeaders.Accept === "text/event-stream";
        const requestOptions = {
            //@ts-expect-error this should throw due to bun regression
            cache: this.options.cache,
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(req.body),
            keepalive: this.options.keepAlive,
            agent: this.options.agent,
            signal: req.signal ?? this.options.signal,
            /**
       * Fastly specific
       */ backend: this.options.backend
        };
        if (!this.hasCredentials) {
            console.warn("[Upstash Redis] Redis client was initialized without url or token. Failed to execute command.");
        }
        if (this.readYourWrites) {
            const newHeader = this.upstashSyncToken;
            this.headers["upstash-sync-token"] = newHeader;
        }
        let res = null;
        let error = null;
        for(let i = 0; i <= this.retry.attempts; i++){
            try {
                res = await fetch(requestUrl, requestOptions);
                break;
            } catch (error_) {
                if (this.options.signal?.aborted) {
                    const myBlob = new Blob([
                        JSON.stringify({
                            result: this.options.signal.reason ?? "Aborted"
                        })
                    ]);
                    const myOptions = {
                        status: 200,
                        statusText: this.options.signal.reason ?? "Aborted"
                    };
                    res = new Response(myBlob, myOptions);
                    break;
                }
                error = error_;
                if (i < this.retry.attempts) {
                    await new Promise((r)=>setTimeout(r, this.retry.backoff(i)));
                }
            }
        }
        if (!res) {
            throw error ?? new Error("Exhausted all retries");
        }
        if (!res.ok) {
            const body2 = await res.json();
            throw new UpstashError(`${body2.error}, command was: ${JSON.stringify(req.body)}`);
        }
        if (this.readYourWrites) {
            const headers = res.headers;
            this.upstashSyncToken = headers.get("upstash-sync-token") ?? "";
        }
        if (isEventStream && req && req.onMessage && res.body) {
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            (async ()=>{
                try {
                    while(true){
                        const { value, done } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value);
                        const lines = chunk.split("\n");
                        for (const line of lines){
                            if (line.startsWith("data: ")) {
                                const data = line.slice(6);
                                req.onMessage?.(data);
                            }
                        }
                    }
                } catch (error2) {
                    if (error2 instanceof Error && error2.name === "AbortError") {} else {
                        console.error("Stream reading error:", error2);
                    }
                } finally{
                    try {
                        await reader.cancel();
                    } catch  {}
                }
            })();
            return {
                result: 1
            };
        }
        const body = await res.json();
        if (this.readYourWrites) {
            const headers = res.headers;
            this.upstashSyncToken = headers.get("upstash-sync-token") ?? "";
        }
        if (this.options.responseEncoding === "base64") {
            if (Array.isArray(body)) {
                return body.map(({ result: result2, error: error2 })=>({
                        result: decode(result2),
                        error: error2
                    }));
            }
            const result = decode(body.result);
            return {
                result,
                error: body.error
            };
        }
        return body;
    }
};
function base64decode(b64) {
    let dec = "";
    try {
        const binString = atob(b64);
        const size = binString.length;
        const bytes = new Uint8Array(size);
        for(let i = 0; i < size; i++){
            bytes[i] = binString.charCodeAt(i);
        }
        dec = new TextDecoder().decode(bytes);
    } catch  {
        dec = b64;
    }
    return dec;
}
function decode(raw) {
    let result = void 0;
    switch(typeof raw){
        case "undefined":
            {
                return raw;
            }
        case "number":
            {
                result = raw;
                break;
            }
        case "object":
            {
                if (Array.isArray(raw)) {
                    result = raw.map((v)=>typeof v === "string" ? base64decode(v) : Array.isArray(v) ? v.map((element)=>decode(element)) : v);
                } else {
                    result = null;
                }
                break;
            }
        case "string":
            {
                result = raw === "OK" ? "OK" : base64decode(raw);
                break;
            }
        default:
            {
                break;
            }
    }
    return result;
}
function merge(obj, key, value) {
    if (!value) {
        return obj;
    }
    obj[key] = obj[key] ? [
        obj[key],
        value
    ].join(",") : value;
    return obj;
}
// pkg/commands/command.ts
var defaultSerializer = (c)=>{
    switch(typeof c){
        case "string":
        case "number":
        case "boolean":
            {
                return c;
            }
        default:
            {
                return JSON.stringify(c);
            }
    }
};
var Command = class {
    /**
   * Create a new command instance.
   *
   * You can define a custom `deserialize` function. By default we try to deserialize as json.
   */ constructor(command, opts){
        this.serialize = defaultSerializer;
        this.deserialize = opts?.automaticDeserialization === void 0 || opts.automaticDeserialization ? opts?.deserialize ?? parseResponse : (x)=>x;
        this.command = command.map((c)=>this.serialize(c));
        this.headers = opts?.headers;
        this.path = opts?.path;
        this.onMessage = opts?.streamOptions?.onMessage;
        this.isStreaming = opts?.streamOptions?.isStreaming ?? false;
        this.signal = opts?.streamOptions?.signal;
        if (opts?.latencyLogging) {
            const originalExec = this.exec.bind(this);
            this.exec = async (client)=>{
                const start = performance.now();
                const result = await originalExec(client);
                const end = performance.now();
                const loggerResult = (end - start).toFixed(2);
                console.log(`Latency for \x1B[38;2;19;185;39m${this.command[0].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${loggerResult} ms\x1B[0m`);
                return result;
            };
        }
    }
    /**
   * Execute the command using a client.
   */ async exec(client) {
        const { result, error } = await client.request({
            body: this.command,
            path: this.path,
            upstashSyncToken: client.upstashSyncToken,
            headers: this.headers,
            onMessage: this.onMessage,
            isStreaming: this.isStreaming,
            signal: this.signal
        });
        if (error) {
            throw new UpstashError(error);
        }
        if (result === void 0) {
            throw new TypeError("Request did not return a result");
        }
        return this.deserialize(result);
    }
};
// pkg/commands/hrandfield.ts
function deserialize(result) {
    if (result.length === 0) {
        return null;
    }
    const obj = {};
    while(result.length >= 2){
        const key = result.shift();
        const value = result.shift();
        try {
            obj[key] = JSON.parse(value);
        } catch  {
            obj[key] = value;
        }
    }
    return obj;
}
var HRandFieldCommand = class extends Command {
    constructor(cmd, opts){
        const command = [
            "hrandfield",
            cmd[0]
        ];
        if (typeof cmd[1] === "number") {
            command.push(cmd[1]);
        }
        if (cmd[2]) {
            command.push("WITHVALUES");
        }
        super(command, {
            // @ts-expect-error to silence compiler
            deserialize: cmd[2] ? (result)=>deserialize(result) : opts?.deserialize,
            ...opts
        });
    }
};
// pkg/commands/append.ts
var AppendCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "append",
            ...cmd
        ], opts);
    }
};
// pkg/commands/bitcount.ts
var BitCountCommand = class extends Command {
    constructor([key, start, end], opts){
        const command = [
            "bitcount",
            key
        ];
        if (typeof start === "number") {
            command.push(start);
        }
        if (typeof end === "number") {
            command.push(end);
        }
        super(command, opts);
    }
};
// pkg/commands/bitfield.ts
var BitFieldCommand = class {
    constructor(args, client, opts, execOperation = (command)=>command.exec(this.client)){
        this.client = client;
        this.opts = opts;
        this.execOperation = execOperation;
        this.command = [
            "bitfield",
            ...args
        ];
    }
    chain(...args) {
        this.command.push(...args);
        return this;
    }
    get(...args) {
        return this.chain("get", ...args);
    }
    set(...args) {
        return this.chain("set", ...args);
    }
    incrby(...args) {
        return this.chain("incrby", ...args);
    }
    overflow(overflow) {
        return this.chain("overflow", overflow);
    }
    exec() {
        const command = new Command(this.command, this.opts);
        return this.execOperation(command);
    }
};
// pkg/commands/bitop.ts
var BitOpCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "bitop",
            ...cmd
        ], opts);
    }
};
// pkg/commands/bitpos.ts
var BitPosCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "bitpos",
            ...cmd
        ], opts);
    }
};
// pkg/commands/copy.ts
var CopyCommand = class extends Command {
    constructor([key, destinationKey, opts], commandOptions){
        super([
            "COPY",
            key,
            destinationKey,
            ...opts?.replace ? [
                "REPLACE"
            ] : []
        ], {
            ...commandOptions,
            deserialize (result) {
                if (result > 0) {
                    return "COPIED";
                }
                return "NOT_COPIED";
            }
        });
    }
};
// pkg/commands/dbsize.ts
var DBSizeCommand = class extends Command {
    constructor(opts){
        super([
            "dbsize"
        ], opts);
    }
};
// pkg/commands/decr.ts
var DecrCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "decr",
            ...cmd
        ], opts);
    }
};
// pkg/commands/decrby.ts
var DecrByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "decrby",
            ...cmd
        ], opts);
    }
};
// pkg/commands/del.ts
var DelCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "del",
            ...cmd
        ], opts);
    }
};
// pkg/commands/echo.ts
var EchoCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "echo",
            ...cmd
        ], opts);
    }
};
// pkg/commands/eval.ts
var EvalCommand = class extends Command {
    constructor([script, keys, args], opts){
        super([
            "eval",
            script,
            keys.length,
            ...keys,
            ...args ?? []
        ], opts);
    }
};
// pkg/commands/evalsha.ts
var EvalshaCommand = class extends Command {
    constructor([sha, keys, args], opts){
        super([
            "evalsha",
            sha,
            keys.length,
            ...keys,
            ...args ?? []
        ], opts);
    }
};
// pkg/commands/exec.ts
var ExecCommand = class extends Command {
    constructor(cmd, opts){
        const normalizedCmd = cmd.map((arg)=>typeof arg === "string" ? arg : String(arg));
        super(normalizedCmd, opts);
    }
};
// pkg/commands/exists.ts
var ExistsCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "exists",
            ...cmd
        ], opts);
    }
};
// pkg/commands/expire.ts
var ExpireCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "expire",
            ...cmd.filter(Boolean)
        ], opts);
    }
};
// pkg/commands/expireat.ts
var ExpireAtCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "expireat",
            ...cmd
        ], opts);
    }
};
// pkg/commands/flushall.ts
var FlushAllCommand = class extends Command {
    constructor(args, opts){
        const command = [
            "flushall"
        ];
        if (args && args.length > 0 && args[0].async) {
            command.push("async");
        }
        super(command, opts);
    }
};
// pkg/commands/flushdb.ts
var FlushDBCommand = class extends Command {
    constructor([opts], cmdOpts){
        const command = [
            "flushdb"
        ];
        if (opts?.async) {
            command.push("async");
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/geo_add.ts
var GeoAddCommand = class extends Command {
    constructor([key, arg1, ...arg2], opts){
        const command = [
            "geoadd",
            key
        ];
        if ("nx" in arg1 && arg1.nx) {
            command.push("nx");
        } else if ("xx" in arg1 && arg1.xx) {
            command.push("xx");
        }
        if ("ch" in arg1 && arg1.ch) {
            command.push("ch");
        }
        if ("latitude" in arg1 && arg1.latitude) {
            command.push(arg1.longitude, arg1.latitude, arg1.member);
        }
        command.push(...arg2.flatMap(({ latitude, longitude, member })=>[
                longitude,
                latitude,
                member
            ]));
        super(command, opts);
    }
};
// pkg/commands/geo_dist.ts
var GeoDistCommand = class extends Command {
    constructor([key, member1, member2, unit = "M"], opts){
        super([
            "GEODIST",
            key,
            member1,
            member2,
            unit
        ], opts);
    }
};
// pkg/commands/geo_hash.ts
var GeoHashCommand = class extends Command {
    constructor(cmd, opts){
        const [key] = cmd;
        const members = Array.isArray(cmd[1]) ? cmd[1] : cmd.slice(1);
        super([
            "GEOHASH",
            key,
            ...members
        ], opts);
    }
};
// pkg/commands/geo_pos.ts
var GeoPosCommand = class extends Command {
    constructor(cmd, opts){
        const [key] = cmd;
        const members = Array.isArray(cmd[1]) ? cmd[1] : cmd.slice(1);
        super([
            "GEOPOS",
            key,
            ...members
        ], {
            deserialize: (result)=>transform(result),
            ...opts
        });
    }
};
function transform(result) {
    const final = [];
    for (const pos of result){
        if (!pos?.[0] || !pos?.[1]) {
            continue;
        }
        final.push({
            lng: Number.parseFloat(pos[0]),
            lat: Number.parseFloat(pos[1])
        });
    }
    return final;
}
// pkg/commands/geo_search.ts
var GeoSearchCommand = class extends Command {
    constructor([key, centerPoint, shape, order, opts], commandOptions){
        const command = [
            "GEOSEARCH",
            key
        ];
        if (centerPoint.type === "FROMMEMBER" || centerPoint.type === "frommember") {
            command.push(centerPoint.type, centerPoint.member);
        }
        if (centerPoint.type === "FROMLONLAT" || centerPoint.type === "fromlonlat") {
            command.push(centerPoint.type, centerPoint.coordinate.lon, centerPoint.coordinate.lat);
        }
        if (shape.type === "BYRADIUS" || shape.type === "byradius") {
            command.push(shape.type, shape.radius, shape.radiusType);
        }
        if (shape.type === "BYBOX" || shape.type === "bybox") {
            command.push(shape.type, shape.rect.width, shape.rect.height, shape.rectType);
        }
        command.push(order);
        if (opts?.count) {
            command.push("COUNT", opts.count.limit, ...opts.count.any ? [
                "ANY"
            ] : []);
        }
        const transform2 = (result)=>{
            if (!opts?.withCoord && !opts?.withDist && !opts?.withHash) {
                return result.map((member)=>{
                    try {
                        return {
                            member: JSON.parse(member)
                        };
                    } catch  {
                        return {
                            member
                        };
                    }
                });
            }
            return result.map((members)=>{
                let counter = 1;
                const obj = {};
                try {
                    obj.member = JSON.parse(members[0]);
                } catch  {
                    obj.member = members[0];
                }
                if (opts.withDist) {
                    obj.dist = Number.parseFloat(members[counter++]);
                }
                if (opts.withHash) {
                    obj.hash = members[counter++].toString();
                }
                if (opts.withCoord) {
                    obj.coord = {
                        long: Number.parseFloat(members[counter][0]),
                        lat: Number.parseFloat(members[counter][1])
                    };
                }
                return obj;
            });
        };
        super([
            ...command,
            ...opts?.withCoord ? [
                "WITHCOORD"
            ] : [],
            ...opts?.withDist ? [
                "WITHDIST"
            ] : [],
            ...opts?.withHash ? [
                "WITHHASH"
            ] : []
        ], {
            deserialize: transform2,
            ...commandOptions
        });
    }
};
// pkg/commands/geo_search_store.ts
var GeoSearchStoreCommand = class extends Command {
    constructor([destination, key, centerPoint, shape, order, opts], commandOptions){
        const command = [
            "GEOSEARCHSTORE",
            destination,
            key
        ];
        if (centerPoint.type === "FROMMEMBER" || centerPoint.type === "frommember") {
            command.push(centerPoint.type, centerPoint.member);
        }
        if (centerPoint.type === "FROMLONLAT" || centerPoint.type === "fromlonlat") {
            command.push(centerPoint.type, centerPoint.coordinate.lon, centerPoint.coordinate.lat);
        }
        if (shape.type === "BYRADIUS" || shape.type === "byradius") {
            command.push(shape.type, shape.radius, shape.radiusType);
        }
        if (shape.type === "BYBOX" || shape.type === "bybox") {
            command.push(shape.type, shape.rect.width, shape.rect.height, shape.rectType);
        }
        command.push(order);
        if (opts?.count) {
            command.push("COUNT", opts.count.limit, ...opts.count.any ? [
                "ANY"
            ] : []);
        }
        super([
            ...command,
            ...opts?.storeDist ? [
                "STOREDIST"
            ] : []
        ], commandOptions);
    }
};
// pkg/commands/get.ts
var GetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "get",
            ...cmd
        ], opts);
    }
};
// pkg/commands/getbit.ts
var GetBitCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "getbit",
            ...cmd
        ], opts);
    }
};
// pkg/commands/getdel.ts
var GetDelCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "getdel",
            ...cmd
        ], opts);
    }
};
// pkg/commands/getex.ts
var GetExCommand = class extends Command {
    constructor([key, opts], cmdOpts){
        const command = [
            "getex",
            key
        ];
        if (opts) {
            if ("ex" in opts && typeof opts.ex === "number") {
                command.push("ex", opts.ex);
            } else if ("px" in opts && typeof opts.px === "number") {
                command.push("px", opts.px);
            } else if ("exat" in opts && typeof opts.exat === "number") {
                command.push("exat", opts.exat);
            } else if ("pxat" in opts && typeof opts.pxat === "number") {
                command.push("pxat", opts.pxat);
            } else if ("persist" in opts && opts.persist) {
                command.push("persist");
            }
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/getrange.ts
var GetRangeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "getrange",
            ...cmd
        ], opts);
    }
};
// pkg/commands/getset.ts
var GetSetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "getset",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hdel.ts
var HDelCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hdel",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hexists.ts
var HExistsCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hexists",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hget.ts
var HGetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hget",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hgetall.ts
function deserialize2(result) {
    if (result.length === 0) {
        return null;
    }
    const obj = {};
    while(result.length >= 2){
        const key = result.shift();
        const value = result.shift();
        try {
            const valueIsNumberAndNotSafeInteger = !Number.isNaN(Number(value)) && !Number.isSafeInteger(Number(value));
            obj[key] = valueIsNumberAndNotSafeInteger ? value : JSON.parse(value);
        } catch  {
            obj[key] = value;
        }
    }
    return obj;
}
var HGetAllCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hgetall",
            ...cmd
        ], {
            deserialize: (result)=>deserialize2(result),
            ...opts
        });
    }
};
// pkg/commands/hincrby.ts
var HIncrByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hincrby",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hincrbyfloat.ts
var HIncrByFloatCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hincrbyfloat",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hkeys.ts
var HKeysCommand = class extends Command {
    constructor([key], opts){
        super([
            "hkeys",
            key
        ], opts);
    }
};
// pkg/commands/hlen.ts
var HLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hlen",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hmget.ts
function deserialize3(fields, result) {
    if (result.every((field)=>field === null)) {
        return null;
    }
    const obj = {};
    for (const [i, field] of fields.entries()){
        try {
            obj[field] = JSON.parse(result[i]);
        } catch  {
            obj[field] = result[i];
        }
    }
    return obj;
}
var HMGetCommand = class extends Command {
    constructor([key, ...fields], opts){
        super([
            "hmget",
            key,
            ...fields
        ], {
            deserialize: (result)=>deserialize3(fields, result),
            ...opts
        });
    }
};
// pkg/commands/hmset.ts
var HMSetCommand = class extends Command {
    constructor([key, kv], opts){
        super([
            "hmset",
            key,
            ...Object.entries(kv).flatMap(([field, value])=>[
                    field,
                    value
                ])
        ], opts);
    }
};
// pkg/commands/hscan.ts
var HScanCommand = class extends Command {
    constructor([key, cursor, cmdOpts], opts){
        const command = [
            "hscan",
            key,
            cursor
        ];
        if (cmdOpts?.match) {
            command.push("match", cmdOpts.match);
        }
        if (typeof cmdOpts?.count === "number") {
            command.push("count", cmdOpts.count);
        }
        super(command, {
            deserialize: deserializeScanResponse,
            ...opts
        });
    }
};
// pkg/commands/hset.ts
var HSetCommand = class extends Command {
    constructor([key, kv], opts){
        super([
            "hset",
            key,
            ...Object.entries(kv).flatMap(([field, value])=>[
                    field,
                    value
                ])
        ], opts);
    }
};
// pkg/commands/hsetnx.ts
var HSetNXCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hsetnx",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hstrlen.ts
var HStrLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hstrlen",
            ...cmd
        ], opts);
    }
};
// pkg/commands/hvals.ts
var HValsCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "hvals",
            ...cmd
        ], opts);
    }
};
// pkg/commands/incr.ts
var IncrCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "incr",
            ...cmd
        ], opts);
    }
};
// pkg/commands/incrby.ts
var IncrByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "incrby",
            ...cmd
        ], opts);
    }
};
// pkg/commands/incrbyfloat.ts
var IncrByFloatCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "incrbyfloat",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_arrappend.ts
var JsonArrAppendCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRAPPEND",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_arrindex.ts
var JsonArrIndexCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRINDEX",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_arrinsert.ts
var JsonArrInsertCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRINSERT",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_arrlen.ts
var JsonArrLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRLEN",
            cmd[0],
            cmd[1] ?? "$"
        ], opts);
    }
};
// pkg/commands/json_arrpop.ts
var JsonArrPopCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRPOP",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_arrtrim.ts
var JsonArrTrimCommand = class extends Command {
    constructor(cmd, opts){
        const path = cmd[1] ?? "$";
        const start = cmd[2] ?? 0;
        const stop = cmd[3] ?? 0;
        super([
            "JSON.ARRTRIM",
            cmd[0],
            path,
            start,
            stop
        ], opts);
    }
};
// pkg/commands/json_clear.ts
var JsonClearCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.CLEAR",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_del.ts
var JsonDelCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.DEL",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_forget.ts
var JsonForgetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.FORGET",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_get.ts
var JsonGetCommand = class extends Command {
    constructor(cmd, opts){
        const command = [
            "JSON.GET"
        ];
        if (typeof cmd[1] === "string") {
            command.push(...cmd);
        } else {
            command.push(cmd[0]);
            if (cmd[1]) {
                if (cmd[1].indent) {
                    command.push("INDENT", cmd[1].indent);
                }
                if (cmd[1].newline) {
                    command.push("NEWLINE", cmd[1].newline);
                }
                if (cmd[1].space) {
                    command.push("SPACE", cmd[1].space);
                }
            }
            command.push(...cmd.slice(2));
        }
        super(command, opts);
    }
};
// pkg/commands/json_mget.ts
var JsonMGetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.MGET",
            ...cmd[0],
            cmd[1]
        ], opts);
    }
};
// pkg/commands/json_mset.ts
var JsonMSetCommand = class extends Command {
    constructor(cmd, opts){
        const command = [
            "JSON.MSET"
        ];
        for (const c of cmd){
            command.push(c.key, c.path, c.value);
        }
        super(command, opts);
    }
};
// pkg/commands/json_numincrby.ts
var JsonNumIncrByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.NUMINCRBY",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_nummultby.ts
var JsonNumMultByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.NUMMULTBY",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_objkeys.ts
var JsonObjKeysCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.OBJKEYS",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_objlen.ts
var JsonObjLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.OBJLEN",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_resp.ts
var JsonRespCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.RESP",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_set.ts
var JsonSetCommand = class extends Command {
    constructor(cmd, opts){
        const command = [
            "JSON.SET",
            cmd[0],
            cmd[1],
            cmd[2]
        ];
        if (cmd[3]) {
            if (cmd[3].nx) {
                command.push("NX");
            } else if (cmd[3].xx) {
                command.push("XX");
            }
        }
        super(command, opts);
    }
};
// pkg/commands/json_strappend.ts
var JsonStrAppendCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.STRAPPEND",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_strlen.ts
var JsonStrLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.STRLEN",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_toggle.ts
var JsonToggleCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.TOGGLE",
            ...cmd
        ], opts);
    }
};
// pkg/commands/json_type.ts
var JsonTypeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "JSON.TYPE",
            ...cmd
        ], opts);
    }
};
// pkg/commands/keys.ts
var KeysCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "keys",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lindex.ts
var LIndexCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lindex",
            ...cmd
        ], opts);
    }
};
// pkg/commands/linsert.ts
var LInsertCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "linsert",
            ...cmd
        ], opts);
    }
};
// pkg/commands/llen.ts
var LLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "llen",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lmove.ts
var LMoveCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lmove",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lmpop.ts
var LmPopCommand = class extends Command {
    constructor(cmd, opts){
        const [numkeys, keys, direction, count] = cmd;
        super([
            "LMPOP",
            numkeys,
            ...keys,
            direction,
            ...count ? [
                "COUNT",
                count
            ] : []
        ], opts);
    }
};
// pkg/commands/lpop.ts
var LPopCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lpop",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lpos.ts
var LPosCommand = class extends Command {
    constructor(cmd, opts){
        const args = [
            "lpos",
            cmd[0],
            cmd[1]
        ];
        if (typeof cmd[2]?.rank === "number") {
            args.push("rank", cmd[2].rank);
        }
        if (typeof cmd[2]?.count === "number") {
            args.push("count", cmd[2].count);
        }
        if (typeof cmd[2]?.maxLen === "number") {
            args.push("maxLen", cmd[2].maxLen);
        }
        super(args, opts);
    }
};
// pkg/commands/lpush.ts
var LPushCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lpush",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lpushx.ts
var LPushXCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lpushx",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lrange.ts
var LRangeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lrange",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lrem.ts
var LRemCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lrem",
            ...cmd
        ], opts);
    }
};
// pkg/commands/lset.ts
var LSetCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "lset",
            ...cmd
        ], opts);
    }
};
// pkg/commands/ltrim.ts
var LTrimCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "ltrim",
            ...cmd
        ], opts);
    }
};
// pkg/commands/mget.ts
var MGetCommand = class extends Command {
    constructor(cmd, opts){
        const keys = Array.isArray(cmd[0]) ? cmd[0] : cmd;
        super([
            "mget",
            ...keys
        ], opts);
    }
};
// pkg/commands/mset.ts
var MSetCommand = class extends Command {
    constructor([kv], opts){
        super([
            "mset",
            ...Object.entries(kv).flatMap(([key, value])=>[
                    key,
                    value
                ])
        ], opts);
    }
};
// pkg/commands/msetnx.ts
var MSetNXCommand = class extends Command {
    constructor([kv], opts){
        super([
            "msetnx",
            ...Object.entries(kv).flat()
        ], opts);
    }
};
// pkg/commands/persist.ts
var PersistCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "persist",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pexpire.ts
var PExpireCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pexpire",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pexpireat.ts
var PExpireAtCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pexpireat",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pfadd.ts
var PfAddCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pfadd",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pfcount.ts
var PfCountCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pfcount",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pfmerge.ts
var PfMergeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pfmerge",
            ...cmd
        ], opts);
    }
};
// pkg/commands/ping.ts
var PingCommand = class extends Command {
    constructor(cmd, opts){
        const command = [
            "ping"
        ];
        if (cmd?.[0] !== void 0) {
            command.push(cmd[0]);
        }
        super(command, opts);
    }
};
// pkg/commands/psetex.ts
var PSetEXCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "psetex",
            ...cmd
        ], opts);
    }
};
// pkg/commands/pttl.ts
var PTtlCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "pttl",
            ...cmd
        ], opts);
    }
};
// pkg/commands/publish.ts
var PublishCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "publish",
            ...cmd
        ], opts);
    }
};
// pkg/commands/randomkey.ts
var RandomKeyCommand = class extends Command {
    constructor(opts){
        super([
            "randomkey"
        ], opts);
    }
};
// pkg/commands/rename.ts
var RenameCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "rename",
            ...cmd
        ], opts);
    }
};
// pkg/commands/renamenx.ts
var RenameNXCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "renamenx",
            ...cmd
        ], opts);
    }
};
// pkg/commands/rpop.ts
var RPopCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "rpop",
            ...cmd
        ], opts);
    }
};
// pkg/commands/rpush.ts
var RPushCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "rpush",
            ...cmd
        ], opts);
    }
};
// pkg/commands/rpushx.ts
var RPushXCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "rpushx",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sadd.ts
var SAddCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sadd",
            ...cmd
        ], opts);
    }
};
// pkg/commands/scan.ts
var ScanCommand = class extends Command {
    constructor([cursor, opts], cmdOpts){
        const command = [
            "scan",
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        if (opts?.type && opts.type.length > 0) {
            command.push("type", opts.type);
        }
        super(command, {
            deserialize: deserializeScanResponse,
            ...cmdOpts
        });
    }
};
// pkg/commands/scard.ts
var SCardCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "scard",
            ...cmd
        ], opts);
    }
};
// pkg/commands/script_exists.ts
var ScriptExistsCommand = class extends Command {
    constructor(hashes, opts){
        super([
            "script",
            "exists",
            ...hashes
        ], {
            deserialize: (result)=>result,
            ...opts
        });
    }
};
// pkg/commands/script_flush.ts
var ScriptFlushCommand = class extends Command {
    constructor([opts], cmdOpts){
        const cmd = [
            "script",
            "flush"
        ];
        if (opts?.sync) {
            cmd.push("sync");
        } else if (opts?.async) {
            cmd.push("async");
        }
        super(cmd, cmdOpts);
    }
};
// pkg/commands/script_load.ts
var ScriptLoadCommand = class extends Command {
    constructor(args, opts){
        super([
            "script",
            "load",
            ...args
        ], opts);
    }
};
// pkg/commands/sdiff.ts
var SDiffCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sdiff",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sdiffstore.ts
var SDiffStoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sdiffstore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/set.ts
var SetCommand = class extends Command {
    constructor([key, value, opts], cmdOpts){
        const command = [
            "set",
            key,
            value
        ];
        if (opts) {
            if ("nx" in opts && opts.nx) {
                command.push("nx");
            } else if ("xx" in opts && opts.xx) {
                command.push("xx");
            }
            if ("get" in opts && opts.get) {
                command.push("get");
            }
            if ("ex" in opts && typeof opts.ex === "number") {
                command.push("ex", opts.ex);
            } else if ("px" in opts && typeof opts.px === "number") {
                command.push("px", opts.px);
            } else if ("exat" in opts && typeof opts.exat === "number") {
                command.push("exat", opts.exat);
            } else if ("pxat" in opts && typeof opts.pxat === "number") {
                command.push("pxat", opts.pxat);
            } else if ("keepTtl" in opts && opts.keepTtl) {
                command.push("keepTtl");
            }
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/setbit.ts
var SetBitCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "setbit",
            ...cmd
        ], opts);
    }
};
// pkg/commands/setex.ts
var SetExCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "setex",
            ...cmd
        ], opts);
    }
};
// pkg/commands/setnx.ts
var SetNxCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "setnx",
            ...cmd
        ], opts);
    }
};
// pkg/commands/setrange.ts
var SetRangeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "setrange",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sinter.ts
var SInterCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sinter",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sinterstore.ts
var SInterStoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sinterstore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sismember.ts
var SIsMemberCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sismember",
            ...cmd
        ], opts);
    }
};
// pkg/commands/smembers.ts
var SMembersCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "smembers",
            ...cmd
        ], opts);
    }
};
// pkg/commands/smismember.ts
var SMIsMemberCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "smismember",
            cmd[0],
            ...cmd[1]
        ], opts);
    }
};
// pkg/commands/smove.ts
var SMoveCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "smove",
            ...cmd
        ], opts);
    }
};
// pkg/commands/spop.ts
var SPopCommand = class extends Command {
    constructor([key, count], opts){
        const command = [
            "spop",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
};
// pkg/commands/srandmember.ts
var SRandMemberCommand = class extends Command {
    constructor([key, count], opts){
        const command = [
            "srandmember",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
};
// pkg/commands/srem.ts
var SRemCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "srem",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sscan.ts
var SScanCommand = class extends Command {
    constructor([key, cursor, opts], cmdOpts){
        const command = [
            "sscan",
            key,
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        super(command, {
            deserialize: deserializeScanResponse,
            ...cmdOpts
        });
    }
};
// pkg/commands/strlen.ts
var StrLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "strlen",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sunion.ts
var SUnionCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sunion",
            ...cmd
        ], opts);
    }
};
// pkg/commands/sunionstore.ts
var SUnionStoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "sunionstore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/time.ts
var TimeCommand = class extends Command {
    constructor(opts){
        super([
            "time"
        ], opts);
    }
};
// pkg/commands/touch.ts
var TouchCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "touch",
            ...cmd
        ], opts);
    }
};
// pkg/commands/ttl.ts
var TtlCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "ttl",
            ...cmd
        ], opts);
    }
};
// pkg/commands/type.ts
var TypeCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "type",
            ...cmd
        ], opts);
    }
};
// pkg/commands/unlink.ts
var UnlinkCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "unlink",
            ...cmd
        ], opts);
    }
};
// pkg/commands/xack.ts
var XAckCommand = class extends Command {
    constructor([key, group, id], opts){
        const ids = Array.isArray(id) ? [
            ...id
        ] : [
            id
        ];
        super([
            "XACK",
            key,
            group,
            ...ids
        ], opts);
    }
};
// pkg/commands/xadd.ts
var XAddCommand = class extends Command {
    constructor([key, id, entries, opts], commandOptions){
        const command = [
            "XADD",
            key
        ];
        if (opts) {
            if (opts.nomkStream) {
                command.push("NOMKSTREAM");
            }
            if (opts.trim) {
                command.push(opts.trim.type, opts.trim.comparison, opts.trim.threshold);
                if (opts.trim.limit !== void 0) {
                    command.push("LIMIT", opts.trim.limit);
                }
            }
        }
        command.push(id);
        for (const [k, v] of Object.entries(entries)){
            command.push(k, v);
        }
        super(command, commandOptions);
    }
};
// pkg/commands/xautoclaim.ts
var XAutoClaim = class extends Command {
    constructor([key, group, consumer, minIdleTime, start, options], opts){
        const commands = [];
        if (options?.count) {
            commands.push("COUNT", options.count);
        }
        if (options?.justId) {
            commands.push("JUSTID");
        }
        super([
            "XAUTOCLAIM",
            key,
            group,
            consumer,
            minIdleTime,
            start,
            ...commands
        ], opts);
    }
};
// pkg/commands/xclaim.ts
var XClaimCommand = class extends Command {
    constructor([key, group, consumer, minIdleTime, id, options], opts){
        const ids = Array.isArray(id) ? [
            ...id
        ] : [
            id
        ];
        const commands = [];
        if (options?.idleMS) {
            commands.push("IDLE", options.idleMS);
        }
        if (options?.idleMS) {
            commands.push("TIME", options.timeMS);
        }
        if (options?.retryCount) {
            commands.push("RETRYCOUNT", options.retryCount);
        }
        if (options?.force) {
            commands.push("FORCE");
        }
        if (options?.justId) {
            commands.push("JUSTID");
        }
        if (options?.lastId) {
            commands.push("LASTID", options.lastId);
        }
        super([
            "XCLAIM",
            key,
            group,
            consumer,
            minIdleTime,
            ...ids,
            ...commands
        ], opts);
    }
};
// pkg/commands/xdel.ts
var XDelCommand = class extends Command {
    constructor([key, ids], opts){
        const cmds = Array.isArray(ids) ? [
            ...ids
        ] : [
            ids
        ];
        super([
            "XDEL",
            key,
            ...cmds
        ], opts);
    }
};
// pkg/commands/xgroup.ts
var XGroupCommand = class extends Command {
    constructor([key, opts], commandOptions){
        const command = [
            "XGROUP"
        ];
        switch(opts.type){
            case "CREATE":
                {
                    command.push("CREATE", key, opts.group, opts.id);
                    if (opts.options) {
                        if (opts.options.MKSTREAM) {
                            command.push("MKSTREAM");
                        }
                        if (opts.options.ENTRIESREAD !== void 0) {
                            command.push("ENTRIESREAD", opts.options.ENTRIESREAD.toString());
                        }
                    }
                    break;
                }
            case "CREATECONSUMER":
                {
                    command.push("CREATECONSUMER", key, opts.group, opts.consumer);
                    break;
                }
            case "DELCONSUMER":
                {
                    command.push("DELCONSUMER", key, opts.group, opts.consumer);
                    break;
                }
            case "DESTROY":
                {
                    command.push("DESTROY", key, opts.group);
                    break;
                }
            case "SETID":
                {
                    command.push("SETID", key, opts.group, opts.id);
                    if (opts.options?.ENTRIESREAD !== void 0) {
                        command.push("ENTRIESREAD", opts.options.ENTRIESREAD.toString());
                    }
                    break;
                }
            default:
                {
                    throw new Error("Invalid XGROUP");
                }
        }
        super(command, commandOptions);
    }
};
// pkg/commands/xinfo.ts
var XInfoCommand = class extends Command {
    constructor([key, options], opts){
        const cmds = [];
        if (options.type === "CONSUMERS") {
            cmds.push("CONSUMERS", key, options.group);
        } else {
            cmds.push("GROUPS", key);
        }
        super([
            "XINFO",
            ...cmds
        ], opts);
    }
};
// pkg/commands/xlen.ts
var XLenCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "XLEN",
            ...cmd
        ], opts);
    }
};
// pkg/commands/xpending.ts
var XPendingCommand = class extends Command {
    constructor([key, group, start, end, count, options], opts){
        const consumers = options?.consumer === void 0 ? [] : Array.isArray(options.consumer) ? [
            ...options.consumer
        ] : [
            options.consumer
        ];
        super([
            "XPENDING",
            key,
            group,
            ...options?.idleTime ? [
                "IDLE",
                options.idleTime
            ] : [],
            start,
            end,
            count,
            ...consumers
        ], opts);
    }
};
// pkg/commands/xrange.ts
function deserialize4(result) {
    const obj = {};
    for (const e of result){
        while(e.length >= 2){
            const streamId = e.shift();
            const entries = e.shift();
            if (!(streamId in obj)) {
                obj[streamId] = {};
            }
            while(entries.length >= 2){
                const field = entries.shift();
                const value = entries.shift();
                try {
                    obj[streamId][field] = JSON.parse(value);
                } catch  {
                    obj[streamId][field] = value;
                }
            }
        }
    }
    return obj;
}
var XRangeCommand = class extends Command {
    constructor([key, start, end, count], opts){
        const command = [
            "XRANGE",
            key,
            start,
            end
        ];
        if (typeof count === "number") {
            command.push("COUNT", count);
        }
        super(command, {
            deserialize: (result)=>deserialize4(result),
            ...opts
        });
    }
};
// pkg/commands/xread.ts
var UNBALANCED_XREAD_ERR = "ERR Unbalanced XREAD list of streams: for each stream key an ID or '$' must be specified";
var XReadCommand = class extends Command {
    constructor([key, id, options], opts){
        if (Array.isArray(key) && Array.isArray(id) && key.length !== id.length) {
            throw new Error(UNBALANCED_XREAD_ERR);
        }
        const commands = [];
        if (typeof options?.count === "number") {
            commands.push("COUNT", options.count);
        }
        if (typeof options?.blockMS === "number") {
            commands.push("BLOCK", options.blockMS);
        }
        commands.push("STREAMS", ...Array.isArray(key) ? [
            ...key
        ] : [
            key
        ], ...Array.isArray(id) ? [
            ...id
        ] : [
            id
        ]);
        super([
            "XREAD",
            ...commands
        ], opts);
    }
};
// pkg/commands/xreadgroup.ts
var UNBALANCED_XREADGROUP_ERR = "ERR Unbalanced XREADGROUP list of streams: for each stream key an ID or '$' must be specified";
var XReadGroupCommand = class extends Command {
    constructor([group, consumer, key, id, options], opts){
        if (Array.isArray(key) && Array.isArray(id) && key.length !== id.length) {
            throw new Error(UNBALANCED_XREADGROUP_ERR);
        }
        const commands = [];
        if (typeof options?.count === "number") {
            commands.push("COUNT", options.count);
        }
        if (typeof options?.blockMS === "number") {
            commands.push("BLOCK", options.blockMS);
        }
        if (typeof options?.NOACK === "boolean" && options.NOACK) {
            commands.push("NOACK");
        }
        commands.push("STREAMS", ...Array.isArray(key) ? [
            ...key
        ] : [
            key
        ], ...Array.isArray(id) ? [
            ...id
        ] : [
            id
        ]);
        super([
            "XREADGROUP",
            "GROUP",
            group,
            consumer,
            ...commands
        ], opts);
    }
};
// pkg/commands/xrevrange.ts
var XRevRangeCommand = class extends Command {
    constructor([key, end, start, count], opts){
        const command = [
            "XREVRANGE",
            key,
            end,
            start
        ];
        if (typeof count === "number") {
            command.push("COUNT", count);
        }
        super(command, {
            deserialize: (result)=>deserialize5(result),
            ...opts
        });
    }
};
function deserialize5(result) {
    const obj = {};
    for (const e of result){
        while(e.length >= 2){
            const streamId = e.shift();
            const entries = e.shift();
            if (!(streamId in obj)) {
                obj[streamId] = {};
            }
            while(entries.length >= 2){
                const field = entries.shift();
                const value = entries.shift();
                try {
                    obj[streamId][field] = JSON.parse(value);
                } catch  {
                    obj[streamId][field] = value;
                }
            }
        }
    }
    return obj;
}
// pkg/commands/xtrim.ts
var XTrimCommand = class extends Command {
    constructor([key, options], opts){
        const { limit, strategy, threshold, exactness = "~" } = options;
        super([
            "XTRIM",
            key,
            strategy,
            exactness,
            threshold,
            ...limit ? [
                "LIMIT",
                limit
            ] : []
        ], opts);
    }
};
// pkg/commands/zadd.ts
var ZAddCommand = class extends Command {
    constructor([key, arg1, ...arg2], opts){
        const command = [
            "zadd",
            key
        ];
        if ("nx" in arg1 && arg1.nx) {
            command.push("nx");
        } else if ("xx" in arg1 && arg1.xx) {
            command.push("xx");
        }
        if ("ch" in arg1 && arg1.ch) {
            command.push("ch");
        }
        if ("incr" in arg1 && arg1.incr) {
            command.push("incr");
        }
        if ("lt" in arg1 && arg1.lt) {
            command.push("lt");
        } else if ("gt" in arg1 && arg1.gt) {
            command.push("gt");
        }
        if ("score" in arg1 && "member" in arg1) {
            command.push(arg1.score, arg1.member);
        }
        command.push(...arg2.flatMap(({ score, member })=>[
                score,
                member
            ]));
        super(command, opts);
    }
};
// pkg/commands/zcard.ts
var ZCardCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zcard",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zcount.ts
var ZCountCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zcount",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zincrby.ts
var ZIncrByCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zincrby",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zinterstore.ts
var ZInterStoreCommand = class extends Command {
    constructor([destination, numKeys, keyOrKeys, opts], cmdOpts){
        const command = [
            "zinterstore",
            destination,
            numKeys
        ];
        if (Array.isArray(keyOrKeys)) {
            command.push(...keyOrKeys);
        } else {
            command.push(keyOrKeys);
        }
        if (opts) {
            if ("weights" in opts && opts.weights) {
                command.push("weights", ...opts.weights);
            } else if ("weight" in opts && typeof opts.weight === "number") {
                command.push("weights", opts.weight);
            }
            if ("aggregate" in opts) {
                command.push("aggregate", opts.aggregate);
            }
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/zlexcount.ts
var ZLexCountCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zlexcount",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zpopmax.ts
var ZPopMaxCommand = class extends Command {
    constructor([key, count], opts){
        const command = [
            "zpopmax",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
};
// pkg/commands/zpopmin.ts
var ZPopMinCommand = class extends Command {
    constructor([key, count], opts){
        const command = [
            "zpopmin",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
};
// pkg/commands/zrange.ts
var ZRangeCommand = class extends Command {
    constructor([key, min, max, opts], cmdOpts){
        const command = [
            "zrange",
            key,
            min,
            max
        ];
        if (opts?.byScore) {
            command.push("byscore");
        }
        if (opts?.byLex) {
            command.push("bylex");
        }
        if (opts?.rev) {
            command.push("rev");
        }
        if (opts?.count !== void 0 && opts.offset !== void 0) {
            command.push("limit", opts.offset, opts.count);
        }
        if (opts?.withScores) {
            command.push("withscores");
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/zrank.ts
var ZRankCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zrank",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zrem.ts
var ZRemCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zrem",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zremrangebylex.ts
var ZRemRangeByLexCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebylex",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zremrangebyrank.ts
var ZRemRangeByRankCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebyrank",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zremrangebyscore.ts
var ZRemRangeByScoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebyscore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zrevrank.ts
var ZRevRankCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zrevrank",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zscan.ts
var ZScanCommand = class extends Command {
    constructor([key, cursor, opts], cmdOpts){
        const command = [
            "zscan",
            key,
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        super(command, {
            deserialize: deserializeScanResponse,
            ...cmdOpts
        });
    }
};
// pkg/commands/zscore.ts
var ZScoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zscore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zunion.ts
var ZUnionCommand = class extends Command {
    constructor([numKeys, keyOrKeys, opts], cmdOpts){
        const command = [
            "zunion",
            numKeys
        ];
        if (Array.isArray(keyOrKeys)) {
            command.push(...keyOrKeys);
        } else {
            command.push(keyOrKeys);
        }
        if (opts) {
            if ("weights" in opts && opts.weights) {
                command.push("weights", ...opts.weights);
            } else if ("weight" in opts && typeof opts.weight === "number") {
                command.push("weights", opts.weight);
            }
            if ("aggregate" in opts) {
                command.push("aggregate", opts.aggregate);
            }
            if (opts.withScores) {
                command.push("withscores");
            }
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/zunionstore.ts
var ZUnionStoreCommand = class extends Command {
    constructor([destination, numKeys, keyOrKeys, opts], cmdOpts){
        const command = [
            "zunionstore",
            destination,
            numKeys
        ];
        if (Array.isArray(keyOrKeys)) {
            command.push(...keyOrKeys);
        } else {
            command.push(keyOrKeys);
        }
        if (opts) {
            if ("weights" in opts && opts.weights) {
                command.push("weights", ...opts.weights);
            } else if ("weight" in opts && typeof opts.weight === "number") {
                command.push("weights", opts.weight);
            }
            if ("aggregate" in opts) {
                command.push("aggregate", opts.aggregate);
            }
        }
        super(command, cmdOpts);
    }
};
// pkg/commands/zdiffstore.ts
var ZDiffStoreCommand = class extends Command {
    constructor(cmd, opts){
        super([
            "zdiffstore",
            ...cmd
        ], opts);
    }
};
// pkg/commands/zmscore.ts
var ZMScoreCommand = class extends Command {
    constructor(cmd, opts){
        const [key, members] = cmd;
        super([
            "zmscore",
            key,
            ...members
        ], opts);
    }
};
// pkg/pipeline.ts
var Pipeline = class {
    constructor(opts){
        this.exec = async (options)=>{
            if (this.commands.length === 0) {
                throw new Error("Pipeline is empty");
            }
            const path = this.multiExec ? [
                "multi-exec"
            ] : [
                "pipeline"
            ];
            const res = await this.client.request({
                path,
                body: Object.values(this.commands).map((c)=>c.command)
            });
            return options?.keepErrors ? res.map(({ error, result }, i)=>{
                return {
                    error,
                    result: this.commands[i].deserialize(result)
                };
            }) : res.map(({ error, result }, i)=>{
                if (error) {
                    throw new UpstashError(`Command ${i + 1} [ ${this.commands[i].command[0]} ] failed: ${error}`);
                }
                return this.commands[i].deserialize(result);
            });
        };
        /**
   * @see https://redis.io/commands/append
   */ this.append = (...args)=>this.chain(new AppendCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/bitcount
   */ this.bitcount = (...args)=>this.chain(new BitCountCommand(args, this.commandOptions));
        /**
   * Returns an instance that can be used to execute `BITFIELD` commands on one key.
   *
   * @example
   * ```typescript
   * redis.set("mykey", 0);
   * const result = await redis.pipeline()
   *   .bitfield("mykey")
   *   .set("u4", 0, 16)
   *   .incr("u4", "#1", 1)
   *   .exec();
   * console.log(result); // [[0, 1]]
   * ```
   *
   * @see https://redis.io/commands/bitfield
   */ this.bitfield = (...args)=>new BitFieldCommand(args, this.client, this.commandOptions, this.chain.bind(this));
        /**
   * @see https://redis.io/commands/bitop
   */ this.bitop = (op, destinationKey, sourceKey, ...sourceKeys)=>this.chain(new BitOpCommand([
                op,
                destinationKey,
                sourceKey,
                ...sourceKeys
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/bitpos
   */ this.bitpos = (...args)=>this.chain(new BitPosCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/copy
   */ this.copy = (...args)=>this.chain(new CopyCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zdiffstore
   */ this.zdiffstore = (...args)=>this.chain(new ZDiffStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/dbsize
   */ this.dbsize = ()=>this.chain(new DBSizeCommand(this.commandOptions));
        /**
   * @see https://redis.io/commands/decr
   */ this.decr = (...args)=>this.chain(new DecrCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/decrby
   */ this.decrby = (...args)=>this.chain(new DecrByCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/del
   */ this.del = (...args)=>this.chain(new DelCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/echo
   */ this.echo = (...args)=>this.chain(new EchoCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/eval
   */ this.eval = (...args)=>this.chain(new EvalCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/evalsha
   */ this.evalsha = (...args)=>this.chain(new EvalshaCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/exists
   */ this.exists = (...args)=>this.chain(new ExistsCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/expire
   */ this.expire = (...args)=>this.chain(new ExpireCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/expireat
   */ this.expireat = (...args)=>this.chain(new ExpireAtCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/flushall
   */ this.flushall = (args)=>this.chain(new FlushAllCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/flushdb
   */ this.flushdb = (...args)=>this.chain(new FlushDBCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geoadd
   */ this.geoadd = (...args)=>this.chain(new GeoAddCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geodist
   */ this.geodist = (...args)=>this.chain(new GeoDistCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geopos
   */ this.geopos = (...args)=>this.chain(new GeoPosCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geohash
   */ this.geohash = (...args)=>this.chain(new GeoHashCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geosearch
   */ this.geosearch = (...args)=>this.chain(new GeoSearchCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/geosearchstore
   */ this.geosearchstore = (...args)=>this.chain(new GeoSearchStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/get
   */ this.get = (...args)=>this.chain(new GetCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/getbit
   */ this.getbit = (...args)=>this.chain(new GetBitCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/getdel
   */ this.getdel = (...args)=>this.chain(new GetDelCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/getex
   */ this.getex = (...args)=>this.chain(new GetExCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/getrange
   */ this.getrange = (...args)=>this.chain(new GetRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/getset
   */ this.getset = (key, value)=>this.chain(new GetSetCommand([
                key,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/hdel
   */ this.hdel = (...args)=>this.chain(new HDelCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hexists
   */ this.hexists = (...args)=>this.chain(new HExistsCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hget
   */ this.hget = (...args)=>this.chain(new HGetCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hgetall
   */ this.hgetall = (...args)=>this.chain(new HGetAllCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hincrby
   */ this.hincrby = (...args)=>this.chain(new HIncrByCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hincrbyfloat
   */ this.hincrbyfloat = (...args)=>this.chain(new HIncrByFloatCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hkeys
   */ this.hkeys = (...args)=>this.chain(new HKeysCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hlen
   */ this.hlen = (...args)=>this.chain(new HLenCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hmget
   */ this.hmget = (...args)=>this.chain(new HMGetCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hmset
   */ this.hmset = (key, kv)=>this.chain(new HMSetCommand([
                key,
                kv
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/hrandfield
   */ this.hrandfield = (key, count, withValues)=>this.chain(new HRandFieldCommand([
                key,
                count,
                withValues
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/hscan
   */ this.hscan = (...args)=>this.chain(new HScanCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hset
   */ this.hset = (key, kv)=>this.chain(new HSetCommand([
                key,
                kv
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/hsetnx
   */ this.hsetnx = (key, field, value)=>this.chain(new HSetNXCommand([
                key,
                field,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/hstrlen
   */ this.hstrlen = (...args)=>this.chain(new HStrLenCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/hvals
   */ this.hvals = (...args)=>this.chain(new HValsCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/incr
   */ this.incr = (...args)=>this.chain(new IncrCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/incrby
   */ this.incrby = (...args)=>this.chain(new IncrByCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/incrbyfloat
   */ this.incrbyfloat = (...args)=>this.chain(new IncrByFloatCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/keys
   */ this.keys = (...args)=>this.chain(new KeysCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lindex
   */ this.lindex = (...args)=>this.chain(new LIndexCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/linsert
   */ this.linsert = (key, direction, pivot, value)=>this.chain(new LInsertCommand([
                key,
                direction,
                pivot,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/llen
   */ this.llen = (...args)=>this.chain(new LLenCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lmove
   */ this.lmove = (...args)=>this.chain(new LMoveCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lpop
   */ this.lpop = (...args)=>this.chain(new LPopCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lmpop
   */ this.lmpop = (...args)=>this.chain(new LmPopCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lpos
   */ this.lpos = (...args)=>this.chain(new LPosCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lpush
   */ this.lpush = (key, ...elements)=>this.chain(new LPushCommand([
                key,
                ...elements
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/lpushx
   */ this.lpushx = (key, ...elements)=>this.chain(new LPushXCommand([
                key,
                ...elements
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/lrange
   */ this.lrange = (...args)=>this.chain(new LRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/lrem
   */ this.lrem = (key, count, value)=>this.chain(new LRemCommand([
                key,
                count,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/lset
   */ this.lset = (key, index, value)=>this.chain(new LSetCommand([
                key,
                index,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/ltrim
   */ this.ltrim = (...args)=>this.chain(new LTrimCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/mget
   */ this.mget = (...args)=>this.chain(new MGetCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/mset
   */ this.mset = (kv)=>this.chain(new MSetCommand([
                kv
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/msetnx
   */ this.msetnx = (kv)=>this.chain(new MSetNXCommand([
                kv
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/persist
   */ this.persist = (...args)=>this.chain(new PersistCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/pexpire
   */ this.pexpire = (...args)=>this.chain(new PExpireCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/pexpireat
   */ this.pexpireat = (...args)=>this.chain(new PExpireAtCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/pfadd
   */ this.pfadd = (...args)=>this.chain(new PfAddCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/pfcount
   */ this.pfcount = (...args)=>this.chain(new PfCountCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/pfmerge
   */ this.pfmerge = (...args)=>this.chain(new PfMergeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/ping
   */ this.ping = (args)=>this.chain(new PingCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/psetex
   */ this.psetex = (key, ttl, value)=>this.chain(new PSetEXCommand([
                key,
                ttl,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/pttl
   */ this.pttl = (...args)=>this.chain(new PTtlCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/publish
   */ this.publish = (...args)=>this.chain(new PublishCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/randomkey
   */ this.randomkey = ()=>this.chain(new RandomKeyCommand(this.commandOptions));
        /**
   * @see https://redis.io/commands/rename
   */ this.rename = (...args)=>this.chain(new RenameCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/renamenx
   */ this.renamenx = (...args)=>this.chain(new RenameNXCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/rpop
   */ this.rpop = (...args)=>this.chain(new RPopCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/rpush
   */ this.rpush = (key, ...elements)=>this.chain(new RPushCommand([
                key,
                ...elements
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/rpushx
   */ this.rpushx = (key, ...elements)=>this.chain(new RPushXCommand([
                key,
                ...elements
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/sadd
   */ this.sadd = (key, member, ...members)=>this.chain(new SAddCommand([
                key,
                member,
                ...members
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/scan
   */ this.scan = (...args)=>this.chain(new ScanCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/scard
   */ this.scard = (...args)=>this.chain(new SCardCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/script-exists
   */ this.scriptExists = (...args)=>this.chain(new ScriptExistsCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/script-flush
   */ this.scriptFlush = (...args)=>this.chain(new ScriptFlushCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/script-load
   */ this.scriptLoad = (...args)=>this.chain(new ScriptLoadCommand(args, this.commandOptions));
        /*)*
   * @see https://redis.io/commands/sdiff
   */ this.sdiff = (...args)=>this.chain(new SDiffCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sdiffstore
   */ this.sdiffstore = (...args)=>this.chain(new SDiffStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/set
   */ this.set = (key, value, opts)=>this.chain(new SetCommand([
                key,
                value,
                opts
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/setbit
   */ this.setbit = (...args)=>this.chain(new SetBitCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/setex
   */ this.setex = (key, ttl, value)=>this.chain(new SetExCommand([
                key,
                ttl,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/setnx
   */ this.setnx = (key, value)=>this.chain(new SetNxCommand([
                key,
                value
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/setrange
   */ this.setrange = (...args)=>this.chain(new SetRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sinter
   */ this.sinter = (...args)=>this.chain(new SInterCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sinterstore
   */ this.sinterstore = (...args)=>this.chain(new SInterStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sismember
   */ this.sismember = (key, member)=>this.chain(new SIsMemberCommand([
                key,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/smembers
   */ this.smembers = (...args)=>this.chain(new SMembersCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/smismember
   */ this.smismember = (key, members)=>this.chain(new SMIsMemberCommand([
                key,
                members
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/smove
   */ this.smove = (source, destination, member)=>this.chain(new SMoveCommand([
                source,
                destination,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/spop
   */ this.spop = (...args)=>this.chain(new SPopCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/srandmember
   */ this.srandmember = (...args)=>this.chain(new SRandMemberCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/srem
   */ this.srem = (key, ...members)=>this.chain(new SRemCommand([
                key,
                ...members
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/sscan
   */ this.sscan = (...args)=>this.chain(new SScanCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/strlen
   */ this.strlen = (...args)=>this.chain(new StrLenCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sunion
   */ this.sunion = (...args)=>this.chain(new SUnionCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/sunionstore
   */ this.sunionstore = (...args)=>this.chain(new SUnionStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/time
   */ this.time = ()=>this.chain(new TimeCommand(this.commandOptions));
        /**
   * @see https://redis.io/commands/touch
   */ this.touch = (...args)=>this.chain(new TouchCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/ttl
   */ this.ttl = (...args)=>this.chain(new TtlCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/type
   */ this.type = (...args)=>this.chain(new TypeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/unlink
   */ this.unlink = (...args)=>this.chain(new UnlinkCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zadd
   */ this.zadd = (...args)=>{
            if ("score" in args[1]) {
                return this.chain(new ZAddCommand([
                    args[0],
                    args[1],
                    ...args.slice(2)
                ], this.commandOptions));
            }
            return this.chain(new ZAddCommand([
                args[0],
                args[1],
                ...args.slice(2)
            ], this.commandOptions));
        };
        /**
   * @see https://redis.io/commands/xadd
   */ this.xadd = (...args)=>this.chain(new XAddCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xack
   */ this.xack = (...args)=>this.chain(new XAckCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xdel
   */ this.xdel = (...args)=>this.chain(new XDelCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xgroup
   */ this.xgroup = (...args)=>this.chain(new XGroupCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xread
   */ this.xread = (...args)=>this.chain(new XReadCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xreadgroup
   */ this.xreadgroup = (...args)=>this.chain(new XReadGroupCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xinfo
   */ this.xinfo = (...args)=>this.chain(new XInfoCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xlen
   */ this.xlen = (...args)=>this.chain(new XLenCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xpending
   */ this.xpending = (...args)=>this.chain(new XPendingCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xclaim
   */ this.xclaim = (...args)=>this.chain(new XClaimCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xautoclaim
   */ this.xautoclaim = (...args)=>this.chain(new XAutoClaim(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xtrim
   */ this.xtrim = (...args)=>this.chain(new XTrimCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xrange
   */ this.xrange = (...args)=>this.chain(new XRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/xrevrange
   */ this.xrevrange = (...args)=>this.chain(new XRevRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zcard
   */ this.zcard = (...args)=>this.chain(new ZCardCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zcount
   */ this.zcount = (...args)=>this.chain(new ZCountCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zincrby
   */ this.zincrby = (key, increment, member)=>this.chain(new ZIncrByCommand([
                key,
                increment,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/zinterstore
   */ this.zinterstore = (...args)=>this.chain(new ZInterStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zlexcount
   */ this.zlexcount = (...args)=>this.chain(new ZLexCountCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zmscore
   */ this.zmscore = (...args)=>this.chain(new ZMScoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zpopmax
   */ this.zpopmax = (...args)=>this.chain(new ZPopMaxCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zpopmin
   */ this.zpopmin = (...args)=>this.chain(new ZPopMinCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zrange
   */ this.zrange = (...args)=>this.chain(new ZRangeCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zrank
   */ this.zrank = (key, member)=>this.chain(new ZRankCommand([
                key,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/zrem
   */ this.zrem = (key, ...members)=>this.chain(new ZRemCommand([
                key,
                ...members
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/zremrangebylex
   */ this.zremrangebylex = (...args)=>this.chain(new ZRemRangeByLexCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zremrangebyrank
   */ this.zremrangebyrank = (...args)=>this.chain(new ZRemRangeByRankCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zremrangebyscore
   */ this.zremrangebyscore = (...args)=>this.chain(new ZRemRangeByScoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zrevrank
   */ this.zrevrank = (key, member)=>this.chain(new ZRevRankCommand([
                key,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/zscan
   */ this.zscan = (...args)=>this.chain(new ZScanCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zscore
   */ this.zscore = (key, member)=>this.chain(new ZScoreCommand([
                key,
                member
            ], this.commandOptions));
        /**
   * @see https://redis.io/commands/zunionstore
   */ this.zunionstore = (...args)=>this.chain(new ZUnionStoreCommand(args, this.commandOptions));
        /**
   * @see https://redis.io/commands/zunion
   */ this.zunion = (...args)=>this.chain(new ZUnionCommand(args, this.commandOptions));
        this.client = opts.client;
        this.commands = [];
        this.commandOptions = opts.commandOptions;
        this.multiExec = opts.multiExec ?? false;
        if (this.commandOptions?.latencyLogging) {
            const originalExec = this.exec.bind(this);
            this.exec = async (options)=>{
                const start = performance.now();
                const result = await (options ? originalExec(options) : originalExec());
                const end = performance.now();
                const loggerResult = (end - start).toFixed(2);
                console.log(`Latency for \x1B[38;2;19;185;39m${this.multiExec ? [
                    "MULTI-EXEC"
                ] : [
                    "PIPELINE"
                ].toString().toUpperCase()}\x1B[0m: \x1B[38;2;0;255;255m${loggerResult} ms\x1B[0m`);
                return result;
            };
        }
    }
    /**
   * Returns the length of pipeline before the execution
   */ length() {
        return this.commands.length;
    }
    /**
   * Pushes a command into the pipeline and returns a chainable instance of the
   * pipeline
   */ chain(command) {
        this.commands.push(command);
        return this;
    }
    /**
   * @see https://redis.io/commands/?group=json
   */ get json() {
        return {
            /**
       * @see https://redis.io/commands/json.arrappend
       */ arrappend: (...args)=>this.chain(new JsonArrAppendCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.arrindex
       */ arrindex: (...args)=>this.chain(new JsonArrIndexCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.arrinsert
       */ arrinsert: (...args)=>this.chain(new JsonArrInsertCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.arrlen
       */ arrlen: (...args)=>this.chain(new JsonArrLenCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.arrpop
       */ arrpop: (...args)=>this.chain(new JsonArrPopCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.arrtrim
       */ arrtrim: (...args)=>this.chain(new JsonArrTrimCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.clear
       */ clear: (...args)=>this.chain(new JsonClearCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.del
       */ del: (...args)=>this.chain(new JsonDelCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.forget
       */ forget: (...args)=>this.chain(new JsonForgetCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.get
       */ get: (...args)=>this.chain(new JsonGetCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.mget
       */ mget: (...args)=>this.chain(new JsonMGetCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.mset
       */ mset: (...args)=>this.chain(new JsonMSetCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.numincrby
       */ numincrby: (...args)=>this.chain(new JsonNumIncrByCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.nummultby
       */ nummultby: (...args)=>this.chain(new JsonNumMultByCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.objkeys
       */ objkeys: (...args)=>this.chain(new JsonObjKeysCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.objlen
       */ objlen: (...args)=>this.chain(new JsonObjLenCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.resp
       */ resp: (...args)=>this.chain(new JsonRespCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.set
       */ set: (...args)=>this.chain(new JsonSetCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.strappend
       */ strappend: (...args)=>this.chain(new JsonStrAppendCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.strlen
       */ strlen: (...args)=>this.chain(new JsonStrLenCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.toggle
       */ toggle: (...args)=>this.chain(new JsonToggleCommand(args, this.commandOptions)),
            /**
       * @see https://redis.io/commands/json.type
       */ type: (...args)=>this.chain(new JsonTypeCommand(args, this.commandOptions))
        };
    }
};
// pkg/auto-pipeline.ts
function createAutoPipelineProxy(_redis, json) {
    const redis = _redis;
    if (!redis.autoPipelineExecutor) {
        redis.autoPipelineExecutor = new AutoPipelineExecutor(redis);
    }
    return new Proxy(redis, {
        get: (redis2, command)=>{
            if (command === "pipelineCounter") {
                return redis2.autoPipelineExecutor.pipelineCounter;
            }
            if (command === "json") {
                return createAutoPipelineProxy(redis2, true);
            }
            const commandInRedisButNotPipeline = command in redis2 && !(command in redis2.autoPipelineExecutor.pipeline);
            if (commandInRedisButNotPipeline) {
                return redis2[command];
            }
            const isFunction = json ? typeof redis2.autoPipelineExecutor.pipeline.json[command] === "function" : typeof redis2.autoPipelineExecutor.pipeline[command] === "function";
            if (isFunction) {
                return (...args)=>{
                    return redis2.autoPipelineExecutor.withAutoPipeline((pipeline)=>{
                        if (json) {
                            pipeline.json[command](...args);
                        } else {
                            pipeline[command](...args);
                        }
                    });
                };
            }
            return redis2.autoPipelineExecutor.pipeline[command];
        }
    });
}
var AutoPipelineExecutor = class {
    // to keep track of how many times a pipeline was executed
    constructor(redis){
        this.pipelinePromises = /* @__PURE__ */ new WeakMap();
        this.activePipeline = null;
        this.indexInCurrentPipeline = 0;
        // only to make sure that proxy can work
        this.pipelineCounter = 0;
        this.redis = redis;
        this.pipeline = redis.pipeline();
    }
    async withAutoPipeline(executeWithPipeline) {
        const pipeline = this.activePipeline ?? this.redis.pipeline();
        if (!this.activePipeline) {
            this.activePipeline = pipeline;
            this.indexInCurrentPipeline = 0;
        }
        const index = this.indexInCurrentPipeline++;
        executeWithPipeline(pipeline);
        const pipelineDone = this.deferExecution().then(()=>{
            if (!this.pipelinePromises.has(pipeline)) {
                const pipelinePromise = pipeline.exec({
                    keepErrors: true
                });
                this.pipelineCounter += 1;
                this.pipelinePromises.set(pipeline, pipelinePromise);
                this.activePipeline = null;
            }
            return this.pipelinePromises.get(pipeline);
        });
        const results = await pipelineDone;
        const commandResult = results[index];
        if (commandResult.error) {
            throw new UpstashError(`Command failed: ${commandResult.error}`);
        }
        return commandResult.result;
    }
    async deferExecution() {
        await Promise.resolve();
        await Promise.resolve();
    }
};
// pkg/commands/psubscribe.ts
var PSubscribeCommand = class extends Command {
    constructor(cmd, opts){
        const sseHeaders = {
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
        };
        super([], {
            ...opts,
            headers: sseHeaders,
            path: [
                "psubscribe",
                ...cmd
            ],
            streamOptions: {
                isStreaming: true,
                onMessage: opts?.streamOptions?.onMessage,
                signal: opts?.streamOptions?.signal
            }
        });
    }
};
// pkg/commands/subscribe.ts
var Subscriber = class extends EventTarget {
    constructor(client, channels, isPattern = false){
        super();
        this.client = client;
        this.subscriptions = /* @__PURE__ */ new Map();
        this.listeners = /* @__PURE__ */ new Map();
        for (const channel of channels){
            if (isPattern) {
                this.subscribeToPattern(channel);
            } else {
                this.subscribeToChannel(channel);
            }
        }
    }
    subscribeToChannel(channel) {
        const controller = new AbortController();
        const command = new SubscribeCommand([
            channel
        ], {
            streamOptions: {
                signal: controller.signal,
                onMessage: (data)=>this.handleMessage(data, false)
            }
        });
        command.exec(this.client).catch((error)=>{
            if (error.name !== "AbortError") {
                this.dispatchToListeners("error", error);
            }
        });
        this.subscriptions.set(channel, {
            command,
            controller,
            isPattern: false
        });
    }
    subscribeToPattern(pattern) {
        const controller = new AbortController();
        const command = new PSubscribeCommand([
            pattern
        ], {
            streamOptions: {
                signal: controller.signal,
                onMessage: (data)=>this.handleMessage(data, true)
            }
        });
        command.exec(this.client).catch((error)=>{
            if (error.name !== "AbortError") {
                this.dispatchToListeners("error", error);
            }
        });
        this.subscriptions.set(pattern, {
            command,
            controller,
            isPattern: true
        });
    }
    handleMessage(data, isPattern) {
        const messageData = data.replace(/^data:\s*/, "");
        const firstCommaIndex = messageData.indexOf(",");
        const secondCommaIndex = messageData.indexOf(",", firstCommaIndex + 1);
        const thirdCommaIndex = isPattern ? messageData.indexOf(",", secondCommaIndex + 1) : -1;
        if (firstCommaIndex !== -1 && secondCommaIndex !== -1) {
            const type = messageData.slice(0, firstCommaIndex);
            if (isPattern && type === "pmessage" && thirdCommaIndex !== -1) {
                const pattern = messageData.slice(firstCommaIndex + 1, secondCommaIndex);
                const channel = messageData.slice(secondCommaIndex + 1, thirdCommaIndex);
                const messageStr = messageData.slice(thirdCommaIndex + 1);
                try {
                    const message = JSON.parse(messageStr);
                    this.dispatchToListeners("pmessage", {
                        pattern,
                        channel,
                        message
                    });
                    this.dispatchToListeners(`pmessage:${pattern}`, {
                        pattern,
                        channel,
                        message
                    });
                } catch (error) {
                    this.dispatchToListeners("error", new Error(`Failed to parse message: ${error}`));
                }
            } else {
                const channel = messageData.slice(firstCommaIndex + 1, secondCommaIndex);
                const messageStr = messageData.slice(secondCommaIndex + 1);
                try {
                    if (type === "subscribe" || type === "psubscribe" || type === "unsubscribe" || type === "punsubscribe") {
                        const count = Number.parseInt(messageStr);
                        this.dispatchToListeners(type, count);
                    } else {
                        const message = JSON.parse(messageStr);
                        this.dispatchToListeners(type, {
                            channel,
                            message
                        });
                        this.dispatchToListeners(`${type}:${channel}`, {
                            channel,
                            message
                        });
                    }
                } catch (error) {
                    this.dispatchToListeners("error", new Error(`Failed to parse message: ${error}`));
                }
            }
        }
    }
    dispatchToListeners(type, data) {
        const listeners = this.listeners.get(type);
        if (listeners) {
            for (const listener of listeners){
                listener(data);
            }
        }
    }
    on(type, listener) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, /* @__PURE__ */ new Set());
        }
        this.listeners.get(type)?.add(listener);
    }
    removeAllListeners() {
        this.listeners.clear();
    }
    async unsubscribe(channels) {
        if (channels) {
            for (const channel of channels){
                const subscription = this.subscriptions.get(channel);
                if (subscription) {
                    try {
                        subscription.controller.abort();
                    } catch  {}
                    this.subscriptions.delete(channel);
                }
            }
        } else {
            for (const subscription of this.subscriptions.values()){
                try {
                    subscription.controller.abort();
                } catch  {}
            }
            this.subscriptions.clear();
            this.removeAllListeners();
        }
    }
    getSubscribedChannels() {
        return [
            ...this.subscriptions.keys()
        ];
    }
};
var SubscribeCommand = class extends Command {
    constructor(cmd, opts){
        const sseHeaders = {
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
        };
        super([], {
            ...opts,
            headers: sseHeaders,
            path: [
                "subscribe",
                ...cmd
            ],
            streamOptions: {
                isStreaming: true,
                onMessage: opts?.streamOptions?.onMessage,
                signal: opts?.streamOptions?.signal
            }
        });
    }
};
// pkg/script.ts


var Script = class {
    constructor(redis, script){
        this.redis = redis;
        this.sha1 = this.digest(script);
        this.script = script;
    }
    /**
   * Send an `EVAL` command to redis.
   */ async eval(keys, args) {
        return await this.redis.eval(this.script, keys, args);
    }
    /**
   * Calculates the sha1 hash of the script and then calls `EVALSHA`.
   */ async evalsha(keys, args) {
        return await this.redis.evalsha(this.sha1, keys, args);
    }
    /**
   * Optimistically try to run `EVALSHA` first.
   * If the script is not loaded in redis, it will fall back and try again with `EVAL`.
   *
   * Following calls will be able to use the cached script
   */ async exec(keys, args) {
        const res = await this.redis.evalsha(this.sha1, keys, args).catch(async (error)=>{
            if (error instanceof Error && error.message.toLowerCase().includes("noscript")) {
                return await this.redis.eval(this.script, keys, args);
            }
            throw error;
        });
        return res;
    }
    /**
   * Compute the sha1 hash of the script and return its hex representation.
   */ digest(s) {
        return enc_hex.stringify(sha1(s));
    }
};
// pkg/redis.ts
var Redis = class {
    /**
   * Create a new redis client
   *
   * @example
   * ```typescript
   * const redis = new Redis({
   *  url: "<UPSTASH_REDIS_REST_URL>",
   *  token: "<UPSTASH_REDIS_REST_TOKEN>",
   * });
   * ```
   */ constructor(client, opts){
        /**
   * Wrap a new middleware around the HTTP client.
   */ this.use = (middleware)=>{
            const makeRequest = this.client.request.bind(this.client);
            this.client.request = (req)=>middleware(req, makeRequest);
        };
        /**
   * Technically this is not private, we can hide it from intellisense by doing this
   */ this.addTelemetry = (telemetry)=>{
            if (!this.enableTelemetry) {
                return;
            }
            try {
                this.client.mergeTelemetry(telemetry);
            } catch  {}
        };
        /**
   * Create a new pipeline that allows you to send requests in bulk.
   *
   * @see {@link Pipeline}
   */ this.pipeline = ()=>new Pipeline({
                client: this.client,
                commandOptions: this.opts,
                multiExec: false
            });
        this.autoPipeline = ()=>{
            return createAutoPipelineProxy(this);
        };
        /**
   * Create a new transaction to allow executing multiple steps atomically.
   *
   * All the commands in a transaction are serialized and executed sequentially. A request sent by
   * another client will never be served in the middle of the execution of a Redis Transaction. This
   * guarantees that the commands are executed as a single isolated operation.
   *
   * @see {@link Pipeline}
   */ this.multi = ()=>new Pipeline({
                client: this.client,
                commandOptions: this.opts,
                multiExec: true
            });
        /**
   * Returns an instance that can be used to execute `BITFIELD` commands on one key.
   *
   * @example
   * ```typescript
   * redis.set("mykey", 0);
   * const result = await redis.bitfield("mykey")
   *   .set("u4", 0, 16)
   *   .incr("u4", "#1", 1)
   *   .exec();
   * console.log(result); // [0, 1]
   * ```
   *
   * @see https://redis.io/commands/bitfield
   */ this.bitfield = (...args)=>new BitFieldCommand(args, this.client, this.opts);
        /**
   * @see https://redis.io/commands/append
   */ this.append = (...args)=>new AppendCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/bitcount
   */ this.bitcount = (...args)=>new BitCountCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/bitop
   */ this.bitop = (op, destinationKey, sourceKey, ...sourceKeys)=>new BitOpCommand([
                op,
                destinationKey,
                sourceKey,
                ...sourceKeys
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/bitpos
   */ this.bitpos = (...args)=>new BitPosCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/copy
   */ this.copy = (...args)=>new CopyCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/dbsize
   */ this.dbsize = ()=>new DBSizeCommand(this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/decr
   */ this.decr = (...args)=>new DecrCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/decrby
   */ this.decrby = (...args)=>new DecrByCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/del
   */ this.del = (...args)=>new DelCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/echo
   */ this.echo = (...args)=>new EchoCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/eval
   */ this.eval = (...args)=>new EvalCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/evalsha
   */ this.evalsha = (...args)=>new EvalshaCommand(args, this.opts).exec(this.client);
        /**
   * Generic method to execute any Redis command.
   */ this.exec = (args)=>new ExecCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/exists
   */ this.exists = (...args)=>new ExistsCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/expire
   */ this.expire = (...args)=>new ExpireCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/expireat
   */ this.expireat = (...args)=>new ExpireAtCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/flushall
   */ this.flushall = (args)=>new FlushAllCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/flushdb
   */ this.flushdb = (...args)=>new FlushDBCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geoadd
   */ this.geoadd = (...args)=>new GeoAddCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geopos
   */ this.geopos = (...args)=>new GeoPosCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geodist
   */ this.geodist = (...args)=>new GeoDistCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geohash
   */ this.geohash = (...args)=>new GeoHashCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geosearch
   */ this.geosearch = (...args)=>new GeoSearchCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/geosearchstore
   */ this.geosearchstore = (...args)=>new GeoSearchStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/get
   */ this.get = (...args)=>new GetCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/getbit
   */ this.getbit = (...args)=>new GetBitCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/getdel
   */ this.getdel = (...args)=>new GetDelCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/getex
   */ this.getex = (...args)=>new GetExCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/getrange
   */ this.getrange = (...args)=>new GetRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/getset
   */ this.getset = (key, value)=>new GetSetCommand([
                key,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hdel
   */ this.hdel = (...args)=>new HDelCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hexists
   */ this.hexists = (...args)=>new HExistsCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hget
   */ this.hget = (...args)=>new HGetCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hgetall
   */ this.hgetall = (...args)=>new HGetAllCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hincrby
   */ this.hincrby = (...args)=>new HIncrByCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hincrbyfloat
   */ this.hincrbyfloat = (...args)=>new HIncrByFloatCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hkeys
   */ this.hkeys = (...args)=>new HKeysCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hlen
   */ this.hlen = (...args)=>new HLenCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hmget
   */ this.hmget = (...args)=>new HMGetCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hmset
   */ this.hmset = (key, kv)=>new HMSetCommand([
                key,
                kv
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hrandfield
   */ this.hrandfield = (key, count, withValues)=>new HRandFieldCommand([
                key,
                count,
                withValues
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hscan
   */ this.hscan = (...args)=>new HScanCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hset
   */ this.hset = (key, kv)=>new HSetCommand([
                key,
                kv
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hsetnx
   */ this.hsetnx = (key, field, value)=>new HSetNXCommand([
                key,
                field,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hstrlen
   */ this.hstrlen = (...args)=>new HStrLenCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/hvals
   */ this.hvals = (...args)=>new HValsCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/incr
   */ this.incr = (...args)=>new IncrCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/incrby
   */ this.incrby = (...args)=>new IncrByCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/incrbyfloat
   */ this.incrbyfloat = (...args)=>new IncrByFloatCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/keys
   */ this.keys = (...args)=>new KeysCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lindex
   */ this.lindex = (...args)=>new LIndexCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/linsert
   */ this.linsert = (key, direction, pivot, value)=>new LInsertCommand([
                key,
                direction,
                pivot,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/llen
   */ this.llen = (...args)=>new LLenCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lmove
   */ this.lmove = (...args)=>new LMoveCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lpop
   */ this.lpop = (...args)=>new LPopCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lmpop
   */ this.lmpop = (...args)=>new LmPopCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lpos
   */ this.lpos = (...args)=>new LPosCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lpush
   */ this.lpush = (key, ...elements)=>new LPushCommand([
                key,
                ...elements
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lpushx
   */ this.lpushx = (key, ...elements)=>new LPushXCommand([
                key,
                ...elements
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lrange
   */ this.lrange = (...args)=>new LRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lrem
   */ this.lrem = (key, count, value)=>new LRemCommand([
                key,
                count,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/lset
   */ this.lset = (key, index, value)=>new LSetCommand([
                key,
                index,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/ltrim
   */ this.ltrim = (...args)=>new LTrimCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/mget
   */ this.mget = (...args)=>new MGetCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/mset
   */ this.mset = (kv)=>new MSetCommand([
                kv
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/msetnx
   */ this.msetnx = (kv)=>new MSetNXCommand([
                kv
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/persist
   */ this.persist = (...args)=>new PersistCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/pexpire
   */ this.pexpire = (...args)=>new PExpireCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/pexpireat
   */ this.pexpireat = (...args)=>new PExpireAtCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/pfadd
   */ this.pfadd = (...args)=>new PfAddCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/pfcount
   */ this.pfcount = (...args)=>new PfCountCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/pfmerge
   */ this.pfmerge = (...args)=>new PfMergeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/ping
   */ this.ping = (args)=>new PingCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/psetex
   */ this.psetex = (key, ttl, value)=>new PSetEXCommand([
                key,
                ttl,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/psubscribe
   */ this.psubscribe = (patterns)=>{
            const patternArray = Array.isArray(patterns) ? patterns : [
                patterns
            ];
            return new Subscriber(this.client, patternArray, true);
        };
        /**
   * @see https://redis.io/commands/pttl
   */ this.pttl = (...args)=>new PTtlCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/publish
   */ this.publish = (...args)=>new PublishCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/randomkey
   */ this.randomkey = ()=>new RandomKeyCommand().exec(this.client);
        /**
   * @see https://redis.io/commands/rename
   */ this.rename = (...args)=>new RenameCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/renamenx
   */ this.renamenx = (...args)=>new RenameNXCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/rpop
   */ this.rpop = (...args)=>new RPopCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/rpush
   */ this.rpush = (key, ...elements)=>new RPushCommand([
                key,
                ...elements
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/rpushx
   */ this.rpushx = (key, ...elements)=>new RPushXCommand([
                key,
                ...elements
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sadd
   */ this.sadd = (key, member, ...members)=>new SAddCommand([
                key,
                member,
                ...members
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/scan
   */ this.scan = (...args)=>new ScanCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/scard
   */ this.scard = (...args)=>new SCardCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/script-exists
   */ this.scriptExists = (...args)=>new ScriptExistsCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/script-flush
   */ this.scriptFlush = (...args)=>new ScriptFlushCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/script-load
   */ this.scriptLoad = (...args)=>new ScriptLoadCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sdiff
   */ this.sdiff = (...args)=>new SDiffCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sdiffstore
   */ this.sdiffstore = (...args)=>new SDiffStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/set
   */ this.set = (key, value, opts)=>new SetCommand([
                key,
                value,
                opts
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/setbit
   */ this.setbit = (...args)=>new SetBitCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/setex
   */ this.setex = (key, ttl, value)=>new SetExCommand([
                key,
                ttl,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/setnx
   */ this.setnx = (key, value)=>new SetNxCommand([
                key,
                value
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/setrange
   */ this.setrange = (...args)=>new SetRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sinter
   */ this.sinter = (...args)=>new SInterCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sinterstore
   */ this.sinterstore = (...args)=>new SInterStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sismember
   */ this.sismember = (key, member)=>new SIsMemberCommand([
                key,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/smismember
   */ this.smismember = (key, members)=>new SMIsMemberCommand([
                key,
                members
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/smembers
   */ this.smembers = (...args)=>new SMembersCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/smove
   */ this.smove = (source, destination, member)=>new SMoveCommand([
                source,
                destination,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/spop
   */ this.spop = (...args)=>new SPopCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/srandmember
   */ this.srandmember = (...args)=>new SRandMemberCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/srem
   */ this.srem = (key, ...members)=>new SRemCommand([
                key,
                ...members
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sscan
   */ this.sscan = (...args)=>new SScanCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/strlen
   */ this.strlen = (...args)=>new StrLenCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/subscribe
   */ this.subscribe = (channels)=>{
            const channelArray = Array.isArray(channels) ? channels : [
                channels
            ];
            return new Subscriber(this.client, channelArray);
        };
        /**
   * @see https://redis.io/commands/sunion
   */ this.sunion = (...args)=>new SUnionCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/sunionstore
   */ this.sunionstore = (...args)=>new SUnionStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/time
   */ this.time = ()=>new TimeCommand().exec(this.client);
        /**
   * @see https://redis.io/commands/touch
   */ this.touch = (...args)=>new TouchCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/ttl
   */ this.ttl = (...args)=>new TtlCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/type
   */ this.type = (...args)=>new TypeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/unlink
   */ this.unlink = (...args)=>new UnlinkCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xadd
   */ this.xadd = (...args)=>new XAddCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xack
   */ this.xack = (...args)=>new XAckCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xdel
   */ this.xdel = (...args)=>new XDelCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xgroup
   */ this.xgroup = (...args)=>new XGroupCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xread
   */ this.xread = (...args)=>new XReadCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xreadgroup
   */ this.xreadgroup = (...args)=>new XReadGroupCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xinfo
   */ this.xinfo = (...args)=>new XInfoCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xlen
   */ this.xlen = (...args)=>new XLenCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xpending
   */ this.xpending = (...args)=>new XPendingCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xclaim
   */ this.xclaim = (...args)=>new XClaimCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xautoclaim
   */ this.xautoclaim = (...args)=>new XAutoClaim(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xtrim
   */ this.xtrim = (...args)=>new XTrimCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xrange
   */ this.xrange = (...args)=>new XRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/xrevrange
   */ this.xrevrange = (...args)=>new XRevRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zadd
   */ this.zadd = (...args)=>{
            if ("score" in args[1]) {
                return new ZAddCommand([
                    args[0],
                    args[1],
                    ...args.slice(2)
                ], this.opts).exec(this.client);
            }
            return new ZAddCommand([
                args[0],
                args[1],
                ...args.slice(2)
            ], this.opts).exec(this.client);
        };
        /**
   * @see https://redis.io/commands/zcard
   */ this.zcard = (...args)=>new ZCardCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zcount
   */ this.zcount = (...args)=>new ZCountCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zdiffstore
   */ this.zdiffstore = (...args)=>new ZDiffStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zincrby
   */ this.zincrby = (key, increment, member)=>new ZIncrByCommand([
                key,
                increment,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zinterstore
   */ this.zinterstore = (...args)=>new ZInterStoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zlexcount
   */ this.zlexcount = (...args)=>new ZLexCountCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zmscore
   */ this.zmscore = (...args)=>new ZMScoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zpopmax
   */ this.zpopmax = (...args)=>new ZPopMaxCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zpopmin
   */ this.zpopmin = (...args)=>new ZPopMinCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zrange
   */ this.zrange = (...args)=>new ZRangeCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zrank
   */ this.zrank = (key, member)=>new ZRankCommand([
                key,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zrem
   */ this.zrem = (key, ...members)=>new ZRemCommand([
                key,
                ...members
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zremrangebylex
   */ this.zremrangebylex = (...args)=>new ZRemRangeByLexCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zremrangebyrank
   */ this.zremrangebyrank = (...args)=>new ZRemRangeByRankCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zremrangebyscore
   */ this.zremrangebyscore = (...args)=>new ZRemRangeByScoreCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zrevrank
   */ this.zrevrank = (key, member)=>new ZRevRankCommand([
                key,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zscan
   */ this.zscan = (...args)=>new ZScanCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zscore
   */ this.zscore = (key, member)=>new ZScoreCommand([
                key,
                member
            ], this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zunion
   */ this.zunion = (...args)=>new ZUnionCommand(args, this.opts).exec(this.client);
        /**
   * @see https://redis.io/commands/zunionstore
   */ this.zunionstore = (...args)=>new ZUnionStoreCommand(args, this.opts).exec(this.client);
        this.client = client;
        this.opts = opts;
        this.enableTelemetry = opts?.enableTelemetry ?? true;
        if (opts?.readYourWrites === false) {
            this.client.readYourWrites = false;
        }
        this.enableAutoPipelining = opts?.enableAutoPipelining ?? true;
    }
    get readYourWritesSyncToken() {
        return this.client.upstashSyncToken;
    }
    set readYourWritesSyncToken(session) {
        this.client.upstashSyncToken = session;
    }
    get json() {
        return {
            /**
       * @see https://redis.io/commands/json.arrappend
       */ arrappend: (...args)=>new JsonArrAppendCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.arrindex
       */ arrindex: (...args)=>new JsonArrIndexCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.arrinsert
       */ arrinsert: (...args)=>new JsonArrInsertCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.arrlen
       */ arrlen: (...args)=>new JsonArrLenCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.arrpop
       */ arrpop: (...args)=>new JsonArrPopCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.arrtrim
       */ arrtrim: (...args)=>new JsonArrTrimCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.clear
       */ clear: (...args)=>new JsonClearCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.del
       */ del: (...args)=>new JsonDelCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.forget
       */ forget: (...args)=>new JsonForgetCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.get
       */ get: (...args)=>new JsonGetCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.mget
       */ mget: (...args)=>new JsonMGetCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.mset
       */ mset: (...args)=>new JsonMSetCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.numincrby
       */ numincrby: (...args)=>new JsonNumIncrByCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.nummultby
       */ nummultby: (...args)=>new JsonNumMultByCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.objkeys
       */ objkeys: (...args)=>new JsonObjKeysCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.objlen
       */ objlen: (...args)=>new JsonObjLenCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.resp
       */ resp: (...args)=>new JsonRespCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.set
       */ set: (...args)=>new JsonSetCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.strappend
       */ strappend: (...args)=>new JsonStrAppendCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.strlen
       */ strlen: (...args)=>new JsonStrLenCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.toggle
       */ toggle: (...args)=>new JsonToggleCommand(args, this.opts).exec(this.client),
            /**
       * @see https://redis.io/commands/json.type
       */ type: (...args)=>new JsonTypeCommand(args, this.opts).exec(this.client)
        };
    }
    createScript(script) {
        return new Script(this, script);
    }
};
// version.ts
var VERSION = "v1.34.5";


;// CONCATENATED MODULE: ./node_modules/@upstash/redis/nodejs.mjs
/* provided dependency */ var Buffer = __webpack_require__(195)["Buffer"];

// platforms/nodejs.ts
if (typeof atob === "undefined") {
    global.atob = (b64)=>Buffer.from(b64, "base64").toString("utf8");
}
var Redis2 = class _Redis extends Redis {
    /**
   * Create a new redis client by providing a custom `Requester` implementation
   *
   * @example
   * ```ts
   *
   * import { UpstashRequest, Requester, UpstashResponse, Redis } from "@upstash/redis"
   *
   *  const requester: Requester = {
   *    request: <TResult>(req: UpstashRequest): Promise<UpstashResponse<TResult>> => {
   *      // ...
   *    }
   *  }
   *
   * const redis = new Redis(requester)
   * ```
   */ constructor(configOrRequester){
        if ("request" in configOrRequester) {
            super(configOrRequester);
            return;
        }
        if (!configOrRequester.url) {
            console.warn(`[Upstash Redis] The 'url' property is missing or undefined in your Redis config.`);
        } else if (configOrRequester.url.startsWith(" ") || configOrRequester.url.endsWith(" ") || /\r|\n/.test(configOrRequester.url)) {
            console.warn("[Upstash Redis] The redis url contains whitespace or newline, which can cause errors!");
        }
        if (!configOrRequester.token) {
            console.warn(`[Upstash Redis] The 'token' property is missing or undefined in your Redis config.`);
        } else if (configOrRequester.token.startsWith(" ") || configOrRequester.token.endsWith(" ") || /\r|\n/.test(configOrRequester.token)) {
            console.warn("[Upstash Redis] The redis token contains whitespace or newline, which can cause errors!");
        }
        const client = new HttpClient({
            baseUrl: configOrRequester.url,
            retry: configOrRequester.retry,
            headers: {
                authorization: `Bearer ${configOrRequester.token}`
            },
            agent: configOrRequester.agent,
            responseEncoding: configOrRequester.responseEncoding,
            cache: configOrRequester.cache ?? "no-store",
            signal: configOrRequester.signal,
            keepAlive: configOrRequester.keepAlive,
            readYourWrites: configOrRequester.readYourWrites
        });
        super(client, {
            automaticDeserialization: configOrRequester.automaticDeserialization,
            enableTelemetry: !process.env.UPSTASH_DISABLE_TELEMETRY,
            latencyLogging: configOrRequester.latencyLogging,
            enableAutoPipelining: configOrRequester.enableAutoPipelining
        });
        this.addTelemetry({
            runtime: // @ts-expect-error to silence compiler
             true ? "edge-light" : 0,
            platform: process.env.VERCEL ? "vercel" : process.env.AWS_REGION ? "aws" : "unknown",
            sdk: `@upstash/redis@${VERSION}`
        });
        if (this.enableAutoPipelining) {
            return this.autoPipeline();
        }
    }
    /**
   * Create a new Upstash Redis instance from environment variables.
   *
   * Use this to automatically load connection secrets from your environment
   * variables. For instance when using the Vercel integration.
   *
   * This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
   * your environment using `process.env`.
   */ static fromEnv(config) {
        if (process.env === void 0) {
            throw new TypeError('[Upstash Redis] Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead');
        }
        const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
        if (!url) {
            console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_URL`");
        }
        const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
        if (!token) {
            console.warn("[Upstash Redis] Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`");
        }
        return new _Redis({
            ...config,
            url,
            token
        });
    }
};


// EXTERNAL MODULE: ./node_modules/next-auth/middleware.js
var middleware = __webpack_require__(793);
// EXTERNAL MODULE: ./node_modules/next-auth/jwt/index.js
var jwt = __webpack_require__(841);
;// CONCATENATED MODULE: ./src/middleware.ts





// Initialize rate limiter
const redis = new Redis2({
    url: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ""
});
const ratelimit = new dist.Ratelimit({
    redis,
    limiter: dist.Ratelimit.slidingWindow(20, "10 s")
});
/* harmony default export */ const src_middleware = ((0,middleware.withAuth)(async function middleware(req) {
    const path = req.nextUrl.pathname;
    // Rate limiting for API routes
    if (path.startsWith("/api/")) {
        const ip = req.ip ?? "127.0.0.1";
        const { success, limit, reset, remaining } = await ratelimit.limit(ip);
        if (!success) {
            return new spec_extension_response/* NextResponse */.x("Too Many Requests", {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString(),
                    "X-RateLimit-Reset": reset.toString()
                }
            });
        }
    }
    // Add security headers
    const response = spec_extension_response/* NextResponse */.x.next();
    response.headers.set("X-DNS-Prefetch-Control", "on");
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");
    return response;
}, {
    callbacks: {
        authorized: async ({ req })=>{
            const token = await (0,jwt.getToken)({
                req
            });
            const path = req.nextUrl.pathname;
            // Public routes
            if (path === "/" || path.startsWith("/auth/") || path.startsWith("/api/auth/") || path.startsWith("/_next/") || path.startsWith("/static/")) {
                return true;
            }
            // Protected routes require authentication
            return !!token;
        }
    }
}));

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fsrc%2Fmiddleware.ts&page=%2Fsrc%2Fmiddleware&rootDir=%2Fworkspaces%2Fbasednet&matchers=&preferredRegion=&middlewareConfig=e30%3D!


// Import the userland code.

const mod = {
    ...src_middleware_namespaceObject
};
const handler = mod.middleware || mod.default;
const page = "/src/middleware";
if (typeof handler !== "function") {
    throw new Error(`The Middleware "${page}" must export a \`middleware\` or a \`default\` function`);
}
function nHandler(opts) {
    return adapter({
        ...opts,
        page,
        handler
    });
}

//# sourceMappingURL=middleware.js.map

/***/ }),

/***/ 577:
/***/ ((module) => {

"use strict";

var g = Object.defineProperty;
var k = Object.getOwnPropertyDescriptor;
var _ = Object.getOwnPropertyNames;
var y = Object.prototype.hasOwnProperty;
var w = (l, e)=>{
    for(var t in e)g(l, t, {
        get: e[t],
        enumerable: !0
    });
}, A = (l, e, t, i)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let s of _(e))!y.call(l, s) && s !== t && g(l, s, {
        get: ()=>e[s],
        enumerable: !(i = k(e, s)) || i.enumerable
    });
    return l;
};
var x = (l)=>A(g({}, "__esModule", {
        value: !0
    }), l);
var S = {};
w(S, {
    Analytics: ()=>b
});
module.exports = x(S);
var p = `
local key = KEYS[1]
local field = ARGV[1]

local data = redis.call("ZRANGE", key, 0, -1, "WITHSCORES")
local count = {}

for i = 1, #data, 2 do
  local json_str = data[i]
  local score = tonumber(data[i + 1])
  local obj = cjson.decode(json_str)

  local fieldValue = obj[field]

  if count[fieldValue] == nil then
    count[fieldValue] = score
  else
    count[fieldValue] = count[fieldValue] + score
  end
end

local result = {}
for k, v in pairs(count) do
  table.insert(result, {k, v})
end

return result
`, f = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1]) -- First timestamp to check
local increment = tonumber(ARGV[2])       -- Increment between each timestamp
local num_timestamps = tonumber(ARGV[3])  -- Number of timestampts to check (24 for a day and 24 * 7 for a week)
local num_elements = tonumber(ARGV[4])    -- Number of elements to fetch in each category
local check_at_most = tonumber(ARGV[5])   -- Number of elements to check at most.

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

-- select num_elements many items
local true_group = {}
local false_group = {}
local denied_group = {}
local true_count = 0
local false_count = 0
local denied_count = 0
local i = #result - 1

-- index to stop at after going through "checkAtMost" many items:
local cutoff_index = #result - 2 * check_at_most

-- iterate over the results
while (true_count + false_count + denied_count) < (num_elements * 3) and 1 <= i and i >= cutoff_index do
  local score = tonumber(result[i + 1])
  if score > 0 then
    local element = result[i]
    if string.find(element, "success\\":true") and true_count < num_elements then
      table.insert(true_group, {score, element})
      true_count = true_count + 1
    elseif string.find(element, "success\\":false") and false_count < num_elements then
      table.insert(false_group, {score, element})
      false_count = false_count + 1
    elseif string.find(element, "success\\":\\"denied") and denied_count < num_elements then
      table.insert(denied_group, {score, element})
      denied_count = denied_count + 1
    end
  end
  i = i - 2
end

return {true_group, false_group, denied_group}
`, h = `
local prefix = KEYS[1]
local first_timestamp = tonumber(ARGV[1])
local increment = tonumber(ARGV[2])
local num_timestamps = tonumber(ARGV[3])

local keys = {}
for i = 1, num_timestamps do
  local timestamp = first_timestamp - (i - 1) * increment
  table.insert(keys, prefix .. ":" .. timestamp)
end

-- get the union of the groups
local zunion_params = {"ZUNION", num_timestamps, unpack(keys)}
table.insert(zunion_params, "WITHSCORES")
local result = redis.call(unpack(zunion_params))

return result
`;
var b = class {
    constructor(e){
        this.redis = e.redis, this.prefix = e.prefix ?? "@upstash/analytics", this.bucketSize = this.parseWindow(e.window);
    }
    validateTableName(e) {
        if (!/^[a-zA-Z0-9_-]+$/.test(e)) throw new Error(`Invalid table name: ${e}. Table names can only contain letters, numbers, dashes and underscores.`);
    }
    parseWindow(e) {
        if (typeof e == "number") {
            if (e <= 0) throw new Error(`Invalid window: ${e}`);
            return e;
        }
        let t = /^(\d+)([smhd])$/;
        if (!t.test(e)) throw new Error(`Invalid window: ${e}`);
        let [, i, s] = e.match(t), n = parseInt(i);
        switch(s){
            case "s":
                return n * 1e3;
            case "m":
                return n * 1e3 * 60;
            case "h":
                return n * 1e3 * 60 * 60;
            case "d":
                return n * 1e3 * 60 * 60 * 24;
            default:
                throw new Error(`Invalid window unit: ${s}`);
        }
    }
    getBucket(e) {
        let t = e ?? Date.now();
        return Math.floor(t / this.bucketSize) * this.bucketSize;
    }
    async ingest(e, ...t) {
        this.validateTableName(e), await Promise.all(t.map(async (i)=>{
            let s = this.getBucket(i.time), n = [
                this.prefix,
                e,
                s
            ].join(":");
            await this.redis.zincrby(n, 1, JSON.stringify({
                ...i,
                time: void 0
            }));
        }));
    }
    formatBucketAggregate(e, t, i) {
        let s = {};
        return e.forEach(([n, r])=>{
            t == "success" && (n = n === 1 ? "true" : n === null ? "false" : n), s[t] = s[t] || {}, s[t][(n ?? "null").toString()] = r;
        }), {
            time: i,
            ...s
        };
    }
    async aggregateBucket(e, t, i) {
        this.validateTableName(e);
        let s = this.getBucket(i), n = [
            this.prefix,
            e,
            s
        ].join(":"), r = await this.redis.eval(p, [
            n
        ], [
            t
        ]);
        return this.formatBucketAggregate(r, t, s);
    }
    async aggregateBuckets(e, t, i, s) {
        this.validateTableName(e);
        let n = this.getBucket(s), r = [];
        for(let o = 0; o < i; o += 1)r.push(this.aggregateBucket(e, t, n)), n = n - this.bucketSize;
        return Promise.all(r);
    }
    async aggregateBucketsWithPipeline(e, t, i, s, n) {
        this.validateTableName(e), n = n ?? 48;
        let r = this.getBucket(s), o = [], c = this.redis.pipeline(), u = [];
        for(let a = 1; a <= i; a += 1){
            let d = [
                this.prefix,
                e,
                r
            ].join(":");
            c.eval(p, [
                d
            ], [
                t
            ]), o.push(r), r = r - this.bucketSize, (a % n == 0 || a == i) && (u.push(c.exec()), c = this.redis.pipeline());
        }
        return (await Promise.all(u)).flat().map((a, d)=>this.formatBucketAggregate(a, t, o[d]));
    }
    async getAllowedBlocked(e, t, i) {
        this.validateTableName(e);
        let s = [
            this.prefix,
            e
        ].join(":"), n = this.getBucket(i), r = await this.redis.eval(h, [
            s
        ], [
            n,
            this.bucketSize,
            t
        ]), o = {};
        for(let c = 0; c < r.length; c += 2){
            let u = r[c], m = u.identifier, a = +r[c + 1];
            o[m] || (o[m] = {
                success: 0,
                blocked: 0
            }), o[m][u.success ? "success" : "blocked"] = a;
        }
        return o;
    }
    async getMostAllowedBlocked(e, t, i, s, n) {
        this.validateTableName(e);
        let r = [
            this.prefix,
            e
        ].join(":"), o = this.getBucket(s), c = n ?? i * 5, [u, m, a] = await this.redis.eval(f, [
            r
        ], [
            o,
            this.bucketSize,
            t,
            i,
            c
        ]);
        return {
            allowed: this.toDicts(u),
            ratelimited: this.toDicts(m),
            denied: this.toDicts(a)
        };
    }
    toDicts(e) {
        let t = [];
        for(let i = 0; i < e.length; i += 1){
            let s = +e[i][0], n = e[i][1];
            t.push({
                identifier: n.identifier,
                count: s
            });
        }
        return t;
    }
};
0 && (0);


/***/ }),

/***/ 908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    Analytics: ()=>Analytics,
    IpDenyList: ()=>ip_deny_list_exports,
    MultiRegionRatelimit: ()=>MultiRegionRatelimit,
    Ratelimit: ()=>RegionRatelimit
});
module.exports = __toCommonJS(src_exports);
// src/analytics.ts
var import_core_analytics = __webpack_require__(577);
var Analytics = class {
    constructor(config){
        this.table = "events";
        this.analytics = new import_core_analytics.Analytics({
            // @ts-expect-error we need to fix the types in core-analytics, it should only require the methods it needs, not the whole sdk
            redis: config.redis,
            window: "1h",
            prefix: config.prefix ?? "@upstash/ratelimit",
            retention: "90d"
        });
    }
    /**
   * Try to extract the geo information from the request
   *
   * This handles Vercel's `req.geo` and  and Cloudflare's `request.cf` properties
   * @param req
   * @returns
   */ extractGeo(req) {
        if (req.geo !== void 0) {
            return req.geo;
        }
        if (req.cf !== void 0) {
            return req.cf;
        }
        return {};
    }
    async record(event) {
        await this.analytics.ingest(this.table, event);
    }
    async series(filter, cutoff) {
        const timestampCount = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(cutoff)) / (60 * 60 * 1e3), 256);
        return this.analytics.aggregateBucketsWithPipeline(this.table, filter, timestampCount);
    }
    async getUsage(cutoff = 0) {
        const timestampCount = Math.min((this.analytics.getBucket(Date.now()) - this.analytics.getBucket(cutoff)) / (60 * 60 * 1e3), 256);
        const records = await this.analytics.getAllowedBlocked(this.table, timestampCount);
        return records;
    }
    async getUsageOverTime(timestampCount, groupby) {
        const result = await this.analytics.aggregateBucketsWithPipeline(this.table, groupby, timestampCount);
        return result;
    }
    async getMostAllowedBlocked(timestampCount, getTop, checkAtMost) {
        getTop = getTop ?? 5;
        const timestamp = void 0;
        return this.analytics.getMostAllowedBlocked(this.table, timestampCount, getTop, timestamp, checkAtMost);
    }
};
// src/cache.ts
var Cache = class {
    constructor(cache){
        this.cache = cache;
    }
    isBlocked(identifier) {
        if (!this.cache.has(identifier)) {
            return {
                blocked: false,
                reset: 0
            };
        }
        const reset = this.cache.get(identifier);
        if (reset < Date.now()) {
            this.cache.delete(identifier);
            return {
                blocked: false,
                reset: 0
            };
        }
        return {
            blocked: true,
            reset
        };
    }
    blockUntil(identifier, reset) {
        this.cache.set(identifier, reset);
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key) || null;
    }
    incr(key) {
        let value = this.cache.get(key) ?? 0;
        value += 1;
        this.cache.set(key, value);
        return value;
    }
    pop(key) {
        this.cache.delete(key);
    }
    empty() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
};
// src/duration.ts
function ms(d) {
    const match = d.match(/^(\d+)\s?(ms|s|m|h|d)$/);
    if (!match) {
        throw new Error(`Unable to parse window size: ${d}`);
    }
    const time = Number.parseInt(match[1]);
    const unit = match[2];
    switch(unit){
        case "ms":
            {
                return time;
            }
        case "s":
            {
                return time * 1e3;
            }
        case "m":
            {
                return time * 1e3 * 60;
            }
        case "h":
            {
                return time * 1e3 * 60 * 60;
            }
        case "d":
            {
                return time * 1e3 * 60 * 60 * 24;
            }
        default:
            {
                throw new Error(`Unable to parse window size: ${d}`);
            }
    }
}
// src/hash.ts
var safeEval = async (ctx, script, keys, args)=>{
    try {
        return await ctx.redis.evalsha(script.hash, keys, args);
    } catch (error) {
        if (`${error}`.includes("NOSCRIPT")) {
            const hash = await ctx.redis.scriptLoad(script.script);
            if (hash !== script.hash) {
                console.warn("Upstash Ratelimit: Expected hash and the hash received from Redis are different. Ratelimit will work as usual but performance will be reduced.");
            }
            return await ctx.redis.evalsha(hash, keys, args);
        }
        throw error;
    }
};
// src/lua-scripts/single.ts
var fixedWindowLimitScript = `
  local key           = KEYS[1]
  local window        = ARGV[1]
  local incrementBy   = ARGV[2] -- increment rate per request at a given value, default is 1

  local r = redis.call("INCRBY", key, incrementBy)
  if r == tonumber(incrementBy) then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end

  return r
`;
var fixedWindowRemainingTokensScript = `
      local key = KEYS[1]
      local tokens = 0

      local value = redis.call('GET', key)
      if value then
          tokens = value
      end
      return tokens
    `;
var slidingWindowLimitScript = `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local tokens      = tonumber(ARGV[1]) -- tokens per window
  local now         = ARGV[2]           -- current timestamp in milliseconds
  local window      = ARGV[3]           -- interval in milliseconds
  local incrementBy = ARGV[4]           -- increment rate per request at a given value, default is 1

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end
  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)
  if requestsInPreviousWindow + requestsInCurrentWindow >= tokens then
    return -1
  end

  local newValue = redis.call("INCRBY", currentKey, incrementBy)
  if newValue == tonumber(incrementBy) then
    -- The first time this key is set, the value will be equal to incrementBy.
    -- So we only need the expire command once
    redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
  end
  return tokens - ( newValue + requestsInPreviousWindow )
`;
var slidingWindowRemainingTokensScript = `
  local currentKey  = KEYS[1]           -- identifier including prefixes
  local previousKey = KEYS[2]           -- key of the previous bucket
  local now         = ARGV[1]           -- current timestamp in milliseconds
  local window      = ARGV[2]           -- interval in milliseconds

  local requestsInCurrentWindow = redis.call("GET", currentKey)
  if requestsInCurrentWindow == false then
    requestsInCurrentWindow = 0
  end

  local requestsInPreviousWindow = redis.call("GET", previousKey)
  if requestsInPreviousWindow == false then
    requestsInPreviousWindow = 0
  end

  local percentageInCurrent = ( now % window ) / window
  -- weighted requests to consider from the previous window
  requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)

  return requestsInPreviousWindow + requestsInCurrentWindow
`;
var tokenBucketLimitScript = `
  local key         = KEYS[1]           -- identifier including prefixes
  local maxTokens   = tonumber(ARGV[1]) -- maximum number of tokens
  local interval    = tonumber(ARGV[2]) -- size of the window in milliseconds
  local refillRate  = tonumber(ARGV[3]) -- how many tokens are refilled after each interval
  local now         = tonumber(ARGV[4]) -- current timestamp in milliseconds
  local incrementBy = tonumber(ARGV[5]) -- how many tokens to consume, default is 1
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")
        
  local refilledAt
  local tokens

  if bucket[1] == false then
    refilledAt = now
    tokens = maxTokens
  else
    refilledAt = tonumber(bucket[1])
    tokens = tonumber(bucket[2])
  end
        
  if now >= refilledAt + interval then
    local numRefills = math.floor((now - refilledAt) / interval)
    tokens = math.min(maxTokens, tokens + numRefills * refillRate)

    refilledAt = refilledAt + numRefills * interval
  end

  if tokens == 0 then
    return {-1, refilledAt + interval}
  end

  local remaining = tokens - incrementBy
  local expireAt = math.ceil(((maxTokens - remaining) / refillRate)) * interval
        
  redis.call("HSET", key, "refilledAt", refilledAt, "tokens", remaining)
  redis.call("PEXPIRE", key, expireAt)
  return {remaining, refilledAt + interval}
`;
var tokenBucketIdentifierNotFound = -1;
var tokenBucketRemainingTokensScript = `
  local key         = KEYS[1]
  local maxTokens   = tonumber(ARGV[1])
        
  local bucket = redis.call("HMGET", key, "refilledAt", "tokens")

  if bucket[1] == false then
    return {maxTokens, ${tokenBucketIdentifierNotFound}}
  end
        
  return {tonumber(bucket[2]), tonumber(bucket[1])}
`;
var cachedFixedWindowLimitScript = `
  local key     = KEYS[1]
  local window  = ARGV[1]
  local incrementBy   = ARGV[2] -- increment rate per request at a given value, default is 1

  local r = redis.call("INCRBY", key, incrementBy)
  if r == incrementBy then
  -- The first time this key is set, the value will be equal to incrementBy.
  -- So we only need the expire command once
  redis.call("PEXPIRE", key, window)
  end
      
  return r
`;
var cachedFixedWindowRemainingTokenScript = `
  local key = KEYS[1]
  local tokens = 0

  local value = redis.call('GET', key)
  if value then
      tokens = value
  end
  return tokens
`;
// src/lua-scripts/multi.ts
var fixedWindowLimitScript2 = `
	local key           = KEYS[1]
	local id            = ARGV[1]
	local window        = ARGV[2]
	local incrementBy   = tonumber(ARGV[3])

	redis.call("HSET", key, id, incrementBy)
	local fields = redis.call("HGETALL", key)
	if #fields == 2 and tonumber(fields[2])==incrementBy then
	-- The first time this key is set, and the value will be equal to incrementBy.
	-- So we only need the expire command once
	  redis.call("PEXPIRE", key, window)
	end

	return fields
`;
var fixedWindowRemainingTokensScript2 = `
      local key = KEYS[1]
      local tokens = 0

      local fields = redis.call("HGETALL", key)

      return fields
    `;
var slidingWindowLimitScript2 = `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local tokens        = tonumber(ARGV[1]) -- tokens per window
	local now           = ARGV[2]           -- current timestamp in milliseconds
	local window        = ARGV[3]           -- interval in milliseconds
	local requestId     = ARGV[4]           -- uuid for this request
	local incrementBy   = tonumber(ARGV[5]) -- custom rate, default is  1

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window
	if requestsInPreviousWindow * (1 - percentageInCurrent ) + requestsInCurrentWindow >= tokens then
	  return {currentFields, previousFields, false}
	end

	redis.call("HSET", currentKey, requestId, incrementBy)

	if requestsInCurrentWindow == 0 then 
	  -- The first time this key is set, the value will be equal to incrementBy.
	  -- So we only need the expire command once
	  redis.call("PEXPIRE", currentKey, window * 2 + 1000) -- Enough time to overlap with a new window + 1 second
	end
	return {currentFields, previousFields, true}
`;
var slidingWindowRemainingTokensScript2 = `
	local currentKey    = KEYS[1]           -- identifier including prefixes
	local previousKey   = KEYS[2]           -- key of the previous bucket
	local now         	= ARGV[1]           -- current timestamp in milliseconds
  	local window      	= ARGV[2]           -- interval in milliseconds

	local currentFields = redis.call("HGETALL", currentKey)
	local requestsInCurrentWindow = 0
	for i = 2, #currentFields, 2 do
	requestsInCurrentWindow = requestsInCurrentWindow + tonumber(currentFields[i])
	end

	local previousFields = redis.call("HGETALL", previousKey)
	local requestsInPreviousWindow = 0
	for i = 2, #previousFields, 2 do
	requestsInPreviousWindow = requestsInPreviousWindow + tonumber(previousFields[i])
	end

	local percentageInCurrent = ( now % window) / window
  	requestsInPreviousWindow = math.floor(( 1 - percentageInCurrent ) * requestsInPreviousWindow)
	
	return requestsInCurrentWindow + requestsInPreviousWindow
`;
// src/lua-scripts/reset.ts
var resetScript = `
      local pattern = KEYS[1]

      -- Initialize cursor to start from 0
      local cursor = "0"

      repeat
          -- Scan for keys matching the pattern
          local scan_result = redis.call('SCAN', cursor, 'MATCH', pattern)

          -- Extract cursor for the next iteration
          cursor = scan_result[1]

          -- Extract keys from the scan result
          local keys = scan_result[2]

          for i=1, #keys do
          redis.call('DEL', keys[i])
          end

      -- Continue scanning until cursor is 0 (end of keyspace)
      until cursor == "0"
    `;
// src/lua-scripts/hash.ts
var SCRIPTS = {
    singleRegion: {
        fixedWindow: {
            limit: {
                script: fixedWindowLimitScript,
                hash: "b13943e359636db027ad280f1def143f02158c13"
            },
            getRemaining: {
                script: fixedWindowRemainingTokensScript,
                hash: "8c4c341934502aee132643ffbe58ead3450e5208"
            }
        },
        slidingWindow: {
            limit: {
                script: slidingWindowLimitScript,
                hash: "e1391e429b699c780eb0480350cd5b7280fd9213"
            },
            getRemaining: {
                script: slidingWindowRemainingTokensScript,
                hash: "65a73ac5a05bf9712903bc304b77268980c1c417"
            }
        },
        tokenBucket: {
            limit: {
                script: tokenBucketLimitScript,
                hash: "5bece90aeef8189a8cfd28995b479529e270b3c6"
            },
            getRemaining: {
                script: tokenBucketRemainingTokensScript,
                hash: "a15be2bb1db2a15f7c82db06146f9d08983900d0"
            }
        },
        cachedFixedWindow: {
            limit: {
                script: cachedFixedWindowLimitScript,
                hash: "c26b12703dd137939b9a69a3a9b18e906a2d940f"
            },
            getRemaining: {
                script: cachedFixedWindowRemainingTokenScript,
                hash: "8e8f222ccae68b595ee6e3f3bf2199629a62b91a"
            }
        }
    },
    multiRegion: {
        fixedWindow: {
            limit: {
                script: fixedWindowLimitScript2,
                hash: "a8c14f3835aa87bd70e5e2116081b81664abcf5c"
            },
            getRemaining: {
                script: fixedWindowRemainingTokensScript2,
                hash: "8ab8322d0ed5fe5ac8eb08f0c2e4557f1b4816fd"
            }
        },
        slidingWindow: {
            limit: {
                script: slidingWindowLimitScript2,
                hash: "cb4fdc2575056df7c6d422764df0de3a08d6753b"
            },
            getRemaining: {
                script: slidingWindowRemainingTokensScript2,
                hash: "558c9306b7ec54abb50747fe0b17e5d44bd24868"
            }
        }
    }
};
var RESET_SCRIPT = {
    script: resetScript,
    hash: "54bd274ddc59fb3be0f42deee2f64322a10e2b50"
};
// src/types.ts
var DenyListExtension = "denyList";
var IpDenyListKey = "ipDenyList";
var IpDenyListStatusKey = "ipDenyListStatus";
// src/deny-list/scripts.ts
var checkDenyListScript = `
  -- Checks if values provideed in ARGV are present in the deny lists.
  -- This is done using the allDenyListsKey below.

  -- Additionally, checks the status of the ip deny list using the
  -- ipDenyListStatusKey below. Here are the possible states of the
  -- ipDenyListStatusKey key:
  -- * status == -1: set to "disabled" with no TTL
  -- * status == -2: not set, meaning that is was set before but expired
  -- * status  >  0: set to "valid", with a TTL
  --
  -- In the case of status == -2, we set the status to "pending" with
  -- 30 second ttl. During this time, the process which got status == -2
  -- will update the ip deny list.

  local allDenyListsKey     = KEYS[1]
  local ipDenyListStatusKey = KEYS[2]

  local results = redis.call('SMISMEMBER', allDenyListsKey, unpack(ARGV))
  local status  = redis.call('TTL', ipDenyListStatusKey)
  if status == -2 then
    redis.call('SETEX', ipDenyListStatusKey, 30, "pending")
  end

  return { results, status }
`;
// src/deny-list/ip-deny-list.ts
var ip_deny_list_exports = {};
__export(ip_deny_list_exports, {
    ThresholdError: ()=>ThresholdError,
    disableIpDenyList: ()=>disableIpDenyList,
    updateIpDenyList: ()=>updateIpDenyList
});
// src/deny-list/time.ts
var MILLISECONDS_IN_HOUR = 60 * 60 * 1e3;
var MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;
var MILLISECONDS_TO_2AM = 2 * MILLISECONDS_IN_HOUR;
var getIpListTTL = (time)=>{
    const now = time || Date.now();
    const timeSinceLast2AM = (now - MILLISECONDS_TO_2AM) % MILLISECONDS_IN_DAY;
    return MILLISECONDS_IN_DAY - timeSinceLast2AM;
};
// src/deny-list/ip-deny-list.ts
var baseUrl = "https://raw.githubusercontent.com/stamparm/ipsum/master/levels";
var ThresholdError = class extends Error {
    constructor(threshold){
        super(`Allowed threshold values are from 1 to 8, 1 and 8 included. Received: ${threshold}`);
        this.name = "ThresholdError";
    }
};
var getIpDenyList = async (threshold)=>{
    if (typeof threshold !== "number" || threshold < 1 || threshold > 8) {
        throw new ThresholdError(threshold);
    }
    try {
        const response = await fetch(`${baseUrl}/${threshold}.txt`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.text();
        const lines = data.split("\n");
        return lines.filter((value)=>value.length > 0);
    } catch (error) {
        throw new Error(`Failed to fetch ip deny list: ${error}`);
    }
};
var updateIpDenyList = async (redis, prefix, threshold, ttl)=>{
    const allIps = await getIpDenyList(threshold);
    const allDenyLists = [
        prefix,
        DenyListExtension,
        "all"
    ].join(":");
    const ipDenyList = [
        prefix,
        DenyListExtension,
        IpDenyListKey
    ].join(":");
    const statusKey = [
        prefix,
        IpDenyListStatusKey
    ].join(":");
    const transaction = redis.multi();
    transaction.sdiffstore(allDenyLists, allDenyLists, ipDenyList);
    transaction.del(ipDenyList);
    transaction.sadd(ipDenyList, allIps.at(0), ...allIps.slice(1));
    transaction.sdiffstore(ipDenyList, ipDenyList, allDenyLists);
    transaction.sunionstore(allDenyLists, allDenyLists, ipDenyList);
    transaction.set(statusKey, "valid", {
        px: ttl ?? getIpListTTL()
    });
    return await transaction.exec();
};
var disableIpDenyList = async (redis, prefix)=>{
    const allDenyListsKey = [
        prefix,
        DenyListExtension,
        "all"
    ].join(":");
    const ipDenyListKey = [
        prefix,
        DenyListExtension,
        IpDenyListKey
    ].join(":");
    const statusKey = [
        prefix,
        IpDenyListStatusKey
    ].join(":");
    const transaction = redis.multi();
    transaction.sdiffstore(allDenyListsKey, allDenyListsKey, ipDenyListKey);
    transaction.del(ipDenyListKey);
    transaction.set(statusKey, "disabled");
    return await transaction.exec();
};
// src/deny-list/deny-list.ts
var denyListCache = new Cache(/* @__PURE__ */ new Map());
var checkDenyListCache = (members)=>{
    return members.find((member)=>denyListCache.isBlocked(member).blocked);
};
var blockMember = (member)=>{
    if (denyListCache.size() > 1e3) denyListCache.empty();
    denyListCache.blockUntil(member, Date.now() + 6e4);
};
var checkDenyList = async (redis, prefix, members)=>{
    const [deniedValues, ipDenyListStatus] = await redis.eval(checkDenyListScript, [
        [
            prefix,
            DenyListExtension,
            "all"
        ].join(":"),
        [
            prefix,
            IpDenyListStatusKey
        ].join(":")
    ], members);
    let deniedValue = void 0;
    deniedValues.map((memberDenied, index)=>{
        if (memberDenied) {
            blockMember(members[index]);
            deniedValue = members[index];
        }
    });
    return {
        deniedValue,
        invalidIpDenyList: ipDenyListStatus === -2
    };
};
var resolveLimitPayload = (redis, prefix, [ratelimitResponse, denyListResponse], threshold)=>{
    if (denyListResponse.deniedValue) {
        ratelimitResponse.success = false;
        ratelimitResponse.remaining = 0;
        ratelimitResponse.reason = "denyList";
        ratelimitResponse.deniedValue = denyListResponse.deniedValue;
    }
    if (denyListResponse.invalidIpDenyList) {
        const updatePromise = updateIpDenyList(redis, prefix, threshold);
        ratelimitResponse.pending = Promise.all([
            ratelimitResponse.pending,
            updatePromise
        ]);
    }
    return ratelimitResponse;
};
var defaultDeniedResponse = (deniedValue)=>{
    return {
        success: false,
        limit: 0,
        remaining: 0,
        reset: 0,
        pending: Promise.resolve(),
        reason: "denyList",
        deniedValue
    };
};
// src/ratelimit.ts
var Ratelimit = class {
    constructor(config){
        /**
   * Determine if a request should pass or be rejected based on the identifier and previously chosen ratelimit.
   *
   * Use this if you want to reject all requests that you can not handle right now.
   *
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(10, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.limit(id)
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   *
   * @param req.rate - The rate at which tokens will be added or consumed from the token bucket. A higher rate allows for more requests to be processed. Defaults to 1 token per interval if not specified.
   *
   * Usage with `req.rate`
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(100, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.limit(id, {rate: 10})
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   */ this.limit = async (identifier, req)=>{
            let timeoutId = null;
            try {
                const response = this.getRatelimitResponse(identifier, req);
                const { responseArray, newTimeoutId } = this.applyTimeout(response);
                timeoutId = newTimeoutId;
                const timedResponse = await Promise.race(responseArray);
                const finalResponse = this.submitAnalytics(timedResponse, identifier, req);
                return finalResponse;
            } finally{
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        };
        /**
   * Block until the request may pass or timeout is reached.
   *
   * This method returns a promise that resolves as soon as the request may be processed
   * or after the timeout has been reached.
   *
   * Use this if you want to delay the request until it is ready to get processed.
   *
   * @example
   * ```ts
   *  const ratelimit = new Ratelimit({
   *    redis: Redis.fromEnv(),
   *    limiter: Ratelimit.slidingWindow(10, "10 s")
   *  })
   *
   *  const { success } = await ratelimit.blockUntilReady(id, 60_000)
   *  if (!success){
   *    return "Nope"
   *  }
   *  return "Yes"
   * ```
   */ this.blockUntilReady = async (identifier, timeout)=>{
            if (timeout <= 0) {
                throw new Error("timeout must be positive");
            }
            let res;
            const deadline = Date.now() + timeout;
            while(true){
                res = await this.limit(identifier);
                if (res.success) {
                    break;
                }
                if (res.reset === 0) {
                    throw new Error("This should not happen");
                }
                const wait = Math.min(res.reset, deadline) - Date.now();
                await new Promise((r)=>setTimeout(r, wait));
                if (Date.now() > deadline) {
                    break;
                }
            }
            return res;
        };
        this.resetUsedTokens = async (identifier)=>{
            const pattern = [
                this.prefix,
                identifier
            ].join(":");
            await this.limiter().resetTokens(this.ctx, pattern);
        };
        /**
   * Returns the remaining token count together with a reset timestamps
   * 
   * @param identifier identifir to check
   * @returns object with `remaining` and reset fields. `remaining` denotes
   *          the remaining tokens and reset denotes the timestamp when the
   *          tokens reset.
   */ this.getRemaining = async (identifier)=>{
            const pattern = [
                this.prefix,
                identifier
            ].join(":");
            return await this.limiter().getRemaining(this.ctx, pattern);
        };
        /**
   * Checks if the identifier or the values in req are in the deny list cache.
   * If so, returns the default denied response.
   * 
   * Otherwise, calls redis to check the rate limit and deny list. Returns after
   * resolving the result. Resolving is overriding the rate limit result if
   * the some value is in deny list.
   * 
   * @param identifier identifier to block
   * @param req options with ip, user agent, country, rate and geo info
   * @returns rate limit response
   */ this.getRatelimitResponse = async (identifier, req)=>{
            const key = this.getKey(identifier);
            const definedMembers = this.getDefinedMembers(identifier, req);
            const deniedValue = checkDenyListCache(definedMembers);
            const result = deniedValue ? [
                defaultDeniedResponse(deniedValue),
                {
                    deniedValue,
                    invalidIpDenyList: false
                }
            ] : await Promise.all([
                this.limiter().limit(this.ctx, key, req?.rate),
                this.enableProtection ? checkDenyList(this.primaryRedis, this.prefix, definedMembers) : {
                    deniedValue: void 0,
                    invalidIpDenyList: false
                }
            ]);
            return resolveLimitPayload(this.primaryRedis, this.prefix, result, this.denyListThreshold);
        };
        /**
   * Creates an array with the original response promise and a timeout promise
   * if this.timeout > 0.
   * 
   * @param response Ratelimit response promise
   * @returns array with the response and timeout promise. also includes the timeout id
   */ this.applyTimeout = (response)=>{
            let newTimeoutId = null;
            const responseArray = [
                response
            ];
            if (this.timeout > 0) {
                const timeoutResponse = new Promise((resolve)=>{
                    newTimeoutId = setTimeout(()=>{
                        resolve({
                            success: true,
                            limit: 0,
                            remaining: 0,
                            reset: 0,
                            pending: Promise.resolve(),
                            reason: "timeout"
                        });
                    }, this.timeout);
                });
                responseArray.push(timeoutResponse);
            }
            return {
                responseArray,
                newTimeoutId
            };
        };
        /**
   * submits analytics if this.analytics is set
   * 
   * @param ratelimitResponse final rate limit response
   * @param identifier identifier to submit
   * @param req limit options
   * @returns rate limit response after updating the .pending field
   */ this.submitAnalytics = (ratelimitResponse, identifier, req)=>{
            if (this.analytics) {
                try {
                    const geo = req ? this.analytics.extractGeo(req) : void 0;
                    const analyticsP = this.analytics.record({
                        identifier: ratelimitResponse.reason === "denyList" ? ratelimitResponse.deniedValue : identifier,
                        time: Date.now(),
                        success: ratelimitResponse.reason === "denyList" ? "denied" : ratelimitResponse.success,
                        ...geo
                    }).catch((error)=>{
                        let errorMessage = "Failed to record analytics";
                        if (`${error}`.includes("WRONGTYPE")) {
                            errorMessage = `
    Failed to record analytics. See the information below:

    This can occur when you uprade to Ratelimit version 1.1.2
    or later from an earlier version.

    This occurs simply because the way we store analytics data
    has changed. To avoid getting this error, disable analytics
    for *an hour*, then simply enable it back.

    `;
                        }
                        console.warn(errorMessage, error);
                    });
                    ratelimitResponse.pending = Promise.all([
                        ratelimitResponse.pending,
                        analyticsP
                    ]);
                } catch (error) {
                    console.warn("Failed to record analytics", error);
                }
                ;
            }
            ;
            return ratelimitResponse;
        };
        this.getKey = (identifier)=>{
            return [
                this.prefix,
                identifier
            ].join(":");
        };
        /**
   * returns a list of defined values from
   * [identifier, req.ip, req.userAgent, req.country]
   * 
   * @param identifier identifier
   * @param req limit options
   * @returns list of defined values
   */ this.getDefinedMembers = (identifier, req)=>{
            const members = [
                identifier,
                req?.ip,
                req?.userAgent,
                req?.country
            ];
            return members.filter(Boolean);
        };
        this.ctx = config.ctx;
        this.limiter = config.limiter;
        this.timeout = config.timeout ?? 5e3;
        this.prefix = config.prefix ?? "@upstash/ratelimit";
        this.enableProtection = config.enableProtection ?? false;
        this.denyListThreshold = config.denyListThreshold ?? 6;
        this.primaryRedis = "redis" in this.ctx ? this.ctx.redis : this.ctx.regionContexts[0].redis;
        this.analytics = config.analytics ? new Analytics({
            redis: this.primaryRedis,
            prefix: this.prefix
        }) : void 0;
        if (config.ephemeralCache instanceof Map) {
            this.ctx.cache = new Cache(config.ephemeralCache);
        } else if (config.ephemeralCache === void 0) {
            this.ctx.cache = new Cache(/* @__PURE__ */ new Map());
        }
    }
};
// src/multi.ts
function randomId() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for(let i = 0; i < 16; i++){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
var MultiRegionRatelimit = class extends Ratelimit {
    /**
   * Create a new Ratelimit instance by providing a `@upstash/redis` instance and the algorithn of your choice.
   */ constructor(config){
        super({
            prefix: config.prefix,
            limiter: config.limiter,
            timeout: config.timeout,
            analytics: config.analytics,
            ctx: {
                regionContexts: config.redis.map((redis)=>({
                        redis
                    })),
                cache: config.ephemeralCache ? new Cache(config.ephemeralCache) : void 0
            }
        });
    }
    /**
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static fixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    if (ctx.cache) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const requestId = randomId();
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.fixedWindow.limit, [
                                key
                            ], [
                                requestId,
                                windowDuration,
                                incrementBy
                            ])
                        }));
                    const firstResponse = await Promise.any(dbs.map((s)=>s.request));
                    const usedTokens = firstResponse.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const remaining = tokens - usedTokens;
                    async function sync() {
                        const individualIDs = await Promise.all(dbs.map((s)=>s.request));
                        const allIDs = [
                            ...new Set(individualIDs.flat().reduce((acc, curr, index)=>{
                                if (index % 2 === 0) {
                                    acc.push(curr);
                                }
                                return acc;
                            }, [])).values()
                        ];
                        for (const db of dbs){
                            const usedDbTokensRequest = await db.request;
                            const usedDbTokens = usedDbTokensRequest.reduce((accTokens, usedToken, index)=>{
                                let parsedToken = 0;
                                if (index % 2) {
                                    parsedToken = Number.parseInt(usedToken);
                                }
                                return accTokens + parsedToken;
                            }, 0);
                            const dbIdsRequest = await db.request;
                            const dbIds = dbIdsRequest.reduce((ids, currentId, index)=>{
                                if (index % 2 === 0) {
                                    ids.push(currentId);
                                }
                                return ids;
                            }, []);
                            if (usedDbTokens >= tokens) {
                                continue;
                            }
                            const diff = allIDs.filter((id)=>!dbIds.includes(id));
                            if (diff.length === 0) {
                                continue;
                            }
                            for (const requestId2 of diff){
                                await db.redis.hset(key, {
                                    [requestId2]: incrementBy
                                });
                            }
                        }
                    }
                    const success = remaining > 0;
                    const reset = (bucket + 1) * windowDuration;
                    if (ctx.cache && !success) {
                        ctx.cache.blockUntil(identifier, reset);
                    }
                    return {
                        success,
                        limit: tokens,
                        remaining,
                        reset,
                        pending: sync()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.fixedWindow.getRemaining, [
                                key
                            ], [
                                null
                            ])
                        }));
                    const firstResponse = await Promise.any(dbs.map((s)=>s.request));
                    const usedTokens = firstResponse.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (bucket + 1) * windowDuration
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await Promise.all(ctx.regionContexts.map((regionContext)=>{
                        safeEval(regionContext, RESET_SCRIPT, [
                            pattern
                        ], [
                            null
                        ]);
                    }));
                }
            });
    }
    /**
   * Combined approach of `slidingLogs` and `fixedWindow` with lower storage
   * costs than `slidingLogs` and improved boundary behavior by calculating a
   * weighted score between two windows.
   *
   * **Pro:**
   *
   * Good performance allows this to scale to very high loads.
   *
   * **Con:**
   *
   * Nothing major.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - The duration in which the user can max X requests.
   */ static slidingWindow(tokens, window) {
        const windowSize = ms(window);
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    if (ctx.cache) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const requestId = randomId();
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.slidingWindow.limit, [
                                currentKey,
                                previousKey
                            ], [
                                tokens,
                                now,
                                windowDuration,
                                requestId,
                                incrementBy
                            ])
                        }));
                    const percentageInCurrent = now % windowDuration / windowDuration;
                    const [current, previous, success] = await Promise.any(dbs.map((s)=>s.request));
                    if (success) {
                        current.push(requestId, incrementBy.toString());
                    }
                    const previousUsedTokens = previous.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const currentUsedTokens = current.reduce((accTokens, usedToken, index)=>{
                        let parsedToken = 0;
                        if (index % 2) {
                            parsedToken = Number.parseInt(usedToken);
                        }
                        return accTokens + parsedToken;
                    }, 0);
                    const previousPartialUsed = Math.ceil(previousUsedTokens * (1 - percentageInCurrent));
                    const usedTokens = previousPartialUsed + currentUsedTokens;
                    const remaining = tokens - usedTokens;
                    async function sync() {
                        const res = await Promise.all(dbs.map((s)=>s.request));
                        const allCurrentIds = [
                            ...new Set(res.flatMap(([current2])=>current2).reduce((acc, curr, index)=>{
                                if (index % 2 === 0) {
                                    acc.push(curr);
                                }
                                return acc;
                            }, [])).values()
                        ];
                        for (const db of dbs){
                            const [current2, _previous, _success] = await db.request;
                            const dbIds = current2.reduce((ids, currentId, index)=>{
                                if (index % 2 === 0) {
                                    ids.push(currentId);
                                }
                                return ids;
                            }, []);
                            const usedDbTokens = current2.reduce((accTokens, usedToken, index)=>{
                                let parsedToken = 0;
                                if (index % 2) {
                                    parsedToken = Number.parseInt(usedToken);
                                }
                                return accTokens + parsedToken;
                            }, 0);
                            if (usedDbTokens >= tokens) {
                                continue;
                            }
                            const diff = allCurrentIds.filter((id)=>!dbIds.includes(id));
                            if (diff.length === 0) {
                                continue;
                            }
                            for (const requestId2 of diff){
                                await db.redis.hset(currentKey, {
                                    [requestId2]: incrementBy
                                });
                            }
                        }
                    }
                    const reset = (currentWindow + 1) * windowDuration;
                    if (ctx.cache && !success) {
                        ctx.cache.blockUntil(identifier, reset);
                    }
                    return {
                        success: Boolean(success),
                        limit: tokens,
                        remaining: Math.max(0, remaining),
                        reset,
                        pending: sync()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const dbs = ctx.regionContexts.map((regionContext)=>({
                            redis: regionContext.redis,
                            request: safeEval(regionContext, SCRIPTS.multiRegion.slidingWindow.getRemaining, [
                                currentKey,
                                previousKey
                            ], [
                                now,
                                windowSize
                            ])
                        }));
                    const usedTokens = await Promise.any(dbs.map((s)=>s.request));
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (currentWindow + 1) * windowSize
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await Promise.all(ctx.regionContexts.map((regionContext)=>{
                        safeEval(regionContext, RESET_SCRIPT, [
                            pattern
                        ], [
                            null
                        ]);
                    }));
                }
            });
    }
};
// src/single.ts
var RegionRatelimit = class extends Ratelimit {
    /**
   * Create a new Ratelimit instance by providing a `@upstash/redis` instance and the algorithm of your choice.
   */ constructor(config){
        super({
            prefix: config.prefix,
            limiter: config.limiter,
            timeout: config.timeout,
            analytics: config.analytics,
            ctx: {
                redis: config.redis
            },
            ephemeralCache: config.ephemeralCache,
            enableProtection: config.enableProtection,
            denyListThreshold: config.denyListThreshold
        });
    }
    /**
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static fixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    if (ctx.cache) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const usedTokensAfterUpdate = await safeEval(ctx, SCRIPTS.singleRegion.fixedWindow.limit, [
                        key
                    ], [
                        windowDuration,
                        incrementBy
                    ]);
                    const success = usedTokensAfterUpdate <= tokens;
                    const remainingTokens = Math.max(0, tokens - usedTokensAfterUpdate);
                    const reset = (bucket + 1) * windowDuration;
                    if (ctx.cache && !success) {
                        ctx.cache.blockUntil(identifier, reset);
                    }
                    return {
                        success,
                        limit: tokens,
                        remaining: remainingTokens,
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const usedTokens = await safeEval(ctx, SCRIPTS.singleRegion.fixedWindow.getRemaining, [
                        key
                    ], [
                        null
                    ]);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (bucket + 1) * windowDuration
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * Combined approach of `slidingLogs` and `fixedWindow` with lower storage
   * costs than `slidingLogs` and improved boundary behavior by calculating a
   * weighted score between two windows.
   *
   * **Pro:**
   *
   * Good performance allows this to scale to very high loads.
   *
   * **Con:**
   *
   * Nothing major.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - The duration in which the user can max X requests.
   */ static slidingWindow(tokens, window) {
        const windowSize = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    if (ctx.cache) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: tokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const remainingTokens = await safeEval(ctx, SCRIPTS.singleRegion.slidingWindow.limit, [
                        currentKey,
                        previousKey
                    ], [
                        tokens,
                        now,
                        windowSize,
                        incrementBy
                    ]);
                    const success = remainingTokens >= 0;
                    const reset = (currentWindow + 1) * windowSize;
                    if (ctx.cache && !success) {
                        ctx.cache.blockUntil(identifier, reset);
                    }
                    return {
                        success,
                        limit: tokens,
                        remaining: Math.max(0, remainingTokens),
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const now = Date.now();
                    const currentWindow = Math.floor(now / windowSize);
                    const currentKey = [
                        identifier,
                        currentWindow
                    ].join(":");
                    const previousWindow = currentWindow - 1;
                    const previousKey = [
                        identifier,
                        previousWindow
                    ].join(":");
                    const usedTokens = await safeEval(ctx, SCRIPTS.singleRegion.slidingWindow.getRemaining, [
                        currentKey,
                        previousKey
                    ], [
                        now,
                        windowSize
                    ]);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (currentWindow + 1) * windowSize
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * You have a bucket filled with `{maxTokens}` tokens that refills constantly
   * at `{refillRate}` per `{interval}`.
   * Every request will remove one token from the bucket and if there is no
   * token to take, the request is rejected.
   *
   * **Pro:**
   *
   * - Bursts of requests are smoothed out and you can process them at a constant
   * rate.
   * - Allows to set a higher initial burst limit by setting `maxTokens` higher
   * than `refillRate`
   */ static tokenBucket(refillRate, interval, maxTokens) {
        const intervalDuration = ms(interval);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    if (ctx.cache) {
                        const { blocked, reset: reset2 } = ctx.cache.isBlocked(identifier);
                        if (blocked) {
                            return {
                                success: false,
                                limit: maxTokens,
                                remaining: 0,
                                reset: reset2,
                                pending: Promise.resolve(),
                                reason: "cacheBlock"
                            };
                        }
                    }
                    const now = Date.now();
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const [remaining, reset] = await safeEval(ctx, SCRIPTS.singleRegion.tokenBucket.limit, [
                        identifier
                    ], [
                        maxTokens,
                        intervalDuration,
                        refillRate,
                        now,
                        incrementBy
                    ]);
                    const success = remaining >= 0;
                    if (ctx.cache && !success) {
                        ctx.cache.blockUntil(identifier, reset);
                    }
                    return {
                        success,
                        limit: maxTokens,
                        remaining,
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    const [remainingTokens, refilledAt] = await safeEval(ctx, SCRIPTS.singleRegion.tokenBucket.getRemaining, [
                        identifier
                    ], [
                        maxTokens
                    ]);
                    const freshRefillAt = Date.now() + intervalDuration;
                    const identifierRefillsAt = refilledAt + intervalDuration;
                    return {
                        remaining: remainingTokens,
                        reset: refilledAt === tokenBucketIdentifierNotFound ? freshRefillAt : identifierRefillsAt
                    };
                },
                async resetTokens (ctx, identifier) {
                    const pattern = identifier;
                    if (ctx.cache) {
                        ctx.cache.pop(identifier);
                    }
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
    /**
   * cachedFixedWindow first uses the local cache to decide if a request may pass and then updates
   * it asynchronously.
   * This is experimental and not yet recommended for production use.
   *
   * @experimental
   *
   * Each request inside a fixed time increases a counter.
   * Once the counter reaches the maximum allowed number, all further requests are
   * rejected.
   *
   * **Pro:**
   *
   * - Newer requests are not starved by old ones.
   * - Low storage cost.
   *
   * **Con:**
   *
   * A burst of requests near the boundary of a window can result in a very
   * high request rate because two windows will be filled with requests quickly.
   *
   * @param tokens - How many requests a user can make in each time window.
   * @param window - A fixed timeframe
   */ static cachedFixedWindow(tokens, window) {
        const windowDuration = ms(window);
        return ()=>({
                async limit (ctx, identifier, rate) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const reset = (bucket + 1) * windowDuration;
                    const incrementBy = rate ? Math.max(1, rate) : 1;
                    const hit = typeof ctx.cache.get(key) === "number";
                    if (hit) {
                        const cachedTokensAfterUpdate = ctx.cache.incr(key);
                        const success = cachedTokensAfterUpdate < tokens;
                        const pending = success ? safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.limit, [
                            key
                        ], [
                            windowDuration,
                            incrementBy
                        ]) : Promise.resolve();
                        return {
                            success,
                            limit: tokens,
                            remaining: tokens - cachedTokensAfterUpdate,
                            reset,
                            pending
                        };
                    }
                    const usedTokensAfterUpdate = await safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.limit, [
                        key
                    ], [
                        windowDuration,
                        incrementBy
                    ]);
                    ctx.cache.set(key, usedTokensAfterUpdate);
                    const remaining = tokens - usedTokensAfterUpdate;
                    return {
                        success: remaining >= 0,
                        limit: tokens,
                        remaining,
                        reset,
                        pending: Promise.resolve()
                    };
                },
                async getRemaining (ctx, identifier) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    const hit = typeof ctx.cache.get(key) === "number";
                    if (hit) {
                        const cachedUsedTokens = ctx.cache.get(key) ?? 0;
                        return {
                            remaining: Math.max(0, tokens - cachedUsedTokens),
                            reset: (bucket + 1) * windowDuration
                        };
                    }
                    const usedTokens = await safeEval(ctx, SCRIPTS.singleRegion.cachedFixedWindow.getRemaining, [
                        key
                    ], [
                        null
                    ]);
                    return {
                        remaining: Math.max(0, tokens - usedTokens),
                        reset: (bucket + 1) * windowDuration
                    };
                },
                async resetTokens (ctx, identifier) {
                    if (!ctx.cache) {
                        throw new Error("This algorithm requires a cache");
                    }
                    const bucket = Math.floor(Date.now() / windowDuration);
                    const key = [
                        identifier,
                        bucket
                    ].join(":");
                    ctx.cache.pop(key);
                    const pattern = [
                        identifier,
                        "*"
                    ].join(":");
                    await safeEval(ctx, RESET_SCRIPT, [
                        pattern
                    ], [
                        null
                    ]);
                }
            });
    }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (0); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 31:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

(function(root, factory) {
    if (true) {
        // CommonJS
        module.exports = exports = factory();
    } else {}
})(void 0, function() {
    /*globals window, global, require*/ /**
	 * CryptoJS core components.
	 */ var CryptoJS = CryptoJS || function(Math1, undefined) {
        var crypto;
        // Native crypto from window (Browser)
        if (false) {}
        // Native crypto in web worker (Browser)
        if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
        }
        // Native crypto from worker
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
        }
        // Native (experimental IE 11) crypto from window (Browser)
        if (!crypto && "undefined" !== "undefined" && 0) {}
        // Native crypto from global (NodeJS)
        if (!crypto && typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.crypto) {
            crypto = __webpack_require__.g.crypto;
        }
        // Native crypto import via require (NodeJS)
        if (!crypto && "function" === "function") {
            try {
                crypto = __webpack_require__(480);
            } catch (err) {}
        }
        /*
	     * Cryptographically secure pseudorandom number generator
	     *
	     * As Math.random() is cryptographically not safe to use
	     */ var cryptoSecureRandomInt = function() {
            if (crypto) {
                // Use getRandomValues method (Browser)
                if (typeof crypto.getRandomValues === "function") {
                    try {
                        return crypto.getRandomValues(new Uint32Array(1))[0];
                    } catch (err) {}
                }
                // Use randomBytes method (NodeJS)
                if (typeof crypto.randomBytes === "function") {
                    try {
                        return crypto.randomBytes(4).readInt32LE();
                    } catch (err) {}
                }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
        };
        /*
	     * Local polyfill of Object.create

	     */ var create = Object.create || function() {
            function F() {}
            return function(obj) {
                var subtype;
                F.prototype = obj;
                subtype = new F();
                F.prototype = null;
                return subtype;
            };
        }();
        /**
	     * CryptoJS namespace.
	     */ var C = {};
        /**
	     * Library namespace.
	     */ var C_lib = C.lib = {};
        /**
	     * Base object for prototypal inheritance.
	     */ var Base = C_lib.Base = function() {
            return {
                /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */ extend: function(overrides) {
                    // Spawn
                    var subtype = create(this);
                    // Augment
                    if (overrides) {
                        subtype.mixIn(overrides);
                    }
                    // Create default initializer
                    if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                        subtype.init = function() {
                            subtype.$super.init.apply(this, arguments);
                        };
                    }
                    // Initializer's prototype is the subtype object
                    subtype.init.prototype = subtype;
                    // Reference supertype
                    subtype.$super = this;
                    return subtype;
                },
                /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */ create: function() {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);
                    return instance;
                },
                /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */ init: function() {},
                /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */ mixIn: function(properties) {
                    for(var propertyName in properties){
                        if (properties.hasOwnProperty(propertyName)) {
                            this[propertyName] = properties[propertyName];
                        }
                    }
                    // IE won't copy toString using the loop above
                    if (properties.hasOwnProperty("toString")) {
                        this.toString = properties.toString;
                    }
                },
                /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */ clone: function() {
                    return this.init.prototype.extend(this);
                }
            };
        }();
        /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */ var WordArray = C_lib.WordArray = Base.extend({
            /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */ init: function(words, sigBytes) {
                words = this.words = words || [];
                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 4;
                }
            },
            /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */ toString: function(encoder) {
                return (encoder || Hex).stringify(this);
            },
            /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */ concat: function(wordArray) {
                // Shortcuts
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;
                // Clamp excess bits
                this.clamp();
                // Concat
                if (thisSigBytes % 4) {
                    // Copy one byte at a time
                    for(var i = 0; i < thatSigBytes; i++){
                        var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                        thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                    }
                } else {
                    // Copy one word at a time
                    for(var j = 0; j < thatSigBytes; j += 4){
                        thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                    }
                }
                this.sigBytes += thatSigBytes;
                // Chainable
                return this;
            },
            /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */ clamp: function() {
                // Shortcuts
                var words = this.words;
                var sigBytes = this.sigBytes;
                // Clamp
                words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
                words.length = Math1.ceil(sigBytes / 4);
            },
            /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */ clone: function() {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);
                return clone;
            },
            /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */ random: function(nBytes) {
                var words = [];
                for(var i = 0; i < nBytes; i += 4){
                    words.push(cryptoSecureRandomInt());
                }
                return new WordArray.init(words, nBytes);
            }
        });
        /**
	     * Encoder namespace.
	     */ var C_enc = C.enc = {};
        /**
	     * Hex encoding strategy.
	     */ var Hex = C_enc.Hex = {
            /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */ stringify: function(wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                // Convert
                var hexChars = [];
                for(var i = 0; i < sigBytes; i++){
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((bite & 0x0f).toString(16));
                }
                return hexChars.join("");
            },
            /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */ parse: function(hexStr) {
                // Shortcut
                var hexStrLength = hexStr.length;
                // Convert
                var words = [];
                for(var i = 0; i < hexStrLength; i += 2){
                    words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
                }
                return new WordArray.init(words, hexStrLength / 2);
            }
        };
        /**
	     * Latin1 encoding strategy.
	     */ var Latin1 = C_enc.Latin1 = {
            /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */ stringify: function(wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                // Convert
                var latin1Chars = [];
                for(var i = 0; i < sigBytes; i++){
                    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                    latin1Chars.push(String.fromCharCode(bite));
                }
                return latin1Chars.join("");
            },
            /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */ parse: function(latin1Str) {
                // Shortcut
                var latin1StrLength = latin1Str.length;
                // Convert
                var words = [];
                for(var i = 0; i < latin1StrLength; i++){
                    words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
                }
                return new WordArray.init(words, latin1StrLength);
            }
        };
        /**
	     * UTF-8 encoding strategy.
	     */ var Utf8 = C_enc.Utf8 = {
            /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */ stringify: function(wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error("Malformed UTF-8 data");
                }
            },
            /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */ parse: function(utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };
        /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */ var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */ reset: function() {
                // Initial values
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },
            /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */ _append: function(data) {
                // Convert string to WordArray, else assume WordArray already
                if (typeof data == "string") {
                    data = Utf8.parse(data);
                }
                // Append
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },
            /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */ _process: function(doFlush) {
                var processedWords;
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;
                // Count blocks ready
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                    // Round up to include partial blocks
                    nBlocksReady = Math1.ceil(nBlocksReady);
                } else {
                    // Round down to include only full blocks,
                    // less the number of blocks that must remain in the buffer
                    nBlocksReady = Math1.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }
                // Count words ready
                var nWordsReady = nBlocksReady * blockSize;
                // Count bytes ready
                var nBytesReady = Math1.min(nWordsReady * 4, dataSigBytes);
                // Process blocks
                if (nWordsReady) {
                    for(var offset = 0; offset < nWordsReady; offset += blockSize){
                        // Perform concrete-algorithm logic
                        this._doProcessBlock(dataWords, offset);
                    }
                    // Remove processed words
                    processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }
                // Return processed words
                return new WordArray.init(processedWords, nBytesReady);
            },
            /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */ clone: function() {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();
                return clone;
            },
            _minBufferSize: 0
        });
        /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */ var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
	         * Configuration options.
	         */ cfg: Base.extend(),
            /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */ init: function(cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg);
                // Set initial values
                this.reset();
            },
            /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */ reset: function() {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this);
                // Perform concrete-hasher logic
                this._doReset();
            },
            /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */ update: function(messageUpdate) {
                // Append
                this._append(messageUpdate);
                // Update the hash
                this._process();
                // Chainable
                return this;
            },
            /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */ finalize: function(messageUpdate) {
                // Final message update
                if (messageUpdate) {
                    this._append(messageUpdate);
                }
                // Perform concrete-hasher logic
                var hash = this._doFinalize();
                return hash;
            },
            blockSize: 512 / 32,
            /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */ _createHelper: function(hasher) {
                return function(message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },
            /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */ _createHmacHelper: function(hasher) {
                return function(message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });
        /**
	     * Algorithm namespace.
	     */ var C_algo = C.algo = {};
        return C;
    }(Math);
    return CryptoJS;
});


/***/ }),

/***/ 123:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

(function(root, factory) {
    if (true) {
        // CommonJS
        module.exports = exports = factory(__webpack_require__(31));
    } else {}
})(void 0, function(CryptoJS) {
    return CryptoJS.enc.Hex;
});


/***/ }),

/***/ 761:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

(function(root, factory) {
    if (true) {
        // CommonJS
        module.exports = exports = factory(__webpack_require__(31));
    } else {}
})(void 0, function(CryptoJS) {
    (function() {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        // Reusable object
        var W = [];
        /**
	     * SHA-1 hash algorithm.
	     */ var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function() {
                this._hash = new WordArray.init([
                    0x67452301,
                    0xefcdab89,
                    0x98badcfe,
                    0x10325476,
                    0xc3d2e1f0
                ]);
            },
            _doProcessBlock: function(M, offset) {
                // Shortcut
                var H = this._hash.words;
                // Working variables
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                // Computation
                for(var i = 0; i < 80; i++){
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                        W[i] = n << 1 | n >>> 31;
                    }
                    var t = (a << 5 | a >>> 27) + e + W[i];
                    if (i < 20) {
                        t += (b & c | ~b & d) + 0x5a827999;
                    } else if (i < 40) {
                        t += (b ^ c ^ d) + 0x6ed9eba1;
                    } else if (i < 60) {
                        t += (b & c | b & d | c & d) - 0x70e44324;
                    } else /* if (i < 80) */ {
                        t += (b ^ c ^ d) - 0x359d3e2a;
                    }
                    e = d;
                    d = c;
                    c = b << 30 | b >>> 2;
                    b = a;
                    a = t;
                }
                // Intermediate hash value
                H[0] = H[0] + a | 0;
                H[1] = H[1] + b | 0;
                H[2] = H[2] + c | 0;
                H[3] = H[3] + d | 0;
                H[4] = H[4] + e | 0;
            },
            _doFinalize: function() {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;
                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;
                // Add padding
                dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
                dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;
                // Hash final blocks
                this._process();
                // Return final computed hash
                return this._hash;
            },
            clone: function() {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();
                return clone;
            }
        });
        /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */ C.SHA1 = Hasher._createHelper(SHA1);
        /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */ C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
    })();
    return CryptoJS.SHA1;
});


/***/ }),

/***/ 246:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SessionStore = void 0;
exports.defaultCookies = defaultCookies;
function _classPrivateMethodInitSpec(e, a) {
    _checkPrivateRedeclaration(e, a), a.add(e);
}
function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
}
function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateFieldGet(s, a) {
    return s.get(_assertClassBrand(s, a));
}
function _classPrivateFieldSet(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
}
function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
}
const ALLOWED_COOKIE_SIZE = 4096;
const ESTIMATED_EMPTY_COOKIE_SIZE = 163;
const CHUNK_SIZE = ALLOWED_COOKIE_SIZE - ESTIMATED_EMPTY_COOKIE_SIZE;
function defaultCookies(useSecureCookies) {
    const cookiePrefix = useSecureCookies ? "__Secure-" : "";
    return {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        callbackUrl: {
            name: `${cookiePrefix}next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        csrfToken: {
            name: `${useSecureCookies ? "__Host-" : ""}next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        },
        pkceCodeVerifier: {
            name: `${cookiePrefix}next-auth.pkce.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        state: {
            name: `${cookiePrefix}next-auth.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                maxAge: 60 * 15
            }
        },
        nonce: {
            name: `${cookiePrefix}next-auth.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies
            }
        }
    };
}
var _chunks = new WeakMap();
var _option = new WeakMap();
var _logger = new WeakMap();
var _SessionStore_brand = new WeakSet();
class SessionStore {
    constructor(option, req, logger){
        _classPrivateMethodInitSpec(this, _SessionStore_brand);
        _classPrivateFieldInitSpec(this, _chunks, {});
        _classPrivateFieldInitSpec(this, _option, void 0);
        _classPrivateFieldInitSpec(this, _logger, void 0);
        _classPrivateFieldSet(_logger, this, logger);
        _classPrivateFieldSet(_option, this, option);
        const { cookies: _cookies } = req;
        const { name: cookieName } = option;
        if (typeof (_cookies === null || _cookies === void 0 ? void 0 : _cookies.getAll) === "function") {
            for (const { name, value } of _cookies.getAll()){
                if (name.startsWith(cookieName)) {
                    _classPrivateFieldGet(_chunks, this)[name] = value;
                }
            }
        } else if (_cookies instanceof Map) {
            for (const name of _cookies.keys()){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies.get(name);
            }
        } else {
            for(const name in _cookies){
                if (name.startsWith(cookieName)) _classPrivateFieldGet(_chunks, this)[name] = _cookies[name];
            }
        }
    }
    get value() {
        const sortedKeys = Object.keys(_classPrivateFieldGet(_chunks, this)).sort((a, b)=>{
            var _a$split$pop, _b$split$pop;
            const aSuffix = parseInt((_a$split$pop = a.split(".").pop()) !== null && _a$split$pop !== void 0 ? _a$split$pop : "0");
            const bSuffix = parseInt((_b$split$pop = b.split(".").pop()) !== null && _b$split$pop !== void 0 ? _b$split$pop : "0");
            return aSuffix - bSuffix;
        });
        return sortedKeys.map((key)=>_classPrivateFieldGet(_chunks, this)[key]).join("");
    }
    chunk(value, options) {
        const cookies = _assertClassBrand(_SessionStore_brand, this, _clean).call(this);
        const chunked = _assertClassBrand(_SessionStore_brand, this, _chunk).call(this, {
            name: _classPrivateFieldGet(_option, this).name,
            value,
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                ...options
            }
        });
        for (const chunk of chunked){
            cookies[chunk.name] = chunk;
        }
        return Object.values(cookies);
    }
    clean() {
        return Object.values(_assertClassBrand(_SessionStore_brand, this, _clean).call(this));
    }
}
exports.SessionStore = SessionStore;
function _chunk(cookie) {
    const chunkCount = Math.ceil(cookie.value.length / CHUNK_SIZE);
    if (chunkCount === 1) {
        _classPrivateFieldGet(_chunks, this)[cookie.name] = cookie.value;
        return [
            cookie
        ];
    }
    const cookies = [];
    for(let i = 0; i < chunkCount; i++){
        const name = `${cookie.name}.${i}`;
        const value = cookie.value.substr(i * CHUNK_SIZE, CHUNK_SIZE);
        cookies.push({
            ...cookie,
            name,
            value
        });
        _classPrivateFieldGet(_chunks, this)[name] = value;
    }
    _classPrivateFieldGet(_logger, this).debug("CHUNKING_SESSION_COOKIE", {
        message: `Session cookie exceeds allowed ${ALLOWED_COOKIE_SIZE} bytes.`,
        emptyCookieSize: ESTIMATED_EMPTY_COOKIE_SIZE,
        valueSize: cookie.value.length,
        chunks: cookies.map((c)=>c.value.length + ESTIMATED_EMPTY_COOKIE_SIZE)
    });
    return cookies;
}
function _clean() {
    const cleanedChunks = {};
    for(const name in _classPrivateFieldGet(_chunks, this)){
        var _classPrivateFieldGet2;
        (_classPrivateFieldGet2 = _classPrivateFieldGet(_chunks, this)) === null || _classPrivateFieldGet2 === void 0 || delete _classPrivateFieldGet2[name];
        cleanedChunks[name] = {
            name,
            value: "",
            options: {
                ..._classPrivateFieldGet(_option, this).options,
                maxAge: 0
            }
        };
    }
    return cleanedChunks;
}


/***/ }),

/***/ 841:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var _interopRequireDefault = __webpack_require__(597);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _exportNames = {
    encode: true,
    decode: true,
    getToken: true
};
exports.decode = decode;
exports.encode = encode;
exports.getToken = getToken;
var _jose = __webpack_require__(998);
var _hkdf = _interopRequireDefault(__webpack_require__(347));
var _uuid = __webpack_require__(292);
var _cookie = __webpack_require__(246);
var _types = __webpack_require__(303);
Object.keys(_types).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _types[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _types[key];
        }
    });
});
const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60;
const now = ()=>Date.now() / 1000 | 0;
async function encode(params) {
    const { token = {}, secret, maxAge = DEFAULT_MAX_AGE, salt = "" } = params;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    return await new _jose.EncryptJWT(token).setProtectedHeader({
        alg: "dir",
        enc: "A256GCM"
    }).setIssuedAt().setExpirationTime(now() + maxAge).setJti((0, _uuid.v4)()).encrypt(encryptionSecret);
}
async function decode(params) {
    const { token, secret, salt = "" } = params;
    if (!token) return null;
    const encryptionSecret = await getDerivedEncryptionKey(secret, salt);
    const { payload } = await (0, _jose.jwtDecrypt)(token, encryptionSecret, {
        clockTolerance: 15
    });
    return payload;
}
async function getToken(params) {
    var _process$env$NEXTAUTH, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _req$headers;
    const { req, secureCookie = (_process$env$NEXTAUTH = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL) === null || _process$env$NEXTAUTH2 === void 0 ? void 0 : _process$env$NEXTAUTH2.startsWith("https://")) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : !!process.env.VERCEL, cookieName = secureCookie ? "__Secure-next-auth.session-token" : "next-auth.session-token", raw, decode: _decode = decode, logger = console, secret = (_process$env$NEXTAUTH3 = process.env.NEXTAUTH_SECRET) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.AUTH_SECRET } = params;
    if (!req) throw new Error("Must pass `req` to JWT getToken()");
    const sessionStore = new _cookie.SessionStore({
        name: cookieName,
        options: {
            secure: secureCookie
        }
    }, {
        cookies: req.cookies,
        headers: req.headers
    }, logger);
    let token = sessionStore.value;
    const authorizationHeader = req.headers instanceof Headers ? req.headers.get("authorization") : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.authorization;
    if (!token && (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[0]) === "Bearer") {
        const urlEncodedToken = authorizationHeader.split(" ")[1];
        token = decodeURIComponent(urlEncodedToken);
    }
    if (!token) return null;
    if (raw) return token;
    try {
        return await _decode({
            token,
            secret
        });
    } catch (_unused) {
        return null;
    }
}
async function getDerivedEncryptionKey(keyMaterial, salt) {
    return await (0, _hkdf.default)("sha256", keyMaterial, salt, `NextAuth.js Generated Encryption Key${salt ? ` (${salt})` : ""}`, 32);
}


/***/ }),

/***/ 303:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));


/***/ }),

/***/ 793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var _exportNames = {};
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _middleware.default;
    }
}));
var _middleware = _interopRequireWildcard(__webpack_require__(991));
Object.keys(_middleware).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _middleware[key]) return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
            return _middleware[key];
        }
    });
});
function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(), t = new WeakMap();
    return (_getRequireWildcardCache = function(e) {
        return e ? t : r;
    })(e);
}
function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
        default: e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
    }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var u in e)if ("default" !== u && ({}).hasOwnProperty.call(e, u)) {
        var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
        i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
}


/***/ }),

/***/ 991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const NextResponse = (__webpack_require__(651)/* .NextResponse */ .x);
var _interopRequireDefault = __webpack_require__(597);
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = void 0;
exports.withAuth = withAuth;
var _jwt = __webpack_require__(841);
var _parseUrl = _interopRequireDefault(__webpack_require__(595));
async function handleMiddleware(req, options, onSuccess) {
    var _options$pages$signIn, _options$pages, _options$pages$error, _options$pages2, _ref, _options$secret, _options$jwt, _options$cookies, _await$options$callba, _options$callbacks, _options$callbacks$au;
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInPage = (_options$pages$signIn = options === null || options === void 0 || (_options$pages = options.pages) === null || _options$pages === void 0 ? void 0 : _options$pages.signIn) !== null && _options$pages$signIn !== void 0 ? _options$pages$signIn : "/api/auth/signin";
    const errorPage = (_options$pages$error = options === null || options === void 0 || (_options$pages2 = options.pages) === null || _options$pages2 === void 0 ? void 0 : _options$pages2.error) !== null && _options$pages$error !== void 0 ? _options$pages$error : "/api/auth/error";
    const authPath = (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path;
    const publicPaths = [
        "/_next",
        "/favicon.ico"
    ];
    if (`${basePath}${pathname}`.startsWith(authPath) || [
        signInPage,
        errorPage
    ].includes(pathname) || publicPaths.some((p)=>pathname.startsWith(p))) {
        return;
    }
    const secret = (_ref = (_options$secret = options === null || options === void 0 ? void 0 : options.secret) !== null && _options$secret !== void 0 ? _options$secret : process.env.NEXTAUTH_SECRET) !== null && _ref !== void 0 ? _ref : process.env.AUTH_SECRET;
    if (!secret) {
        console.error(`[next-auth][error][NO_SECRET]`, `\nhttps://next-auth.js.org/errors#no_secret`);
        const errorUrl = new URL(`${basePath}${errorPage}`, origin);
        errorUrl.searchParams.append("error", "Configuration");
        return NextResponse.redirect(errorUrl);
    }
    const token = await (0, _jwt.getToken)({
        req,
        decode: options === null || options === void 0 || (_options$jwt = options.jwt) === null || _options$jwt === void 0 ? void 0 : _options$jwt.decode,
        cookieName: options === null || options === void 0 || (_options$cookies = options.cookies) === null || _options$cookies === void 0 || (_options$cookies = _options$cookies.sessionToken) === null || _options$cookies === void 0 ? void 0 : _options$cookies.name,
        secret
    });
    const isAuthorized = (_await$options$callba = await (options === null || options === void 0 || (_options$callbacks = options.callbacks) === null || _options$callbacks === void 0 || (_options$callbacks$au = _options$callbacks.authorized) === null || _options$callbacks$au === void 0 ? void 0 : _options$callbacks$au.call(_options$callbacks, {
        req,
        token
    }))) !== null && _await$options$callba !== void 0 ? _await$options$callba : !!token;
    if (isAuthorized) return await (onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(token));
    const signInUrl = new URL(`${basePath}${signInPage}`, origin);
    signInUrl.searchParams.append("callbackUrl", `${basePath}${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
}
function withAuth(...args) {
    if (!args.length || args[0] instanceof Request) {
        return handleMiddleware(...args);
    }
    if (typeof args[0] === "function") {
        const middleware = args[0];
        const options = args[1];
        return async (...args)=>await handleMiddleware(args[0], options, async (token)=>{
                args[0].nextauth = {
                    token
                };
                return await middleware(...args);
            });
    }
    const options = args[0];
    return async (...args)=>await handleMiddleware(args[0], options);
}
var _default = exports["default"] = withAuth;


/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = parseUrl;
function parseUrl(url) {
    var _url2;
    const defaultUrl = new URL("http://localhost:3000/api/auth");
    if (url && !url.startsWith("http")) {
        url = `https://${url}`;
    }
    const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
    const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
    const base = `${_url.origin}${path}`;
    return {
        origin: _url.origin,
        host: _url.host,
        path,
        base,
        toString: ()=>base
    };
}


/***/ }),

/***/ 283:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
        "priority" in c && c.priority && `Priority=${c.priority}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure, priority } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        },
        ...priority && {
            priority: parsePriority(priority)
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
var PRIORITY = [
    "low",
    "medium",
    "high"
];
function parsePriority(string) {
    string = string.toLowerCase();
    return PRIORITY.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b, _c;
        this._headers = responseHeaders;
        const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 38:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    var e = {
        491: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ContextAPI = void 0;
            const n = r(223);
            const a = r(172);
            const o = r(930);
            const i = "context";
            const c = new n.NoopContextManager;
            class ContextAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new ContextAPI;
                    }
                    return this._instance;
                }
                setGlobalContextManager(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                active() {
                    return this._getContextManager().active();
                }
                with(e, t, r, ...n) {
                    return this._getContextManager().with(e, t, r, ...n);
                }
                bind(e, t) {
                    return this._getContextManager().bind(e, t);
                }
                _getContextManager() {
                    return (0, a.getGlobal)(i) || c;
                }
                disable() {
                    this._getContextManager().disable();
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.ContextAPI = ContextAPI;
        },
        930: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagAPI = void 0;
            const n = r(56);
            const a = r(912);
            const o = r(957);
            const i = r(172);
            const c = "diag";
            class DiagAPI {
                constructor(){
                    function _logProxy(e) {
                        return function(...t) {
                            const r = (0, i.getGlobal)("diag");
                            if (!r) return;
                            return r[e](...t);
                        };
                    }
                    const e = this;
                    const setLogger = (t, r = {
                        logLevel: o.DiagLogLevel.INFO
                    })=>{
                        var n, c, s;
                        if (t === e) {
                            const t = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                            e.error((n = t.stack) !== null && n !== void 0 ? n : t.message);
                            return false;
                        }
                        if (typeof r === "number") {
                            r = {
                                logLevel: r
                            };
                        }
                        const u = (0, i.getGlobal)("diag");
                        const l = (0, a.createLogLevelDiagLogger)((c = r.logLevel) !== null && c !== void 0 ? c : o.DiagLogLevel.INFO, t);
                        if (u && !r.suppressOverrideMessage) {
                            const e = (s = (new Error).stack) !== null && s !== void 0 ? s : "<failed to generate stacktrace>";
                            u.warn(`Current logger will be overwritten from ${e}`);
                            l.warn(`Current logger will overwrite one already registered from ${e}`);
                        }
                        return (0, i.registerGlobal)("diag", l, e, true);
                    };
                    e.setLogger = setLogger;
                    e.disable = ()=>{
                        (0, i.unregisterGlobal)(c, e);
                    };
                    e.createComponentLogger = (e)=>new n.DiagComponentLogger(e);
                    e.verbose = _logProxy("verbose");
                    e.debug = _logProxy("debug");
                    e.info = _logProxy("info");
                    e.warn = _logProxy("warn");
                    e.error = _logProxy("error");
                }
                static instance() {
                    if (!this._instance) {
                        this._instance = new DiagAPI;
                    }
                    return this._instance;
                }
            }
            t.DiagAPI = DiagAPI;
        },
        653: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.MetricsAPI = void 0;
            const n = r(660);
            const a = r(172);
            const o = r(930);
            const i = "metrics";
            class MetricsAPI {
                constructor(){}
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new MetricsAPI;
                    }
                    return this._instance;
                }
                setGlobalMeterProvider(e) {
                    return (0, a.registerGlobal)(i, e, o.DiagAPI.instance());
                }
                getMeterProvider() {
                    return (0, a.getGlobal)(i) || n.NOOP_METER_PROVIDER;
                }
                getMeter(e, t, r) {
                    return this.getMeterProvider().getMeter(e, t, r);
                }
                disable() {
                    (0, a.unregisterGlobal)(i, o.DiagAPI.instance());
                }
            }
            t.MetricsAPI = MetricsAPI;
        },
        181: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.PropagationAPI = void 0;
            const n = r(172);
            const a = r(874);
            const o = r(194);
            const i = r(277);
            const c = r(369);
            const s = r(930);
            const u = "propagation";
            const l = new a.NoopTextMapPropagator;
            class PropagationAPI {
                constructor(){
                    this.createBaggage = c.createBaggage;
                    this.getBaggage = i.getBaggage;
                    this.getActiveBaggage = i.getActiveBaggage;
                    this.setBaggage = i.setBaggage;
                    this.deleteBaggage = i.deleteBaggage;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new PropagationAPI;
                    }
                    return this._instance;
                }
                setGlobalPropagator(e) {
                    return (0, n.registerGlobal)(u, e, s.DiagAPI.instance());
                }
                inject(e, t, r = o.defaultTextMapSetter) {
                    return this._getGlobalPropagator().inject(e, t, r);
                }
                extract(e, t, r = o.defaultTextMapGetter) {
                    return this._getGlobalPropagator().extract(e, t, r);
                }
                fields() {
                    return this._getGlobalPropagator().fields();
                }
                disable() {
                    (0, n.unregisterGlobal)(u, s.DiagAPI.instance());
                }
                _getGlobalPropagator() {
                    return (0, n.getGlobal)(u) || l;
                }
            }
            t.PropagationAPI = PropagationAPI;
        },
        997: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceAPI = void 0;
            const n = r(172);
            const a = r(846);
            const o = r(139);
            const i = r(607);
            const c = r(930);
            const s = "trace";
            class TraceAPI {
                constructor(){
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                    this.wrapSpanContext = o.wrapSpanContext;
                    this.isSpanContextValid = o.isSpanContextValid;
                    this.deleteSpan = i.deleteSpan;
                    this.getSpan = i.getSpan;
                    this.getActiveSpan = i.getActiveSpan;
                    this.getSpanContext = i.getSpanContext;
                    this.setSpan = i.setSpan;
                    this.setSpanContext = i.setSpanContext;
                }
                static getInstance() {
                    if (!this._instance) {
                        this._instance = new TraceAPI;
                    }
                    return this._instance;
                }
                setGlobalTracerProvider(e) {
                    const t = (0, n.registerGlobal)(s, this._proxyTracerProvider, c.DiagAPI.instance());
                    if (t) {
                        this._proxyTracerProvider.setDelegate(e);
                    }
                    return t;
                }
                getTracerProvider() {
                    return (0, n.getGlobal)(s) || this._proxyTracerProvider;
                }
                getTracer(e, t) {
                    return this.getTracerProvider().getTracer(e, t);
                }
                disable() {
                    (0, n.unregisterGlobal)(s, c.DiagAPI.instance());
                    this._proxyTracerProvider = new a.ProxyTracerProvider;
                }
            }
            t.TraceAPI = TraceAPI;
        },
        277: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.deleteBaggage = t.setBaggage = t.getActiveBaggage = t.getBaggage = void 0;
            const n = r(491);
            const a = r(780);
            const o = (0, a.createContextKey)("OpenTelemetry Baggage Key");
            function getBaggage(e) {
                return e.getValue(o) || undefined;
            }
            t.getBaggage = getBaggage;
            function getActiveBaggage() {
                return getBaggage(n.ContextAPI.getInstance().active());
            }
            t.getActiveBaggage = getActiveBaggage;
            function setBaggage(e, t) {
                return e.setValue(o, t);
            }
            t.setBaggage = setBaggage;
            function deleteBaggage(e) {
                return e.deleteValue(o);
            }
            t.deleteBaggage = deleteBaggage;
        },
        993: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.BaggageImpl = void 0;
            class BaggageImpl {
                constructor(e){
                    this._entries = e ? new Map(e) : new Map;
                }
                getEntry(e) {
                    const t = this._entries.get(e);
                    if (!t) {
                        return undefined;
                    }
                    return Object.assign({}, t);
                }
                getAllEntries() {
                    return Array.from(this._entries.entries()).map(([e, t])=>[
                            e,
                            t
                        ]);
                }
                setEntry(e, t) {
                    const r = new BaggageImpl(this._entries);
                    r._entries.set(e, t);
                    return r;
                }
                removeEntry(e) {
                    const t = new BaggageImpl(this._entries);
                    t._entries.delete(e);
                    return t;
                }
                removeEntries(...e) {
                    const t = new BaggageImpl(this._entries);
                    for (const r of e){
                        t._entries.delete(r);
                    }
                    return t;
                }
                clear() {
                    return new BaggageImpl;
                }
            }
            t.BaggageImpl = BaggageImpl;
        },
        830: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataSymbol = void 0;
            t.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        },
        369: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.baggageEntryMetadataFromString = t.createBaggage = void 0;
            const n = r(930);
            const a = r(993);
            const o = r(830);
            const i = n.DiagAPI.instance();
            function createBaggage(e = {}) {
                return new a.BaggageImpl(new Map(Object.entries(e)));
            }
            t.createBaggage = createBaggage;
            function baggageEntryMetadataFromString(e) {
                if (typeof e !== "string") {
                    i.error(`Cannot create baggage metadata from unknown type: ${typeof e}`);
                    e = "";
                }
                return {
                    __TYPE__: o.baggageEntryMetadataSymbol,
                    toString () {
                        return e;
                    }
                };
            }
            t.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
        },
        67: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.context = void 0;
            const n = r(491);
            t.context = n.ContextAPI.getInstance();
        },
        223: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopContextManager = void 0;
            const n = r(780);
            class NoopContextManager {
                active() {
                    return n.ROOT_CONTEXT;
                }
                with(e, t, r, ...n) {
                    return t.call(r, ...n);
                }
                bind(e, t) {
                    return t;
                }
                enable() {
                    return this;
                }
                disable() {
                    return this;
                }
            }
            t.NoopContextManager = NoopContextManager;
        },
        780: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ROOT_CONTEXT = t.createContextKey = void 0;
            function createContextKey(e) {
                return Symbol.for(e);
            }
            t.createContextKey = createContextKey;
            class BaseContext {
                constructor(e){
                    const t = this;
                    t._currentContext = e ? new Map(e) : new Map;
                    t.getValue = (e)=>t._currentContext.get(e);
                    t.setValue = (e, r)=>{
                        const n = new BaseContext(t._currentContext);
                        n._currentContext.set(e, r);
                        return n;
                    };
                    t.deleteValue = (e)=>{
                        const r = new BaseContext(t._currentContext);
                        r._currentContext.delete(e);
                        return r;
                    };
                }
            }
            t.ROOT_CONTEXT = new BaseContext;
        },
        506: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.diag = void 0;
            const n = r(930);
            t.diag = n.DiagAPI.instance();
        },
        56: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagComponentLogger = void 0;
            const n = r(172);
            class DiagComponentLogger {
                constructor(e){
                    this._namespace = e.namespace || "DiagComponentLogger";
                }
                debug(...e) {
                    return logProxy("debug", this._namespace, e);
                }
                error(...e) {
                    return logProxy("error", this._namespace, e);
                }
                info(...e) {
                    return logProxy("info", this._namespace, e);
                }
                warn(...e) {
                    return logProxy("warn", this._namespace, e);
                }
                verbose(...e) {
                    return logProxy("verbose", this._namespace, e);
                }
            }
            t.DiagComponentLogger = DiagComponentLogger;
            function logProxy(e, t, r) {
                const a = (0, n.getGlobal)("diag");
                if (!a) {
                    return;
                }
                r.unshift(t);
                return a[e](...r);
            }
        },
        972: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagConsoleLogger = void 0;
            const r = [
                {
                    n: "error",
                    c: "error"
                },
                {
                    n: "warn",
                    c: "warn"
                },
                {
                    n: "info",
                    c: "info"
                },
                {
                    n: "debug",
                    c: "debug"
                },
                {
                    n: "verbose",
                    c: "trace"
                }
            ];
            class DiagConsoleLogger {
                constructor(){
                    function _consoleFunc(e) {
                        return function(...t) {
                            if (console) {
                                let r = console[e];
                                if (typeof r !== "function") {
                                    r = console.log;
                                }
                                if (typeof r === "function") {
                                    return r.apply(console, t);
                                }
                            }
                        };
                    }
                    for(let e = 0; e < r.length; e++){
                        this[r[e].n] = _consoleFunc(r[e].c);
                    }
                }
            }
            t.DiagConsoleLogger = DiagConsoleLogger;
        },
        912: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createLogLevelDiagLogger = void 0;
            const n = r(957);
            function createLogLevelDiagLogger(e, t) {
                if (e < n.DiagLogLevel.NONE) {
                    e = n.DiagLogLevel.NONE;
                } else if (e > n.DiagLogLevel.ALL) {
                    e = n.DiagLogLevel.ALL;
                }
                t = t || {};
                function _filterFunc(r, n) {
                    const a = t[r];
                    if (typeof a === "function" && e >= n) {
                        return a.bind(t);
                    }
                    return function() {};
                }
                return {
                    error: _filterFunc("error", n.DiagLogLevel.ERROR),
                    warn: _filterFunc("warn", n.DiagLogLevel.WARN),
                    info: _filterFunc("info", n.DiagLogLevel.INFO),
                    debug: _filterFunc("debug", n.DiagLogLevel.DEBUG),
                    verbose: _filterFunc("verbose", n.DiagLogLevel.VERBOSE)
                };
            }
            t.createLogLevelDiagLogger = createLogLevelDiagLogger;
        },
        957: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.DiagLogLevel = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["ERROR"] = 30] = "ERROR";
                e[e["WARN"] = 50] = "WARN";
                e[e["INFO"] = 60] = "INFO";
                e[e["DEBUG"] = 70] = "DEBUG";
                e[e["VERBOSE"] = 80] = "VERBOSE";
                e[e["ALL"] = 9999] = "ALL";
            })(r = t.DiagLogLevel || (t.DiagLogLevel = {}));
        },
        172: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.unregisterGlobal = t.getGlobal = t.registerGlobal = void 0;
            const n = r(200);
            const a = r(521);
            const o = r(130);
            const i = a.VERSION.split(".")[0];
            const c = Symbol.for(`opentelemetry.js.api.${i}`);
            const s = n._globalThis;
            function registerGlobal(e, t, r, n = false) {
                var o;
                const i = s[c] = (o = s[c]) !== null && o !== void 0 ? o : {
                    version: a.VERSION
                };
                if (!n && i[e]) {
                    const t = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                if (i.version !== a.VERSION) {
                    const t = new Error(`@opentelemetry/api: Registration of version v${i.version} for ${e} does not match previously registered API v${a.VERSION}`);
                    r.error(t.stack || t.message);
                    return false;
                }
                i[e] = t;
                r.debug(`@opentelemetry/api: Registered a global for ${e} v${a.VERSION}.`);
                return true;
            }
            t.registerGlobal = registerGlobal;
            function getGlobal(e) {
                var t, r;
                const n = (t = s[c]) === null || t === void 0 ? void 0 : t.version;
                if (!n || !(0, o.isCompatible)(n)) {
                    return;
                }
                return (r = s[c]) === null || r === void 0 ? void 0 : r[e];
            }
            t.getGlobal = getGlobal;
            function unregisterGlobal(e, t) {
                t.debug(`@opentelemetry/api: Unregistering a global for ${e} v${a.VERSION}.`);
                const r = s[c];
                if (r) {
                    delete r[e];
                }
            }
            t.unregisterGlobal = unregisterGlobal;
        },
        130: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.isCompatible = t._makeCompatibilityCheck = void 0;
            const n = r(521);
            const a = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
            function _makeCompatibilityCheck(e) {
                const t = new Set([
                    e
                ]);
                const r = new Set;
                const n = e.match(a);
                if (!n) {
                    return ()=>false;
                }
                const o = {
                    major: +n[1],
                    minor: +n[2],
                    patch: +n[3],
                    prerelease: n[4]
                };
                if (o.prerelease != null) {
                    return function isExactmatch(t) {
                        return t === e;
                    };
                }
                function _reject(e) {
                    r.add(e);
                    return false;
                }
                function _accept(e) {
                    t.add(e);
                    return true;
                }
                return function isCompatible(e) {
                    if (t.has(e)) {
                        return true;
                    }
                    if (r.has(e)) {
                        return false;
                    }
                    const n = e.match(a);
                    if (!n) {
                        return _reject(e);
                    }
                    const i = {
                        major: +n[1],
                        minor: +n[2],
                        patch: +n[3],
                        prerelease: n[4]
                    };
                    if (i.prerelease != null) {
                        return _reject(e);
                    }
                    if (o.major !== i.major) {
                        return _reject(e);
                    }
                    if (o.major === 0) {
                        if (o.minor === i.minor && o.patch <= i.patch) {
                            return _accept(e);
                        }
                        return _reject(e);
                    }
                    if (o.minor <= i.minor) {
                        return _accept(e);
                    }
                    return _reject(e);
                };
            }
            t._makeCompatibilityCheck = _makeCompatibilityCheck;
            t.isCompatible = _makeCompatibilityCheck(n.VERSION);
        },
        886: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.metrics = void 0;
            const n = r(653);
            t.metrics = n.MetricsAPI.getInstance();
        },
        901: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ValueType = void 0;
            var r;
            (function(e) {
                e[e["INT"] = 0] = "INT";
                e[e["DOUBLE"] = 1] = "DOUBLE";
            })(r = t.ValueType || (t.ValueType = {}));
        },
        102: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createNoopMeter = t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t.NOOP_OBSERVABLE_GAUGE_METRIC = t.NOOP_OBSERVABLE_COUNTER_METRIC = t.NOOP_UP_DOWN_COUNTER_METRIC = t.NOOP_HISTOGRAM_METRIC = t.NOOP_COUNTER_METRIC = t.NOOP_METER = t.NoopObservableUpDownCounterMetric = t.NoopObservableGaugeMetric = t.NoopObservableCounterMetric = t.NoopObservableMetric = t.NoopHistogramMetric = t.NoopUpDownCounterMetric = t.NoopCounterMetric = t.NoopMetric = t.NoopMeter = void 0;
            class NoopMeter {
                constructor(){}
                createHistogram(e, r) {
                    return t.NOOP_HISTOGRAM_METRIC;
                }
                createCounter(e, r) {
                    return t.NOOP_COUNTER_METRIC;
                }
                createUpDownCounter(e, r) {
                    return t.NOOP_UP_DOWN_COUNTER_METRIC;
                }
                createObservableGauge(e, r) {
                    return t.NOOP_OBSERVABLE_GAUGE_METRIC;
                }
                createObservableCounter(e, r) {
                    return t.NOOP_OBSERVABLE_COUNTER_METRIC;
                }
                createObservableUpDownCounter(e, r) {
                    return t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
                }
                addBatchObservableCallback(e, t) {}
                removeBatchObservableCallback(e) {}
            }
            t.NoopMeter = NoopMeter;
            class NoopMetric {
            }
            t.NoopMetric = NoopMetric;
            class NoopCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopCounterMetric = NoopCounterMetric;
            class NoopUpDownCounterMetric extends NoopMetric {
                add(e, t) {}
            }
            t.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
            class NoopHistogramMetric extends NoopMetric {
                record(e, t) {}
            }
            t.NoopHistogramMetric = NoopHistogramMetric;
            class NoopObservableMetric {
                addCallback(e) {}
                removeCallback(e) {}
            }
            t.NoopObservableMetric = NoopObservableMetric;
            class NoopObservableCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableCounterMetric = NoopObservableCounterMetric;
            class NoopObservableGaugeMetric extends NoopObservableMetric {
            }
            t.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
            class NoopObservableUpDownCounterMetric extends NoopObservableMetric {
            }
            t.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
            t.NOOP_METER = new NoopMeter;
            t.NOOP_COUNTER_METRIC = new NoopCounterMetric;
            t.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric;
            t.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric;
            t.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric;
            t.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric;
            t.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric;
            function createNoopMeter() {
                return t.NOOP_METER;
            }
            t.createNoopMeter = createNoopMeter;
        },
        660: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NOOP_METER_PROVIDER = t.NoopMeterProvider = void 0;
            const n = r(102);
            class NoopMeterProvider {
                getMeter(e, t, r) {
                    return n.NOOP_METER;
                }
            }
            t.NoopMeterProvider = NoopMeterProvider;
            t.NOOP_METER_PROVIDER = new NoopMeterProvider;
        },
        200: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(46), t);
        },
        651: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t._globalThis = void 0;
            t._globalThis = typeof globalThis === "object" ? globalThis : __webpack_require__.g;
        },
        46: function(e, t, r) {
            var n = this && this.__createBinding || (Object.create ? function(e, t, r, n) {
                if (n === undefined) n = r;
                Object.defineProperty(e, n, {
                    enumerable: true,
                    get: function() {
                        return t[r];
                    }
                });
            } : function(e, t, r, n) {
                if (n === undefined) n = r;
                e[n] = t[r];
            });
            var a = this && this.__exportStar || function(e, t) {
                for(var r in e)if (r !== "default" && !Object.prototype.hasOwnProperty.call(t, r)) n(t, e, r);
            };
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            a(r(651), t);
        },
        939: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.propagation = void 0;
            const n = r(181);
            t.propagation = n.PropagationAPI.getInstance();
        },
        874: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTextMapPropagator = void 0;
            class NoopTextMapPropagator {
                inject(e, t) {}
                extract(e, t) {
                    return e;
                }
                fields() {
                    return [];
                }
            }
            t.NoopTextMapPropagator = NoopTextMapPropagator;
        },
        194: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.defaultTextMapSetter = t.defaultTextMapGetter = void 0;
            t.defaultTextMapGetter = {
                get (e, t) {
                    if (e == null) {
                        return undefined;
                    }
                    return e[t];
                },
                keys (e) {
                    if (e == null) {
                        return [];
                    }
                    return Object.keys(e);
                }
            };
            t.defaultTextMapSetter = {
                set (e, t, r) {
                    if (e == null) {
                        return;
                    }
                    e[t] = r;
                }
            };
        },
        845: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.trace = void 0;
            const n = r(997);
            t.trace = n.TraceAPI.getInstance();
        },
        403: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NonRecordingSpan = void 0;
            const n = r(476);
            class NonRecordingSpan {
                constructor(e = n.INVALID_SPAN_CONTEXT){
                    this._spanContext = e;
                }
                spanContext() {
                    return this._spanContext;
                }
                setAttribute(e, t) {
                    return this;
                }
                setAttributes(e) {
                    return this;
                }
                addEvent(e, t) {
                    return this;
                }
                setStatus(e) {
                    return this;
                }
                updateName(e) {
                    return this;
                }
                end(e) {}
                isRecording() {
                    return false;
                }
                recordException(e, t) {}
            }
            t.NonRecordingSpan = NonRecordingSpan;
        },
        614: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracer = void 0;
            const n = r(491);
            const a = r(607);
            const o = r(403);
            const i = r(139);
            const c = n.ContextAPI.getInstance();
            class NoopTracer {
                startSpan(e, t, r = c.active()) {
                    const n = Boolean(t === null || t === void 0 ? void 0 : t.root);
                    if (n) {
                        return new o.NonRecordingSpan;
                    }
                    const s = r && (0, a.getSpanContext)(r);
                    if (isSpanContext(s) && (0, i.isSpanContextValid)(s)) {
                        return new o.NonRecordingSpan(s);
                    } else {
                        return new o.NonRecordingSpan;
                    }
                }
                startActiveSpan(e, t, r, n) {
                    let o;
                    let i;
                    let s;
                    if (arguments.length < 2) {
                        return;
                    } else if (arguments.length === 2) {
                        s = t;
                    } else if (arguments.length === 3) {
                        o = t;
                        s = r;
                    } else {
                        o = t;
                        i = r;
                        s = n;
                    }
                    const u = i !== null && i !== void 0 ? i : c.active();
                    const l = this.startSpan(e, o, u);
                    const g = (0, a.setSpan)(u, l);
                    return c.with(g, s, undefined, l);
                }
            }
            t.NoopTracer = NoopTracer;
            function isSpanContext(e) {
                return typeof e === "object" && typeof e["spanId"] === "string" && typeof e["traceId"] === "string" && typeof e["traceFlags"] === "number";
            }
        },
        124: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.NoopTracerProvider = void 0;
            const n = r(614);
            class NoopTracerProvider {
                getTracer(e, t, r) {
                    return new n.NoopTracer;
                }
            }
            t.NoopTracerProvider = NoopTracerProvider;
        },
        125: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracer = void 0;
            const n = r(614);
            const a = new n.NoopTracer;
            class ProxyTracer {
                constructor(e, t, r, n){
                    this._provider = e;
                    this.name = t;
                    this.version = r;
                    this.options = n;
                }
                startSpan(e, t, r) {
                    return this._getTracer().startSpan(e, t, r);
                }
                startActiveSpan(e, t, r, n) {
                    const a = this._getTracer();
                    return Reflect.apply(a.startActiveSpan, a, arguments);
                }
                _getTracer() {
                    if (this._delegate) {
                        return this._delegate;
                    }
                    const e = this._provider.getDelegateTracer(this.name, this.version, this.options);
                    if (!e) {
                        return a;
                    }
                    this._delegate = e;
                    return this._delegate;
                }
            }
            t.ProxyTracer = ProxyTracer;
        },
        846: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.ProxyTracerProvider = void 0;
            const n = r(125);
            const a = r(124);
            const o = new a.NoopTracerProvider;
            class ProxyTracerProvider {
                getTracer(e, t, r) {
                    var a;
                    return (a = this.getDelegateTracer(e, t, r)) !== null && a !== void 0 ? a : new n.ProxyTracer(this, e, t, r);
                }
                getDelegate() {
                    var e;
                    return (e = this._delegate) !== null && e !== void 0 ? e : o;
                }
                setDelegate(e) {
                    this._delegate = e;
                }
                getDelegateTracer(e, t, r) {
                    var n;
                    return (n = this._delegate) === null || n === void 0 ? void 0 : n.getTracer(e, t, r);
                }
            }
            t.ProxyTracerProvider = ProxyTracerProvider;
        },
        996: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SamplingDecision = void 0;
            var r;
            (function(e) {
                e[e["NOT_RECORD"] = 0] = "NOT_RECORD";
                e[e["RECORD"] = 1] = "RECORD";
                e[e["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
            })(r = t.SamplingDecision || (t.SamplingDecision = {}));
        },
        607: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.getSpanContext = t.setSpanContext = t.deleteSpan = t.setSpan = t.getActiveSpan = t.getSpan = void 0;
            const n = r(780);
            const a = r(403);
            const o = r(491);
            const i = (0, n.createContextKey)("OpenTelemetry Context Key SPAN");
            function getSpan(e) {
                return e.getValue(i) || undefined;
            }
            t.getSpan = getSpan;
            function getActiveSpan() {
                return getSpan(o.ContextAPI.getInstance().active());
            }
            t.getActiveSpan = getActiveSpan;
            function setSpan(e, t) {
                return e.setValue(i, t);
            }
            t.setSpan = setSpan;
            function deleteSpan(e) {
                return e.deleteValue(i);
            }
            t.deleteSpan = deleteSpan;
            function setSpanContext(e, t) {
                return setSpan(e, new a.NonRecordingSpan(t));
            }
            t.setSpanContext = setSpanContext;
            function getSpanContext(e) {
                var t;
                return (t = getSpan(e)) === null || t === void 0 ? void 0 : t.spanContext();
            }
            t.getSpanContext = getSpanContext;
        },
        325: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceStateImpl = void 0;
            const n = r(564);
            const a = 32;
            const o = 512;
            const i = ",";
            const c = "=";
            class TraceStateImpl {
                constructor(e){
                    this._internalState = new Map;
                    if (e) this._parse(e);
                }
                set(e, t) {
                    const r = this._clone();
                    if (r._internalState.has(e)) {
                        r._internalState.delete(e);
                    }
                    r._internalState.set(e, t);
                    return r;
                }
                unset(e) {
                    const t = this._clone();
                    t._internalState.delete(e);
                    return t;
                }
                get(e) {
                    return this._internalState.get(e);
                }
                serialize() {
                    return this._keys().reduce((e, t)=>{
                        e.push(t + c + this.get(t));
                        return e;
                    }, []).join(i);
                }
                _parse(e) {
                    if (e.length > o) return;
                    this._internalState = e.split(i).reverse().reduce((e, t)=>{
                        const r = t.trim();
                        const a = r.indexOf(c);
                        if (a !== -1) {
                            const o = r.slice(0, a);
                            const i = r.slice(a + 1, t.length);
                            if ((0, n.validateKey)(o) && (0, n.validateValue)(i)) {
                                e.set(o, i);
                            } else {}
                        }
                        return e;
                    }, new Map);
                    if (this._internalState.size > a) {
                        this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, a));
                    }
                }
                _keys() {
                    return Array.from(this._internalState.keys()).reverse();
                }
                _clone() {
                    const e = new TraceStateImpl;
                    e._internalState = new Map(this._internalState);
                    return e;
                }
            }
            t.TraceStateImpl = TraceStateImpl;
        },
        564: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.validateValue = t.validateKey = void 0;
            const r = "[_0-9a-z-*/]";
            const n = `[a-z]${r}{0,255}`;
            const a = `[a-z0-9]${r}{0,240}@[a-z]${r}{0,13}`;
            const o = new RegExp(`^(?:${n}|${a})$`);
            const i = /^[ -~]{0,255}[!-~]$/;
            const c = /,|=/;
            function validateKey(e) {
                return o.test(e);
            }
            t.validateKey = validateKey;
            function validateValue(e) {
                return i.test(e) && !c.test(e);
            }
            t.validateValue = validateValue;
        },
        98: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.createTraceState = void 0;
            const n = r(325);
            function createTraceState(e) {
                return new n.TraceStateImpl(e);
            }
            t.createTraceState = createTraceState;
        },
        476: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.INVALID_SPAN_CONTEXT = t.INVALID_TRACEID = t.INVALID_SPANID = void 0;
            const n = r(475);
            t.INVALID_SPANID = "0000000000000000";
            t.INVALID_TRACEID = "00000000000000000000000000000000";
            t.INVALID_SPAN_CONTEXT = {
                traceId: t.INVALID_TRACEID,
                spanId: t.INVALID_SPANID,
                traceFlags: n.TraceFlags.NONE
            };
        },
        357: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanKind = void 0;
            var r;
            (function(e) {
                e[e["INTERNAL"] = 0] = "INTERNAL";
                e[e["SERVER"] = 1] = "SERVER";
                e[e["CLIENT"] = 2] = "CLIENT";
                e[e["PRODUCER"] = 3] = "PRODUCER";
                e[e["CONSUMER"] = 4] = "CONSUMER";
            })(r = t.SpanKind || (t.SpanKind = {}));
        },
        139: (e, t, r)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.wrapSpanContext = t.isSpanContextValid = t.isValidSpanId = t.isValidTraceId = void 0;
            const n = r(476);
            const a = r(403);
            const o = /^([0-9a-f]{32})$/i;
            const i = /^[0-9a-f]{16}$/i;
            function isValidTraceId(e) {
                return o.test(e) && e !== n.INVALID_TRACEID;
            }
            t.isValidTraceId = isValidTraceId;
            function isValidSpanId(e) {
                return i.test(e) && e !== n.INVALID_SPANID;
            }
            t.isValidSpanId = isValidSpanId;
            function isSpanContextValid(e) {
                return isValidTraceId(e.traceId) && isValidSpanId(e.spanId);
            }
            t.isSpanContextValid = isSpanContextValid;
            function wrapSpanContext(e) {
                return new a.NonRecordingSpan(e);
            }
            t.wrapSpanContext = wrapSpanContext;
        },
        847: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.SpanStatusCode = void 0;
            var r;
            (function(e) {
                e[e["UNSET"] = 0] = "UNSET";
                e[e["OK"] = 1] = "OK";
                e[e["ERROR"] = 2] = "ERROR";
            })(r = t.SpanStatusCode || (t.SpanStatusCode = {}));
        },
        475: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.TraceFlags = void 0;
            var r;
            (function(e) {
                e[e["NONE"] = 0] = "NONE";
                e[e["SAMPLED"] = 1] = "SAMPLED";
            })(r = t.TraceFlags || (t.TraceFlags = {}));
        },
        521: (e, t)=>{
            Object.defineProperty(t, "__esModule", {
                value: true
            });
            t.VERSION = void 0;
            t.VERSION = "1.6.0";
        }
    };
    var t = {};
    function __nccwpck_require__(r) {
        var n = t[r];
        if (n !== undefined) {
            return n.exports;
        }
        var a = t[r] = {
            exports: {}
        };
        var o = true;
        try {
            e[r].call(a.exports, a, a.exports, __nccwpck_require__);
            o = false;
        } finally{
            if (o) delete t[r];
        }
        return a.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var r = {};
    (()=>{
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: true
        });
        e.trace = e.propagation = e.metrics = e.diag = e.context = e.INVALID_SPAN_CONTEXT = e.INVALID_TRACEID = e.INVALID_SPANID = e.isValidSpanId = e.isValidTraceId = e.isSpanContextValid = e.createTraceState = e.TraceFlags = e.SpanStatusCode = e.SpanKind = e.SamplingDecision = e.ProxyTracerProvider = e.ProxyTracer = e.defaultTextMapSetter = e.defaultTextMapGetter = e.ValueType = e.createNoopMeter = e.DiagLogLevel = e.DiagConsoleLogger = e.ROOT_CONTEXT = e.createContextKey = e.baggageEntryMetadataFromString = void 0;
        var t = __nccwpck_require__(369);
        Object.defineProperty(e, "baggageEntryMetadataFromString", {
            enumerable: true,
            get: function() {
                return t.baggageEntryMetadataFromString;
            }
        });
        var n = __nccwpck_require__(780);
        Object.defineProperty(e, "createContextKey", {
            enumerable: true,
            get: function() {
                return n.createContextKey;
            }
        });
        Object.defineProperty(e, "ROOT_CONTEXT", {
            enumerable: true,
            get: function() {
                return n.ROOT_CONTEXT;
            }
        });
        var a = __nccwpck_require__(972);
        Object.defineProperty(e, "DiagConsoleLogger", {
            enumerable: true,
            get: function() {
                return a.DiagConsoleLogger;
            }
        });
        var o = __nccwpck_require__(957);
        Object.defineProperty(e, "DiagLogLevel", {
            enumerable: true,
            get: function() {
                return o.DiagLogLevel;
            }
        });
        var i = __nccwpck_require__(102);
        Object.defineProperty(e, "createNoopMeter", {
            enumerable: true,
            get: function() {
                return i.createNoopMeter;
            }
        });
        var c = __nccwpck_require__(901);
        Object.defineProperty(e, "ValueType", {
            enumerable: true,
            get: function() {
                return c.ValueType;
            }
        });
        var s = __nccwpck_require__(194);
        Object.defineProperty(e, "defaultTextMapGetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapGetter;
            }
        });
        Object.defineProperty(e, "defaultTextMapSetter", {
            enumerable: true,
            get: function() {
                return s.defaultTextMapSetter;
            }
        });
        var u = __nccwpck_require__(125);
        Object.defineProperty(e, "ProxyTracer", {
            enumerable: true,
            get: function() {
                return u.ProxyTracer;
            }
        });
        var l = __nccwpck_require__(846);
        Object.defineProperty(e, "ProxyTracerProvider", {
            enumerable: true,
            get: function() {
                return l.ProxyTracerProvider;
            }
        });
        var g = __nccwpck_require__(996);
        Object.defineProperty(e, "SamplingDecision", {
            enumerable: true,
            get: function() {
                return g.SamplingDecision;
            }
        });
        var p = __nccwpck_require__(357);
        Object.defineProperty(e, "SpanKind", {
            enumerable: true,
            get: function() {
                return p.SpanKind;
            }
        });
        var d = __nccwpck_require__(847);
        Object.defineProperty(e, "SpanStatusCode", {
            enumerable: true,
            get: function() {
                return d.SpanStatusCode;
            }
        });
        var _ = __nccwpck_require__(475);
        Object.defineProperty(e, "TraceFlags", {
            enumerable: true,
            get: function() {
                return _.TraceFlags;
            }
        });
        var f = __nccwpck_require__(98);
        Object.defineProperty(e, "createTraceState", {
            enumerable: true,
            get: function() {
                return f.createTraceState;
            }
        });
        var b = __nccwpck_require__(139);
        Object.defineProperty(e, "isSpanContextValid", {
            enumerable: true,
            get: function() {
                return b.isSpanContextValid;
            }
        });
        Object.defineProperty(e, "isValidTraceId", {
            enumerable: true,
            get: function() {
                return b.isValidTraceId;
            }
        });
        Object.defineProperty(e, "isValidSpanId", {
            enumerable: true,
            get: function() {
                return b.isValidSpanId;
            }
        });
        var v = __nccwpck_require__(476);
        Object.defineProperty(e, "INVALID_SPANID", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPANID;
            }
        });
        Object.defineProperty(e, "INVALID_TRACEID", {
            enumerable: true,
            get: function() {
                return v.INVALID_TRACEID;
            }
        });
        Object.defineProperty(e, "INVALID_SPAN_CONTEXT", {
            enumerable: true,
            get: function() {
                return v.INVALID_SPAN_CONTEXT;
            }
        });
        const O = __nccwpck_require__(67);
        Object.defineProperty(e, "context", {
            enumerable: true,
            get: function() {
                return O.context;
            }
        });
        const P = __nccwpck_require__(506);
        Object.defineProperty(e, "diag", {
            enumerable: true,
            get: function() {
                return P.diag;
            }
        });
        const N = __nccwpck_require__(886);
        Object.defineProperty(e, "metrics", {
            enumerable: true,
            get: function() {
                return N.metrics;
            }
        });
        const S = __nccwpck_require__(939);
        Object.defineProperty(e, "propagation", {
            enumerable: true,
            get: function() {
                return S.propagation;
            }
        });
        const C = __nccwpck_require__(845);
        Object.defineProperty(e, "trace", {
            enumerable: true,
            get: function() {
                return C.trace;
            }
        });
        e["default"] = {
            context: O.context,
            diag: P.diag,
            metrics: N.metrics,
            propagation: S.propagation,
            trace: C.trace
        };
    })();
    module.exports = r;
})();


/***/ }),

/***/ 578:
/***/ ((module) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();


/***/ }),

/***/ 950:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  c: () => (/* binding */ NextURL)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, "/api")) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? addPathSuffix(pathname, "/") : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":", 1)[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map


/***/ }),

/***/ 639:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.ResponseCookies),
/* harmony export */   q: () => (/* reexport safe */ next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__.RequestCookies)
/* harmony export */ });
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);
/* harmony import */ var next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_compiled_edge_runtime_cookies__WEBPACK_IMPORTED_MODULE_0__);
 //# sourceMappingURL=cookies.js.map


/***/ }),

/***/ 651:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ NextResponse)
/* harmony export */ });
/* harmony import */ var _next_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(950);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(723);
/* harmony import */ var _cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(639);



const INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[INTERNALS] = {
            cookies: new _cookies__WEBPACK_IMPORTED_MODULE_1__/* .ResponseCookies */ .n(this.headers),
            url: init.url ? new _next_url__WEBPACK_IMPORTED_MODULE_0__/* .NextURL */ .c(init.url, {
                headers: (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .toNodeOutgoingHttpHeaders */ .lb)(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .r4)(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .validateURL */ .r4)(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map


/***/ }),

/***/ 723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EK: () => (/* binding */ fromNodeOutgoingHttpHeaders),
/* harmony export */   lb: () => (/* binding */ toNodeOutgoingHttpHeaders),
/* harmony export */   r4: () => (/* binding */ validateURL)
/* harmony export */ });
/* unused harmony export splitCookiesString */
/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map


/***/ }),

/***/ 253:
/***/ ((module) => {

"use strict";
// Note: This file is JS because it's used by the taskfile-swc.js file, which is JS.
// Keep file changes in sync with the corresponding `.d.ts` files.
/**
 * These are the browser versions that support all of the following:
 * static import: https://caniuse.com/es6-module
 * dynamic import: https://caniuse.com/es6-module-dynamic-import
 * import.meta: https://caniuse.com/mdn-javascript_operators_import_meta
 */ 
const MODERN_BROWSERSLIST_TARGET = [
    "chrome 64",
    "edge 79",
    "firefox 67",
    "opera 51",
    "safari 12"
];
module.exports = MODERN_BROWSERSLIST_TARGET; //# sourceMappingURL=modern-browserslist-target.js.map


/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    withRequest: function() {
        return withRequest;
    },
    getTestReqInfo: function() {
        return getTestReqInfo;
    }
});
const _nodeasync_hooks = __webpack_require__(67);
const testStorage = new _nodeasync_hooks.AsyncLocalStorage();
function extractTestInfoFromRequest(req, reader) {
    const proxyPortHeader = reader.header(req, "next-test-proxy-port");
    if (!proxyPortHeader) {
        return undefined;
    }
    const url = reader.url(req);
    const proxyPort = Number(proxyPortHeader);
    const testData = reader.header(req, "next-test-data") || "";
    return {
        url,
        proxyPort,
        testData
    };
}
function withRequest(req, reader, fn) {
    const testReqInfo = extractTestInfoFromRequest(req, reader);
    if (!testReqInfo) {
        return fn();
    }
    return testStorage.run(testReqInfo, fn);
}
function getTestReqInfo(req, reader) {
    const testReqInfo = testStorage.getStore();
    if (testReqInfo) {
        return testReqInfo;
    }
    if (req && reader) {
        return extractTestInfoFromRequest(req, reader);
    }
    return undefined;
} //# sourceMappingURL=context.js.map


/***/ }),

/***/ 131:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(195)["Buffer"];

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    reader: function() {
        return reader;
    },
    handleFetch: function() {
        return handleFetch;
    },
    interceptFetch: function() {
        return interceptFetch;
    }
});
const _context = __webpack_require__(122);
const reader = {
    url (req) {
        return req.url;
    },
    header (req, name) {
        return req.headers.get(name);
    }
};
function getTestStack() {
    let stack = (new Error().stack ?? "").split("\n");
    // Skip the first line and find first non-empty line.
    for(let i = 1; i < stack.length; i++){
        if (stack[i].length > 0) {
            stack = stack.slice(i);
            break;
        }
    }
    // Filter out franmework lines.
    stack = stack.filter((f)=>!f.includes("/next/dist/"));
    // At most 5 lines.
    stack = stack.slice(0, 5);
    // Cleanup some internal info and trim.
    stack = stack.map((s)=>s.replace("webpack-internal:///(rsc)/", "").trim());
    return stack.join("    ");
}
async function buildProxyRequest(testData, request) {
    const { url, method, headers, body, cache, credentials, integrity, mode, redirect, referrer, referrerPolicy } = request;
    return {
        testData,
        api: "fetch",
        request: {
            url,
            method,
            headers: [
                ...Array.from(headers),
                [
                    "next-test-stack",
                    getTestStack()
                ]
            ],
            body: body ? Buffer.from(await request.arrayBuffer()).toString("base64") : null,
            cache,
            credentials,
            integrity,
            mode,
            redirect,
            referrer,
            referrerPolicy
        }
    };
}
function buildResponse(proxyResponse) {
    const { status, headers, body } = proxyResponse.response;
    return new Response(body ? Buffer.from(body, "base64") : null, {
        status,
        headers: new Headers(headers)
    });
}
async function handleFetch(originalFetch, request) {
    const testInfo = (0, _context.getTestReqInfo)(request, reader);
    if (!testInfo) {
        throw new Error(`No test info for ${request.method} ${request.url}`);
    }
    const { testData, proxyPort } = testInfo;
    const proxyRequest = await buildProxyRequest(testData, request);
    const resp = await originalFetch(`http://localhost:${proxyPort}`, {
        method: "POST",
        body: JSON.stringify(proxyRequest),
        next: {
            // @ts-ignore
            internal: true
        }
    });
    if (!resp.ok) {
        throw new Error(`Proxy request failed: ${resp.status}`);
    }
    const proxyResponse = await resp.json();
    const { api } = proxyResponse;
    switch(api){
        case "continue":
            return originalFetch(request);
        case "abort":
        case "unhandled":
            throw new Error(`Proxy request aborted [${request.method} ${request.url}]`);
        default:
            break;
    }
    return buildResponse(proxyResponse);
}
function interceptFetch(originalFetch) {
    __webpack_require__.g.fetch = function testFetch(input, init) {
        var _init_next;
        // Passthrough internal requests.
        // @ts-ignore
        if (init == null ? void 0 : (_init_next = init.next) == null ? void 0 : _init_next.internal) {
            return originalFetch(input, init);
        }
        return handleFetch(originalFetch, new Request(input, init));
    };
    return ()=>{
        __webpack_require__.g.fetch = originalFetch;
    };
} //# sourceMappingURL=fetch.js.map


/***/ }),

/***/ 895:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    interceptTestApis: function() {
        return interceptTestApis;
    },
    wrapRequestHandler: function() {
        return wrapRequestHandler;
    }
});
const _context = __webpack_require__(122);
const _fetch = __webpack_require__(131);
function interceptTestApis() {
    return (0, _fetch.interceptFetch)(__webpack_require__.g.fetch);
}
function wrapRequestHandler(handler) {
    return (req, fn)=>(0, _context.withRequest)(req, _fetch.reader, ()=>handler(req, fn));
} //# sourceMappingURL=server-edge.js.map


/***/ }),

/***/ 292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  NIL: () => (/* reexport */ nil),
  parse: () => (/* reexport */ esm_browser_parse),
  stringify: () => (/* reexport */ esm_browser_stringify),
  v1: () => (/* reexport */ esm_browser_v1),
  v3: () => (/* reexport */ esm_browser_v3),
  v4: () => (/* reexport */ esm_browser_v4),
  v5: () => (/* reexport */ esm_browser_v5),
  validate: () => (/* reexport */ esm_browser_validate),
  version: () => (/* reexport */ esm_browser_version)
});

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) {
            throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        }
    }
    return getRandomValues(rnds8);
}

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js

function validate(uuid) {
    return typeof uuid === "string" && regex.test(uuid);
}
/* harmony default export */ const esm_browser_validate = (validate);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!esm_browser_validate(uuid)) {
        throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
}
/* harmony default export */ const esm_browser_stringify = (stringify);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v1.js

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq; // Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || rng)();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(var n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || esm_browser_stringify(b);
}
/* harmony default export */ const esm_browser_v1 = (v1);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/parse.js

function parse(uuid) {
    if (!esm_browser_validate(uuid)) {
        throw TypeError("Invalid UUID");
    }
    var v;
    var arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
/* harmony default export */ const esm_browser_parse = (parse);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v35.js


function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    var bytes = [];
    for(var i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
/* harmony default export */ function v35(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
            value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
            namespace = esm_browser_parse(namespace);
        }
        if (namespace.length !== 16) {
            throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(var i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return esm_browser_stringify(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/md5.js
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ function md5(bytes) {
    if (typeof bytes === "string") {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(var i = 0; i < msg.length; ++i){
            bytes[i] = msg.charCodeAt(i);
        }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = "0123456789abcdef";
    for(var i = 0; i < length32; i += 8){
        var x = input[i >> 5] >>> i % 32 & 0xff;
        var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(var i = 0; i < x.length; i += 16){
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) {
        return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for(var i = 0; i < length8; i += 8){
        output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    }
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
/* harmony default export */ const esm_browser_md5 = (md5);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v3.js


var v3 = v35("v3", 0x30, esm_browser_md5);
/* harmony default export */ const esm_browser_v3 = (v3);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js


function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return esm_browser_stringify(rnds);
}
/* harmony default export */ const esm_browser_v4 = (v4);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/sha1.js
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    var K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    var H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === "string") {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(var i = 0; i < msg.length; ++i){
            bytes.push(msg.charCodeAt(i));
        }
    } else if (!Array.isArray(bytes)) {
        // Convert Array-like to Array
        bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(0x80);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for(var _i = 0; _i < N; ++_i){
        var arr = new Uint32Array(16);
        for(var j = 0; j < 16; ++j){
            arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        }
        M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(var _i2 = 0; _i2 < N; ++_i2){
        var W = new Uint32Array(80);
        for(var t = 0; t < 16; ++t){
            W[t] = M[_i2][t];
        }
        for(var _t = 16; _t < 80; ++_t){
            W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        }
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for(var _t2 = 0; _t2 < 80; ++_t2){
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
/* harmony default export */ const esm_browser_sha1 = (sha1);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v5.js


var v5 = v35("v5", 0x50, esm_browser_sha1);
/* harmony default export */ const esm_browser_v5 = (v5);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/nil.js
/* harmony default export */ const nil = ("00000000-0000-0000-0000-000000000000");

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/version.js

function version(uuid) {
    if (!esm_browser_validate(uuid)) {
        throw TypeError("Invalid UUID");
    }
    return parseInt(uuid.substr(14, 1), 16);
}
/* harmony default export */ const esm_browser_version = (version);

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/index.js











/***/ }),

/***/ 597:
/***/ ((module) => {

"use strict";

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;


/***/ }),

/***/ 347:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ web_hkdf),
  hkdf: () => (/* binding */ web_hkdf)
});

;// CONCATENATED MODULE: ./node_modules/@panva/hkdf/dist/web/runtime/hkdf.js
const getGlobal = ()=>{
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (false) {}
    throw new Error("unable to locate global object");
};
/* harmony default export */ const hkdf = (async (digest, ikm, salt, info, keylen)=>{
    const { crypto: { subtle } } = getGlobal();
    return new Uint8Array(await subtle.deriveBits({
        name: "HKDF",
        hash: `SHA-${digest.substr(3)}`,
        salt,
        info
    }, await subtle.importKey("raw", ikm, "HKDF", false, [
        "deriveBits"
    ]), keylen << 3));
});

;// CONCATENATED MODULE: ./node_modules/@panva/hkdf/dist/web/index.js

function normalizeDigest(digest) {
    switch(digest){
        case "sha256":
        case "sha384":
        case "sha512":
        case "sha1":
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === "string") return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, "ikm");
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, "info");
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== "number" || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function web_hkdf(digest, ikm, salt, info, keylen) {
    return hkdf(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, "salt"), normalizeInfo(info), normalizeKeylen(keylen, digest));
}



/***/ }),

/***/ 998:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  CompactEncrypt: () => (/* reexport */ CompactEncrypt),
  CompactSign: () => (/* reexport */ CompactSign),
  EmbeddedJWK: () => (/* reexport */ EmbeddedJWK),
  EncryptJWT: () => (/* reexport */ EncryptJWT),
  FlattenedEncrypt: () => (/* reexport */ FlattenedEncrypt),
  FlattenedSign: () => (/* reexport */ FlattenedSign),
  GeneralEncrypt: () => (/* reexport */ GeneralEncrypt),
  GeneralSign: () => (/* reexport */ GeneralSign),
  SignJWT: () => (/* reexport */ SignJWT),
  UnsecuredJWT: () => (/* reexport */ UnsecuredJWT),
  base64url: () => (/* reexport */ util_base64url_namespaceObject),
  calculateJwkThumbprint: () => (/* reexport */ calculateJwkThumbprint),
  calculateJwkThumbprintUri: () => (/* reexport */ calculateJwkThumbprintUri),
  compactDecrypt: () => (/* reexport */ compactDecrypt),
  compactVerify: () => (/* reexport */ compactVerify),
  createLocalJWKSet: () => (/* reexport */ createLocalJWKSet),
  createRemoteJWKSet: () => (/* reexport */ createRemoteJWKSet),
  cryptoRuntime: () => (/* reexport */ util_runtime),
  decodeJwt: () => (/* reexport */ decodeJwt),
  decodeProtectedHeader: () => (/* reexport */ decodeProtectedHeader),
  errors: () => (/* reexport */ errors_namespaceObject),
  exportJWK: () => (/* reexport */ exportJWK),
  exportPKCS8: () => (/* reexport */ exportPKCS8),
  exportSPKI: () => (/* reexport */ exportSPKI),
  flattenedDecrypt: () => (/* reexport */ flattenedDecrypt),
  flattenedVerify: () => (/* reexport */ flattenedVerify),
  generalDecrypt: () => (/* reexport */ generalDecrypt),
  generalVerify: () => (/* reexport */ generalVerify),
  generateKeyPair: () => (/* reexport */ generate_key_pair_generateKeyPair),
  generateSecret: () => (/* reexport */ generate_secret_generateSecret),
  importJWK: () => (/* reexport */ importJWK),
  importPKCS8: () => (/* reexport */ importPKCS8),
  importSPKI: () => (/* reexport */ importSPKI),
  importX509: () => (/* reexport */ importX509),
  jwtDecrypt: () => (/* reexport */ jwtDecrypt),
  jwtVerify: () => (/* reexport */ jwtVerify)
});

// NAMESPACE OBJECT: ./node_modules/jose/dist/browser/util/errors.js
var errors_namespaceObject = {};
__webpack_require__.r(errors_namespaceObject);
__webpack_require__.d(errors_namespaceObject, {
  JOSEAlgNotAllowed: () => (JOSEAlgNotAllowed),
  JOSEError: () => (JOSEError),
  JOSENotSupported: () => (JOSENotSupported),
  JWEDecompressionFailed: () => (JWEDecompressionFailed),
  JWEDecryptionFailed: () => (JWEDecryptionFailed),
  JWEInvalid: () => (JWEInvalid),
  JWKInvalid: () => (JWKInvalid),
  JWKSInvalid: () => (JWKSInvalid),
  JWKSMultipleMatchingKeys: () => (JWKSMultipleMatchingKeys),
  JWKSNoMatchingKey: () => (JWKSNoMatchingKey),
  JWKSTimeout: () => (JWKSTimeout),
  JWSInvalid: () => (JWSInvalid),
  JWSSignatureVerificationFailed: () => (JWSSignatureVerificationFailed),
  JWTClaimValidationFailed: () => (JWTClaimValidationFailed),
  JWTExpired: () => (JWTExpired),
  JWTInvalid: () => (JWTInvalid)
});

// NAMESPACE OBJECT: ./node_modules/jose/dist/browser/util/base64url.js
var util_base64url_namespaceObject = {};
__webpack_require__.r(util_base64url_namespaceObject);
__webpack_require__.d(util_base64url_namespaceObject, {
  decode: () => (base64url_decode),
  encode: () => (base64url_encode)
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/webcrypto.js
/* harmony default export */ const webcrypto = (crypto);
const isCryptoKey = (key)=>key instanceof CryptoKey;

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/digest.js

const digest = async (algorithm, data)=>{
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(await webcrypto.subtle.digest(subtleDigest, data));
};
/* harmony default export */ const runtime_digest = (digest);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/buffer_utils.js

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const MAX_INT32 = 2 ** 32;
function concat(...buffers) {
    const size = buffers.reduce((acc, { length })=>acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer)=>{
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}
function buffer_utils_p2s(alg, p2sInput) {
    return concat(encoder.encode(alg), new Uint8Array([
        0
    ]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([
        value >>> 24,
        value >>> 16,
        value >>> 8,
        value & 0xff
    ], offset);
}
function uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function lengthAndInput(input) {
    return concat(uint32be(input.length), input);
}
async function concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for(let iter = 0; iter < iterations; iter++){
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await runtime_digest("sha256", buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/base64url.js

const encodeBase64 = (input)=>{
    let unencoded = input;
    if (typeof unencoded === "string") {
        unencoded = encoder.encode(unencoded);
    }
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for(let i = 0; i < unencoded.length; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(""));
};
const encode = (input)=>{
    return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
const decodeBase64 = (encoded)=>{
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};
const decode = (input)=>{
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    try {
        return decodeBase64(encoded);
    } catch (_a) {
        throw new TypeError("The input to be decoded is not correctly encoded.");
    }
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/errors.js
class JOSEError extends Error {
    static get code() {
        return "ERR_JOSE_GENERIC";
    }
    constructor(message){
        var _a;
        super(message);
        this.code = "ERR_JOSE_GENERIC";
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
}
class JWTClaimValidationFailed extends JOSEError {
    static get code() {
        return "ERR_JWT_CLAIM_VALIDATION_FAILED";
    }
    constructor(message, claim = "unspecified", reason = "unspecified"){
        super(message);
        this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        this.claim = claim;
        this.reason = reason;
    }
}
class JWTExpired extends JOSEError {
    static get code() {
        return "ERR_JWT_EXPIRED";
    }
    constructor(message, claim = "unspecified", reason = "unspecified"){
        super(message);
        this.code = "ERR_JWT_EXPIRED";
        this.claim = claim;
        this.reason = reason;
    }
}
class JOSEAlgNotAllowed extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
    }
    static get code() {
        return "ERR_JOSE_ALG_NOT_ALLOWED";
    }
}
class JOSENotSupported extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JOSE_NOT_SUPPORTED";
    }
    static get code() {
        return "ERR_JOSE_NOT_SUPPORTED";
    }
}
class JWEDecryptionFailed extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWE_DECRYPTION_FAILED";
        this.message = "decryption operation failed";
    }
    static get code() {
        return "ERR_JWE_DECRYPTION_FAILED";
    }
}
class JWEDecompressionFailed extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWE_DECOMPRESSION_FAILED";
        this.message = "decompression operation failed";
    }
    static get code() {
        return "ERR_JWE_DECOMPRESSION_FAILED";
    }
}
class JWEInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWE_INVALID";
    }
    static get code() {
        return "ERR_JWE_INVALID";
    }
}
class JWSInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWS_INVALID";
    }
    static get code() {
        return "ERR_JWS_INVALID";
    }
}
class JWTInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWT_INVALID";
    }
    static get code() {
        return "ERR_JWT_INVALID";
    }
}
class JWKInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWK_INVALID";
    }
    static get code() {
        return "ERR_JWK_INVALID";
    }
}
class JWKSInvalid extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_INVALID";
    }
    static get code() {
        return "ERR_JWKS_INVALID";
    }
}
class JWKSNoMatchingKey extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_NO_MATCHING_KEY";
        this.message = "no applicable key found in the JSON Web Key Set";
    }
    static get code() {
        return "ERR_JWKS_NO_MATCHING_KEY";
    }
}
class JWKSMultipleMatchingKeys extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        this.message = "multiple matching keys found in the JSON Web Key Set";
    }
    static get code() {
        return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    }
}
Symbol.asyncIterator;
class JWKSTimeout extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_TIMEOUT";
        this.message = "request timed out";
    }
    static get code() {
        return "ERR_JWKS_TIMEOUT";
    }
}
class JWSSignatureVerificationFailed extends JOSEError {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        this.message = "signature verification failed";
    }
    static get code() {
        return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/random.js

/* harmony default export */ const random = (webcrypto.getRandomValues.bind(webcrypto));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/iv.js


function bitLength(alg) {
    switch(alg){
        case "A128GCM":
        case "A128GCMKW":
        case "A192GCM":
        case "A192GCMKW":
        case "A256GCM":
        case "A256GCMKW":
            return 96;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            return 128;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const lib_iv = ((alg)=>random(new Uint8Array(bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/check_iv_length.js


const checkIvLength = (enc, iv)=>{
    if (iv.length << 3 !== bitLength(enc)) {
        throw new JWEInvalid("Invalid Initialization Vector length");
    }
};
/* harmony default export */ const check_iv_length = (checkIvLength);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/check_cek_length.js

const checkCekLength = (cek, expected)=>{
    const actual = cek.byteLength << 3;
    if (actual !== expected) {
        throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
    }
};
/* harmony default export */ const check_cek_length = (checkCekLength);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/timing_safe_equal.js
const timingSafeEqual = (a, b)=>{
    if (!(a instanceof Uint8Array)) {
        throw new TypeError("First argument must be a buffer");
    }
    if (!(b instanceof Uint8Array)) {
        throw new TypeError("Second argument must be a buffer");
    }
    if (a.length !== b.length) {
        throw new TypeError("Input buffers must have the same length");
    }
    const len = a.length;
    let out = 0;
    let i = -1;
    while(++i < len){
        out |= a[i] ^ b[i];
    }
    return out === 0;
};
/* harmony default export */ const timing_safe_equal = (timingSafeEqual);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
    return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
    return algorithm.name === name;
}
function getHashLength(hash) {
    return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
    switch(alg){
        case "ES256":
            return "P-256";
        case "ES384":
            return "P-384";
        case "ES512":
            return "P-521";
        default:
            throw new Error("unreachable");
    }
}
function checkUsage(key, usages) {
    if (usages.length && !usages.some((expected)=>key.usages.includes(expected))) {
        let msg = "CryptoKey does not support this operation, its usages must include ";
        if (usages.length > 2) {
            const last = usages.pop();
            msg += `one of ${usages.join(", ")}, or ${last}.`;
        } else if (usages.length === 2) {
            msg += `one of ${usages[0]} or ${usages[1]}.`;
        } else {
            msg += `${usages[0]}.`;
        }
        throw new TypeError(msg);
    }
}
function checkSigCryptoKey(key, alg, ...usages) {
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            {
                if (!isAlgorithm(key.algorithm, "HMAC")) throw unusable("HMAC");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "RS256":
        case "RS384":
        case "RS512":
            {
                if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5")) throw unusable("RSASSA-PKCS1-v1_5");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "PS256":
        case "PS384":
        case "PS512":
            {
                if (!isAlgorithm(key.algorithm, "RSA-PSS")) throw unusable("RSA-PSS");
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        case "EdDSA":
            {
                if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
                    throw unusable("Ed25519 or Ed448");
                }
                break;
            }
        case "ES256":
        case "ES384":
        case "ES512":
            {
                if (!isAlgorithm(key.algorithm, "ECDSA")) throw unusable("ECDSA");
                const expected = getNamedCurve(alg);
                const actual = key.algorithm.namedCurve;
                if (actual !== expected) throw unusable(expected, "algorithm.namedCurve");
                break;
            }
        default:
            throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usages);
}
function checkEncCryptoKey(key, alg, ...usages) {
    switch(alg){
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            {
                if (!isAlgorithm(key.algorithm, "AES-GCM")) throw unusable("AES-GCM");
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, "algorithm.length");
                break;
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                if (!isAlgorithm(key.algorithm, "AES-KW")) throw unusable("AES-KW");
                const expected = parseInt(alg.slice(1, 4), 10);
                const actual = key.algorithm.length;
                if (actual !== expected) throw unusable(expected, "algorithm.length");
                break;
            }
        case "ECDH":
            {
                switch(key.algorithm.name){
                    case "ECDH":
                    case "X25519":
                    case "X448":
                        break;
                    default:
                        throw unusable("ECDH, X25519, or X448");
                }
                break;
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            if (!isAlgorithm(key.algorithm, "PBKDF2")) throw unusable("PBKDF2");
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                if (!isAlgorithm(key.algorithm, "RSA-OAEP")) throw unusable("RSA-OAEP");
                const expected = parseInt(alg.slice(9), 10) || 1;
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected) throw unusable(`SHA-${expected}`, "algorithm.hash");
                break;
            }
        default:
            throw new TypeError("CryptoKey does not support this operation");
    }
    checkUsage(key, usages);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types) {
    if (types.length > 2) {
        const last = types.pop();
        msg += `one of type ${types.join(", ")}, or ${last}.`;
    } else if (types.length === 2) {
        msg += `one of type ${types[0]} or ${types[1]}.`;
    } else {
        msg += `of type ${types[0]}.`;
    }
    if (actual == null) {
        msg += ` Received ${actual}`;
    } else if (typeof actual === "function" && actual.name) {
        msg += ` Received function ${actual.name}`;
    } else if (typeof actual === "object" && actual != null) {
        if (actual.constructor && actual.constructor.name) {
            msg += ` Received an instance of ${actual.constructor.name}`;
        }
    }
    return msg;
}
/* harmony default export */ const invalid_key_input = ((actual, ...types)=>{
    return message("Key must be ", actual, ...types);
});
function withAlg(alg, actual, ...types) {
    return message(`Key for the ${alg} algorithm must be `, actual, ...types);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/is_key_like.js

/* harmony default export */ const is_key_like = ((key)=>{
    return isCryptoKey(key);
});
const types = [
    "CryptoKey"
];

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/decrypt.js









async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalid_key_input(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await webcrypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "decrypt"
    ]);
    const macKey = await webcrypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((await webcrypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
        macCheckPassed = timing_safe_equal(tag, expectedTag);
    } catch (_a) {}
    if (!macCheckPassed) {
        throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
        plaintext = new Uint8Array(await webcrypto.subtle.decrypt({
            iv,
            name: "AES-CBC"
        }, encKey, ciphertext));
    } catch (_b) {}
    if (!plaintext) {
        throw new JWEDecryptionFailed();
    }
    return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await webcrypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "decrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "decrypt");
        encKey = cek;
    }
    try {
        return new Uint8Array(await webcrypto.subtle.decrypt({
            additionalData: aad,
            iv,
            name: "AES-GCM",
            tagLength: 128
        }, encKey, concat(ciphertext, tag)));
    } catch (_a) {
        throw new JWEDecryptionFailed();
    }
}
const decrypt = async (enc, cek, ciphertext, iv, tag, aad)=>{
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalid_key_input(cek, ...types, "Uint8Array"));
    }
    check_iv_length(enc, iv);
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) check_cek_length(cek, parseInt(enc.slice(-3), 10));
            return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) check_cek_length(cek, parseInt(enc.slice(1, 4), 10));
            return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
};
/* harmony default export */ const runtime_decrypt = (decrypt);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/zlib.js

const inflate = async ()=>{
    throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `inflateRaw` decrypt option to provide Inflate Raw implementation.');
};
const deflate = async ()=>{
    throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `deflateRaw` encrypt option to provide Deflate Raw implementation.');
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/is_disjoint.js
const isDisjoint = (...headers)=>{
    const sources = headers.filter(Boolean);
    if (sources.length === 0 || sources.length === 1) {
        return true;
    }
    let acc;
    for (const header of sources){
        const parameters = Object.keys(header);
        if (!acc || acc.size === 0) {
            acc = new Set(parameters);
            continue;
        }
        for (const parameter of parameters){
            if (acc.has(parameter)) {
                return false;
            }
            acc.add(parameter);
        }
    }
    return true;
};
/* harmony default export */ const is_disjoint = (isDisjoint);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/is_object.js
function isObjectLike(value) {
    return typeof value === "object" && value !== null;
}
function isObject(input) {
    if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
        return false;
    }
    if (Object.getPrototypeOf(input) === null) {
        return true;
    }
    let proto = input;
    while(Object.getPrototypeOf(proto) !== null){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(input) === proto;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/bogus.js
const bogusWebCrypto = [
    {
        hash: "SHA-256",
        name: "HMAC"
    },
    true,
    [
        "sign"
    ]
];
/* harmony default export */ const bogus = (bogusWebCrypto);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/aeskw.js





function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function getCryptoKey(key, alg, usage) {
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, usage);
        return key;
    }
    if (key instanceof Uint8Array) {
        return webcrypto.subtle.importKey("raw", key, "AES-KW", true, [
            usage
        ]);
    }
    throw new TypeError(invalid_key_input(key, ...types, "Uint8Array"));
}
const wrap = async (alg, key, cek)=>{
    const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await webcrypto.subtle.importKey("raw", cek, ...bogus);
    return new Uint8Array(await webcrypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
};
const unwrap = async (alg, key, encryptedKey)=>{
    const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await webcrypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", ...bogus);
    return new Uint8Array(await webcrypto.subtle.exportKey("raw", cryptoKeyCek));
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/ecdhes.js





async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!isCryptoKey(publicKey)) {
        throw new TypeError(invalid_key_input(publicKey, ...types));
    }
    checkEncCryptoKey(publicKey, "ECDH");
    if (!isCryptoKey(privateKey)) {
        throw new TypeError(invalid_key_input(privateKey, ...types));
    }
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    let length;
    if (publicKey.algorithm.name === "X25519") {
        length = 256;
    } else if (publicKey.algorithm.name === "X448") {
        length = 448;
    } else {
        length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(await webcrypto.subtle.deriveBits({
        name: publicKey.algorithm.name,
        public: publicKey
    }, privateKey, length));
    return concatKdf(sharedSecret, keyLength, value);
}
async function generateEpk(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types));
    }
    return webcrypto.subtle.generateKey(key.algorithm, true, [
        "deriveBits"
    ]);
}
function ecdhAllowed(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types));
    }
    return [
        "P-256",
        "P-384",
        "P-521"
    ].includes(key.algorithm.namedCurve) || key.algorithm.name === "X25519" || key.algorithm.name === "X448";
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/check_p2s.js

function checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/pbes2kw.js









function pbes2kw_getCryptoKey(key, alg) {
    if (key instanceof Uint8Array) {
        return webcrypto.subtle.importKey("raw", key, "PBKDF2", false, [
            "deriveBits"
        ]);
    }
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, "deriveBits", "deriveKey");
        return key;
    }
    throw new TypeError(invalid_key_input(key, ...types, "Uint8Array"));
}
async function pbes2kw_deriveKey(p2s, alg, p2c, key) {
    checkP2s(p2s);
    const salt = buffer_utils_p2s(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
        hash: `SHA-${alg.slice(8, 11)}`,
        iterations: p2c,
        name: "PBKDF2",
        salt
    };
    const wrapAlg = {
        length: keylen,
        name: "AES-KW"
    };
    const cryptoKey = await pbes2kw_getCryptoKey(key, alg);
    if (cryptoKey.usages.includes("deriveBits")) {
        return new Uint8Array(await webcrypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes("deriveKey")) {
        return webcrypto.subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, [
            "wrapKey",
            "unwrapKey"
        ]);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
const encrypt = async (alg, key, cek, p2c = 2048, p2s = random(new Uint8Array(16)))=>{
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    const encryptedKey = await wrap(alg.slice(-6), derived, cek);
    return {
        encryptedKey,
        p2c,
        p2s: encode(p2s)
    };
};
const pbes2kw_decrypt = async (alg, key, encryptedKey, p2c, p2s)=>{
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    return unwrap(alg.slice(-6), derived, encryptedKey);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/subtle_rsaes.js

function subtleRsaEs(alg) {
    switch(alg){
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            return "RSA-OAEP";
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/check_key_length.js
/* harmony default export */ const check_key_length = ((alg, key)=>{
    if (alg.startsWith("RS") || alg.startsWith("PS")) {
        const { modulusLength } = key.algorithm;
        if (typeof modulusLength !== "number" || modulusLength < 2048) {
            throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
        }
    }
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/rsaes.js







const rsaes_encrypt = async (alg, key, cek)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types));
    }
    checkEncCryptoKey(key, alg, "encrypt", "wrapKey");
    check_key_length(alg, key);
    if (key.usages.includes("encrypt")) {
        return new Uint8Array(await webcrypto.subtle.encrypt(subtleRsaEs(alg), key, cek));
    }
    if (key.usages.includes("wrapKey")) {
        const cryptoKeyCek = await webcrypto.subtle.importKey("raw", cek, ...bogus);
        return new Uint8Array(await webcrypto.subtle.wrapKey("raw", cryptoKeyCek, key, subtleRsaEs(alg)));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
};
const rsaes_decrypt = async (alg, key, encryptedKey)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types));
    }
    checkEncCryptoKey(key, alg, "decrypt", "unwrapKey");
    check_key_length(alg, key);
    if (key.usages.includes("decrypt")) {
        return new Uint8Array(await webcrypto.subtle.decrypt(subtleRsaEs(alg), key, encryptedKey));
    }
    if (key.usages.includes("unwrapKey")) {
        const cryptoKeyCek = await webcrypto.subtle.unwrapKey("raw", encryptedKey, key, subtleRsaEs(alg), ...bogus);
        return new Uint8Array(await webcrypto.subtle.exportKey("raw", cryptoKeyCek));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/cek.js


function cek_bitLength(alg) {
    switch(alg){
        case "A128GCM":
            return 128;
        case "A192GCM":
            return 192;
        case "A256GCM":
        case "A128CBC-HS256":
            return 256;
        case "A192CBC-HS384":
            return 384;
        case "A256CBC-HS512":
            return 512;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const lib_cek = ((alg)=>random(new Uint8Array(cek_bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/format_pem.js
/* harmony default export */ const format_pem = ((b64, descriptor)=>{
    const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
    return `-----BEGIN ${descriptor}-----\n${newlined}\n-----END ${descriptor}-----`;
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/asn1.js






const genericExport = async (keyType, keyFormat, key)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types));
    }
    if (!key.extractable) {
        throw new TypeError("CryptoKey is not extractable");
    }
    if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return format_pem(encodeBase64(new Uint8Array(await webcrypto.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
const toSPKI = (key)=>{
    return genericExport("public", "spki", key);
};
const toPKCS8 = (key)=>{
    return genericExport("private", "pkcs8", key);
};
const findOid = (keyData, oid, from = 0)=>{
    if (from === 0) {
        oid.unshift(oid.length);
        oid.unshift(0x06);
    }
    let i = keyData.indexOf(oid[0], from);
    if (i === -1) return false;
    const sub = keyData.subarray(i, i + oid.length);
    if (sub.length !== oid.length) return false;
    return sub.every((value, index)=>value === oid[index]) || findOid(keyData, oid, i + 1);
};
const asn1_getNamedCurve = (keyData)=>{
    switch(true){
        case findOid(keyData, [
            0x2a,
            0x86,
            0x48,
            0xce,
            0x3d,
            0x03,
            0x01,
            0x07
        ]):
            return "P-256";
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x22
        ]):
            return "P-384";
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x23
        ]):
            return "P-521";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6e
        ]):
            return "X25519";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6f
        ]):
            return "X448";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x70
        ]):
            return "Ed25519";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x71
        ]):
            return "Ed448";
        default:
            throw new JOSENotSupported("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
    }
};
const genericImport = async (replace, keyFormat, pem, alg, options)=>{
    var _a;
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c)=>c.charCodeAt(0)));
    const isPublic = keyFormat === "spki";
    switch(alg){
        case "PS256":
        case "PS384":
        case "PS512":
            algorithm = {
                name: "RSA-PSS",
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "RS256":
        case "RS384":
        case "RS512":
            algorithm = {
                name: "RSASSA-PKCS1-v1_5",
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            algorithm = {
                name: "RSA-OAEP",
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
            };
            keyUsages = isPublic ? [
                "encrypt",
                "wrapKey"
            ] : [
                "decrypt",
                "unwrapKey"
            ];
            break;
        case "ES256":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-256"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ES384":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-384"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ES512":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-521"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                const namedCurve = asn1_getNamedCurve(keyData);
                algorithm = namedCurve.startsWith("P-") ? {
                    name: "ECDH",
                    namedCurve
                } : {
                    name: namedCurve
                };
                keyUsages = isPublic ? [] : [
                    "deriveBits"
                ];
                break;
            }
        case "EdDSA":
            algorithm = {
                name: asn1_getNamedCurve(keyData)
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return webcrypto.subtle.importKey(keyFormat, keyData, algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
};
const fromPKCS8 = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
};
const fromSPKI = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
};
function getElement(seq) {
    let result = [];
    let next = 0;
    while(next < seq.length){
        let nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while(bytes[position] >= 0x80){
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    } else if (length === 0x80) {
        length = 0;
        while(bytes[position + length] !== 0 || bytes[position + length + 1] !== 0){
            if (length > bytes.byteLength) {
                throw new TypeError("invalid indefinite form length");
            }
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength)
        };
    } else {
        let numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for(let i = 0; i < numberOfDigits; i++){
            length = length * 256 + bytes[position];
            position++;
        }
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength)
    };
}
function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
    const raw = decodeBase64(pem);
    return format_pem(spkiFromX509(raw), "PUBLIC KEY");
}
const fromX509 = (pem, alg, options)=>{
    let spki;
    try {
        spki = getSPKI(pem);
    } catch (cause) {
        throw new TypeError("Failed to parse the X.509 certificate", {
            cause
        });
    }
    return fromSPKI(spki, alg, options);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/jwk_to_key.js



function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch(jwk.kty){
        case "oct":
            {
                switch(jwk.alg){
                    case "HS256":
                    case "HS384":
                    case "HS512":
                        algorithm = {
                            name: "HMAC",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = [
                            "sign",
                            "verify"
                        ];
                        break;
                    case "A128CBC-HS256":
                    case "A192CBC-HS384":
                    case "A256CBC-HS512":
                        throw new JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);
                    case "A128GCM":
                    case "A192GCM":
                    case "A256GCM":
                    case "A128GCMKW":
                    case "A192GCMKW":
                    case "A256GCMKW":
                        algorithm = {
                            name: "AES-GCM"
                        };
                        keyUsages = [
                            "encrypt",
                            "decrypt"
                        ];
                        break;
                    case "A128KW":
                    case "A192KW":
                    case "A256KW":
                        algorithm = {
                            name: "AES-KW"
                        };
                        keyUsages = [
                            "wrapKey",
                            "unwrapKey"
                        ];
                        break;
                    case "PBES2-HS256+A128KW":
                    case "PBES2-HS384+A192KW":
                    case "PBES2-HS512+A256KW":
                        algorithm = {
                            name: "PBKDF2"
                        };
                        keyUsages = [
                            "deriveBits"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "RSA":
            {
                switch(jwk.alg){
                    case "PS256":
                    case "PS384":
                    case "PS512":
                        algorithm = {
                            name: "RSA-PSS",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RS256":
                    case "RS384":
                    case "RS512":
                        algorithm = {
                            name: "RSASSA-PKCS1-v1_5",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RSA-OAEP":
                    case "RSA-OAEP-256":
                    case "RSA-OAEP-384":
                    case "RSA-OAEP-512":
                        algorithm = {
                            name: "RSA-OAEP",
                            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
                        };
                        keyUsages = jwk.d ? [
                            "decrypt",
                            "unwrapKey"
                        ] : [
                            "encrypt",
                            "wrapKey"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "EC":
            {
                switch(jwk.alg){
                    case "ES256":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-256"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES384":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-384"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES512":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-521"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: "ECDH",
                            namedCurve: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "OKP":
            {
                switch(jwk.alg){
                    case "EdDSA":
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return {
        algorithm,
        keyUsages
    };
}
const parse = async (jwk)=>{
    var _a, _b;
    if (!jwk.alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const rest = [
        algorithm,
        (_a = jwk.ext) !== null && _a !== void 0 ? _a : false,
        (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages
    ];
    if (algorithm.name === "PBKDF2") {
        return webcrypto.subtle.importKey("raw", decode(jwk.k), ...rest);
    }
    const keyData = {
        ...jwk
    };
    delete keyData.alg;
    delete keyData.use;
    return webcrypto.subtle.importKey("jwk", keyData, ...rest);
};
/* harmony default export */ const jwk_to_key = (parse);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/import.js





async function importSPKI(spki, alg, options) {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
        throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
}
async function importJWK(jwk, alg, octAsKeyObject) {
    var _a;
    if (!isObject(jwk)) {
        throw new TypeError("JWK must be an object");
    }
    alg || (alg = jwk.alg);
    switch(jwk.kty){
        case "oct":
            if (typeof jwk.k !== "string" || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : octAsKeyObject = jwk.ext !== true;
            if (octAsKeyObject) {
                return jwk_to_key({
                    ...jwk,
                    alg,
                    ext: (_a = jwk.ext) !== null && _a !== void 0 ? _a : false
                });
            }
            return decode(jwk.k);
        case "RSA":
            if (jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case "EC":
        case "OKP":
            return jwk_to_key({
                ...jwk,
                alg
            });
        default:
            throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/check_key_type.js


const symmetricTypeCheck = (alg, key)=>{
    if (key instanceof Uint8Array) return;
    if (!is_key_like(key)) {
        throw new TypeError(withAlg(alg, key, ...types, "Uint8Array"));
    }
    if (key.type !== "secret") {
        throw new TypeError(`${types.join(" or ")} instances for symmetric algorithms must be of type "secret"`);
    }
};
const asymmetricTypeCheck = (alg, key, usage)=>{
    if (!is_key_like(key)) {
        throw new TypeError(withAlg(alg, key, ...types));
    }
    if (key.type === "secret") {
        throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithms must not be of type "secret"`);
    }
    if (usage === "sign" && key.type === "public") {
        throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm signing must be of type "private"`);
    }
    if (usage === "decrypt" && key.type === "public") {
        throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm decryption must be of type "private"`);
    }
    if (key.algorithm && usage === "verify" && key.type === "private") {
        throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm verifying must be of type "public"`);
    }
    if (key.algorithm && usage === "encrypt" && key.type === "private") {
        throw new TypeError(`${types.join(" or ")} instances for asymmetric algorithm encryption must be of type "public"`);
    }
};
const checkKeyType = (alg, key, usage)=>{
    const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
    if (symmetric) {
        symmetricTypeCheck(alg, key);
    } else {
        asymmetricTypeCheck(alg, key, usage);
    }
};
/* harmony default export */ const check_key_type = (checkKeyType);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/encrypt.js








async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalid_key_input(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await webcrypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "encrypt"
    ]);
    const macKey = await webcrypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const ciphertext = new Uint8Array(await webcrypto.subtle.encrypt({
        iv,
        name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag = new Uint8Array((await webcrypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return {
        ciphertext,
        tag
    };
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await webcrypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "encrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "encrypt");
        encKey = cek;
    }
    const encrypted = new Uint8Array(await webcrypto.subtle.encrypt({
        additionalData: aad,
        iv,
        name: "AES-GCM",
        tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return {
        ciphertext,
        tag
    };
}
const encrypt_encrypt = async (enc, plaintext, cek, iv, aad)=>{
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalid_key_input(cek, ...types, "Uint8Array"));
    }
    check_iv_length(enc, iv);
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) check_cek_length(cek, parseInt(enc.slice(-3), 10));
            return cbcEncrypt(enc, plaintext, cek, iv, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) check_cek_length(cek, parseInt(enc.slice(1, 4), 10));
            return gcmEncrypt(enc, plaintext, cek, iv, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
};
/* harmony default export */ const runtime_encrypt = (encrypt_encrypt);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/aesgcmkw.js




async function aesgcmkw_wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    iv || (iv = lib_iv(jweAlgorithm));
    const { ciphertext: encryptedKey, tag } = await runtime_encrypt(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
        encryptedKey,
        iv: encode(iv),
        tag: encode(tag)
    };
}
async function aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return runtime_decrypt(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/decrypt_key_management.js











async function decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    check_key_type(alg, key, "decrypt");
    switch(alg){
        case "dir":
            {
                if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
                return key;
            }
        case "ECDH-ES":
            if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
                if (!ecdhAllowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                const epk = await importJWK(joseHeader.epk, alg);
                let partyUInfo;
                let partyVInfo;
                if (joseHeader.apu !== undefined) {
                    if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                    try {
                        partyUInfo = decode(joseHeader.apu);
                    } catch (_a) {
                        throw new JWEInvalid("Failed to base64url decode the apu");
                    }
                }
                if (joseHeader.apv !== undefined) {
                    if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                    try {
                        partyVInfo = decode(joseHeader.apv);
                    } catch (_b) {
                        throw new JWEInvalid("Failed to base64url decode the apv");
                    }
                }
                const sharedSecret = await deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? cek_bitLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
                if (alg === "ECDH-ES") return sharedSecret;
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return unwrap(alg.slice(-6), sharedSecret, encryptedKey);
            }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return rsaes_decrypt(alg, key, encryptedKey);
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
                const p2cLimit = (options === null || options === void 0 ? void 0 : options.maxPBES2Count) || 10000;
                if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
                if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
                let p2s;
                try {
                    p2s = decode(joseHeader.p2s);
                } catch (_c) {
                    throw new JWEInvalid("Failed to base64url decode the p2s");
                }
                return pbes2kw_decrypt(alg, key, encryptedKey, joseHeader.p2c, p2s);
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return unwrap(alg, key, encryptedKey);
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
                if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
                let iv;
                try {
                    iv = decode(joseHeader.iv);
                } catch (_d) {
                    throw new JWEInvalid("Failed to base64url decode the iv");
                }
                let tag;
                try {
                    tag = decode(joseHeader.tag);
                } catch (_e) {
                    throw new JWEInvalid("Failed to base64url decode the tag");
                }
                return aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag);
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
}
/* harmony default export */ const decrypt_key_management = (decryptKeyManagement);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/validate_crit.js

function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input)=>typeof input !== "string" || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([
            ...Object.entries(recognizedOption),
            ...recognizedDefault.entries()
        ]);
    } else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit){
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        } else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
/* harmony default export */ const validate_crit = (validateCrit);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/validate_algorithms.js
const validateAlgorithms = (option, algorithms)=>{
    if (algorithms !== undefined && (!Array.isArray(algorithms) || algorithms.some((s)=>typeof s !== "string"))) {
        throw new TypeError(`"${option}" option must be an array of strings`);
    }
    if (!algorithms) {
        return undefined;
    }
    return new Set(algorithms);
};
/* harmony default export */ const validate_algorithms = (validateAlgorithms);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/flattened/decrypt.js











async function flattenedDecrypt(jwe, key, options) {
    var _a;
    if (!isObject(jwe)) {
        throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new JWEInvalid("JOSE Header missing");
    }
    if (typeof jwe.iv !== "string") {
        throw new JWEInvalid("JWE Initialization Vector missing or incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
        throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (typeof jwe.tag !== "string") {
        throw new JWEInvalid("JWE Authentication Tag missing or incorrect type");
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== "string") {
        throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== "string") {
        throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== "string") {
        throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== undefined && !isObject(jwe.header)) {
        throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== undefined && !isObject(jwe.unprotected)) {
        throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
        try {
            const protectedHeader = decode(jwe.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        } catch (_b) {
            throw new JWEInvalid("JWE Protected Header is invalid");
        }
    }
    if (!is_disjoint(parsedProt, jwe.header, jwe.unprotected)) {
        throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected
    };
    validate_crit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        if (!parsedProt || !parsedProt.zip) {
            throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== "DEF") {
            throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
        throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
        throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validate_algorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validate_algorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        try {
            encryptedKey = decode(jwe.encrypted_key);
        } catch (_c) {
            throw new JWEInvalid("Failed to base64url decode the encrypted_key");
        }
    }
    let resolvedKey = false;
    if (typeof key === "function") {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await decrypt_key_management(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
        if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
            throw err;
        }
        cek = lib_cek(enc);
    }
    let iv;
    let tag;
    try {
        iv = decode(jwe.iv);
    } catch (_d) {
        throw new JWEInvalid("Failed to base64url decode the iv");
    }
    try {
        tag = decode(jwe.tag);
    } catch (_e) {
        throw new JWEInvalid("Failed to base64url decode the tag");
    }
    const protectedHeader = encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : "");
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
    } else {
        additionalData = protectedHeader;
    }
    let ciphertext;
    try {
        ciphertext = decode(jwe.ciphertext);
    } catch (_f) {
        throw new JWEInvalid("Failed to base64url decode the ciphertext");
    }
    let plaintext = await runtime_decrypt(enc, cek, ciphertext, iv, tag, additionalData);
    if (joseHeader.zip === "DEF") {
        plaintext = await ((options === null || options === void 0 ? void 0 : options.inflateRaw) || inflate)(plaintext);
    }
    const result = {
        plaintext
    };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        try {
            result.additionalAuthenticatedData = decode(jwe.aad);
        } catch (_g) {
            throw new JWEInvalid("Failed to base64url decode the aad");
        }
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/compact/decrypt.js



async function compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
        throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
    if (length !== 5) {
        throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = await flattenedDecrypt({
        ciphertext,
        iv: iv || undefined,
        protected: protectedHeader || undefined,
        tag: tag || undefined,
        encrypted_key: encryptedKey || undefined
    }, key, options);
    const result = {
        plaintext: decrypted.plaintext,
        protectedHeader: decrypted.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/general/decrypt.js



async function generalDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
        throw new JWEInvalid("General JWE must be an object");
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(isObject)) {
        throw new JWEInvalid("JWE Recipients missing or incorrect type");
    }
    if (!jwe.recipients.length) {
        throw new JWEInvalid("JWE Recipients has no members");
    }
    for (const recipient of jwe.recipients){
        try {
            return await flattenedDecrypt({
                aad: jwe.aad,
                ciphertext: jwe.ciphertext,
                encrypted_key: recipient.encrypted_key,
                header: recipient.header,
                iv: jwe.iv,
                protected: jwe.protected,
                tag: jwe.tag,
                unprotected: jwe.unprotected
            }, key, options);
        } catch (_a) {}
    }
    throw new JWEDecryptionFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/key_to_jwk.js




const keyToJWK = async (key)=>{
    if (key instanceof Uint8Array) {
        return {
            kty: "oct",
            k: encode(key)
        };
    }
    if (!isCryptoKey(key)) {
        throw new TypeError(invalid_key_input(key, ...types, "Uint8Array"));
    }
    if (!key.extractable) {
        throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
    }
    const { ext, key_ops, alg, use, ...jwk } = await webcrypto.subtle.exportKey("jwk", key);
    return jwk;
};
/* harmony default export */ const key_to_jwk = (keyToJWK);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/export.js



async function exportSPKI(key) {
    return toSPKI(key);
}
async function exportPKCS8(key) {
    return toPKCS8(key);
}
async function exportJWK(key) {
    return key_to_jwk(key);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/encrypt_key_management.js










async function encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    check_key_type(alg, key, "encrypt");
    switch(alg){
        case "dir":
            {
                cek = key;
                break;
            }
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                if (!ecdhAllowed(key)) {
                    throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                }
                const { apu, apv } = providedParameters;
                let { epk: ephemeralKey } = providedParameters;
                ephemeralKey || (ephemeralKey = (await generateEpk(key)).privateKey);
                const { x, y, crv, kty } = await exportJWK(ephemeralKey);
                const sharedSecret = await deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? cek_bitLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
                parameters = {
                    epk: {
                        x,
                        crv,
                        kty
                    }
                };
                if (kty === "EC") parameters.epk.y = y;
                if (apu) parameters.apu = encode(apu);
                if (apv) parameters.apv = encode(apv);
                if (alg === "ECDH-ES") {
                    cek = sharedSecret;
                    break;
                }
                cek = providedCek || lib_cek(enc);
                const kwAlg = alg.slice(-6);
                encryptedKey = await wrap(kwAlg, sharedSecret, cek);
                break;
            }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                cek = providedCek || lib_cek(enc);
                encryptedKey = await rsaes_encrypt(alg, key, cek);
                break;
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                cek = providedCek || lib_cek(enc);
                const { p2c, p2s } = providedParameters;
                ({ encryptedKey, ...parameters } = await encrypt(alg, key, cek, p2c, p2s));
                break;
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                cek = providedCek || lib_cek(enc);
                encryptedKey = await wrap(alg, key, cek);
                break;
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                cek = providedCek || lib_cek(enc);
                const { iv } = providedParameters;
                ({ encryptedKey, ...parameters } = await aesgcmkw_wrap(alg, key, cek, iv));
                break;
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
    return {
        cek,
        encryptedKey,
        parameters
    };
}
/* harmony default export */ const encrypt_key_management = (encryptKeyManagement);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/flattened/encrypt.js









const unprotected = Symbol();
class FlattenedEncrypt {
    constructor(plaintext){
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError("plaintext must be an instance of Uint8Array");
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
        }
        if (!is_disjoint(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader
        };
        validate_crit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            if (!this._protectedHeader || !this._protectedHeader.zip) {
                throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            }
            if (joseHeader.zip !== "DEF") {
                throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
            }
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== "string" || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== "string" || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (alg === "dir") {
            if (this._cek) {
                throw new TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
            }
        } else if (alg === "ECDH-ES") {
            if (this._cek) {
                throw new TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
            }
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await encrypt_key_management(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && unprotected in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    } else {
                        this._unprotectedHeader = {
                            ...this._unprotectedHeader,
                            ...parameters
                        };
                    }
                } else {
                    if (!this._protectedHeader) {
                        this.setProtectedHeader(parameters);
                    } else {
                        this._protectedHeader = {
                            ...this._protectedHeader,
                            ...parameters
                        };
                    }
                }
            }
        }
        this._iv || (this._iv = lib_iv(enc));
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
        } else {
            protectedHeader = encoder.encode("");
        }
        if (this._aad) {
            aadMember = encode(this._aad);
            additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
        } else {
            additionalData = protectedHeader;
        }
        let ciphertext;
        let tag;
        if (joseHeader.zip === "DEF") {
            const deflated = await ((options === null || options === void 0 ? void 0 : options.deflateRaw) || deflate)(this._plaintext);
            ({ ciphertext, tag } = await runtime_encrypt(enc, deflated, cek, this._iv, additionalData));
        } else {
            ;
            ({ ciphertext, tag } = await runtime_encrypt(enc, this._plaintext, cek, this._iv, additionalData));
        }
        const jwe = {
            ciphertext: encode(ciphertext),
            iv: encode(this._iv),
            tag: encode(tag)
        };
        if (encryptedKey) {
            jwe.encrypted_key = encode(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = decoder.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/general/encrypt.js







class IndividualRecipient {
    constructor(enc, key, options){
        this.parent = enc;
        this.key = key;
        this.options = options;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addRecipient(...args) {
        return this.parent.addRecipient(...args);
    }
    encrypt(...args) {
        return this.parent.encrypt(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralEncrypt {
    constructor(plaintext){
        this._recipients = [];
        this._plaintext = plaintext;
    }
    addRecipient(key, options) {
        const recipient = new IndividualRecipient(this, key, {
            crit: options === null || options === void 0 ? void 0 : options.crit
        });
        this._recipients.push(recipient);
        return recipient;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    async encrypt(options) {
        var _a, _b, _c;
        if (!this._recipients.length) {
            throw new JWEInvalid("at least one recipient must be added");
        }
        options = {
            deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw
        };
        if (this._recipients.length === 1) {
            const [recipient] = this._recipients;
            const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, {
                ...recipient.options,
                ...options
            });
            let jwe = {
                ciphertext: flattened.ciphertext,
                iv: flattened.iv,
                recipients: [
                    {}
                ],
                tag: flattened.tag
            };
            if (flattened.aad) jwe.aad = flattened.aad;
            if (flattened.protected) jwe.protected = flattened.protected;
            if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
            if (flattened.encrypted_key) jwe.recipients[0].encrypted_key = flattened.encrypted_key;
            if (flattened.header) jwe.recipients[0].header = flattened.header;
            return jwe;
        }
        let enc;
        for(let i = 0; i < this._recipients.length; i++){
            const recipient = this._recipients[i];
            if (!is_disjoint(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
                throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
            }
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader
            };
            const { alg } = joseHeader;
            if (typeof alg !== "string" || !alg) {
                throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            }
            if (alg === "dir" || alg === "ECDH-ES") {
                throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            }
            if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            }
            if (!enc) {
                enc = joseHeader.enc;
            } else if (enc !== joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            }
            validate_crit(JWEInvalid, new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
            if (joseHeader.zip !== undefined) {
                if (!this._protectedHeader || !this._protectedHeader.zip) {
                    throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
                }
            }
        }
        const cek = lib_cek(enc);
        let jwe = {
            ciphertext: "",
            iv: "",
            recipients: [],
            tag: ""
        };
        for(let i = 0; i < this._recipients.length; i++){
            const recipient = this._recipients[i];
            const target = {};
            jwe.recipients.push(target);
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader
            };
            const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : undefined;
            if (i === 0) {
                const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({
                    p2c
                }).encrypt(recipient.key, {
                    ...recipient.options,
                    ...options,
                    [unprotected]: true
                });
                jwe.ciphertext = flattened.ciphertext;
                jwe.iv = flattened.iv;
                jwe.tag = flattened.tag;
                if (flattened.aad) jwe.aad = flattened.aad;
                if (flattened.protected) jwe.protected = flattened.protected;
                if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
                target.encrypted_key = flattened.encrypted_key;
                if (flattened.header) target.header = flattened.header;
                continue;
            }
            const { encryptedKey, parameters } = await encrypt_key_management(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) || ((_b = this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) || ((_c = this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, {
                p2c
            });
            target.encrypted_key = encode(encryptedKey);
            if (recipient.unprotectedHeader || parameters) target.header = {
                ...recipient.unprotectedHeader,
                ...parameters
            };
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/subtle_dsa.js

function subtleDsa(alg, algorithm) {
    const hash = `SHA-${alg.slice(-3)}`;
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            return {
                hash,
                name: "HMAC"
            };
        case "PS256":
        case "PS384":
        case "PS512":
            return {
                hash,
                name: "RSA-PSS",
                saltLength: alg.slice(-3) >> 3
            };
        case "RS256":
        case "RS384":
        case "RS512":
            return {
                hash,
                name: "RSASSA-PKCS1-v1_5"
            };
        case "ES256":
        case "ES384":
        case "ES512":
            return {
                hash,
                name: "ECDSA",
                namedCurve: algorithm.namedCurve
            };
        case "EdDSA":
            return {
                name: algorithm.name
            };
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/get_sign_verify_key.js




function get_sign_verify_key_getCryptoKey(alg, key, usage) {
    if (isCryptoKey(key)) {
        checkSigCryptoKey(key, alg, usage);
        return key;
    }
    if (key instanceof Uint8Array) {
        if (!alg.startsWith("HS")) {
            throw new TypeError(invalid_key_input(key, ...types));
        }
        return webcrypto.subtle.importKey("raw", key, {
            hash: `SHA-${alg.slice(-3)}`,
            name: "HMAC"
        }, false, [
            usage
        ]);
    }
    throw new TypeError(invalid_key_input(key, ...types, "Uint8Array"));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/verify.js




const verify = async (alg, key, signature, data)=>{
    const cryptoKey = await get_sign_verify_key_getCryptoKey(alg, key, "verify");
    check_key_length(alg, cryptoKey);
    const algorithm = subtleDsa(alg, cryptoKey.algorithm);
    try {
        return await webcrypto.subtle.verify(algorithm, cryptoKey, signature, data);
    } catch (_a) {
        return false;
    }
};
/* harmony default export */ const runtime_verify = (verify);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/flattened/verify.js









async function flattenedVerify(jws, key, options) {
    var _a;
    if (!isObject(jws)) {
        throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== "string") {
        throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === undefined) {
        throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
        throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== undefined && !isObject(jws.header)) {
        throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
        try {
            const protectedHeader = decode(jws.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        } catch (_b) {
            throw new JWSInvalid("JWS Protected Header is invalid");
        }
    }
    if (!is_disjoint(parsedProt, jws.header)) {
        throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header
    };
    const extensions = validate_crit(JWSInvalid, new Map([
        [
            "b64",
            true
        ]
    ]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
        b64 = parsedProt.b64;
        if (typeof b64 !== "boolean") {
            throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validate_algorithms("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== "string") {
            throw new JWSInvalid("JWS Payload must be a string");
        }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
        throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
        key = await key(parsedProt, jws);
        resolvedKey = true;
    }
    check_key_type(alg, key, "verify");
    const data = concat(encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    let signature;
    try {
        signature = decode(jws.signature);
    } catch (_c) {
        throw new JWSInvalid("Failed to base64url decode the signature");
    }
    const verified = await runtime_verify(alg, key, signature, data);
    if (!verified) {
        throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        try {
            payload = decode(jws.payload);
        } catch (_d) {
            throw new JWSInvalid("Failed to base64url decode the payload");
        }
    } else if (typeof jws.payload === "string") {
        payload = encoder.encode(jws.payload);
    } else {
        payload = jws.payload;
    }
    const result = {
        payload
    };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/compact/verify.js



async function compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
        throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
        throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = await flattenedVerify({
        payload,
        protected: protectedHeader,
        signature
    }, key, options);
    const result = {
        payload: verified.payload,
        protectedHeader: verified.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: verified.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/general/verify.js



async function generalVerify(jws, key, options) {
    if (!isObject(jws)) {
        throw new JWSInvalid("General JWS must be an object");
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(isObject)) {
        throw new JWSInvalid("JWS Signatures missing or incorrect type");
    }
    for (const signature of jws.signatures){
        try {
            return await flattenedVerify({
                header: signature.header,
                payload: jws.payload,
                protected: signature.protected,
                signature: signature.signature
            }, key, options);
        } catch (_a) {}
    }
    throw new JWSSignatureVerificationFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/epoch.js
/* harmony default export */ const epoch = ((date)=>Math.floor(date.getTime() / 1000));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/secs.js
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
/* harmony default export */ const secs = ((str)=>{
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError("Invalid time period format");
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch(unit){
        case "sec":
        case "secs":
        case "second":
        case "seconds":
        case "s":
            return Math.round(value);
        case "minute":
        case "minutes":
        case "min":
        case "mins":
        case "m":
            return Math.round(value * minute);
        case "hour":
        case "hours":
        case "hr":
        case "hrs":
        case "h":
            return Math.round(value * hour);
        case "day":
        case "days":
        case "d":
            return Math.round(value * day);
        case "week":
        case "weeks":
        case "w":
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/jwt_claims_set.js





const normalizeTyp = (value)=>value.toLowerCase().replace(/^application\//, "");
const checkAudiencePresence = (audPayload, audOption)=>{
    if (typeof audPayload === "string") {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
/* harmony default export */ const jwt_claims_set = ((protectedHeader, encodedPayload, options = {})=>{
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
    }
    let payload;
    try {
        payload = JSON.parse(decoder.decode(encodedPayload));
    } catch (_a) {}
    if (!isObject(payload)) {
        throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    if (maxTokenAge !== undefined) requiredClaims.push("iat");
    if (audience !== undefined) requiredClaims.push("aud");
    if (subject !== undefined) requiredClaims.push("sub");
    if (issuer !== undefined) requiredClaims.push("iss");
    for (const claim of new Set(requiredClaims.reverse())){
        if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
        }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [
        issuer
    ]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
    }
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [
        audience
    ] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
    }
    let tolerance;
    switch(typeof options.clockTolerance){
        case "string":
            tolerance = secs(options.clockTolerance);
            break;
        case "number":
            tolerance = options.clockTolerance;
            break;
        case "undefined":
            tolerance = 0;
            break;
        default:
            throw new TypeError("Invalid clockTolerance option type");
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== "number") {
        throw new JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== "number") {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== "number") {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
        }
    }
    return payload;
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/verify.js



async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await compactVerify(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes("b64")) && verified.protectedHeader.b64 === false) {
        throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = jwt_claims_set(verified.protectedHeader, verified.payload, options);
    const result = {
        payload,
        protectedHeader: verified.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: verified.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/decrypt.js



async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = jwt_claims_set(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
    }
    if (protectedHeader.aud !== undefined && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
    }
    const result = {
        payload,
        protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/compact/encrypt.js

class CompactEncrypt {
    constructor(plaintext){
        this._flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [
            jwe.protected,
            jwe.encrypted_key,
            jwe.iv,
            jwe.ciphertext,
            jwe.tag
        ].join(".");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/sign.js




const sign = async (alg, key, data)=>{
    const cryptoKey = await get_sign_verify_key_getCryptoKey(alg, key, "sign");
    check_key_length(alg, cryptoKey);
    const signature = await webcrypto.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
    return new Uint8Array(signature);
};
/* harmony default export */ const runtime_sign = (sign);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/flattened/sign.js







class FlattenedSign {
    constructor(payload){
        if (!(payload instanceof Uint8Array)) {
            throw new TypeError("payload must be an instance of Uint8Array");
        }
        this._payload = payload;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
        }
        if (!is_disjoint(this._protectedHeader, this._unprotectedHeader)) {
            throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader
        };
        const extensions = validate_crit(JWSInvalid, new Map([
            [
                "b64",
                true
            ]
        ]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has("b64")) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== "boolean") {
                throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
        }
        const { alg } = joseHeader;
        if (typeof alg !== "string" || !alg) {
            throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        check_key_type(alg, key, "sign");
        let payload = this._payload;
        if (b64) {
            payload = encoder.encode(encode(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
        } else {
            protectedHeader = encoder.encode("");
        }
        const data = concat(protectedHeader, encoder.encode("."), payload);
        const signature = await runtime_sign(alg, key, data);
        const jws = {
            signature: encode(signature),
            payload: ""
        };
        if (b64) {
            jws.payload = decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
            jws.protected = decoder.decode(protectedHeader);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/compact/sign.js

class CompactSign {
    constructor(payload){
        this._flattened = new FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === undefined) {
            throw new TypeError("use the flattened module for creating JWS with b64: false");
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/general/sign.js


class IndividualSignature {
    constructor(sig, key, options){
        this.parent = sig;
        this.key = key;
        this.options = options;
    }
    setProtectedHeader(protectedHeader) {
        if (this.protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this.protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addSignature(...args) {
        return this.parent.addSignature(...args);
    }
    sign(...args) {
        return this.parent.sign(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralSign {
    constructor(payload){
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature(this, key, options);
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new JWSInvalid("at least one signature must be added");
        }
        const jws = {
            signatures: [],
            payload: ""
        };
        for(let i = 0; i < this._signatures.length; i++){
            const signature = this._signatures[i];
            const flattened = new FlattenedSign(this._payload);
            flattened.setProtectedHeader(signature.protectedHeader);
            flattened.setUnprotectedHeader(signature.unprotectedHeader);
            const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
            if (i === 0) {
                jws.payload = payload;
            } else if (jws.payload !== payload) {
                throw new JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
            }
            jws.signatures.push(rest);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/produce.js



class ProduceJWT {
    constructor(payload){
        if (!isObject(payload)) {
            throw new TypeError("JWT Claims Set MUST be an object");
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = {
            ...this._payload,
            iss: issuer
        };
        return this;
    }
    setSubject(subject) {
        this._payload = {
            ...this._payload,
            sub: subject
        };
        return this;
    }
    setAudience(audience) {
        this._payload = {
            ...this._payload,
            aud: audience
        };
        return this;
    }
    setJti(jwtId) {
        this._payload = {
            ...this._payload,
            jti: jwtId
        };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === "number") {
            this._payload = {
                ...this._payload,
                nbf: input
            };
        } else {
            this._payload = {
                ...this._payload,
                nbf: epoch(new Date()) + secs(input)
            };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === "number") {
            this._payload = {
                ...this._payload,
                exp: input
            };
        } else {
            this._payload = {
                ...this._payload,
                exp: epoch(new Date()) + secs(input)
            };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === "undefined") {
            this._payload = {
                ...this._payload,
                iat: epoch(new Date())
            };
        } else {
            this._payload = {
                ...this._payload,
                iat: input
            };
        }
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/sign.js




class SignJWT extends ProduceJWT {
    setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
    }
    async sign(key, options) {
        var _a;
        const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
            throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
        }
        return sig.sign(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/encrypt.js



class EncryptJWT extends ProduceJWT {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                iss: this._payload.iss
            };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                sub: this._payload.sub
            };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                aud: this._payload.aud
            };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwk/thumbprint.js





const check = (value, description)=>{
    if (typeof value !== "string" || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm) {
    if (!isObject(jwk)) {
        throw new TypeError("JWK must be an object");
    }
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch(jwk.kty){
        case "EC":
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case "OKP":
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case "RSA":
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        case "oct":
            check(jwk.k, '"k" (Key Value) Parameter');
            components = {
                k: jwk.k,
                kty: jwk.kty
            };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return encode(await runtime_digest(digestAlgorithm, data));
}
async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
    const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwk/embedded.js



async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
        ...protectedHeader,
        ...token === null || token === void 0 ? void 0 : token.header
    };
    if (!isObject(joseHeader.jwk)) {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await importJWK({
        ...joseHeader.jwk,
        ext: true
    }, joseHeader.alg, true);
    if (key instanceof Uint8Array || key.type !== "public") {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwks/local.js



function getKtyFromAlg(alg) {
    switch(typeof alg === "string" && alg.slice(0, 2)){
        case "RS":
        case "PS":
            return "RSA";
        case "ES":
            return "EC";
        case "Ed":
            return "OKP";
        default:
            throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
}
function isJWKSLike(jwks) {
    return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
function isJWKLike(key) {
    return isObject(key);
}
function clone(obj) {
    if (typeof structuredClone === "function") {
        return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
}
class LocalJWKSet {
    constructor(jwks){
        this._cached = new WeakMap();
        if (!isJWKSLike(jwks)) {
            throw new JWKSInvalid("JSON Web Key Set malformed");
        }
        this._jwks = clone(jwks);
    }
    async getKey(protectedHeader, token) {
        const { alg, kid } = {
            ...protectedHeader,
            ...token === null || token === void 0 ? void 0 : token.header
        };
        const kty = getKtyFromAlg(alg);
        const candidates = this._jwks.keys.filter((jwk)=>{
            let candidate = kty === jwk.kty;
            if (candidate && typeof kid === "string") {
                candidate = kid === jwk.kid;
            }
            if (candidate && typeof jwk.alg === "string") {
                candidate = alg === jwk.alg;
            }
            if (candidate && typeof jwk.use === "string") {
                candidate = jwk.use === "sig";
            }
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes("verify");
            }
            if (candidate && alg === "EdDSA") {
                candidate = jwk.crv === "Ed25519" || jwk.crv === "Ed448";
            }
            if (candidate) {
                switch(alg){
                    case "ES256":
                        candidate = jwk.crv === "P-256";
                        break;
                    case "ES256K":
                        candidate = jwk.crv === "secp256k1";
                        break;
                    case "ES384":
                        candidate = jwk.crv === "P-384";
                        break;
                    case "ES512":
                        candidate = jwk.crv === "P-521";
                        break;
                }
            }
            return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
            throw new JWKSNoMatchingKey();
        } else if (length !== 1) {
            const error = new JWKSMultipleMatchingKeys();
            const { _cached } = this;
            error[Symbol.asyncIterator] = async function*() {
                for (const jwk of candidates){
                    try {
                        yield await importWithAlgCache(_cached, jwk, alg);
                    } catch (_a) {
                        continue;
                    }
                }
            };
            throw error;
        }
        return importWithAlgCache(this._cached, jwk, alg);
    }
}
async function importWithAlgCache(cache, jwk, alg) {
    const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
    if (cached[alg] === undefined) {
        const key = await importJWK({
            ...jwk,
            ext: true
        }, alg);
        if (key instanceof Uint8Array || key.type !== "public") {
            throw new JWKSInvalid("JSON Web Key Set members must be public keys");
        }
        cached[alg] = key;
    }
    return cached[alg];
}
function createLocalJWKSet(jwks) {
    const set = new LocalJWKSet(jwks);
    return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
    };
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/fetch_jwks.js

const fetchJwks = async (url, timeout, options)=>{
    let controller;
    let id;
    let timedOut = false;
    if (typeof AbortController === "function") {
        controller = new AbortController();
        id = setTimeout(()=>{
            timedOut = true;
            controller.abort();
        }, timeout);
    }
    const response = await fetch(url.href, {
        signal: controller ? controller.signal : undefined,
        redirect: "manual",
        headers: options.headers
    }).catch((err)=>{
        if (timedOut) throw new JWKSTimeout();
        throw err;
    });
    if (id !== undefined) clearTimeout(id);
    if (response.status !== 200) {
        throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
    }
    try {
        return await response.json();
    } catch (_a) {
        throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
    }
};
/* harmony default export */ const fetch_jwks = (fetchJwks);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwks/remote.js



function isCloudflareWorkers() {
    return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" ||  true && "edge-runtime" === "vercel";
}
class RemoteJWKSet extends LocalJWKSet {
    constructor(url, options){
        super({
            keys: []
        });
        this._jwks = undefined;
        if (!(url instanceof URL)) {
            throw new TypeError("url must be an instance of URL");
        }
        this._url = new URL(url.href);
        this._options = {
            agent: options === null || options === void 0 ? void 0 : options.agent,
            headers: options === null || options === void 0 ? void 0 : options.headers
        };
        this._timeoutDuration = typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === "number" ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
        this._cooldownDuration = typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === "number" ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
        this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === "number" ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 600000;
    }
    coolingDown() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
    }
    fresh() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
    }
    async getKey(protectedHeader, token) {
        if (!this._jwks || !this.fresh()) {
            await this.reload();
        }
        try {
            return await super.getKey(protectedHeader, token);
        } catch (err) {
            if (err instanceof JWKSNoMatchingKey) {
                if (this.coolingDown() === false) {
                    await this.reload();
                    return super.getKey(protectedHeader, token);
                }
            }
            throw err;
        }
    }
    async reload() {
        if (this._pendingFetch && isCloudflareWorkers()) {
            this._pendingFetch = undefined;
        }
        this._pendingFetch || (this._pendingFetch = fetch_jwks(this._url, this._timeoutDuration, this._options).then((json)=>{
            if (!isJWKSLike(json)) {
                throw new JWKSInvalid("JSON Web Key Set malformed");
            }
            this._jwks = {
                keys: json.keys
            };
            this._jwksTimestamp = Date.now();
            this._pendingFetch = undefined;
        }).catch((err)=>{
            this._pendingFetch = undefined;
            throw err;
        }));
        await this._pendingFetch;
    }
}
function createRemoteJWKSet(url, options) {
    const set = new RemoteJWKSet(url, options);
    return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
    };
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/unsecured.js





class UnsecuredJWT extends ProduceJWT {
    encode() {
        const header = encode(JSON.stringify({
            alg: "none"
        }));
        const payload = encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
    }
    static decode(jwt, options) {
        if (typeof jwt !== "string") {
            throw new JWTInvalid("Unsecured JWT must be a string");
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
        if (length !== 3 || signature !== "") {
            throw new JWTInvalid("Invalid Unsecured JWT");
        }
        let header;
        try {
            header = JSON.parse(decoder.decode(decode(encodedHeader)));
            if (header.alg !== "none") throw new Error();
        } catch (_a) {
            throw new JWTInvalid("Invalid Unsecured JWT");
        }
        const payload = jwt_claims_set(header, decode(encodedPayload), options);
        return {
            payload,
            header
        };
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/base64url.js

const base64url_encode = encode;
const base64url_decode = decode;

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/decode_protected_header.js



function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === "string") {
        const parts = token.split(".");
        if (parts.length === 3 || parts.length === 5) {
            ;
            [protectedB64u] = parts;
        }
    } else if (typeof token === "object" && token) {
        if ("protected" in token) {
            protectedB64u = token.protected;
        } else {
            throw new TypeError("Token does not contain a Protected Header");
        }
    }
    try {
        if (typeof protectedB64u !== "string" || !protectedB64u) {
            throw new Error();
        }
        const result = JSON.parse(decoder.decode(base64url_decode(protectedB64u)));
        if (!isObject(result)) {
            throw new Error();
        }
        return result;
    } catch (_a) {
        throw new TypeError("Invalid Token or Protected Header formatting");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/decode_jwt.js




function decodeJwt(jwt) {
    if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3) throw new JWTInvalid("Invalid JWT");
    if (!payload) throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
        decoded = base64url_decode(payload);
    } catch (_a) {
        throw new JWTInvalid("Failed to base64url decode the payload");
    }
    let result;
    try {
        result = JSON.parse(decoder.decode(decoded));
    } catch (_b) {
        throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/generate.js



async function generateSecret(alg, options) {
    var _a;
    let length;
    let algorithm;
    let keyUsages;
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            length = parseInt(alg.slice(-3), 10);
            algorithm = {
                name: "HMAC",
                hash: `SHA-${length}`,
                length
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            length = parseInt(alg.slice(-3), 10);
            return random(new Uint8Array(length >> 3));
        case "A128KW":
        case "A192KW":
        case "A256KW":
            length = parseInt(alg.slice(1, 4), 10);
            algorithm = {
                name: "AES-KW",
                length
            };
            keyUsages = [
                "wrapKey",
                "unwrapKey"
            ];
            break;
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            length = parseInt(alg.slice(1, 4), 10);
            algorithm = {
                name: "AES-GCM",
                length
            };
            keyUsages = [
                "encrypt",
                "decrypt"
            ];
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto.subtle.generateKey(algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
}
function getModulusLengthOption(options) {
    var _a;
    const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
        throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
    }
    return modulusLength;
}
async function generateKeyPair(alg, options) {
    var _a, _b, _c;
    let algorithm;
    let keyUsages;
    switch(alg){
        case "PS256":
        case "PS384":
        case "PS512":
            algorithm = {
                name: "RSA-PSS",
                hash: `SHA-${alg.slice(-3)}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "RS256":
        case "RS384":
        case "RS512":
            algorithm = {
                name: "RSASSA-PKCS1-v1_5",
                hash: `SHA-${alg.slice(-3)}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            algorithm = {
                name: "RSA-OAEP",
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "decrypt",
                "unwrapKey",
                "encrypt",
                "wrapKey"
            ];
            break;
        case "ES256":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-256"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "ES384":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-384"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "ES512":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-521"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "EdDSA":
            keyUsages = [
                "sign",
                "verify"
            ];
            const crv = (_a = options === null || options === void 0 ? void 0 : options.crv) !== null && _a !== void 0 ? _a : "Ed25519";
            switch(crv){
                case "Ed25519":
                case "Ed448":
                    algorithm = {
                        name: crv
                    };
                    break;
                default:
                    throw new JOSENotSupported("Invalid or unsupported crv option provided");
            }
            break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                keyUsages = [
                    "deriveKey",
                    "deriveBits"
                ];
                const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : "P-256";
                switch(crv){
                    case "P-256":
                    case "P-384":
                    case "P-521":
                        {
                            algorithm = {
                                name: "ECDH",
                                namedCurve: crv
                            };
                            break;
                        }
                    case "X25519":
                    case "X448":
                        algorithm = {
                            name: crv
                        };
                        break;
                    default:
                        throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
                }
                break;
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return webcrypto.subtle.generateKey(algorithm, (_c = options === null || options === void 0 ? void 0 : options.extractable) !== null && _c !== void 0 ? _c : false, keyUsages);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/generate_key_pair.js

async function generate_key_pair_generateKeyPair(alg, options) {
    return generateKeyPair(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/generate_secret.js

async function generate_secret_generateSecret(alg, options) {
    return generateSecret(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/runtime.js
/* harmony default export */ const runtime = ("WebCryptoAPI");

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/runtime.js

/* harmony default export */ const util_runtime = (runtime);

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/index.js


































/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(896));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES)["middleware_src/middleware"] = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map