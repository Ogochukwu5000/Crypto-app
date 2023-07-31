export const BASE_URL = `http://127.0.0.1:8080`;
export const COIN_GECO_API_PROD = `https://pro-api.coingecko.com/api/v3/`;
export const COIN_GECO_API_DEV = `https://api.coingecko.com/api/v3/`;
export const prod = false; 
export const COIN_GECO_API = prod ? COIN_GECO_API_PROD : COIN_GECO_API_DEV;