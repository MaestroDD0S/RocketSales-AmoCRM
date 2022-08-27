<template functional>
    <span>
        <template v-if="props.index < props.maxChips">
            <slot></slot>
        </template>
        <span
            v-if="props.index === props.maxChips"
            class="ml-2 grey--text text-caption"
        >
            Ещё {{ props.count - props.maxChips }}
        </span>
    </span>
</template>

<script>
export default
{
    props:
    {
        index   : { required: true           },
        count   : { required: true           },
        maxChips: { type: Number, default: 0 },
    }
}
</script>

