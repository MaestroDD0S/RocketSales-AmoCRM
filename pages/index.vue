<template>

</template>

<script>
export default
{
    middleware( { $config, redirect } )
    {
        return  redirect( $config.HOME_PAGE );
    }
}
</script>
