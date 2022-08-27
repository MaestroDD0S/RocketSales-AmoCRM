<template>
    <div>
        <v-snackbar
            right absolute
            v-for="(item,idx) in list"
            :key="item.uuid"
            :color="item.color"
            :timeout="item.timeout"
            :value="item.show"
            @input="remove(item.uuid)"
            :style="computeStyle(idx)"
            :ref="'snackbar_'+idx"
            height="48"
        >
            {{ item.msg }}
        </v-snackbar>
    </div>
</template>

<script>

export default
{
    props:
    [
        //
    ],

    methods:
    {
        remove( uuid )
        {
            this.$notify.remove( uuid );
        },

        computeStyle( idx )
        {
            const height = 96 + idx * 56;

            return  { transition: `bottom 0.45s ease`, bottom: `${height}px` };
        }
    },

    computed:
    {
        list()
        {
            return  this.$store.state.snackbar.list;
        }
    },

    data: () =>
    (
        {
            //
        }
    )
}
</script>

<style lang="scss" scoped>

</style>
