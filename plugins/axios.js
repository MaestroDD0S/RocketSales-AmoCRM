export default function( { app, $axios } )
{
    $axios.onError( ( error ) =>
        {
            const msg = error.response?.data?.error || error.response;

            app.$notify.add( `${msg}`, 'red.darken1' );
        }
    )
}
