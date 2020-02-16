import * as SecureStore from "expo-secure-store";
import securityConfig from "../library/config/security.json";
import Utility from "../utils/utility";

/**
 * Initialize any variables or configurations that are secret
 */
export class SecurityConfigurationManager {
  public static MOVIE_DB_API_KEY: string = "movie-db-api-key";
  private static instance: SecurityConfigurationManager;
  private static TMDB_API_KEY: string = "";

  private constructor() {
    this.InitializeSecurityConfiguation();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): SecurityConfigurationManager {
    if (!SecurityConfigurationManager.instance) {
      SecurityConfigurationManager.instance = new SecurityConfigurationManager();
    }
    return SecurityConfigurationManager.instance;
  }

  /**
   * Get the the movie database api key.
   */
  public static async getTMDBApiKeyAsync(): Promise<string> {
    if (Utility.isMobilePlatform()) {
      return await SecureStore.getItemAsync(
        SecurityConfigurationManager.MOVIE_DB_API_KEY
      );
    } else {
      return this.TMDB_API_KEY;
    }
  }

  /**
   * Initialize all security settings and store them in SecureStore.
   */
  private InitializeSecurityConfiguation() {
    try {
      const apiKey = securityConfig["movie-db-api-key"];
      if (null === apiKey || undefined === apiKey) {
        throw new Error(
          "MovieApiKey cannot be null! Create file and add the key to (src-library-config-security.json)."
        );
      }
      this.SetTMDBMovieApiKey();
    } catch (error) {
      console.log(
        "SecurityConfigurationManager.InitializeSecurityConfiguation -> Exception: ",
        error
      );
    }
  }

  /**
   * Set the TMDB movie key inside SecureStore if it is a mobile device otherwise,
   * we will simply set the key normally for web.
   */
  private SetTMDBMovieApiKey(): void {
    try {
      if (Utility.isMobilePlatform()) {
        SecureStore.setItemAsync(
          SecurityConfigurationManager.MOVIE_DB_API_KEY,
          securityConfig["movie-db-api-key"]
        );
      } else {
        SecurityConfigurationManager.TMDB_API_KEY =
          securityConfig["movie-db-api-key"];
      }
    } catch (error) {
      console.log(
        "SecurityConfigurationManager.SetTMDBMovieApiKey -> Exception: ",
        error
      );
    }
  }
}
