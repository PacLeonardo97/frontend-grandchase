import { getCookie } from 'cookies-next';

export const getActualLanguage = getCookie('NEXT_LOCALE');
