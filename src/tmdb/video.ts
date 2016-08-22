import {Genre} from "./genre";
import {AlternativeTitles} from "./title";
import {Company} from "./company";
import {Country} from "./country";
import {Language} from "./language";
import {keywords} from "./keyword";
import {Images} from "./image";
import {Releases} from "./release";
import {Credit} from "./movie.credit";

export class Video {
    id: number;
    imdb_id: string;
    backdrop_path: string;
    budget: number;
    genres: Array<Genre>;
    homepage: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<Company>;
    production_countries: Array<Country>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<Language>;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    keywords: keywords;
    images: Images;
    releases: Releases;
    alternative_titles: AlternativeTitles;
    credits: Credit;
}

export function print(video: Video) : void {
    console.log(video.title + video.popularity);
}