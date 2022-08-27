import Vue from 'vue';

let uuid = 0;

Vue.directive( 'unique-id',
    {
        inserted: ( el, binding, vnode ) =>
        {
            if( binding.modifiers.id )
            {
                return  el.setAttribute( 'id', `v-uuid-${uuid++}` );
            }

            el.setAttribute( 'data-v-uuid', uuid++ );
        }
    }
);
