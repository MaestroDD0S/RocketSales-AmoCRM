import WebWorker from '~/extentions/webworker';

const workers =
{
    // cleaner  : PhonesCleaner,
    // concater : PhonesConcater,
    // separator: PhonesSeparator,
    // operators: PhonesOperators,
}

export  default ( context, inject ) =>
{
    inject( 'worker',
        {
            createWorker( type )
            {
                return  new WebWorker( new workers[ type ] );
            }
        }
    )
}
