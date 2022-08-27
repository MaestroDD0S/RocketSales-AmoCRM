<template>
    <v-container fluid class="d-flex flex-column h-100">
        <DashboardLeadFilter :loading="loading" @submit="onFilterSubmit"/>
        <v-data-table
            :headers="$options.headers"
            :items="rows"
            :loading="loading"
            show-expand
            hide-default-footer
            item-class="lead-row"
            class="elevation-1 mb-6"
        >
            <template v-slot:top>
                <v-toolbar class="elevation-0 rounded-t-sm">
                    <v-toolbar-title>Список Лидов</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon :disabled="loading" @click="fetchSearch">
                        <v-icon>
                            mdi-refresh
                        </v-icon>
                    </v-btn>
                    <v-btn
                        disabled
                        depressed
                        color="primary"
                        class="ml-4 px-4 font-weight-light"
                    >
                        Добавить
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:no-data>
                <div class="text-subtitle-1 white--text text-center pa-8">
                    Данные не найдены
                </div>
            </template>
            <template v-slot:expanded-item="{headers, item}">
                <td :colspan="headers.length">
                    <div class="pa-4">
                        <p class="mb-1">Контакты</p>
                        <DashboardLeadUserCard
                            v-for="(user, idx) in item.contacts"
                            :key="idx"
                            class="pa-2"
                            :user="user"
                        >
                            <DashboardLeadContactsCard :contacts="user" />
                        </DashboardLeadUserCard>
                    </div>
                </td>
            </template>
            <template v-slot:[`item.tags`]="{item: {tags}}">
                <template v-for="(tag, idx) in tags">
                    <ChipLimiter :key="idx" :index="idx" :max-chips="2" :count="tags.length">
                        <v-chip
                            class="ma-2"
                            :color="tag.color||'#fafafa'"
                            text-color="black"
                            small
                        >
                            {{ tag.name }}
                        </v-chip>
                    </ChipLimiter>
                </template>
            </template>
            <template v-slot:[`item.status`]="{item: {status}}">
                <v-chip
                    class="ma-2"
                    :color="status.color"
                    text-color="black"
                >
                    {{ status.name }}
                </v-chip>
            </template>
            <template v-slot:[`item.responsible_user`]="{item: {responsible_user}}">
                <DashboardLeadUserCard class="pa-2" :user="responsible_user" />
            </template>
            <template v-slot:[`item.created_at`]="{item: {created_at}}">
                {{ ( created_at * 1000 ) | dateFormatter }}
            </template>
            <template v-slot:[`item.price`]="{item: {price}}">
                {{ price | currencyFormatter }}
            </template>
        </v-data-table>
        <DashboardRowsPagination
            v-model="pagination.current"
            :disabled="loading"
            :count="pagination.count"
            :limit="pagination.limit"
            class="mt-auto"
        />
    </v-container>
</template>

<script>
import LeadsManager                    from '~/servicies/leads-manager';
import { paginationWrapper, fetchAPI } from '~/mixins/default';

export default
{
    mixins: [ paginationWrapper, fetchAPI ],

    headers:
    [
        { text: 'Название'     , value: 'name'            , sortable: false, width: 'auto' },
        { text: ''             , value: 'tags'            , sortable: false, width: '300' },
        { text: 'Статус'       , value: 'status'          , sortable: true , width: '200', sort: ( a, b ) => a.id - b.id },
        { text: 'Ответственный', value: 'responsible_user', sortable: false, width: '300' },
        { text: 'Дата создания', value: 'created_at'      , sortable: true , width: '200' },
        { text: 'Бюджет'       , value: 'price'           , sortable: true , width: '100' },
    ],

    activated()
    {
        this.fetchSearch();
    },

    mounted()
    {
        this.fetchSearch();
    },

    beforeDestroy()
    {
        this.$options.serviceWorker?.cancel();
    },

    created()
    {
        this.$options.serviceWorker = this.initializeServiceWorker();   //Disable reactivity
    },

    methods:
    {
        initializeServiceWorker()
        {
            return  new LeadsManager();
        },

        onFilterSubmit( filter )
        {
            this.filter = filter;
        },

        onChangePaginationPage()
        {
            this.fetchSearch();
        },

        onChangeFilter()
        {
            this.fetchSearch();
        },

        fetchSearch()
        {
            this.fetch( async () =>
                {
                    const { data: { pagination, rows } } = await this.$options.serviceWorker.search( this.filter, this.pagination.current, this.pagination.limit );

                    this.rows = rows;

                    //this.pagination = Object.assign( {}, this.pagination, pagination );

                    //hotfix, amocrm didnt return total count, only next page

                    const new_pagination =
                    {
                        current: pagination.page,
                        limit  : pagination.limit,
                        count  : pagination.page * pagination.limit + !!pagination.next   // +1 to next page
                    }

                    this.pagination = new_pagination;
                }
            );
        }
    }
}
</script>
