import { datetimeFormatter, dateFormatter, timeFormatter } from '~/extentions/utils';
import Vue from 'vue';

Vue.filter( 'dateFormatter', function( value )
    {
        return  value ? datetimeFormatter.format( new Date( value ) ) : '';
    }
);

Vue.filter( 'defaultDateFormatter', function( value )
    {
        return  value ? dateFormatter.format( new Date( value ) ) : '';
    }
);

Vue.filter( 'timeFormatter', function( value )
    {
        return  value ? timeFormatter.format( new Date( value ) ) : '';
    }
);
