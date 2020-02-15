import * as SecureStore from 'expo-secure-store';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {SecurityConfigurationManager} from '../utils/security-configuration-manager';
import {RootObject} from '../models/TvShows';

/**
 * Demo for making http requests to themoviedb. In a real project,
 * this would be much cleaner.
 */
export class HttpClientService {
    private MOVIE_DB_API_KEY: string;

    constructor() {}

    private async setMovieDbApiKey() {
        this.MOVIE_DB_API_KEY = await SecureStore.getItemAsync(SecurityConfigurationManager.MOVIE_DB_API_KEY); 
    }

    async getTopTvShowsAsync(page: string = "1", lang: string = "en-US"): Promise<AxiosResponse<RootObject>> {
        try {
            await this.setMovieDbApiKey();
            const config = this.createRequest(page, lang);
            return await axios.request<RootObject>(config);
        } catch (error) {
            console.log("HttpClientService.getTopTvShows -> Exception: ", error);
        }
    }

    private createRequest(page: string, lang: string): AxiosRequestConfig {
        const apiClient = axios.create({ baseURL: 'https://api.themoviedb.org/3/' });
        const config: AxiosRequestConfig = {
            baseURL: 'https://api.themoviedb.org/3',
            url: '/tv/top_rated',
            params: {
                'api_key': this.MOVIE_DB_API_KEY, 'page': page, 'language': lang
            },
            method: "get"
        };
        return config;
    }
}