import Config from 'react-native-config';

export const BASE_URL = 'https://buyer-app.ondc.org';
export const GET_MESSAGE_ID = '/client/v1/search';
export const GET_PRODUCTS = '/client/v1/on_search?messageId=';
export const GET_LOCATION = '/mmi/api/mmi_query?query=';
export const GET_LATLONG = '/mmi/api/mmi_place_info?eloc=';
export const GET_ADDRESS = '/client/v1/delivery_address';
export const ADD_ADDRESS = '/client/v1/delivery_address';