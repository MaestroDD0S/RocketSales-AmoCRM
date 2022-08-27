const random_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const random_numbers = '0123456789';

export const datetimeFormatter = new Intl.DateTimeFormat( 'ru-ru', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' } );
export const dateFormatter     = new Intl.DateTimeFormat( 'ru-ru', { year: 'numeric', month: 'numeric', day: 'numeric' } );
export const timeFormatter     = new Intl.DateTimeFormat( 'ru-ru', { hour: '2-digit', minute: '2-digit' } );

export const currencyFormatter = new Intl.NumberFormat( 'ru-ru', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 } );

export function isobject( val )
{
    return  typeof val === 'object' && val !== null;
}

export function obj2formData( obj )
{
    const formData = new FormData();

        Object.keys( obj ).forEach( key => formData.append( key, obj[ key ] ) );

    return  formData;
}

export function isstring( val )
{
    return  typeof val === 'string';
}

export function isnumber( val )
{
    return  !isNaN( parseFloat( val ) ) && val != null;
}

export function inrange( val, min, max )
{
    return  min <= val && val <= max;
}

export function clone( object )
{
    return  JSON.parse( JSON.stringify( object ) );
}

export function randint( min, max )
{
    return  Math.round( min - 0.5 + Math.random() * ( max - min + 1 ) );
}

export function getDeepValue( object, path )
{
    let value_path = path.split( '.' );
    let last       = value_path.pop();

    for( let idx = 0; idx < value_path.length; idx++ )
    {
        let field = value_path[ idx ];

        if( !object.hasOwnProperty( field ) )
        {
            return;
        }

        object = object[ field ];
    }

    return  object?.[ last ];
}

export function capitalizeFirstLetter( string )
{
    return  string.charAt( 0 ).toUpperCase() + string.slice( 1 );
}

export function kebab2camelCase( string )
{
    return  string.replace( /-./g, x => x[ 1 ].toUpperCase() );
}

export function updateObject( object, path, value )
{
    let value_path = path.split( '.' );
    let last      = value_path.pop();

    value_path.reduce( ( o, k ) => o[ k ] = o[ k ] || {}, object )[ last ] = value;

    return  object;
}

export function debounce( callback, delay = 500 )
{
    let timer_id;

    return function()
    {
        let args = arguments;

        clearTimeout( timer_id );

        timer_id = setTimeout( () =>
            {
                callback.apply( this, args );
            },
            delay
        );
    }
}

export function innerDimensions( node, exclude_paddings = false )
{
    let width  = node.clientWidth;
    let height = node.clientHeight;

    if( !exclude_paddings )
    {
        let computedStyle = getComputedStyle( node );

        height -= parseFloat( computedStyle.paddingTop  ) + parseFloat( computedStyle.paddingBottom );
        width  -= parseFloat( computedStyle.paddingLeft ) + parseFloat( computedStyle.paddingRight  );
    }

    return  { height, width };
}

export function humanReadableFileSize( bytes, binary = false )
{
    const base = binary ? 1024 : 1000;

    if( bytes < base )
    {
        return `${bytes} B`;
    }

    const prefix = binary ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
    let unit = -1;

    while( Math.abs( bytes ) >= base && unit < prefix.length - 1 )
    {
        bytes /= base;
        ++unit;
    }

    return  `${bytes.toFixed(1)} ${prefix[unit]}B`;
}

export function delay( ms )
{
    return  new Promise( res => setTimeout( res, ms ) );
}

export function findByID( arr, id )
{
    return  arr?.find( ( el ) => el.id == id );
}

export function findNameByID( arr, id )
{
    return  arr?.find( ( el ) => el.id == id )?.name;
}

export function mapID( arr )
{
    return  arr?.map( ( el ) => el.id );
}

export function defaultDateFormat( date )
{
    return  date?.toISOString().split( 'T' )[ 0 ];
}

export function randomString( str_len, with_numbers = true, with_letters = true )
{
    let characters = '';

    if( with_letters )
    {
        characters += random_letters;
    }

    if( with_numbers )
    {
        characters += random_numbers;
    }

    const len    = characters.length;
    const result = [];

    for( let i = 0; i < str_len; i++ )
    {
        result[ i ] = characters.charAt( Math.floor( Math.random() * len ) );
    }

    return  result.join( '' );
}

export function filterParams( params )
{
    const filtered = {};

    for( const key in params )
    {
        const value = params[ key ];

        if( value != null && value !== '' && ( value?.length ?? true ) )
        {
            filtered[ key ] = value;
        }
    }

    return  filtered;
}
