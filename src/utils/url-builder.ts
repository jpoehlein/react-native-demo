import TMDBConfig from "../library/config/tmdb-config.json";

export default class UrlBuilder {
  static MOVIE_DB_API_BASE_URL: string = TMDBConfig.api.base_url;

  static MOVIE_DB_IMAGE_BASE_URL: string =
    TMDBConfig.images.secure_base_url_image;
    
  static TV_GET_TOP_RATED_SHOWS_ROUTE: string = TMDBConfig.api["get-top-rated-tv-shows"];

  static buildImageUrl(imagePath: string, size: string) {
    return `${this.MOVIE_DB_IMAGE_BASE_URL}${size}/${imagePath}`;
  }
}
