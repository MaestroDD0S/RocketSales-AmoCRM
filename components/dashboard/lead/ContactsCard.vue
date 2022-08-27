<template>
    <div>
        <v-btn
            icon
            v-if="contacts.phone"
            color="primary"
            :href="phoneLink"
        >
            <v-icon small>mdi-phone</v-icon>
        </v-btn>
        <v-btn
            icon
            v-if="contacts.email"
            color="primary"
            :href="emailLink"
        >
            <v-icon small>mdi-email-fast-outline</v-icon>
        </v-btn>
    </div>
</template>

<script>
//TODO change to array + generator by input type

export default
{
    props:
    {
        contacts: { type: Object, default: () => ( {} ) }
    },

    computed:
    {
        phoneLink()
        {
            return  `tel:${this.contacts.phone}`;
        },

        emailLink()
        {
            return  `mailto:${this.contacts.email}`;
        }
    }
}
</script>
