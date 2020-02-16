import axios, { AxiosRequestConfig, Method } from "axios";

/**
 * A wrapper class for creating http connections.
 */
export default class HttpClientService {
  /**
   * Create an Axios request config object.
   * @param baseUrl
   * @param requestUrl
   * @param params
   * @param method
   */
  public createRequestConfig(
    baseUrl: string,
    requestUrl: string,
    method: Method,
    params?: any
  ): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      baseURL: baseUrl,
      url: requestUrl,
      method: method,
      params: params
    };
    return config;
  }

  /**
   * Create an instance of the Axios client.
   * @param config
   */
  public createClient() {
    try {
      return axios.create();
    } catch (error) {
      console.log("HttpClientService.createAxiosClient -> Exception: ", error);
    }
  }
}
