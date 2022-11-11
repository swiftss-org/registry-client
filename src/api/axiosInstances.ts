/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios, { Method, AxiosPromise, AxiosResponse, AxiosError } from 'axios';

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const PATCH = 'patch';
const DELETE = 'delete';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://tmh-registry-api-staging.herokuapp.com';

export const METHODS = { GET, POST, PUT, DELETE, PATCH };

export const orfiumAxios = axios.create({
  baseURL: BASE_URL + '/api/v1',
});

/**
 * takes an axios promise and returns the actual data from the request or the error
 *
 * axiosPromise {AxiosPromise} the axios promise
 * @returns {AxiosResponse | AxiosError} The API response
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const axiosPromiseResult = (axiosPromise: AxiosPromise): Promise<any> =>
  axiosPromise
    .then(({ data }: AxiosResponse) => data)
    .catch((error: AxiosError) => {
      throw error.response ? error.response.data : error;
    });

export const request = (
  method: string,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
  withoutBase = false,
  headers = {}
) => {
  const cancelTokenSource = axios.CancelToken.source();

  const config = {
    method: method as Method,
    url,
    cancelToken: cancelTokenSource.token,
    data: params,
    params: method === METHODS.GET ? params : undefined,
    headers,
  };

  const request = () =>
    withoutBase ? axiosPromiseResult(axios(config)) : axiosPromiseResult(orfiumAxios(config));
  return { request, cancelTokenSource };
};
export const setAxiosToken = (token: string): void => {
  const hasToken = token !== '';
  orfiumAxios.defaults.headers.common.Authorization = hasToken ? `Token ${token}` : '';
};
