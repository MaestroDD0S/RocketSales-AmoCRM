<template>
    <v-overlay
        :z-index="zIndex"
        :value="visible"
        @click="hide"
        @wheel.prevent.stop
        @touchmove.prevent.stop
        @scroll.prevent.stop
    >
        <slot></slot>
    </v-overlay>
</template>

<script>

export default
{
    props:
    {
        name:   { type: String, default: 'default' },
        zIndex: { type: Number, default: 7         },
    },

    methods:
    {
        hide()
        {
            this.$overlay.hide( this.name );
        }
    },

    watch:
    {
        visible( bool )
        {
            this.$emit( 'visible', bool );
        }
    },

    computed:
    {
        visible()
        {
            return   !!this.$store.state.overlay.visible[ this.name ];
        }
    }
}
</script>

