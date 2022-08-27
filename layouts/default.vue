<template>
    <v-app ref="mainApp">
        <div class="gear-background" :style="{ left  : '-100px', top  : '-100px' }"></div>
        <div class="gear-background" :style="{ bottom: '-100px', right: '-100px' }"></div>
        <v-main class="main" :class="mainThemeClass">
            <v-navigation-drawer class="navigation-aside">
                <v-list-item class="pt-3">
                    <v-list-item-content>
                        <v-list-item-title class="text-h6">
                            {{ $config.APP_COMPANY_NAME }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            default devtool project
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item-group flat tile dense color="blue-grey lighten-4" class="aside-navbar">
                    <v-list-item
                        nuxt tile link
                        v-for="item in links"
                        :key="item.href"
                        :to="item.href"
                    >
                        <v-list-item-icon>
                            <v-icon class="mr-2">{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-navigation-drawer>
            <div class="main-container pa-8">
                <GlobalOverlay/>
                <Snackbar/>
                <Nuxt />
            </div>
        </v-main>
    </v-app>
</template>

<script>
export default
{
    watch:
    {
        '$vuetify.theme.dark': function()
        {
            this.intializeGlobalBackground();
        }
    },

    computed:
    {
        mainThemeClass()
        {
            return  this.$vuetify.theme.dark ? 'dark-theme' : '';
        }
    },

    mounted()
    {
        this.intializeGlobalBackground();
    },

    methods:
    {
        intializeGlobalBackground()
        {
            document.querySelector( 'html' ).style.backgroundColor = window.getComputedStyle( this.$refs.mainApp.$el ).backgroundColor;
        }
    },

    data: () =>
    (
        {
            links:
            [
                { href: '/leads', title: 'Сделки', icon: 'mdi-view-dashboard' },
            ]
        }
    )
}
</script>

<style lang="scss" scoped>

.main
{
    &.dark-theme
    {
         .v-navigation-drawer
        {
            background-color: #1e1e1e;
        }
    }
}

//TODO adaptive media bp

.main-container
{
    margin-left: 296px;
    height: 100%;
}

.navigation-aside
{
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    min-width: 296px;
}

.gear-background
{
    background-image: url("/img/icons/cogwheel-gear.svg");
    background-repeat: no-repeat;
    position: fixed;
    height: 200px;
    width: 200px;
    background-position: center;
    filter: invert(60%) sepia(73%) saturate(522%) hue-rotate(314deg) brightness(105%) contrast(102%);
    opacity: 0.1;
    animation: rotate 105.0s linear infinite;
    z-index: 0;
}

@keyframes rotate
{
    to {
        transform: rotate( 360deg );
    }
}

</style>
