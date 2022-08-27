import { v4 as uuidv4 } from 'uuid';
import colors           from 'vuetify/lib/util/colors'
import { getDeepValue } from '~/extentions/utils'

export default function( { app, store }, inject )
{
    inject( 'notify',
        {
            add( msg, color = 'green.darken1', timeout = 3500 )
            {
                store.dispatch( 'snackbar/insertMessage',
                    {
                        msg,
                        timeout,
                        color: getDeepValue( colors, color ) || color,
                        uuid: uuidv4(),
                        show: true,
                        timer: null
                    }
                );
            },

            remove( uuid )
            {
                store.dispatch( 'snackbar/remove', uuid );
            }
        }
    );
}
