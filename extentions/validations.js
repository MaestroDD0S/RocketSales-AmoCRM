import { isstring } from '~/extentions/utils';

export const required = () =>
{
    return  ( v ) => !!v || 'Required';
}

export const password = () =>
{
    return  ( v ) => v.length > password_min_len || `min password len: ${password_min_len}`;
}

export const string = ( min = 0, max = 128 ) =>
{
    const   msg = `Строка длиной от ${min} до ${max} символов`;
    return  ( v ) => !v || ( v.length <= max && v.length >= min || msg );
}

export const number = ( min, max ) =>
{
    return  ( v ) => true;
}

export const phone = () =>
{
    return  ( v ) => true;
}
