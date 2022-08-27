<template>
    <v-pagination
        v-show="pages > 1"
        circle
        :value="value"
        :disabled="disabled"
        :length="pages"
        :total-visible="totalVisible"
        @input="onChanged"
    ></v-pagination>
</template>

<script>
export default
{
    props:
    {
        disabled: { type: Boolean, default: false },

        value: { type: Number, default: 0  },
        count: { type: Number, default: 0  },
        limit: { type: Number, default: 25 },

        totalVisible: { type: Number, default: 7 },
    },

    computed:
    {
        pages()
        {
            return  Math.ceil( this.count / Math.max( this.limit, 1 ) );
        }
    },

    methods:
    {
        onChanged( e )
        {
            this.$emit( 'input', e );
        }
    }
}
</script>
