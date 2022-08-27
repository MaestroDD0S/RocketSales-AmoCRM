<template>
    <div class="d-flex align-center">
        <v-avatar
            color="teal"
            size="36"
        >
        <v-icon>mdi-account-outline</v-icon>
        </v-avatar>
        <span class="text-caption px-4">
            {{ user.name }}
        </span>
        <slot></slot>
    </div>
</template>

<script>
export default
{
    props:
    {
        user: { type: Object, default: () => ( {} ) }
    },

    computed:
    {

    }
}
</script>
