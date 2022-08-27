import { isnumber } from "~/extentions/utils";

const data_field = 'data-v-uuid';

export const dynamicData =
{
    methods:
    {
        dropDynamicData()
        {
            Object.assign( this, this.intializeData() );
        },

        intializeData()
        {
            //
        }
    },

    data()
    {
        return  Object.assign( {}, this.intializeData() );
    }
}

export const onOverlayVisibility =
{
    methods:
    {
        onOverlayVisible( bool )
        {
            this.isOverlayVisible = bool;
        }
    },

    data()
    {
        return  { isOverlayVisible: false };
    }
}

export const uniqueComponent =
{
    methods:
    {
        getUUID( element )
        {
            return  `[${data_field}="${element.getAttribute(data_field)}"]`;
        }
    }
}

export const globalMenuHandler =
{
    methods:
    {
        onGlobalMenuOpen( field, data )
        {
            const old_data = this[ field ];
            const new_data = { show: !!old_data.show, ...data };

            if( old_data.attach != data.attach )
            {
                new_data.show = true;
            }

            this[ field ] = new_data;
        },

        intializeGlobalMenuData( field, data = {} )
        {
            return  { [ field ]: { show: false, attach: null, ...data } };
        }
    },
}

export const globalMenuExporter =
{
    methods:
    {
        onGlobalMenuEmit( event, ref, data = {} )
        {
            this.$emit( event,
                {
                    attach: this.getUUID( this.$refs[ ref ].$el ),
                    ...data
                }
            );
        }
    },
}

export const staticRouteName =
{
    created()
    {
        let route_idx = this.mountedRoute.route_idx;

        if( !isnumber( route_idx ) )
        {
            route_idx = this.$route.matched.length - 1;
        }

        const path = this.$route.matched[ route_idx ].path.replaceAll( /\?/g, '' );

        const nested_path = path.replace( /:(\w+)/g, ( match, param ) => this.$route.params[ param ] );
        const nested_name = path.replaceAll( '/', '-' ).replaceAll( /^-|:|-$/g, '' )

        this.mountedRoute = { name: nested_name, path: nested_path, route_idx };
    },

    data: () =>
    (
        {
            mountedRoute: { name: null, path: null, route_idx: null }
        }
    )
}

export const paginationWrapper =
{
    watch:
    {
        filter()
        {
            this.pagination.current = 0x1;
            this.onChangeFilter();
        },

        'pagination.current': function( page )
        {
            this.onChangePaginationPage();
        }
    },

    methods:
    {
        onChangeFilter()
        {
            //
        }
    },

    data: () =>
    (
        {
            loading: false,

            rows  : [],
            filter: {},

            pagination:
            {
                current: 1,
                count  : 0,
                limit  : 25
            }
        }
    )
}

export const fetchAPI =
{
    methods:
    {
        fetch( callback, field = 'loading' )
        {
            if( !this[ field ] )
            {
                this[ field ] = true;

                return  callback().finally( () =>
                    {
                        this[ field ] = false;
                    }
                );
            }
        }
    }
}

export const inheritClass =
{
    computed:
    {
        inheritClass()
        {
            return  this.$vnode.data.staticClass;
        }
    }
}
