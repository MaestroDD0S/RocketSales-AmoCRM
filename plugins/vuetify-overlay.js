import Vue                                 from 'vue';
import { isobject, capitalizeFirstLetter } from '~/extentions/utils';

const matches = ( el, id ) =>
{
    if( el.matches )
        return  el.matches( '.v-menu__content' );
};

Vue.directive( 'overlay',
    {
        inserted: ( el, binding, vnode ) =>
        {
            const watch      = 'is' + capitalizeFirstLetter( Object.keys( binding.modifiers )[ 0 ] || 'MenuActive' );
            const vcomponent = vnode.componentInstance;

            if( !isobject( binding.value ) )
            {
                binding.value = { name: binding.value };
            }

            const { name, opacity, zIndex = 999 } = binding.value;

            if( !name )
            {
                return;
            }

            vcomponent.$watch( watch, ( active ) =>
                {
                    vnode.context.$overlay.toggle( name, active );

                    if( zIndex != false )
                    {
                        el.style[ 'z-index' ] = active ? zIndex : 'auto';
                    }
                }
            );

            const preventHandler = ( e ) =>
            {
                if( vcomponent[ watch ] )
                {
                    if( !e.path.find( matches ) )
                    {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }
            };

            const events = [ 'wheel', 'touchmove', 'scroll' ];

            events.forEach( ( event ) =>
                {
                    el.addEventListener( event, preventHandler );
                }
            );
        }
    }
);

export default function( { app, store }, inject )
{
    inject( 'overlay',
        {
            toggle( name, enable )
            {
                store.commit( 'overlay/setVisible', { name, visible: !!enable } );
            },

            show( name = 'default' )
            {
                app.$overlay.toggle( name, true );
            },

            hide( name = 'default' )
            {
                app.$overlay.toggle( name, false );
            }
        }
    );
}
