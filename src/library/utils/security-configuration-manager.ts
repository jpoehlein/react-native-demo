import * as SecureStore from 'expo-secure-store';
import securityConfig from '../config/security.json';

/**
 * Initialize any variables or configurations that are secret
 */
export class SecurityConfigurationManager {

    private static instance: SecurityConfigurationManager;
    public static MOVIE_DB_API_KEY: string = "movie-db-api-key";

    private constructor() {
        console.log("SecurityConfigurationManager.constructor");
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
     * Initialize all security settings and store them in SecureStore.
     */
    private InitializeSecurityConfiguation() {
        try {
            const apiKey = securityConfig["movie-db-api-key"];
            if (null === apiKey || undefined === apiKey) {
                throw new Error(
                    "MovieApiKey cannot be null! Create file and add the key to (src-library-config-security.json).");
            }
            SecureStore.setItemAsync(SecurityConfigurationManager.MOVIE_DB_API_KEY, securityConfig["movie-db-api-key"]);
        } catch (error) {
            console.log("SecurityConfigurationManager.InitializeSecurityConfiguation -> Exception: ", error);
        }
    }
}