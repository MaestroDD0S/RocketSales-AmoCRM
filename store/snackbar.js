export const state = () =>
(
    {
        list: []
    }
)

export const mutations =
{
    insertMessage( state, obj )
    {
        state.list.push( obj );
    },

    force2remove( state, { item, commit } )
    {
        item.timer = setTimeout( () => commit( 'remove', item.uuid ), 450 );
    },

    remove( state, uuid )
    {
        state.list = state.list.filter( item => item.uuid !== uuid );
    }
}

export const actions =
{
    insertMessage( { state, commit }, obj )
    {
        commit( 'insertMessage', obj );
    },

    remove( { state, commit }, uuid )
    {
        const item = state.list.find( ( item ) => item.uuid == uuid );

        if( item && !item.timer )
        {
            commit( 'force2remove', { item, commit } );
        }
    }
}

export const getters =
{

}
