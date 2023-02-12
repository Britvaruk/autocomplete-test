// urls
export const BASE_URL = 'https://autocomplete.clearbit.com/v1/';

export const API_COMPANIES = (name: string) => BASE_URL + `companies/suggest?query=${name}`;