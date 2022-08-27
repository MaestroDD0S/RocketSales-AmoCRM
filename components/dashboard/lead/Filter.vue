<template>
    <v-form class="d-flex" v-model="validated" :disabled="loading" @submit.prevent="searchDebounce">
        <v-col class="d-flex px-0" cols="12" sm="4" xl="3">
            <v-text-field
                v-model="params.query"
                solo clearable
                label="Поиск"
                :rules="rules"
                append-icon="mdi-magnify"
                @input="searchDebounce"
            ></v-text-field>
        </v-col>
    </v-form>
</template>

<script>
import { string }           from '~/extentions/validations';
import { clone, debounce  } from '~/extentions/utils';

export default
{
    props:
    {
        loading: { type: Boolean, default: false }
    },

    methods:
    {
        onSubmit()
        {
            if( this.validated && !this.loading )
            {
                this.$emit( 'submit', clone( this.params ) );
            }
        },

        searchDebounce: debounce( function( vm, query )
            {
                this.onSubmit();
            }
        )
    },

    data: () =>
    (
        {
            validated: false,

            params:
            {
                query: null
            },

            rules:
            [
                string( 3, 32 )
            ]
        }
    )
}
</script>
