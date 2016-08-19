import {Genre} from "./genre";
import {Title} from "./title";
import {Company} from "./company";
import {Country} from "./country";
import {Language} from "./language";
import {Keyword} from "./keyword";
import {Image} from "./image";
import {Release} from "./release";
import {Credit} from "./credit";

export interface Video {
    tmdbId?: number;
    imdbId?: number;
    backdropPath?: string;
    budget?: number;
    genres?: Array<Genre>;
    homepage?: string;
    originalLanguage?: string;
    originalTitle?: string;
    overview?: string;
    popularity?: number;
    posterPath?: string;
    productionCompany?: Array<Company>;
    productionCountry?: Array<Country>;
    releaseDate?: string;
    revenue?: number;
    runtime?: number;
    spokenLanguages?: Array<Language>;
    status?: string;
    tagLine?: string;
    title?: string;
    video?: string;
    voteAverage?: number;
    voteCount?: number;
    keywords?: Array<Keyword>;
    images?: Array<Image>;
    releases?: Array<Release>;
    alternateTitles?: Array<Title>;
    credits?: Credit;
}

export function print(video: Video) : void {
    console.log(video.title + video.popularity);
}