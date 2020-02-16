
import TMDBConfig from '../config/tmdb-config.json';
enum BackDropSizes {
    w300 = "w300",
    w780 = "w780",
    w1280 = "w1280",
    original = "original"
}

enum LogoSizes {
    w45 = "w45",
    w92 = "w92",
    w154 = "w154",
    w185 = "w185",
    w300 = "w300",
    w500 = "w500",
    original = "original"
}

enum PosterSizes {
    w45 = "w45",
    w92 = "w92",
    w154 = "w154",
    w185 = "w185",
    w342 = "w342",
    w500 = "w500",
    w780 = "w780",
    original = "original"
}

enum ProfileSizes {
    w45 = "w45",
    w185 = "w185",
    h632 = "h632",
    original = "original"
}

enum StillSizes {
    w92 = "w92",
    w185 = "w185",
    w300 = "w300",
    original = "original"
}

export default class ImageSizesEnum {
    static readonly BackDropSizes = BackDropSizes;
    static readonly LogoSizes = LogoSizes;
    static readonly PosterSizes = PosterSizes;
    static readonly ProfileSizes = ProfileSizes;
    static readonly StillSizes = StillSizes;
}