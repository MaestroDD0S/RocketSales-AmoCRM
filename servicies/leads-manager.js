import axios from 'axios';
import { delay, randint, filterParams } from '~/extentions/utils';

class LeadsManager
{
    search_delay = 15000;

    constructor()
    {
        this.cancelToken = axios.CancelToken.source();

        this.axios = axios.create(
            {
                baseURL: process.env.API_URL,
                timeout: 15000
            }
        );
    }

    cancel()
    {
        this.cancelToken.cancel();
    }

    async search( filter = {}, page = 1, limit = 25 )
    {
        const query = new URLSearchParams( filterParams( { ...filter, page, limit } ) ).toString();

        return  this.axios.get( `/leads?${query}`, { cancelToken: this.cancelToken.token } );

        // const rows_count = randint( 1, Math.min( limit, 50 ) );
        // const count      = randint( rows_count, rows_count * randint( 2, 10 ) );

        // await delay( randint( 1, 5 ) * this.search_delay );

        // const rows = [];

        // for( let i = 1; i <= rows_count; i++ )
        // {
        //     rows.push(
        //         {
        //             id: i,
        //             name: 'Сделка №' + i,
        //             price: randint( 1, 10 ) * 2500,
        //             created_at: 1612859145,

        //             status:
        //             {
        //                 id   : randint( 1, 10 ),
        //                 name : 'Статус',
        //                 color: '#ffcc66'
        //             },

        //             tags:
        //             [
        //                 {
        //                     id   : randint( 1, 10 ),
        //                     name : 'Приоритетный',
        //                     color: '#fefefe'
        //                 },
        //                 {
        //                     id   : randint( 1, 10 ),
        //                     name : 'Приоритетный',
        //                     color: '#fefefe'
        //                 },
        //                 {
        //                     id   : randint( 1, 10 ),
        //                     name : 'Приоритетный',
        //                     color: '#fefefe'
        //                 }
        //             ],

        //             responsible_user:
        //             {
        //                 id: randint( 1, 50 ),
        //                 name: 'Константин Константинопольский'
        //             },

        //             contacts:
        //             [
        //                 {
        //                     id: randint( 1, 10 ),
        //                     name: 'Константин Константинопольский',

        //                     phone: '89158129858',
        //                     email: 'vladislav-t-00@mail.ru'
        //                 },

        //                 {
        //                     id: randint( 1, 10 ),
        //                     name: 'Тимофей Петрин'
        //                 }
        //             ]
        //         }
        //     )
        // }

        // return  { rows, pagination: { count, limit } };
    }

    async create( params )
    {
        await delay( randint( 1, 5 ) * this.search_delay ); //TODO
    }

    async read( id )
    {
        await delay( randint( 1, 5 ) * this.search_delay ); //TODO
    }

    async update( id, params )
    {
        await delay( randint( 1, 5 ) * this.search_delay ); //TODO
    }

    async delete( id )
    {
        await delay( randint( 1, 5 ) * this.search_delay ); //TODO
    }
};

export default LeadsManager;
