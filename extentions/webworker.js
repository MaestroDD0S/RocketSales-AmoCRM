class WebWorker
{
    constructor( worker )
    {
        this.worker   = worker;
        this.handlers = {};

        this.worker.addEventListener( 'message', ( { data: { event, data } } ) =>
            {
                this.invoke( event, data );
            }
        );
    }

    on( event, callback )
    {
        this.handlers[ event ] = callback;
    }

    invoke( event, data )
    {
        let callback = this.handlers[ event ];

        if( callback )
        {
            callback.call( this, data );
        }
    }

    send( event, data = {} )
    {
        this.worker.postMessage( { event, data } );
    }

    terminate()
    {
        this.worker?.terminate();
    }
}

export default WebWorker;
