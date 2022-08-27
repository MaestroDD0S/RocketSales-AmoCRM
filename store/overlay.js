export const state = () =>
(
    {
        visible:
        {
            //
        },
    }
)

export const mutations =
{
    setVisible( state, params )
    {
        state.visible = Object.assign( {}, state.visible, { [ params.name ]: !!params.visible } );
    }
}

export const getters =
{

}
