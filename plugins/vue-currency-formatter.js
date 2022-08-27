import { currencyFormatter } from '~/extentions/utils';
import Vue from 'vue';

Vue.filter( 'currencyFormatter', function( value )
    {
        return  currencyFormatter.format( value || 0 );
    }
);
