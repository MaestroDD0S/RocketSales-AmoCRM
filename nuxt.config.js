//import colors from 'vuetify/lib/util/colors';

export default
{
    ssr       : false,
    components: true,

    head:
    {
        title: process.env.APP_COMPANY_NAME,

        meta:
        [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
            { hid: 'description', name: 'description', content: '' },

            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'mobile-web-app-capable'      , content: 'yes' },
        ],

        link:
        [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

            {
                rel : "preconnect",
                href: "https://fonts.googleapis.com",
                crossorigin: ""
            },
        ],

        htmlAttrs:
        {
            lang: 'ru'
        },
    },

    loading:
    {
        color : '#2196f366',
        height: '2px'
    },

    loadingIndicator:
    {
        name      : 'rectangle-bounce',
        color     : '#29B6F6',
        background: '#121212'
    },

    css:
    [
        'vue-advanced-cropper/dist/style.css',
        '~assets/scss/main.scss',
    ],

    plugins:
    [
        { src: 'plugins/axios'                 , ssr: false },
        { src: 'plugins/v-mask'                , ssr: false },
        { src: 'plugins/vue-currency-formatter', ssr: false },
        { src: 'plugins/vue-date-formatter'    , ssr: false },
        { src: 'plugins/vuetify-snackback'     , ssr: false },
        { src: 'plugins/vuetify-overlay'       , ssr: false },
        { src: 'plugins/vue-unique-id'         , ssr: false },
        { src: 'plugins/vue-browser-detect'    , ssr: false },
        { src: 'plugins/web-worker'            , ssr: false },
    ],

    buildModules:
    [
        '@nuxtjs/vuetify',
        'nuxt-compress'
    ],

    modules:
    [
        '@nuxtjs/axios',
        'nuxt-compress',
        'portal-vue/nuxt',
    ],

    router:
    {
        prefetchLinks: false,
    },

    axios:
    {
        baseURL: process.env.API_URL,
    },

    'nuxt-compress':
    {
        gzip:
        {
            threshold: 8192,
        },

        brotli:
        {
            threshold: 8192,
        }
    },

    publicRuntimeConfig:
    {
        API_URL         : process.env.API_URL  ,
        WORKSPACE       : process.env.WORKSPACE,
        HOME_PAGE       : process.env.HOME_PAGE,
        APP_COMPANY_NAME: process.env.APP_COMPANY_NAME,
    },

    env:
    {
        API_URL : process.env.API_URL,
    },

    vuetify:
    {
        treeShake: true,

        customVariables:
        [
            '~assets/scss/variables.scss'
        ],

        // defaultAssets:
        // {
        //     icons: 'mdi',
        //     font:
        //     {
        //         family: 'Roboto'
        //     }
        // },

        theme:
        {
            dark: true,

            themes:
            {
                dark:
                {
                    primary: '#29B6F6',
                    success: '#3cce7b',
                    //primary: colors.cyan.darken1,
                    // secondary: '#424242',
                    // accent   : '#82B1FF',
                    // error    : '#FF5252',
                    // info     : '#2196F3',
                    // warning  : '#FFC107',
                },
            },
        },

        options:
        {
            customProperties: true
        }
    },

    build:
    {
        analyze     : true,
        cssSourceMap: true,

        extractCSS:
        {
            ignoreOrder: true
        },

        splitChunks:
        {
            layouts: false,
            pages  : false,
            commons: false
        },

        optimization:
        {
            //minimize: true,

            splitChunks:
            {
                cacheGroups:
                {
                    styles:
                    {
                        name   : 'styles',
                        test   : /\.(css|vue)$/,
                        chunks : 'all',
                        enforce: true
                    }
                }
            }
        },

        babel:
        {
            presets( { envName } )
            {
                const envTargets =
                {
                    client: { browsers: 'last 2 versions' },
                    server: { node: "current" },
                };

                return [
                    [
                        "@nuxt/babel-preset-app",
                        {
                            targets: envTargets[ envName ],

                            corejs:
                            {
                                version: 3
                            },
                        }
                    ]
                ]
            },

            plugins:
            [
                // '@babel/plugin-proposal-optional-chaining',
                // '@babel/plugin-proposal-nullish-coalescing-operator'
            ]
        },

        loaders:
        {
            vue:
            {
                //compiler: require( 'vue-template-babel-compiler' ),
            }
        },

        extend( config, ctx )
        {
            config.output.globalObject = 'this';

            if( ctx.isClient )
            {
                config.module.rules.push(
                    {
                        test   : /\.worker\.js$/,
                        loader : 'worker-loader',
                        exclude: /(node_modules)/
                    }
                );

                config.module.rules.push(
                    {
                        test   : /\.vue$/,
                        loader : 'vue-inheritance-loader',
                        exclude: /(node_modules)/
                    }
                );
            }
        }
    },

    server:
    {
        port: +process.env.SERVER_PORT,
        host: process.env.SERVER_ADDRESS
    }
}
