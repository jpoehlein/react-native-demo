import { AxiosResponse } from "axios";
import { SecurityConfigurationManager } from "../../utils/security-configuration-manager";
import { RootObject } from "../models/TvShows";
import HttpClientService from "../services/http-client-service";
import UrlBuilder from "../../utils/url-builder";

export default class MediaService {
  private httpService: HttpClientService;

  constructor() {
    try {
      this.httpService = new HttpClientService();
    } catch (error) {
      console.log("MediaService.constructor -> Exception: ", error);
    }
  }

  async getTopTvShowsAsync(
    page: string = "1",
    lang: string = "en-US"
  ): Promise<AxiosResponse<RootObject>> {
    try {
      const params = {
        api_key: await SecurityConfigurationManager.getTMDBApiKeyAsync(),
        page: page,
        language: lang
      };
      const config = this.httpService.createRequestConfig(
        UrlBuilder.MOVIE_DB_API_BASE_URL,
        UrlBuilder.TV_GET_TOP_RATED_SHOWS_ROUTE,
        "get",
        params
      );
      const client = this.httpService.createClient();
      return await client.request<RootObject>(config);
    } catch (error) {
      console.log("HttpClientService.getTopTvShows -> Exception: ", error);
    }
  }
}
